'use strict';

/**
 * ==============================================
 * MiroTalk SFU - 配置文件
 * ==============================================
 *
 * 该文件包含 MiroTalk SFU 应用的所有可配置设置。环境变量可以覆盖大多数设置（请参见每个部分的详细信息）。
 * 结构：
 * 1. 核心系统配置 
 * 2. 服务器设置 
 * 3. 媒体处理 
 * 4. 安全与认证 
 * 5. API 配置 
 * 6. 第三方集成 
 * 7. UI/UX 自定义 
 * 8. 功能标志 
 * 9. Mediasoup（WebRTC）设置
 */

const dotenv = require('dotenv').config();
const packageJson = require('../../package.json');
const os = require('os');
const fs = require('fs');
const splitChar = ',';

// ==============================================
// 1. 环境检测 & 系统配置
// ==============================================

const PLATFORM = os.platform();
const IS_DOCKER = fs.existsSync('/.dockerenv');
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const ANNOUNCED_IP = process.env.SFU_ANNOUNCED_IP || '';
const LISTEN_IP = process.env.SFU_LISTEN_IP || '0.0.0.0';
const IPv4 = getIPv4();

// ==============================================
// 2. WebRTC端口配置
// ==============================================

const RTC_MIN_PORT = parseInt(process.env.SFU_MIN_PORT) || 40000;
const RTC_MAX_PORT = parseInt(process.env.SFU_MAX_PORT) || 40100;
const NUM_CPUS = os.cpus().length;
const NUM_WORKERS = Math.min(process.env.SFU_NUM_WORKERS || NUM_CPUS, NUM_CPUS);

// ==============================================
// 3. FFmpeg路径配置
// ==============================================

const RTMP_FFMPEG_PATH = process.env.RTMP_FFMPEG_PATH || getFFmpegPath(PLATFORM);

// ==============================================
// 主要配置导出
// ==============================================

module.exports = {
    // ==============================================
    // 1. 核心系统配置
    // ==============================================

    system: {
        /**
         * 系统信息
         * ------------------
         * - 硬件/OS细节自动收集
         * - 用于诊断和优化
         */
        info: {
            os: {
                type: os.type(),
                release: os.release(),
                arch: os.arch(),
            },
            cpu: {
                cores: NUM_CPUS,
                model: os.cpus()[0].model,
            },
            memory: {
                total: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            },
            isDocker: IS_DOCKER,
        },

        /**
         * 控制台配置
         * ---------------------
         * - 时区: IANA时区（例如，'Europe/Rome'）
         * - 调试：在非生产环境中启用调试日志记录
         * - 颜色: 色彩化的控制台输出
         * - json: JSON格式的日志输出
         * - json_pretty: 格式化打印JSON日志
         */
        console: {
            timeZone: 'Asia/Shanghai',
            debug: ENVIRONMENT !== 'production',
            json: process.env.LOGS_JSON === 'true',
            json_pretty: process.env.LOGS_JSON_PRETTY === 'true',
            colors: process.env.LOGS_JSON === 'true' ? false : true,
        },

        /**
         * 外部服务配置
         * -------------------------------
         * - ip: 检测公共IP地址的服务
         */
        services: {
            ip: ['http://api.ipify.org', 'http://ipinfo.io/ip', 'http://ifconfig.me/ip'],
        },
    },

    // ==============================================
    // 2. 服务器配置
    // ==============================================

    server: {
        /**
         * 主机配置
         * ------------------
         * - hostUrl: 公共URL（例如，'https://yourdomain.com'）
         * - listen: 绑定的IP和端口
         */
        hostUrl: process.env.SERVER_HOST_URL || 'https://localhost:3010',
        listen: {
            ip: process.env.SERVER_LISTEN_IP || '0.0.0.0',
            port: process.env.SERVER_LISTEN_PORT || 3010,
        },

        /**
         * 安全设置
         * -----------------
         * - trustProxy: 信任 X-Forwarded- 头部
         * - ssl: SSL证书路径
         * - cors: 跨域资源共享
         */
        trustProxy: process.env.TRUST_PROXY === 'true',
        ssl: {
            cert: process.env.SERVER_SSL_CERT || '../ssl/cert.pem',
            key: process.env.SERVER_SSL_KEY || '../ssl/key.pem',
        },
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST'],
        },
    },

    // ==============================================
    // 3. 媒体处理配置
    // ==============================================

    media: {
        /**
         * 录音配置
         * =======================
         * 服务器端录制功能。
         *
         * 核心设置:
         * ------------------------
         * - enabled        : 启用录音功能
         * - uploadToS3     : 上传录音到AWS S3桶 [true/false]
         * - endpoint       : 留空（''）以本地存储录音
         *   - 设置为有效的URL（例如，'http://localhost:8080/'）:
         *      - 将录音推送到远程服务器
         *      - 将数据存储在云存储服务中
         *      - 发送到处理管道
         * - dir            : 录音存储目录
         * - maxFileSize    : 最大录音大小（默认1GB）
         *
         * Docker 笔记:
         * ------------
         * - 在 Docker 中运行时，请确保录影目录存在并正确挂载。:
         *   1. 创建目录（例如，'app/rec'）
         *   2. 在 docker-compose.yml 中配置为卷
         *   3. 设置适当的权限
         *   4. 重启容器以应用更改
         */
        recording: {
            enabled: process.env.RECORDING_ENABLED === 'true',
            uploadToS3: process.env.RECORDING_UPLOAD_TO_S3 === 'true',
            endpoint: process.env.RECORDING_ENDPOINT || '',
            dir: 'rec',
            maxFileSize: 1 * 1024 * 1024 * 1024, // 1GB
        },

        /**
         * RTMP配置
         * =================
         * 配置实时消息协议（RTMP）以进行音频/视频/数据流传输。
         *
         * 核心设置
         * ------------
         * - enabled            : 启用/禁用RTMP流传输 (default: false)
         * - fromFile           : 启用本地文件流传输 (default: true)
         * - fromUrl            : 启用URL流媒体 (default: true)
         * - fromStream         : 启用直播输入 (default: true)
         * - maxStreams         : 最大同时流数 (default: 1)
         * - useNodeMediaServer : 使用NodeMediaServer代替nginx-rtmp (default: true)
         * - server             : RTMP服务器URL (default: 'rtmp://localhost:1935')
         * - appName            : 应用名称 (default: 'live')
         * - streamKey          : 可选身份验证密钥 (auto-generated UUID if empty)
         * - secret             : 必须匹配NodeMediaServer的config.js (default: 'mirotalkRtmpSecret')
         * - apiSecret          : WebRTC→RTMP API密钥 (default: 'mirotalkRtmpApiSecret')
         * - expirationHours    : 流媒体URL有效期（小时） (default: 4)
         * - dir                : 视频存储目录 (default: 'app/rtmp')
         * - ffmpegPath         : FFmpeg二进制文件路径 (auto-detected)
         * - platform           : 当前操作系统平台 (auto-detected)
         *
         * 服务器管理
         * ----------------
         * NodeMediaServer (mirotalk/nms:latest):
         *   - Start: npm run nms-start
         *   - Stop:  npm run nms-stop
         *   - Logs:  npm run nms-logs
         *
         * NGINX-RTMP (mirotalk/rtmp:latest):
         *   - Start: npm run rtmp-start
         *   - Stop:  npm run rtmp-stop
         *   - Logs:  npm run rtmp-logs
         *
         * 部署说明:
         * --------------------
         * 1. 对于NodeMediaServer:
         *    - 必填项：appName（默认为'live'），streamKey（自动生成）
         *    - URL格式: rtmp://host:port/appName/streamKey?sign=有效期-token
         *
         * 2. 默认行为:
         *    - 如果服务器URL为空，则使用localhost:1935
         *    - 如果没有提供streamKey，生成UUIDv4
         *    - 当 useNodeMediaServer=true 时，生成带有过期时间的签名URL
         *
         * 要求:
         * -------------
         * - RTMP 服务器必须运行
         * - 端口1935必须可访问
         * - FFmpeg 必须安装
         *
         * 文档:
         * --------------
         * - https://docs.mirotalk.com/mirotalk-sfu/rtmp/
         */
        rtmp: {
            enabled: process.env.RTMP_ENABLED === 'true',
            fromFile: process.env.RTMP_FROM_FILE !== 'false',
            fromUrl: process.env.RTMP_FROM_URL !== 'false',
            fromStream: process.env.RTMP_FROM_STREAM !== 'false',
            maxStreams: parseInt(process.env.RTMP_MAX_STREAMS) || 1,
            useNodeMediaServer: process.env.RTMP_USE_NODE_MEDIA_SERVER !== 'false',
            server: process.env.RTMP_SERVER || 'rtmp://localhost:1935',
            appName: process.env.RTMP_APP_NAME || 'live',
            streamKey: process.env.RTMP_STREAM_KEY || '',
            secret: process.env.RTMP_SECRET || 'mirotalkRtmpSecret',
            apiSecret: process.env.RTMP_API_SECRET || 'mirotalkRtmpApiSecret',
            expirationHours: parseInt(process.env.RTMP_EXPIRATION_HOURS) || 4,
            dir: 'rtmp',
            ffmpegPath: RTMP_FFMPEG_PATH,
            platform: PLATFORM,
        },
    },

    // ==============================================
    // 4. 安全 & 认证
    // ==============================================

    security: {
        /**
         * IP白名单
         * ------------------------
         * - enabled: 限制特定IP的访问
         * - allowedIPs: 允许的IP地址数组
         */
        middleware: {
            IpWhitelist: {
                enabled: process.env.IP_WHITELIST_ENABLED === 'true',
                allowedIPs: process.env.IP_WHITELIST_ALLOWED
                    ? process.env.IP_WHITELIST_ALLOWED.split(splitChar)
                          .map((ip) => ip.trim())
                          .filter((ip) => ip !== '')
                    : ['127.0.0.1', '::1'],
            },
        },

        /**
         * JWT 配置
         * ------------------------
         * - key: JWT签名的密钥
         * - exp: 令牌过期时间
         */
        jwt: {
            key: process.env.JWT_SECRET || 'mirotalksfu_jwt_secret',
            exp: process.env.JWT_EXPIRATION || '1h',
        },

        /**
         * OpenID Connect (OIDC) 认证配置
         * =================================================
         * 使用OpenID Connect (OIDC) 配置身份验证，允许与Auth0、Okta、Keycloak等身份提供商集成。
         *
         * 结构:
         * - enabled                                : OIDC认证的主开关
         * - baseURLDynamic                         : 是否动态解析基础URL
         *   allow_rooms_creation_for_auth_users    : 允许所有通过OIDC认证的用户创建自己的房间
         * - peer_name                              : 强制/请求哪些用户属性
         * - config                                 : 核心OIDC提供者设置
         *
         * 核心设置:
         * - issuerBaseURL      : 提供者发现端点（例如，https://your-tenant.auth0.com）
         * - baseURL            : 您的应用程序的基础URL
         * - clientID           : 由提供方颁发的客户端标识
         * - clientSecret       : 由提供方发布的客户端密钥
         * - secret             : 应用会话密钥
         * - authRequired       : 所有路由都需要认证吗？
         * - auth0Logout        : 是否使用提供者的注销端点
         * - authorizationParams: OAuth/OIDC 流程参数包括：
         *   - response_type    : OAuth 响应类型（授权码流程为 'code'）
         *   - scope            : 请求的声明（openid, profile, email）
         * - routes             : Endpoint路径配置为：
         *   - callback         : OAuth 回调处理路径
         *   - login            : 自定义登录路径（设为false以禁用）
         *   - logout           : 自定义注销路径
         *
         */
        oidc: {
            enabled: process.env.OIDC_ENABLED === 'true',
            baseURLDynamic: false, // Set true if your app has dynamic base URLs

            // ==================================================================================================
            allow_rooms_creation_for_auth_users: process.env.OIDC_ALLOW_ROOMS_CREATION_FOR_AUTH_USERS !== 'false',
            // ==================================================================================================

            // User identity requirements
            peer_name: {
                force: process.env.OIDC_USERNAME_FORCE !== 'false', // Forces the username to match the OIDC email or name. If true, the user won't be able to change their name when joining a room
                email: process.env.OIDC_USERNAME_AS_EMAIL !== 'false', // Uses the OIDC email as the username.
                name: process.env.OIDC_USERNAME_AS_NAME === 'true', // Uses the OIDC name as the username
            },

            // Provider configuration
            config: {
                // Required provider settings
                issuerBaseURL: process.env.OIDC_ISSUER || 'https://server.example.com',
                baseURL: process.env.OIDC_BASE_URL || `http://localhost:${process.env.PORT || 3010}`,
                clientID: process.env.OIDC_CLIENT_ID || 'clientID',
                clientSecret: process.env.OIDC_CLIENT_SECRET || 'clientSecret',

                // Session configuration
                secret: process.env.OIDC_SECRET || 'mirotalksfu-oidc-secret',
                authRequired: process.env.OIDC_AUTH_REQUIRED === 'true', // Whether all routes require authentication
                auth0Logout: process.env.OIDC_AUTH_LOGOUT !== 'false', // Use provider's logout endpoint

                // OAuth/OIDC flow parameters
                authorizationParams: {
                    response_type: 'code', // Use authorization code flow
                    scope: 'openid profile email', // Request standard claims
                },

                // Route customization
                routes: {
                    callback: '/auth/callback', // OAuth callback path
                    login: false, // Disable default login route
                    logout: '/logout', // Custom logout path
                },
            },
        },

        /**
         * 主机保护配置
         * ============================
         * 控制对主机级别功能和房间管理的访问。
         *
         * 认证方式：
         * ----------------------
         * - 本地用户（在配置中定义或通过 HOST_USERS 环境变量）
         * - API/数据库验证（users_from_db=true）
         *
         * 核心设置：
         * --------------
         * - protected      : 全局启用/禁用主机保护
         * - user_auth      : 主机访问需要用户认证
         * - users_from_db  : 从 API/数据库获取用户而不是本地配置
         *
         * API 集成：
         * ---------------
         * - users_api_secret_key    : API 认证的密钥
         * - users_api_endpoint      : 验证用户凭据的端点
         * - users_api_room_allowed  : 检查用户是否可以访问房间的端点
         * - users_api_rooms_allowed : 获取用户允许访问房间列表的端点
         * - api_room_exists         : 验证房间是否存在
         *
         * 本地用户配置：
         * ------------------------
         * - users: 授权用户的数组（当 users_from_db=false 时使用）
         *   - 通过 HOST_USERS 环境变量定义：
         *     HOST_USERS=username:password:displayname:room1,room2|username2:password2:displayname2:*
         *     （每个用户由 '|' 分隔，字段由 ':' 分隔，允许的房间用逗号分隔或 '*' 表示所有）
         *   - 如果未设置 HOST_USERS，则回退到 DEFAULT_USERNAME、DEFAULT_PASSWORD 等
         *   - 字段：
         *     - username      : 登录用户名
         *     - password      : 登录密码
         *     - displayname   : 用户显示名称
         *     - allowed_rooms : 用户可以访问的房间列表（'*' 表示所有）
         *
         * 演示者管理：
         * --------------------
         * - list        : 可以成为演示者的用户名数组
         * - join_first  : 第一个加入者成为演示者（默认：true）
         *
         * 文档：
         * -------------
         * https://docs.mirotalk.com/mirotalk-sfu/host-protection/
         */
        host: {
            protected: process.env.HOST_PROTECTED === 'true',
            user_auth: process.env.HOST_USER_AUTH === 'true',

            users_from_db: process.env.HOST_USERS_FROM_DB === 'true',
            users_api_secret_key: process.env.USERS_API_SECRET || 'mirotalkweb_default_secret',
            users_api_endpoint: process.env.USERS_API_ENDPOINT || 'http://localhost:9000/api/v1/user/isAuth', // 'https://webrtc.mirotalk.com/api/v1/user/isAuth'
            users_api_room_allowed:
                process.env.USERS_ROOM_ALLOWED_ENDPOINT || 'http://localhost:9000/api/v1/user/isRoomAllowed', // 'https://webrtc.mirotalk.com/api/v1/user/isRoomAllowed'
            users_api_rooms_allowed:
                process.env.USERS_ROOMS_ALLOWED_ENDPOINT || 'http://localhost:9000/api/v1/user/roomsAllowed', // 'https://webrtc.mirotalk.com/api/v1/user/roomsAllowed'
            api_room_exists: process.env.ROOM_EXISTS_ENDPOINT || 'http://localhost:9000/api/v1/room/exists', // 'https://webrtc.mirotalk.com//api/v1/room/exists'

            users: process.env.HOST_USERS
                ? process.env.HOST_USERS.split('|').map((userStr) => {
                      const [username, password, displayname, allowedRoomsStr] = userStr.split(':');
                      return {
                          username: username || '',
                          password: password || '',
                          displayname: displayname || '',
                          allowed_rooms: allowedRoomsStr
                              ? allowedRoomsStr
                                    .split(',')
                                    .map((room) => room.trim())
                                    .filter((room) => room !== '')
                              : ['*'],
                      };
                  })
                : [
                      {
                          username: 'username',
                          password: 'password',
                          displayname: 'username displayname',
                          allowed_rooms: ['*'],
                      },
                      {
                          username: 'username2',
                          password: 'password2',
                          displayname: 'username2 displayname',
                          allowed_rooms: ['room1', 'room2'],
                      },
                      {
                          username: 'username3',
                          password: 'password3',
                          displayname: 'username3 displayname',
                      },
                      //...
                  ],

            presenters: {
                list: process.env.PRESENTERS
                    ? process.env.PRESENTERS.split(splitChar)
                          .map((presenter) => presenter.trim())
                          .filter((presenter) => presenter !== '')
                    : ['Miroslav Pejic', 'miroslav.pejic.85@gmail.com'],
                join_first: process.env.PRESENTER_JOIN_FIRST !== 'false',
            },
        },
    },

    // ==============================================
    // 5. API 配置
    // ==============================================

    /**
     * API 安全与端点配置
     * ====================================
     * 控制对 SFU 的 API 端点和集成设置的访问。
     *
     * 安全设置：
     * -----------------
     * - keySecret : API 请求的认证密钥
     *               （在生产环境中始终覆盖默认值）
     *
     * 端点控制：
     * -----------------
     * - stats      : 启用/禁用系统统计端点 [true/false] （默认：true）
     * - meetings   : 启用/禁用会议列表端点 [true/false] （默认：true）
     * - meeting    : 启用/禁用单个会议操作 [true/false] （默认：true）
     * - join       : 启用/禁用会议加入端点 [true/false] （默认：true）
     * - token      : 启用/禁用令牌生成端点 [true/false] （默认：false）
     * - slack      : 启用/禁用 Slack 集成 [true/false] （默认：true）
     * - mattermost : 启用/禁用 Mattermost webhook 集成 [true/false] （默认：true）
     *
     * API 文档：
     * ------------------
     * - 完整的 API 参考：https://docs.mirotalk.com/mirotalk-sfu/api/
     * - Webhook 设置：请参阅 Slack/Mattermost 的集成指南
     */
    api: {
        keySecret: process.env.API_KEY_SECRET || 'mirotalksfu_default_secret',
        allowed: {
            stats: process.env.API_ALLOW_STATS !== 'false',
            meetings: process.env.API_ALLOW_MEETINGS === 'true',
            meeting: process.env.API_ALLOW_MEETING !== 'false',
            join: process.env.API_ALLOW_JOIN !== 'false',
            token: process.env.API_ALLOW_TOKEN === 'true',
            slack: process.env.API_ALLOW_SLACK !== 'false',
            mattermost: process.env.API_ALLOW_MATTERMOST !== 'false',
        },
    },

    // ==============================================
    // 6. 第三方集成
    // ==============================================

    integrations: {
        /**
         * ChatGPT 集成配置
         * ================================
         * OpenAI API 集成，用于 AI 驱动的聊天功能
         *
         * 设置说明：
         * ------------------
         * 1. 转到 https://platform.openai.com/
         * 2. 创建您的 OpenAI 账户
         * 3. 在 https://platform.openai.com/account/api-keys 生成您的 API 密钥
         *
         * 核心设置：
         * -------------
         * - enabled    : 启用/禁用 ChatGPT 集成 [true/false] （默认：false）
         * - basePath   : OpenAI API 端点 （默认：'https://api.openai.com/v1/'）
         * - apiKey     : OpenAI API 密钥（始终存储在 .env 中）
         * - model      : GPT 模型版本 （默认：'gpt-3.5-turbo'）
         *
         * 高级设置：
         * -----------------
         * - max_tokens: 最大响应长度 （默认：1024 个 token）
         * - temperature: 创造性控制（0=严格，1=创造性） （默认：0）
         *
         * 使用示例：
         * -------------
         * 1. 支持的模型：
         *    - gpt-3.5-turbo（推荐）
         *    - gpt-4
         *    - gpt-4-turbo
         *    - ...
         *
         * 2. 温度指南：
         *    - 0.0: 事实性响应
         *    - 0.7: 平衡
         *    - 1.0: 最大创造性
         */
        chatGPT: {
            enabled: process.env.CHATGPT_ENABLED === 'true',
            basePath: process.env.CHATGPT_BASE_PATH || 'https://api.openai.com/v1/',
            apiKey: process.env.CHATGPT_API_KEY || '',
            model: process.env.CHATGPT_MODEL || 'gpt-3.5-turbo',
            max_tokens: parseInt(process.env.CHATGPT_MAX_TOKENS) || 1024,
            temperature: parseInt(process.env.CHATGPT_TEMPERATURE) || 0.7,
        },

        /**
         * DeepDeek 集成配置
         * ================================
         * DeepDeek API 集成，用于 AI 驱动的聊天功能
         *
         * 设置说明：
         * ------------------
         * 1. 转到 https://deepseek.com/
         * 2. 创建您的 DeepDeek 账户
         * 3. 在 https://deepseek.com/account/api-keys 生成您的 API 密钥
         *
         * 核心设置：
         * -------------
         * - enabled    : 启用/禁用 DeepDeek 集成 [true/false] （默认：false）
         * - basePath   : DeepDeek API 端点 （默认：'https://api.deepseek.com/v1/'）
         * - apiKey     : DeepDeek API 密钥（始终存储在 .env 中）
         * - model      : DeepDeek 模型版本 （默认：'deepdeek-chat'）
         *
         * 高级设置：
         * -----------------
         * - max_tokens: 最大响应长度 （默认：1024 个 token）
         * - temperature: 创造性控制（0=严格，1=创造性） （默认：0）
         *
         * 使用示例：
         * -------------
         * 1. 支持的模型：
         *  - deepseek-chat（推荐）
         *  - deepseek-coder
         *  - deepseek-math
         *  - deepseek-llm
         *  - ...
         *
         * 2. 温度指南：
         *  - 0.0: 事实性响应
         *  - 0.7: 平衡
         *  - 1.0: 最大创造性
         *
         */
        deepSeek: {
            enabled: process.env.DEEP_SEEK_ENABLED === 'true',
            basePath: process.env.DEEP_SEEK_BASE_PATH || 'https://api.deepseek.com/v1/',
            apiKey: process.env.DEEP_SEEK_API_KEY || '',
            model: process.env.DEEP_SEEK_MODEL || 'deepseek-chat',
            max_tokens: parseInt(process.env.DEEP_SEEK_MAX_TOKENS) || 1024,
            temperature: parseInt(process.env.DEEP_SEEK_TEMPERATURE) || 0.7,
        },

        /**
         * HeyGen 视频 AI 配置
         * ============================
         * AI 驱动的头像流集成
         *
         * 设置说明：
         * ------------------
         * 1. 转到 https://app.heygen.com
         * 2. 创建您的 HeyGen 账户
         * 3. 在 https://app.heygen.com/settings?nav=API 生成您的 API 密钥
         *
         * 核心设置：
         * -------------
         * - enabled    : 启用/禁用视频 AI [true/false] （默认：false）
         * - basePath   : HeyGen API 端点 （默认：'https://api.heygen.com'）
         * - apiKey     : 来自 HeyGen 账户（始终存储在 .env 中）
         *
         * AI 行为：
         * -----------
         * - systemLimit: AI 头像的性格/行为指令
         *                （默认：MiroTalk SFU 的流头像指令）
         */
        videoAI: {
            enabled: process.env.VIDEOAI_ENABLED === 'true',
            basePath: 'https://api.heygen.com',
            apiKey: process.env.VIDEOAI_API_KEY || '',
            systemLimit: process.env.VIDEOAI_SYSTEM_LIMIT || 'You are a streaming avatar from MiroTalk SFU...',
        },

        /**
         * 邮件通知配置
         * ===============================
         * 系统警报和通知的 SMTP 设置
         *
         * 核心设置：
         * -------------
         * - alert      : 启用/禁用邮件警报 [true/false] （默认：false）
         * - notify     : 启用/禁用房间邮件通知 [true/false] （默认：false）
         * - host       : SMTP 服务器地址 （默认：'smtp.gmail.com'）
         * - port       : SMTP 端口 （默认：587 用于 TLS）
         * - username   : SMTP 认证用户名
         * - password   : SMTP 认证密码（仅存储在 .env 中）
         * - from       : 发送者邮箱地址 （默认：与用户名相同）
         * - sendTo     : 警报的收件人邮箱
         *
         * 常见提供商：
         * ----------------
         * Gmail:
         * - host: smtp.gmail.com
         * - port: 587
         *
         * Office365:
         * - host: smtp.office365.com
         * - port: 587
         *
         * SendGrid:
         * - host: smtp.sendgrid.net
         * - port: 587
         */
        email: {
            alert: process.env.EMAIL_ALERTS_ENABLED === 'true',
            notify: process.env.EMAIL_NOTIFICATIONS === 'true',
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            username: process.env.EMAIL_USERNAME || 'your_username',
            password: process.env.EMAIL_PASSWORD || 'your_password',
            from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
            sendTo: process.env.EMAIL_SEND_TO || 'sfu.mirotalk@gmail.com',
        },

        /**
         * Slack 集成配置
         * ==============================
         * Slack 斜杠命令和交互的设置
         *
         * 设置说明：
         * ------------------
         * 1. 在 https://api.slack.com/apps 创建一个 Slack 应用
         * 2. 在 "Basic Information" → "App Credentials" 中：
         *    - 复制签名密钥
         * 3. 启用 "Interactivity & Shortcuts" 和 "Slash Commands"
         * 4. 将请求 URL 设置为：https://your-domain.com/slack/commands
         *
         * 核心设置：
         * -------------
         * - enabled         : 启用/禁用 Slack 集成 [true/false] （默认：false）
         * - signingSecret   : 来自 Slack 应用凭证（仅存储在 .env 中）
         *
         */
        slack: {
            enabled: process.env.SLACK_ENABLED === 'true',
            signingSecret: process.env.SLACK_SIGNING_SECRET || '',
        },

        /**
         * Mattermost 集成配置
         * ===================================
         * Mattermost 斜杠命令和机器人集成的设置
         *
         * 设置说明：
         * ------------------
         * 1. 转到 Mattermost 系统控制台 → 集成 → 机器人账户
         * 2. 创建一个新的机器人账户并复制：
         *    - 服务器 URL（例如：'https://chat.yourdomain.com'）
         *    - 访问令牌
         * 3. 对于斜杠命令：
         *    - 导航到集成 → 斜杠命令
         *    - 设置命令：'/sfu'
         *    - 设置请求 URL：'https://your-sfu-server.com/mattermost/commands'
         *
         * 核心设置：
         * -------------
         * - enabled      : 启用/禁用集成 [true/false] （默认：false）
         * - serverUrl    : Mattermost 服务器 URL（包含协议）
         * - token        : 机器人账户访问令牌（最安全的选择）
         * - OR
         * - username     : 传统认证用户名（安全性较低）
         * - password     : 传统认证密码（已弃用）
         *
         * 命令配置：
         * ---------------------
         * - commands     : 斜杠命令定义：
         *   - name       : 命令触发器（例如：'/sfu'）
         *   - message    : 默认响应模板
         *
         */
        mattermost: {
            enabled: process.env.MATTERMOST_ENABLED === 'true',
            serverUrl: process.env.MATTERMOST_SERVER_URL || '',
            username: process.env.MATTERMOST_USERNAME || '',
            password: process.env.MATTERMOST_PASSWORD || '',
            token: process.env.MATTERMOST_TOKEN || '',
            commands: [
                {
                    name: process.env.MATTERMOST_COMMAND_NAME || '/sfu',
                    message: process.env.MATTERMOST_DEFAULT_MESSAGE || 'Here is your meeting room:',
                },
            ],
            texts: [
                {
                    name: process.env.MATTERMOST_COMMAND_NAME || '/sfu',
                    message: process.env.MATTERMOST_DEFAULT_MESSAGE || 'Here is your meeting room:',
                },
            ],
        },

        /**
         * Discord 集成配置
         * ================================
         * Discord 机器人和斜杠命令集成的设置
         *
         * 设置说明：
         * ------------------
         * 1. 在 https://discord.com/developers/applications 创建一个 Discord 应用程序
         * 2. 导航到 "Bot" 部分并：
         *    - 点击 "Add Bot"
         *    - 复制机器人令牌（DISCORD_TOKEN）
         * 3. 在 "OAuth2 → URL Generator" 中：
         *    - 选择 "bot" 和 "applications.commands" 作用域
         *    - 选择所需的权限（见下文）
         * 4. 使用生成的 URL 将机器人邀请到您的服务器
         *
         * 核心设置：
         * -------------
         * - enabled        : 启用/禁用 Discord 机器人 [true/false] （默认：false）
         * - token          : 来自 Discord 开发者门户的机器人令牌（存储在 .env 中）
         *
         * 命令配置：
         * ---------------------
         * - commands       : 斜杠命令定义：
         *   - name         : 命令触发器（例如：'/sfu'）
         *   - message      : 响应模板
         *   - baseUrl      : 会议房间基础 URL
         *
         */
        discord: {
            enabled: process.env.DISCORD_ENABLED === 'true',
            token: process.env.DISCORD_TOKEN || '',
            commands: [
                {
                    name: process.env.DISCORD_COMMAND_NAME || '/sfu',
                    message: process.env.DISCORD_DEFAULT_MESSAGE || 'Here is your SFU meeting room:',
                    baseUrl: process.env.DISCORD_BASE_URL || 'https://sfu.mirotalk.com/join/',
                },
            ],
        },

        /**
         * Ngrok 隧道配置
         * =========================
         * 用于本地开发和测试的安全隧道
         *
         * 设置说明：
         * ------------------
         * 1. 在 https://dashboard.ngrok.com/signup 注册
         * 2. 从以下位置获取您的认证令牌：
         *    https://dashboard.ngrok.com/get-started/your-authtoken
         * 3. 对于预留的域名/子域名：
         *    - 如需升级到付费计划
         *    - 在 https://dashboard.ngrok.com/cloud-edge/domains 预留
         *
         * 核心设置：
         * -------------
         * - enabled      : 启用/禁用 Ngrok 隧道 [true/false] （默认：false）
         * - authToken    : 您的 Ngrok 认证令牌（来自仪表板）
         */
        ngrok: {
            enabled: process.env.NGROK_ENABLED === 'true',
            authToken: process.env.NGROK_AUTH_TOKEN || '',
        },

        /**
         * Sentry 错误跟踪配置
         * ==================================
         * 实时错误监控和性能跟踪
         *
         * 设置说明：
         * ------------------
         * 1. 在 https://sentry.io/signup/ 创建一个项目
         * 2. 从以下位置获取您的 DSN：
         *    项目设置 → 客户端密钥 (DSN)
         * 3. 根据需要配置警报规则和集成
         *
         * 核心设置：
         * -------------
         * enabled              : 启用/禁用 Sentry [true/false] （默认：false）
         * logLevels            : 要捕获的日志级别数组 （默认：['error']）
         * DSN                  : 数据源名称（来自 Sentry 仪表板）
         * tracesSampleRate     : 要捕获的事务百分比（0.0-1.0）
         *
         * 性能调优：
         * ------------------
         * - 生产环境         : 0.1-0.2（10-20% 的事务）
         * - 预发布环境       : 0.5-1.0
         * - 开发环境         : 0.0（禁用性能跟踪）
         *
         */
        sentry: {
            enabled: process.env.SENTRY_ENABLED === 'true',
            logLevels: process.env.SENTRY_LOG_LEVELS
                ? process.env.SENTRY_LOG_LEVELS.split(splitChar).map((level) => level.trim())
                : ['error'],
            DSN: process.env.SENTRY_DSN || '',
            tracesSampleRate: Math.min(Math.max(parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0.5, 0), 1),
        },

        /**
         * Webhook 配置设置
         * =============================
         * 控制 webhook 通知系统，用于将事件数据发送到外部服务。
         *
         * 核心设置：
         * ---------------------
         * - enabled: 开启/关闭 webhook 通知
         * - url: webhook 负载将以 JSON 格式发送到的端点 URL
         *
         * 实施指南：
         * --------------------
         * - 如需完整的实施示例，请参考：
         *      - 项目演示：/mirotalksfu/webhook/ 文件夹
         */
        webhook: {
            enabled: process.env.WEBHOOK_ENABLED === 'true',
            url: process.env.WEBHOOK_URL || 'https://your-site.com/webhook-endpoint',
        },

        /**
         * IP 地理位置服务配置
         * ===================================
         * 启用基于 IP 地址的地理信息查找，使用 GeoJS.io API。
         *
         * 核心设置：
         * ---------------------
         * - enabled: 启用/禁用 IP 查找功能 [true/false] 默认 false
         *
         * 服务详情：
         * --------------
         * - 使用 GeoJS.io 免费 API 服务（https://www.geojs.io/）
         * - 返回包含以下信息的 JSON 数据：
         *   - 国家、地区、城市
         *   - 纬度/经度
         *   - 时区和组织
         * - 请求限制：60 次/分钟（免费层）
         */
        IPLookup: {
            enabled: process.env.IP_LOOKUP_ENABLED === 'true',
            getEndpoint(ip) {
                return `https://get.geojs.io/v1/ip/geo/${ip}.json`;
            },
        },

        /**
         * AWS S3 存储配置
         * ===========================
         * 启用使用亚马逊简单存储服务（S3）的云文件存储。
         *
         * 核心设置：
         * --------------
         * - enabled: 启用/禁用 AWS S3 集成 [true/false]
         *
         * 服务设置：
         * -------------
         * 1. 创建 S3 存储桶：
         *    - 登录 AWS 管理控制台
         *    - 导航到 S3 服务
         *    - 点击"创建存储桶"
         *    - 选择唯一名称（例如：'mirotalk'）
         *    - 选择区域（必须与配置中的 AWS_REGION 匹配）
         *    - 启用所需的设置（版本控制、日志记录等）
         *
         * 2. 获取安全凭证：
         *    - 创建具有程序访问权限的 IAM 用户
         *    - 附加 'AmazonS3FullAccess' 策略（或自定义最小策略）
         *    - 保存访问密钥 ID 和秘密访问密钥
         *
         * 3. 配置 CORS（用于直接上传）：
         *    [
         *      {
         *        "AllowedHeaders": ["*"],
         *        "AllowedMethods": ["PUT", "POST"],
         *        "AllowedOrigins": ["*"],
         *        "ExposeHeaders": []
         *      }
         *    ]
         *
         * 技术详情：
         * -----------------
         * - 默认区域：us-east-2（俄亥俄）
         * - 直接上传使用预签名 URL（默认在 1 小时后过期）
         * - 直接上传的推荐权限：
         *   - s3:PutObject
         *   - s3:GetObject
         *   - s3:DeleteObject
         */
        aws: {
            enabled: process.env.AWS_S3_ENABLED === 'true',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your-access-key-id',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your-secret-access-key',
            region: process.env.AWS_REGION || 'us-east-2',
            bucket: process.env.AWS_S3_BUCKET || 'mirotalk',
        },
    },

    // ==============================================
    // 7. UI/UX 自定义
    // ==============================================

    ui: {
        /**
         * 品牌与外观配置
         * -----------------------------------
         * 控制应用程序视觉标识、内容和元数据的所有方面。
         * 支持环境变量覆盖，用于部署特定的自定义。
         *
         * ==============================================
         * 需要许可证：
         * ==============================================
         * - https://codecanyon.net/item/mirotalk-sfu-webrtc-realtime-video-conferences/40769970
         */
        rooms: {
            /**
             * 房间显示设置
             * ---------------------
             * - showActive: 在 UI 中显示活跃房间（默认：false）
             *   https://sfu.mirotalk.com/activeRooms
             */
            showActive: process.env.SHOW_ACTIVE_ROOMS === 'true',
        },
        brand: {
            /**
             * 应用程序品牌
             * --------------------
             * 核心应用程序标识和用户界面文本元素。
             *
             * 注意：
             * 将 BRAND_HTML_INJECTION 设置为 'false' 以禁用 HTML 注入。
             * 这允许在 public/views 文件夹中使用静态品牌，而不进行动态内容注入。
             */
            htmlInjection: process.env.BRAND_HTML_INJECTION !== 'false',

            app: {
                language: process.env.UI_LANGUAGE || 'en',
                name: process.env.APP_NAME || 'MiroTalk SFU',
                title:
                    process.env.APP_TITLE ||
                    '<h1>MiroTalk SFU</h1> 基于浏览器的实时视频通话。<br >简单，安全，快速。',
                description:
                    process.env.APP_DESCRIPTION ||
                    '点击一下即可开始下一次视频通话。无需下载、插件或登录。',
                joinDescription: process.env.JOIN_DESCRIPTION || '挑一个房间名称。<br>就用这个吧？',
                joinButtonLabel: process.env.JOIN_BUTTON_LABEL || '加入房间',
                joinLastLabel: process.env.JOIN_LAST_LABEL || '您最近的房间:',
            },

            /**
             * 网站配置
             * --------------------
             * 包括图标和页面特定内容的全站设置。
             */
            site: {
                title: process.env.SITE_TITLE || 'MiroTalk SFU, 免费视频通话、消息发送和屏幕共享',
                icon: process.env.SITE_ICON_PATH || '../images/logo.svg',
                appleTouchIcon: process.env.APPLE_TOUCH_ICON_PATH || '../images/logo.svg',
                newRoomTitle: process.env.NEW_ROOM_TITLE || '选择名称。<br >共享网址。<br >开始会议。',
                newRoomDescription:
                    process.env.NEW_ROOM_DESC || '每个房间都有一个一次性URL。随便挑个名字分享即可。',
            },

            /**
             * SEO 元数据
             * ------------
             * 搜索引擎优化元素。
             */
            meta: {
                description:
                    process.env.META_DESCRIPTION ||
                    'MiroTalk SFU 由 WebRTC 和 mediasoup 提供支持，用于实时视频通信。',
                keywords: process.env.META_KEYWORDS || 'webrtc, 视频通话, 会议, 屏幕共享, mirotalk, sfu',
            },

            /**
             * OpenGraph/社交媒体
             * ---------------------
             * 丰富社交媒体分享的元数据。
             */
            og: {
                type: process.env.OG_TYPE || 'app-webrtc',
                siteName: process.env.OG_SITE_NAME || 'MiroTalk SFU',
                title: process.env.OG_TITLE || '点击链接进行通话。',
                description:
                    process.env.OG_DESCRIPTION || 'MiroTalk SFU 提供实时视频通话和屏幕共享。',
                image: process.env.OG_IMAGE_URL || 'https://sfu.mirotalk.com/images/mirotalksfu.png',
                url: process.env.OG_URL || 'https://sfu.mirotalk.com',
            },

            /**
             * UI 区块可见性
             * ---------------------
             * 切换各种页面区块的显示。
             * 通过环境变量设置为 'false' 来隐藏。
             */
            html: {
                topSponsors: process.env.SHOW_TOP_SPONSORS !== 'false',
                features: process.env.SHOW_FEATURES !== 'false',
                teams: process.env.SHOW_TEAMS !== 'false',
                tryEasier: process.env.SHOW_TRY_EASIER !== 'false',
                poweredBy: process.env.SHOW_POWERED_BY !== 'false',
                sponsors: process.env.SHOW_SPONSORS !== 'false',
                advertisers: process.env.SHOW_ADVERTISERS !== 'false',
                footer: process.env.SHOW_FOOTER !== 'false',
            },

            /**
             * 您是谁？区块
             * ---------------------
             * 在加入房间之前提示用户识别自己。
             * 可自定义的文本和按钮标签。
             */
            whoAreYou: {
                title: process.env.WHO_ARE_YOU_TITLE || '你是谁？',
                description:
                    process.env.WHO_ARE_YOU_DESCRIPTION ||
                    "如果您是主持人，请立即登录。<br >否则，请等待演讲者加入。",
                buttonLoginLabel: process.env.WHO_ARE_YOU_BUTTON_LOGIN_LABEL || '登录',
                buttonJoinLabel: process.env.WHO_ARE_YOU_JOIN_LABEL || '加入房间',
            },

            /**
             * 关于/致谢区块
             * ---------------------
             * 包含作者信息、版本和支持链接。
             * 支持 HTML 内容以实现灵活的格式化。
             */
            about: {
                imageUrl: process.env.ABOUT_IMAGE_URL || '../images/mirotalk-logo.gif',
                title: `WebRTC SFU v${packageJson.version}`,
                html: `
                    <button id="support-button" data-umami-event="Support button"
                        onclick="window.open('${process.env.SUPPORT_URL || 'https://codecanyon.net/user/miroslavpejic85'}', '_blank')">
                        <i class="fas fa-heart"></i> ${process.env.SUPPORT_TEXT || 'Support'}
                    </button>
                    <br />
                    <br />
                    ${process.env.AUTHOR_LABEL || 'Author'}: 
                    <a id="linkedin-button" data-umami-event="Linkedin button"
                        href="${process.env.LINKEDIN_URL || 'https://www.linkedin.com/in/miroslav-pejic-976a07101/'}" 
                        target="_blank">
                        ${process.env.AUTHOR_NAME || 'Miroslav Pejic'}
                    </a>
                    <br />
                    <br />
                    ${process.env.EMAIL_LABEL || 'Email'}: 
                    <a id="email-button" data-umami-event="Email button"
                        href="mailto:${process.env.CONTACT_EMAIL || 'miroslav.pejic.85@gmail.com'}?subject=${process.env.EMAIL_SUBJECT || 'MiroTalk SFU info'}">
                        ${process.env.CONTACT_EMAIL || 'miroslav.pejic.85@gmail.com'}
                    </a>
                    <hr />
                    <span>
                        &copy; ${new Date().getFullYear()} ${process.env.COPYRIGHT_TEXT || 'MiroTalk SFU, all rights reserved'}
                    </span>
                    <hr />
                    `,
            },

            /**
             * 小部件配置
             * --------------------
             * 控制支持小部件的外观和行为。
             * 支持通过环境变量进行动态配置。
             */
            widget: {
                enabled: process.env.WIDGET_ENABLED === 'true',
                roomId: process.env.WIDGET_ROOM_ID || 'support-room',
                theme: process.env.WIDGET_THEME || 'dark',
                widgetState: process.env.WIDGET_STATE || 'minimized',
                widgetType: process.env.WIDGET_TYPE || 'support',
                supportWidget: {
                    position: process.env.WIDGET_SUPPORT_POSITION || 'top-right',
                    expertImages: process.env.WIDGET_SUPPORT_EXPERT_IMAGES
                        ? process.env.WIDGET_SUPPORT_EXPERT_IMAGES.split(splitChar)
                              .map((url) => url.trim())
                              .filter(Boolean)
                        : [
                              'https://photo.cloudron.pocketsolution.net/uploads/original/95/7d/a5f7f7a2c89a5fee7affda5f013c.jpeg',
                          ],
                    buttons: {
                        audio: process.env.WIDGET_SUPPORT_BUTTON_AUDIO !== 'false',
                        video: process.env.WIDGET_SUPPORT_BUTTON_VIDEO !== 'false',
                        screen: process.env.WIDGET_SUPPORT_BUTTON_SCREEN !== 'false',
                        chat: process.env.WIDGET_SUPPORT_BUTTON_CHAT !== 'false',
                        join: process.env.WIDGET_SUPPORT_BUTTON_JOIN !== 'false',
                    },
                    checkOnlineStatus: process.env.WIDGET_SUPPORT_CHECK_ONLINE_STATUS === 'true',
                    isOnline: process.env.WIDGET_SUPPORT_IS_ONLINE !== 'false',
                    customMessages: {
                        heading: process.env.WIDGET_SUPPORT_HEADING || '需要帮助吗？',
                        subheading:
                            process.env.WIDGET_SUPPORT_SUBHEADING || '立即获得我们专家团队的支持！',
                        connectText: process.env.WIDGET_SUPPORT_CONNECT_TEXT || '连接在 < 5 秒钟内',
                        onlineText: process.env.WIDGET_SUPPORT_ONLINE_TEXT || '已在线',
                        offlineText: process.env.WIDGET_SUPPORT_OFFLINE_TEXT || '已离线',
                        poweredBy: process.env.WIDGET_SUPPORT_POWERED_BY || '由MiroTalk SFU提供支持',
                    },
                },
                alert: {
                    enabled: process.env.WIDGET_ALERT_ENABLED === 'true',
                    type: process.env.WIDGET_ALERT_TYPE || 'email',
                },
            },
            //...
        },

        /**
         * UI 按钮配置
         * ---------------------
         * 按组件/功能区域组织
         */
        buttons: {
            // 弹出配置
            popup: {
                shareRoomPopup: process.env.SHOW_SHARE_ROOM_POPUP !== 'false',
                shareRoomQrOnHover: process.env.SHOW_SHARE_ROOM_QR_ON_HOVER !== 'false',
            },
            // UI中可见的主要控制按钮
            main: {
                shareButton: process.env.SHOW_SHARE_BUTTON !== 'false',
                hideMeButton: process.env.SHOW_HIDE_ME !== 'false',
                fullScreenButton: process.env.SHOW_FULLSCREEN_BUTTON !== 'false',
                startAudioButton: process.env.SHOW_AUDIO_BUTTON !== 'false',
                startVideoButton: process.env.SHOW_VIDEO_BUTTON !== 'false',
                startScreenButton: process.env.SHOW_SCREEN_BUTTON !== 'false',
                swapCameraButton: process.env.SHOW_SWAP_CAMERA !== 'false',
                chatButton: process.env.SHOW_CHAT_BUTTON !== 'false',
                pollButton: process.env.SHOW_POLL_BUTTON !== 'false',
                editorButton: process.env.SHOW_EDITOR_BUTTON !== 'false',
                raiseHandButton: process.env.SHOW_RAISE_HAND !== 'false',
                transcriptionButton: process.env.SHOW_TRANSCRIPTION !== 'false',
                whiteboardButton: process.env.SHOW_WHITEBOARD !== 'false',
                documentPiPButton: process.env.SHOW_DOCUMENT_PIP !== 'false',
                snapshotRoomButton: process.env.SHOW_SNAPSHOT !== 'false',
                emojiRoomButton: process.env.SHOW_EMOJI !== 'false',
                settingsButton: process.env.SHOW_SETTINGS !== 'false',
                aboutButton: process.env.SHOW_ABOUT !== 'false',
                exitButton: process.env.SHOW_EXIT_BUTTON !== 'false',
                extraButton: process.env.SHOW_EXTRA_BUTTON !== 'false',
            },
            // 设置面板按钮和选项
            settings: {
                activeRooms: process.env.SHOW_ROOMS !== 'false',
                fileSharing: process.env.ENABLE_FILE_SHARING !== 'false',
                lockRoomButton: process.env.SHOW_LOCK_ROOM !== 'false',
                unlockRoomButton: process.env.SHOW_UNLOCK_ROOM !== 'false',
                broadcastingButton: process.env.SHOW_BROADCASTING !== 'false',
                lobbyButton: process.env.SHOW_LOBBY !== 'false',
                sendEmailInvitation: process.env.SHOW_EMAIL_INVITE !== 'false',
                micOptionsButton: process.env.SHOW_MIC_OPTIONS !== 'false',
                tabRTMPStreamingBtn: process.env.SHOW_RTMP_TAB !== 'false',
                tabNotificationsBtn: process.env.SHOW_NOTIFICATIONS_TAB !== 'false',
                tabModerator: process.env.SHOW_MODERATOR_TAB !== 'false',
                tabRecording: process.env.SHOW_RECORDING_TAB !== 'false',
                host_only_recording: process.env.HOST_ONLY_RECORDING !== 'false',
                pushToTalk: process.env.ENABLE_PUSH_TO_TALK !== 'false',
                keyboardShortcuts: process.env.SHOW_KEYBOARD_SHORTCUTS !== 'false',
                virtualBackground: process.env.SHOW_VIRTUAL_BACKGROUND !== 'false',
                customNoiseSuppression: process.env.CUSTOM_NOISE_SUPPRESSION_ENABLED !== 'false',
            },

            // 制作人（本地用户）的视频控件
            producerVideo: {
                videoPictureInPicture: process.env.ENABLE_PIP !== 'false',
                videoMirrorButton: process.env.SHOW_MIRROR_BUTTON !== 'false',
                fullScreenButton: process.env.SHOW_FULLSCREEN !== 'false',
                snapShotButton: process.env.SHOW_SNAPSHOT_BUTTON !== 'false',
                muteAudioButton: process.env.SHOW_MUTE_AUDIO !== 'false',
                videoPrivacyButton: process.env.SHOW_PRIVACY_TOGGLE !== 'false',
                audioVolumeInput: process.env.SHOW_VOLUME_CONTROL !== 'false',
            },

            // 消费者（远程用户）的视频控制
            consumerVideo: {
                videoPictureInPicture: process.env.ENABLE_PIP !== 'false',
                videoMirrorButton: process.env.SHOW_MIRROR_BUTTON !== 'false',
                fullScreenButton: process.env.SHOW_FULLSCREEN !== 'false',
                snapShotButton: process.env.SHOW_SNAPSHOT_BUTTON !== 'false',
                focusVideoButton: process.env.SHOW_FOCUS_BUTTON !== 'false',
                sendMessageButton: process.env.SHOW_SEND_MESSAGE !== 'false',
                sendFileButton: process.env.SHOW_SEND_FILE !== 'false',
                sendVideoButton: process.env.SHOW_SEND_VIDEO !== 'false',
                muteVideoButton: process.env.SHOW_MUTE_VIDEO !== 'false',
                muteAudioButton: process.env.SHOW_MUTE_AUDIO !== 'false',
                audioVolumeInput: process.env.SHOW_VOLUME_CONTROL !== 'false',
                geolocationButton: process.env.SHOW_GEO_LOCATION !== 'false',
                banButton: process.env.SHOW_BAN_BUTTON !== 'false',
                ejectButton: process.env.SHOW_EJECT_BUTTON !== 'false',
            },

            // 控制视频关闭时
            videoOff: {
                sendMessageButton: process.env.SHOW_SEND_MESSAGE !== 'false',
                sendFileButton: process.env.SHOW_SEND_FILE !== 'false',
                sendVideoButton: process.env.SHOW_SEND_VIDEO !== 'false',
                muteAudioButton: process.env.SHOW_MUTE_AUDIO !== 'false',
                audioVolumeInput: process.env.SHOW_VOLUME_CONTROL !== 'false',
                geolocationButton: process.env.SHOW_GEO_LOCATION !== 'false',
                banButton: process.env.SHOW_BAN_BUTTON !== 'false',
                ejectButton: process.env.SHOW_EJECT_BUTTON !== 'false',
            },

            // 聊天界面控件
            chat: {
                chatPinButton: process.env.SHOW_CHAT_PIN !== 'false',
                chatMaxButton: process.env.SHOW_CHAT_MAXIMIZE !== 'false',
                chatSaveButton: process.env.SHOW_CHAT_SAVE !== 'false',
                chatEmojiButton: process.env.SHOW_CHAT_EMOJI !== 'false',
                chatMarkdownButton: process.env.SHOW_CHAT_MARKDOWN !== 'false',
                chatSpeechStartButton: process.env.SHOW_CHAT_SPEECH !== 'false',
                chatGPT: process.env.ENABLE_CHAT_GPT !== 'false',
                deepSeek: process.env.ENABLE_DEEP_SEEK !== 'false',
            },

            // Poll界面控件
            poll: {
                pollPinButton: process.env.SHOW_POLL_PIN !== 'false',
                pollMaxButton: process.env.SHOW_POLL_MAXIMIZE !== 'false',
                pollSaveButton: process.env.SHOW_POLL_SAVE !== 'false',
            },

            // 参与者列表控制
            participantsList: {
                saveInfoButton: process.env.SHOW_SAVE_INFO !== 'false',
                sendFileAllButton: process.env.SHOW_SEND_FILE_ALL !== 'false',
                ejectAllButton: process.env.SHOW_EJECT_ALL !== 'false',
                sendFileButton: process.env.SHOW_SEND_FILE !== 'false',
                geoLocationButton: process.env.SHOW_GEO_LOCATION !== 'false',
                banButton: process.env.SHOW_BAN_BUTTON !== 'false',
                ejectButton: process.env.SHOW_EJECT_BUTTON !== 'false',
            },

            // 白板控制
            whiteboard: {
                whiteboardLockButton: process.env.SHOW_WB_LOCK !== 'false',
            },
        },
    },

    // ==============================================
    // 8. 特征标志
    // ==============================================

    features: {
        /**
         * 调查配置（QuestionPro）
         * =================================
         * 用户反馈和调查集成的设置
         *
         * 设置说明：
         * ------------------
         * 1. 在 https://www.questionpro.com 注册
         * 2. 创建调查：
         *    - 使用模板或自定义问题
         *    - 配置调查逻辑和分支
         * 3. 获取调查 URL：
         *    - 发布调查
         *    - 复制"收集响应"链接
         */
        survey: {
            enabled: process.env.SURVEY_ENABLED === 'true',
            url: process.env.SURVEY_URL || '',
        },

        /**
         * 通话后重定向
         * ---------------------
         * - enabled: 通话结束后重定向
         * - url: 重定向目标 URL
         */
        redirect: {
            enabled: process.env.REDIRECT_ENABLED === 'true',
            url: process.env.REDIRECT_URL || '',
        },

        /**
         * 使用统计配置（Umami）
         * =====================================
         * 隐私导向的分析跟踪，用于服务改进
         *
         * 设置说明：
         * ------------------
         * 1. 自托管 Umami 或使用云版本：
         *    - GitHub：https://github.com/umami-software/umami
         *    - 官方文档：https://umami.is/docs
         * 2. 在 Umami 仪表板中创建网站条目
         * 3. 获取跟踪脚本 URL 和网站 ID
         *
         * 隐私与安全：
         * ------------------
         * - 不使用 Cookie（符合 GDPR）
         * - 无持久用户跟踪
         * - 所有数据聚合和匿名化
         * - 自托管选项将数据保留在您的基础设施中
         *
         * 核心设置：
         * -------------
         * - enabled      : 启用/禁用分析 [true/false] （默认：true）
         * - src          : Umami 跟踪脚本 URL
         * - id           : 您从 Umami 获取的网站 ID
         */
        stats: {
            enabled: process.env.STATS_ENABLED !== 'false',
            src: process.env.STATS_SRC || 'https://stats.mirotalk.com/script.js',
            id: process.env.STATS_ID || '41d26670-f275-45bb-af82-3ce91fe57756',
        },
    },

    /**
     * 审核配置
     * =======================
     * 控制全局审核功能。
     *
     * 核心设置：
     * --------------
     * - room.maxParticipants: 每个房间允许的最大参与者数量。
     * - lobby: 启用/禁用大厅功能，用于预批准参与者。
     *   调整以限制房间大小和管理服务器负载。
     */
    moderation: {
        room: {
            maxParticipants: parseInt(process.env.ROOM_MAX_PARTICIPANTS) || 1000, // Maximum participants per room
            lobby: process.env.ROOM_LOBBY === 'true', // Enable lobby feature
        },
    },

    // ==============================================
    // 9. Mediasoup (WebRTC) 配置
    // ==============================================

    /**
     * Mediasoup 集成资源
     * ==============================
     * 支持 MiroTalk SFU 的核心 WebRTC 组件
     *
     * 必需的链接：
     * ---------------
     * - 🌐 网站     : https://mediasoup.org
     * - 💬 论坛       : https://mediasoup.discourse.group
     *
     * 📚 文档：
     * ----------------
     * - 客户端 API     : https://mediasoup.org/documentation/v3/mediasoup-client/api/
     * - 服务器 API     : https://mediasoup.org/documentation/v3/mediasoup/api/
     * - 协议      : https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/
     *
     * 🔧 关键组件：
     * -----------------
     * - Router         : 管理 RTP 流
     * - Transport      : 网络连接处理器
     * - Producer       : 媒体发送者
     * - Consumer       : 媒体接收者
     *
     * Mediasoup 配置
     * -----------------------
     * 此配置定义了 mediasoup 工作进程、路由器、
     * WebRTC 服务器和传输的设置。这些设置控制 SFU
     * （选择性转发单元）如何处理媒体处理和网络。
     */
    mediasoup: {
        /**
         * 工作进程配置
         * --------------------
         * 工作进程是处理媒体处理的独立进程。
         * 多个工作进程可以并行运行以实现负载均衡。
         */
        worker: {
            rtcMinPort: RTC_MIN_PORT, // Minimum UDP/TCP port for ICE, DTLS, RTP
            rtcMaxPort: RTC_MAX_PORT, // Maximum UDP/TCP port for ICE, DTLS, RTP

            // Disable Linux io_uring for certain operations (false = use if available)
            disableLiburing: false,

            // Logging level (error, warn, debug, etc.)
            logLevel: process.env.MEDIASOUP_LOG_LEVEL || 'error',

            // Detailed logging for specific components:
            logTags: [
                'info', // General information
                'ice', // ICE (Interactive Connectivity Establishment) events
                'dtls', // DTLS handshake and encryption
                'rtp', // RTP packet flow
                'srtp', // Secure RTP encryption
                'rtcp', // RTCP control protocol
                'rtx', // Retransmissions
                'bwe', // Bandwidth estimation
                'score', // Network score calculations
                'simulcast', // Simulcast layers
                'svc', // Scalable Video Coding
                'sctp', // SCTP data channels
            ],
        },
        numWorkers: NUM_WORKERS, // Number of mediasoup worker processes to create

        /**
         * 路由器配置
         * --------------------
         * 路由器管理媒体流并定义支持的编解码器。
         * 每个 mediasoup 工作进程可以托管多个路由器。
         */
        router: {
            // Enable audio level monitoring (for detecting who is speaking)
            audioLevelObserverEnabled: process.env.MEDIASOUP_ROUTER_AUDIO_LEVEL_OBSERVER_ENABLED !== 'false',

            // Disable active speaker detection (uses more CPU)
            activeSpeakerObserverEnabled: process.env.MEDIASOUP_ROUTER_ACTIVE_SPEAKER_OBSERVER_ENABLED === 'true',

            /**
             * 支持的媒体编解码器
             * ----------------------
             * 定义 SFU 可以接收和转发的编解码器。
             * 顺序很重要 - 在协商期间第一个是首选。
             */
            mediaCodecs: [
                // Opus audio codec (standard for WebRTC)
                {
                    kind: 'audio',
                    mimeType: 'audio/opus',
                    clockRate: 48000, // Standard sample rate for WebRTC
                    channels: 2, // Stereo audio
                },

                // VP8 video codec (widely supported, good for compatibility)
                {
                    kind: 'video',
                    mimeType: 'video/VP8',
                    clockRate: 90000, // Standard video clock rate
                    parameters: {
                        'x-google-start-bitrate': 1000, // Initial bitrate (kbps)
                    },
                },

                // VP9 video codec (better compression than VP8)
                // Profile 0: Most widely supported VP9 profile
                {
                    kind: 'video',
                    mimeType: 'video/VP9',
                    clockRate: 90000,
                    parameters: {
                        'profile-id': 0, // Baseline profile
                        'x-google-start-bitrate': 1000,
                    },
                },

                // VP9 Profile 2: Supports HDR and 10/12-bit color
                {
                    kind: 'video',
                    mimeType: 'video/VP9',
                    clockRate: 90000,
                    parameters: {
                        'profile-id': 2, // Advanced profile
                        'x-google-start-bitrate': 1000,
                    },
                },

                // H.264 Baseline profile (widest hardware support)
                {
                    kind: 'video',
                    mimeType: 'video/h264',
                    clockRate: 90000,
                    parameters: {
                        'packetization-mode': 1, // Required for WebRTC
                        'profile-level-id': '42e01f', // Baseline 3.1
                        'level-asymmetry-allowed': 1, // Allows different levels
                        'x-google-start-bitrate': 1000,
                    },
                },

                // H.264 Main profile (better compression than Baseline)
                {
                    kind: 'video',
                    mimeType: 'video/h264',
                    clockRate: 90000,
                    parameters: {
                        'packetization-mode': 1,
                        'profile-level-id': '4d0032', // Main 4.0
                        'level-asymmetry-allowed': 1,
                        'x-google-start-bitrate': 1000,
                    },
                },
            ],
        },

        /**
         * WebRTC 服务器配置
         * ---------------------------
         * WebRTC 服务器处理 ICE（连接建立）和 DTLS（加密）。
         * 如果使用普通的 WebRtcTransport 则可以禁用。
         *
         * 最佳使用场景：
         * - 在具有固定 IP 的受控环境中运行
         * - 需要最小化工作进程间的端口使用
         * - 在 Kubernetes 中使用 StatefulSets/DaemonSets
         *
         * Kubernetes 考虑因素：
         * - 需要稳定的网络身份（使用 StatefulSet）
         * - 需要带有 externalTrafficPolicy: Local 的 NodePort/LoadBalancer
         * - 端口范围必须仔细分配以避免冲突
         *
         * 可选配置：
         * - https://mediasoup.discourse.group/t/mediasoup-3-17-0-released/6805
         */
        webRtcServerActive: process.env.SFU_SERVER === 'true', // Enable if SFU_SERVER=true
        webRtcServerOptions: {
            // Network interfaces and ports for ICE candidates
            listenInfos: [
                /**
                 * UDP 配置
                 * 优先用于媒体传输（更低的延迟）
                 * Kubernetes 影响：
                 * - 如果共享主机网络，每个 Pod 需要唯一的端口
                 * - 在不使用 LoadBalancer 时考虑使用 hostPort
                 */
                {
                    protocol: 'udp',
                    ip: LISTEN_IP, // Local IP to bind to
                    announcedAddress: IPv4, // Public IP sent to clients
                    portRange: {
                        min: RTC_MIN_PORT,
                        max: RTC_MIN_PORT + NUM_WORKERS, // Port range per worker
                    },
                },
                /**
                 * TCP 配置
                 * 用于限制性网络的后备选项（更高的延迟）
                 * Kubernetes 影响：
                 * - 有助于处理阻止 UDP 的网络
                 * - 可能需要在 k8s 中定义单独的服务
                 */
                {
                    protocol: 'tcp',
                    ip: LISTEN_IP,
                    announcedAddress: IPv4,
                    portRange: {
                        min: RTC_MIN_PORT,
                        max: RTC_MIN_PORT + NUM_WORKERS,
                    },
                },
            ],
        },

        /**
         * WebRTC 传输配置
         * ------------------------------
         * 传输处理客户端和 SFU 之间的实际媒体流。
         * 这些设置影响带宽管理和网络行为。
         *
         * 优选使用场景：
         * - 在具有自动扩展的云环境中运行
         * - 需要动态端口分配
         * - Kubernetes Pod 是临时的
         *
         * Kubernetes 考虑因素：
         * - 需要广泛的端口范围暴露（50000-60000 是典型的）
         * - 与 ClusterIP 服务配合使用效果更好
         * - 对 Pod 重启更具弹性
         */
        webRtcTransport: {
            // Network interfaces for media transmission
            listenInfos: [
                /**
                 * UDP 传输设置
                 * Kubernetes 影响：
                 * - 需要 hostNetwork 或特权 Pod 来访问端口
                 * - 根据预期规模考虑端口范围大小
                 */
                {
                    protocol: 'udp',
                    ip: LISTEN_IP,
                    announcedAddress: IPv4,
                    portRange: {
                        min: RTC_MIN_PORT,
                        max: RTC_MAX_PORT, // Wider range than WebRtcServer
                    },
                },
                /**
                 * TCP 传输设置
                 * Kubernetes 影响：
                 * - 效率较低但兼容性更好
                 * - 可能需要不同的服务配置
                 */
                {
                    protocol: 'tcp',
                    ip: LISTEN_IP,
                    announcedAddress: IPv4,
                    portRange: {
                        min: RTC_MIN_PORT,
                        max: RTC_MAX_PORT,
                    },
                },
            ],

            iceConsentTimeout: 35, // Timeout for ICE consent (seconds)

            /**
             * 带宽控制设置
             * Kubernetes 影响：
             * - 这些值应根据节点资源进行调整
             * - 考虑网络插件开销（Calico、Cilium 等）
             */
            initialAvailableOutgoingBitrate: 2500000, // 2.5 Mbps initial bitrate
            minimumAvailableOutgoingBitrate: 1000000, // 1 Mbps minimum guaranteed
            maxIncomingBitrate: 3000000, // 3 Mbps max per producer

            /**
             * 数据通道设置
             * Kubernetes 影响：
             * - 影响每个传输的内存分配
             * - 更大的大小可能需要调整 Pod 资源
             */
            maxSctpMessageSize: 262144, // 256 KB max message size for data channels
        },
    },
};

// ==============================================
// 辅助函数
// ==============================================

/**
 * 获取 IPv4 地址
 * ----------------
 * - 如果设置了 ANNOUNCED_IP，则优先使用
 * - 回退到本地 IP 检测
 */
function getIPv4() {
    if (ANNOUNCED_IP) return ANNOUNCED_IP;

    switch (ENVIRONMENT) {
        case 'development':
            return IS_DOCKER ? '127.0.0.1' : getLocalIPv4();
        case 'production':
            return ANNOUNCED_IP;
        default:
            return getLocalIPv4();
    }
}

/**
 * 检测本地 IPv4 地址
 * -------------------------
 * - 处理不同的操作系统网络接口
 * - 过滤掉虚拟/容器接口
 */
function getLocalIPv4() {
    const ifaces = os.networkInterfaces();
    const platform = os.platform();

    const PRIORITY_CONFIG = {
        win32: [{ name: 'Ethernet' }, { name: 'Wi-Fi' }, { name: 'Local Area Connection' }],
        darwin: [{ name: 'en0' }, { name: 'en1' }],
        linux: [{ name: 'eth0' }, { name: 'wlan0' }],
    };

    const VIRTUAL_INTERFACES = {
        all: ['docker', 'veth', 'tun', 'lo'],
        win32: ['Virtual', 'vEthernet', 'Teredo', 'Bluetooth'],
        darwin: ['awdl', 'bridge', 'utun'],
        linux: ['virbr', 'kube', 'cni'],
    };

    const platformPriorities = PRIORITY_CONFIG[platform] || [];
    const virtualExcludes = [...VIRTUAL_INTERFACES.all, ...(VIRTUAL_INTERFACES[platform] || [])];

    // Check priority interfaces first
    for (const { name: ifName } of platformPriorities) {
        const matchingIfaces = platform === 'win32' ? Object.keys(ifaces).filter((k) => k.includes(ifName)) : [ifName];
        for (const interfaceName of matchingIfaces) {
            const addr = findValidAddress(ifaces[interfaceName]);
            if (addr) return addr;
        }
    }

    // Fallback to scanning all non-virtual interfaces
    const fallbackAddress = scanAllInterfaces(ifaces, virtualExcludes);
    if (fallbackAddress) return fallbackAddress;

    return '0.0.0.0';
}

/**
 * 扫描所有网络接口
 * ---------------------------
 * - 检查所有接口，排除虚拟接口
 */
function scanAllInterfaces(ifaces, excludes) {
    for (const [name, addresses] of Object.entries(ifaces)) {
        if (excludes.some((ex) => name.toLowerCase().includes(ex.toLowerCase()))) {
            continue;
        }
        const addr = findValidAddress(addresses);
        if (addr) return addr;
    }
    return null;
}

/**
 * 查找有效的网络地址
 * --------------------------
 * - 过滤掉内部和链路本地地址
 */
function findValidAddress(addresses) {
    return addresses?.find((addr) => addr.family === 'IPv4' && !addr.internal && !addr.address.startsWith('169.254.'))
        ?.address;
}

/**
 * 获取 FFmpeg 路径
 * ---------------
 * - 检查常见的安装位置
 * - 平台特定的路径
 */
function getFFmpegPath(platform) {
    const paths = {
        darwin: ['/usr/local/bin/ffmpeg', '/opt/homebrew/bin/ffmpeg'],
        linux: ['/usr/bin/ffmpeg', '/usr/local/bin/ffmpeg'],
        win32: ['C:\\ffmpeg\\bin\\ffmpeg.exe', 'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe'],
    };

    const platformPaths = paths[platform] || ['/usr/bin/ffmpeg'];

    for (const path of platformPaths) {
        try {
            fs.accessSync(path);
            return path;
        } catch (e) {
            continue;
        }
    }

    return platformPaths[0];
}
