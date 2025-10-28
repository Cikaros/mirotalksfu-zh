'use strict';

/**
 * MiroTalk SFU - 客户端组件
 *
 * @link    GitHub: https://github.com/miroslavpejic85/mirotalksfu
 * @link    官方实时演示: https://sfu.mirotalk.com
 * @license 用于开源使用: AGPLv3
 * @license 用于商业或封闭源代码，请联系我们 license.mirotalk@gmail.com 或直接通过CodeCanyon购买
 * @license CodeCanyon: https://codecanyon.net/item/mirotalk-sfu-webrtc-realtime-video-conferences/40769970
 * @author  Miroslav Pejic - miroslav.pejic.85@gmail.com
 * @version 1.9.90
 *
 */

const cfg = {
    useAvatarSvg: true,
};

const html = {
    newline: '\n', //'<br />',
    hideMeOn: 'fas fa-user-slash',
    hideMeOff: 'fas fa-user',
    audioOn: 'fas fa-microphone',
    audioOff: 'fas fa-microphone-slash',
    videoOn: 'fas fa-video',
    videoOff: 'fas fa-video-slash',
    userName: 'username',
    userHand: 'fas fa-hand-paper user-hand pulsate',
    pip: 'fas fa-images',
    fullScreen: 'fas fa-expand',
    fullScreenOn: 'fas fa-compress-alt',
    fullScreenOff: 'fas fa-expand-alt',
    snapshot: 'fas fa-camera-retro',
    sendFile: 'fas fa-upload',
    sendMsg: 'fas fa-paper-plane',
    sendVideo: 'fab fa-youtube',
    geolocation: 'fas fa-location-dot',
    ban: 'fas fa-ban',
    kickOut: 'fas fa-times',
    ghost: 'fas fa-ghost',
    undo: 'fas fa-undo',
    bg: 'fas fa-circle-half-stroke',
    pin: 'fas fa-map-pin',
    videoPrivacy: 'far fa-circle',
    expand: 'fas fa-bars dropdown-button',
    hideALL: 'fas fa-eye',
    mirror: 'fas fa-arrow-right-arrow-left',
    close: 'fas fa-times',
    stop: 'fas fa-circle-stop',
};

const icons = {
    room: '<i class="fas fa-home"></i>',
    chat: '<i class="fas fa-comments"></i>',
    user: '<i class="fas fa-user"></i>',
    transcript: '<i class="fas fa-closed-captioning"></i>',
    speech: '<i class="fas fa-volume-high"></i>',
    share: '<i class="fas fa-share-alt"></i>',
    ptt: '<i class="fa-solid fa-hand-pointer"></i>',
    lobby: '<i class="fas fa-shield-halved"></i>',
    lock: '<i class="fa-solid fa-lock"></i>',
    unlock: '<i class="fa-solid fa-lock-open"></i>',
    pitchBar: '<i class="fas fa-microphone-lines"></i>',
    mirror: '<i class="fas fa-arrow-right-arrow-left"></i>',
    sounds: '<i class="fas fa-music"></i>',
    fileSend: '<i class="fa-solid fa-file-export"></i>',
    fileReceive: '<i class="fa-solid fa-file-import"></i>',
    recording: '<i class="fas fa-record-vinyl"></i>',
    moderator: '<i class="fas fa-user-shield"></i>',
    broadcaster: '<i class="fa-solid fa-wifi"></i>',
    codecs: '<i class="fa-solid fa-film"></i>',
    theme: '<i class="fas fa-fill-drip"></i>',
    recSync: '<i class="fa-solid fa-cloud-arrow-up"></i>',
    refresh: '<i class="fas fa-rotate"></i>',
    editor: '<i class="fas fa-pen-to-square"></i>',
    up: '<i class="fas fa-chevron-up"></i>',
    down: '<i class="fas fa-chevron-down"></i>',
};

const image = {
    about: '../images/mirotalk-logo.gif',
    avatar: '../images/mirotalksfu-logo.png',
    audio: '../images/audio.gif',
    poster: '../images/loader.gif',
    rec: '../images/rec.png',
    recording: '../images/recording.png',
    delete: '../images/delete.png',
    locked: '../images/locked.png',
    mute: '../images/mute.png',
    hide: '../images/hide.png',
    stop: '../images/stop.png',
    unmute: '../images/unmute.png',
    unhide: '../images/unhide.png',
    start: '../images/start.png',
    users: '../images/participants.png',
    user: '../images/participant.png',
    username: '../images/user.png',
    videoShare: '../images/video-share.png',
    message: '../images/message.png',
    share: '../images/share.png',
    exit: '../images/exit.png',
    feedback: '../images/feedback.png',
    lobby: '../images/lobby.png',
    email: '../images/email.png',
    chatgpt: '../images/chatgpt.png',
    deepSeek: '../images/deepSeek.png',
    all: '../images/all.png',
    forbidden: '../images/forbidden.png',
    broadcasting: '../images/broadcasting.png',
    geolocation: '../images/geolocation.png',
    network: '../images/network.gif',
    rtmp: '../images/rtmp.png',
    save: '../images/save.png',
    transcription: '../images/transcription.png',
    back: '../images/back.png',
    blur: '../images/blur.png',
    blurLow: '../images/blur-low.png',
    blurHigh: '../images/blur-high.png',
    transparentBg: '../images/transparentBg.png',
    link: '../images/link.png',
    upload: '../images/upload.png',
    virtualBackground: {
        one: '../images/virtual-background/default/background-1.jpg',
        two: '../images/virtual-background/default/background-2.webp',
        three: '../images/virtual-background/default/background-3.jpg',
        four: '../images/virtual-background/default/background-4.jpg',
        five: '../images/virtual-background/default/background-5.jpg',
        six: '../images/virtual-background/default/background-6.jpg',
        seven: '../images/virtual-background/default/background-7.jpg',
        eight: '../images/virtual-background/default/background-8.jpg',
        nine: '../images/virtual-background/default/background-9.jpg',
        ten: '../images/virtual-background/default/background-10.jpg',
        eleven: '../images/virtual-background/default/background-11.gif',
    },
};

const mediaType = {
    audio: 'audioType',
    audioTab: 'audioTab',
    video: 'videoType',
    camera: 'cameraType',
    screen: 'screenType',
    speaker: 'speakerType',
};

const _EVENTS = {
    openRoom: 'openRoom',
    exitRoom: 'exitRoom',
    startRec: 'startRec',
    pauseRec: 'pauseRec',
    resumeRec: 'resumeRec',
    stopRec: 'stopRec',
    raiseHand: 'raiseHand',
    lowerHand: 'lowerHand',
    startVideo: 'startVideo',
    pauseVideo: 'pauseVideo',
    resumeVideo: 'resumeVideo',
    stopVideo: 'stopVideo',
    startAudio: 'startAudio',
    pauseAudio: 'pauseAudio',
    resumeAudio: 'resumeAudio',
    stopAudio: 'stopAudio',
    startScreen: 'startScreen',
    pauseScreen: 'pauseScreen',
    resumeScreen: 'resumeScreen',
    stopScreen: 'stopScreen',
    roomLock: 'roomLock',
    lobbyOn: 'lobbyOn',
    lobbyOff: 'lobbyOff',
    roomUnlock: 'roomUnlock',
    hostOnlyRecordingOn: 'hostOnlyRecordingOn',
    hostOnlyRecordingOff: 'hostOnlyRecordingOff',
    startRTMP: 'startRTMP',
    stopRTMP: 'stopRTMP',
    endRTMP: 'endRTMP',
    startRTMPfromURL: 'startRTMPfromURL',
    stopRTMPfromURL: 'stopRTMPfromURL',
    endRTMPfromURL: 'endRTMPfromURL',
};

// Enums
const enums = {
    recording: {
        started: 'Started conference recording',
        start: 'Start conference recording',
        stop: 'Stop conference recording',
    },
    //...
};

// HeyGen config
const VideoAI = {
    enabled: true,
    active: false,
    info: {},
    avatarId: null,
    avatarName: 'Monica',
    avatarVoice: null,
    quality: 'medium',
    virtualBackground: true,
    background: image.virtualBackground.one,
};

// Recording
let recordedBlobs = [];

class RoomClient {
    constructor(
        localAudioEl,
        remoteAudioEl,
        videoMediaContainer,
        videoPinMediaContainer,
        mediasoupClient,
        socket,
        room_id,
        peer_name,
        peer_uuid,
        peer_info,
        isAudioAllowed,
        isVideoAllowed,
        isScreenAllowed,
        joinRoomWithScreen,
        isSpeechSynthesisSupported,
        transcription,
        successCallback
    ) {
        this.room_id = room_id;
        this.peer_id = socket.id;
        this.peer_name = peer_name;
        this.peer_uuid = peer_uuid;
        this.peer_info = peer_info;
        this.peer_avatar = peer_info.peer_avatar;

        // Device type
        this.isDesktopDevice = peer_info.is_desktop_device;
        this.isMobileDevice = peer_info.is_mobile_device;
        this.isMobileSafari = this.isMobileDevice && peer_info.browser_name.toLowerCase().includes('safari');

        this.pendingSinkId = null; // store desired sink id until next user gesture

        this.localAudioEl = localAudioEl;
        this.remoteAudioEl = remoteAudioEl;
        this.videoMediaContainer = videoMediaContainer;
        this.videoPinMediaContainer = videoPinMediaContainer;
        this.mediasoupClient = mediasoupClient;

        // Handle Socket
        this.socket = socket;
        this.reconnectAlert = null;
        this.maxReconnectAttempts = 5;
        this.reconnectInterval = 3000;
        this.maxReconnectInterval = 15000;
        this.serverAwayShown = false;
        this.silentReconnect = false; // If true, no popup will be shown on reconnect

        // Handle ICE
        this.iceRestarting = false;
        this.iceProducerRestarting = false;
        this.iceConsumerRestarting = false;

        // RTMP selected file name
        this.selectedRtmpFilename = '';

        // Moderator
        this._moderator = {
            video_start_privacy: false,
            audio_start_muted: false,
            video_start_hidden: false,
            audio_cant_unmute: false,
            video_cant_unhide: false,
            screen_cant_share: false,
            chat_cant_privately: false,
            chat_cant_chatgpt: false,
            chat_cant_deep_seek: false,
            media_cant_sharing: false,
        };

        // Chat messages
        this.chatMessageLengthCheck = false;
        this.chatMessageLength = 4000; // chars
        this.chatMessageTimeLast = 0;
        this.chatMessageTimeBetween = 1000; // ms
        this.chatMessageNotifyDelay = 10000; // ms
        this.chatMessageSpamCount = 0;
        this.chatMessageSpamCountToBan = 10;
        this.chatPeerId = 'all';
        this.chatPeerName = 'all';
        this.chatPeerAvatar = '';

        // HeyGen Video AI
        this.videoAIContainer = null;
        this.videoAIElement = null;
        this.canvasAIElement = null;
        this.renderAIToken = null;
        this.peerConnection = null;

        this.dominantSpeaker = false;
        this.isAudioAllowed = isAudioAllowed;
        this.isVideoAllowed = isVideoAllowed;
        this.isScreenAllowed = isScreenAllowed;
        this.joinRoomWithScreen = joinRoomWithScreen;
        this.producerTransport = null;
        this.consumerTransport = null;
        this.device = null;

        this.isScreenShareSupported =
            navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia ? true : false;

        this.isMySettingsOpen = false;

        this._isConnected = false;
        this.isVideoBarDropDownOpen = false;
        this.isDocumentOnFullScreen = false;
        this.isVideoOnFullScreen = false;
        this.isVideoFullScreenSupported = this.isFullScreenSupported();
        this.isVideoPictureInPictureSupported = document.pictureInPictureEnabled;
        this.isZoomCenterMode = false;
        this.isChatOpen = false;
        this.isChatEmojiOpen = false;
        this.isPollOpen = false;
        this.isPollPinned = false;
        this.isEditorOpen = false;
        this.isEditorLocked = false;
        this.isEditorPinned = false;
        this.isSpeechSynthesisSupported = isSpeechSynthesisSupported;
        this.speechInMessages = false;
        this.showChatOnMessage = true;
        this.isChatBgTransparent = false;
        this.isVideoPinned = false;
        this.isChatPinned = false;
        this.isChatMaximized = false;
        this.isToggleUnreadMsg = false;
        this.isToggleRaiseHand = false;
        this.pinnedVideoPlayerId = null;
        this.camVideo = false;
        this.videoQualitySelectedIndex = 0;

        this.pollSelectedOptions = {};
        this.chatGPTContext = [];
        this.deepSeekContext = [];
        this.chatMessages = [];
        this.leftMsgAvatar = null;
        this.rightMsgAvatar = null;

        this.localVideoElement = null;
        this.localVideoStream = null;
        this.localAudioStream = null;
        this.localScreenStream = null;

        // Room Password
        this.RoomIsLocked = false;
        this.RoomPassword = false;
        this.RoomPasswordValid = false;

        // Room Lobby
        this.RoomIsLobby = false;
        this.RoomLobbyAccepted = false;
        this.lobbyPears = {};

        this.transcription = transcription;

        // RTMP Streamer
        this.rtmpFileStreamer = false;
        this.rtmpUrltSreamer = false;

        // File transfer settings
        this.fileToSend = null;
        this.fileReader = null;
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.incomingFileInfo = null;
        this.incomingFileData = null;
        this.sendInProgress = false;
        this.receiveInProgress = false;
        this.fileSharingInput = '*';
        this.chunkSize = 1024 * 16; // 16kb/s

        // Recording
        this._isRecording = false;
        this._recStartTs = null;
        this.mediaRecorder = null;
        this.audioRecorder = null;
        this.recScreenStream = null;
        this.recording = {
            recSyncServerRecording: false,
            recSyncServerToS3: false,
            recSyncServerEndpoint: '',
        };
        this.recSyncTime = 4000; // 4 sec
        this.recSyncChunkSize = 1000000; // 1MB

        // Encodings
        this.preferLocalCodecsOrder = false; // Prefer local codecs order
        this.forceVP8 = false; // Force VP8 codec for webcam and screen sharing
        this.forceVP9 = false; // Force VP9 codec for webcam and screen sharing
        this.forceH264 = false; // Force H264 codec for webcam and screen sharing
        this.forceAV1 = false; // Force AV1 codec for webcam and screen sharing
        this.enableWebcamLayers = true; // Enable simulcast or SVC for webcam
        this.enableSharingLayers = true; // Enable simulcast or SVC for screen sharing
        this.numSimulcastStreamsWebcam = 3; // Number of streams for simulcast in webcam
        this.numSimulcastStreamsSharing = 1; // Number of streams for simulcast in screen sharing
        this.webcamScalabilityMode = 'L3T3'; // Scalability Mode for webcam | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3_KEY' for VP9
        this.sharingScalabilityMode = 'L1T3'; // Scalability Mode for screen sharing | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3' for VP9

        this.myVideoEl = null;
        this.myAudioEl = null;
        this.showPeerInfo = false; // on peerName mouse hover show additional info

        // Noise Suppression
        this.RNNoiseProcessor = null;

        this.videoProducerId = null;
        this.screenProducerId = null;
        this.audioProducerId = null;
        this.audioConsumers = new Map();

        this.peers = new Map();
        this.consumers = new Map();
        this.producers = new Map();
        this.producerLabel = new Map();
        this.eventListeners = new Map();

        this.debug = false;
        this.debug ? window.localStorage.setItem('debug', 'mediasoup*') : window.localStorage.removeItem('debug');

        console.log('06 ----> Load MediaSoup Client v', mediasoupClient.version);
        console.log('06.1 ----> PEER_ID', this.peer_id);

        Object.keys(_EVENTS).forEach((evt) => {
            this.eventListeners.set(evt, []);
        });

        this.socket.request = function request(type, data = {}) {
            return new Promise((resolve, reject) => {
                socket.emit(type, data, (data) => {
                    if (data.error) {
                        reject(data.error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // ####################################################
        // CREATE ROOM AND JOIN
        // ####################################################

        this.createRoom(this.room_id).then(async () => {
            const data = {
                room_id: this.room_id,
                peer_info: this.peer_info,
            };
            await this.join(data);
            this.initSockets();
            this._isConnected = true;
            successCallback();
        });
    }

    // ####################################################
    // GET STARTED
    // ####################################################

    async createRoom(room_id) {
        await this.socket
            .request('createRoom', {
                room_id,
            })
            .catch((err) => {
                console.log('Create room:', err);
            });
    }

    async join(data) {
        this.socket
            .request('join', data)
            .then(async (room) => {
                console.log('##### JOIN ROOM #####', room);

                if (room?.maxParticipantsReached) {
                    console.warn('00-WARNING ----> Room is full, maximum participants reached!');
                    endRoomSession();
                    return popupHtmlMessage(
                        null,
                        image.forbidden,
                        '加入房间',
                        `房间已满，最大参与者${room?.maxParticipants ? ` (${room.maxParticipants})` : ''}人数已达！`,
                        'center',
                        '/',
                        false
                    );
                }

                if (room === 'invalid') {
                    console.warn('00-WARNING ----> Invalid Room name! Path traversal pattern detected!');
                    return this.roomInvalid();
                }

                if (room === 'notAllowed') {
                    console.warn(
                        '00-WARNING ----> Room is Unauthorized for current user, please provide a valid room name for this user'
                    );
                    return this.userRoomNotAllowed();
                }

                if (room === 'unauthorized') {
                    console.warn(
                        '00-WARNING ----> Room is Unauthorized for current user, please provide a valid username and password'
                    );
                    return this.userUnauthorized();
                }

                if (room === 'isLocked') {
                    this.RoomIsLocked = true;
                    this.event(_EVENTS.roomLock);
                    console.warn('00-WARNING ----> Room is Locked, Try to unlock by the password');
                    return this.unlockTheRoom();
                }

                if (room === 'isLobby') {
                    this.RoomIsLobby = true;
                    this.event(_EVENTS.lobbyOn);
                    console.warn('00-WARNING ----> Room Lobby Enabled, Wait to confirm my join');
                    return this.waitJoinConfirm();
                }

                if (room === 'isBanned') {
                    console.warn('00-WARNING ----> You are Banned from the Room!');
                    return this.isBanned();
                }

                // ##########################################
                this.peers = new Map(JSON.parse(room.peers));
                // ##########################################

                if (this.usernameExists(this.peers)) {
                    return this.userNameAlreadyInRoom();
                }

                await this.joinAllowed(room);
            })
            .catch((error) => {
                console.error('Join error:', error);
                //
                popupHtmlMessage(null, image.network, '加入房间', error, 'center', false, true);
            });
    }

    usernameExists(peers) {
        if (!peer_info.peer_token) {
            // hack...
            for (let peer of Array.from(peers.keys()).filter((id) => id !== this.peer_id)) {
                let peer_info = peers.get(peer).peer_info;
                if (peer_info.peer_name == this.peer_name) {
                    console.log('07.0-WARNING ----> Username already in use');
                    return true;
                }
            }
        }
        return false;
    }

    async joinAllowed(room) {
        console.log('07 ----> Join Room allowed');

        await this.handleRoomInfo(room);

        await this.loadDeviceAndInitTransports();

        // ###############################################
        this.socket.emit('getProducers'); // newProducers
        // ###############################################

        if (isBroadcastingEnabled) {
            isPresenter ? await this.startLocalMedia() : this.handleRoomBroadcasting();
        } else {
            await this.startLocalMedia();
        }
    }

    async loadDeviceAndInitTransports() {
        // Get Router Capabilities
        const routerRtpCapabilities = await this.socket.request('getRouterRtpCapabilities');
        routerRtpCapabilities.headerExtensions = routerRtpCapabilities.headerExtensions.filter(
            (ext) => ext.uri !== 'urn:3gpp:video-orientation'
        );

        // Load device
        this.device = await this.loadDevice(routerRtpCapabilities);
        console.log('07.3 ----> Get Router Rtp Capabilities codecs: ', this.device.rtpCapabilities.codecs);

        // Init Send/Receive Transports
        await this.initTransports(this.device);
    }

    async handleRoomInfo(room) {
        // ##########################################
        this.peers = new Map(JSON.parse(room.peers));
        // ##########################################

        console.log('07.0 ----> Room Survey', room.survey);
        survey = room.survey;

        console.log('07.0 ----> Room Leave Redirect', room.redirect);
        redirect = room.redirect;

        participantsCount = this.peers.size;

        // ME
        for (let peer of Array.from(this.peers.keys()).filter((id) => id == this.peer_id)) {
            let my_peer_info = this.peers.get(peer).peer_info;
            console.log('07.1 ----> My Peer info', my_peer_info);
            isPresenter = window.localStorage.isReconnected === 'true' ? isPresenter : my_peer_info.peer_presenter;
            this.peer_info.peer_presenter = isPresenter;
            this.getId('isUserPresenter').innerText = isPresenter;
            window.localStorage.isReconnected = false;

            // GLOBAL LOBBY ENABLED
            if (room?.globalLobby) {
                if (isPresenter) {
                    localStorageSettings.lobby = true;
                    lS.setSettings(localStorageSettings);
                    console.warn('7.1-WARNING ----> GLOBAL Room Lobby detected, save the config');
                }
                rc.roomAction('globalLobbyOn', true, false);
                console.warn('7.1-WARNING ----> GLOBAL Room Lobby detected');
            }

            handleRules(isPresenter);

            // ###################################################################################################
            isBroadcastingEnabled = isPresenter && !room.broadcasting ? isBroadcastingEnabled : room.broadcasting;
            console.log('07.1 ----> ROOM BROADCASTING', isBroadcastingEnabled);
            // ###################################################################################################

            if (BUTTONS.settings.tabRecording) {
                room.config.hostOnlyRecording
                    ? (console.log('07.1 ----> WARNING Room Host only recording enabled'),
                      this.event(_EVENTS.hostOnlyRecordingOn))
                    : this.event(_EVENTS.hostOnlyRecordingOff);
            }

            // ###################################################################################################
            if (room.recording) this.recording = room.recording;
            if (room.recording && room.recording.recSyncServerRecording) {
                console.log('07.1 WARNING ----> SERVER SYNC RECORDING ENABLED!');
                this.recording.recSyncServerRecording = localStorageSettings.rec_server;
                if (BUTTONS.settings.tabRecording && !room.config.hostOnlyRecording) {
                    show(roomRecordingServer);
                }
                switchServerRecording.checked = this.recording.recSyncServerRecording;
            }
            console.log('07.1 ----> SERVER SYNC RECORDING', this.recording);
            // ###################################################################################################

            // Handle Room moderator rules
            if (room.moderator && (!isRulesActive || !isPresenter)) {
                console.log('07.2 ----> ROOM MODERATOR', room.moderator);

                // Update `this._moderator` with properties from `room.moderator`, keeping existing ones.
                this._moderator = { ...this._moderator, ...room.moderator };

                if (this._moderator.video_start_privacy || localStorageSettings.moderator_video_start_privacy) {
                    this.peer_info.peer_video_privacy = true;
                    this.emitCmd({
                        type: 'privacy',
                        peer_id: this.peer_id,
                        active: true,
                        broadcast: true,
                    });
                    this.userLog('warning', '主持人在隐私模式下开启您的视频', 'top-end');
                }
                if (this._moderator.audio_start_muted && this._moderator.video_start_hidden) {
                    this.userLog('warning', '主持人已禁用您的音频和视频', 'top-end');
                } else {
                    if (this._moderator.audio_start_muted && !this._moderator.video_start_hidden) {
                        this.userLog('warning', '主持人已禁用您的音频', 'top-end');
                    }
                    if (!this._moderator.audio_start_muted && this._moderator.video_start_hidden) {
                        this.userLog('warning', '主持人已禁用您的视频', 'top-end');
                    }
                }
                //
                this._moderator.audio_cant_unmute ? hide(tabAudioDevicesBtn) : show(tabAudioDevicesBtn);
                this._moderator.video_cant_unhide ? hide(tabVideoDevicesBtn) : show(tabVideoDevicesBtn);
            }
            // Check if VideoAI is enabled
            if (!room.videoAIEnabled) {
                VideoAI.enabled = false;
                elemDisplay('tabVideoAIBtn', false);
            }
            // Check che RTMP config
            if (room.rtmp) {
                console.log('RTMP config', room.rtmp);
                const { enabled, fromFile, fromUrl, fromStream } = room.rtmp;
                elemDisplay('tabRTMPStreamingBtn', enabled);
                elemDisplay('rtmpFromFile', fromFile);
                elemDisplay('rtmpFromUrl', fromUrl);
                elemDisplay('rtmpFromStream', fromStream);
                if (!fromFile && !fromUrl && !fromStream) {
                    elemDisplay('tabRTMPStreamingBtn', false);
                }
            }
            // There is polls
            if (room.thereIsPolls) {
                this.socket.emit('updatePoll');
            }
            // Host protected enabled in the server side
            if (room.hostProtected) {
                RoomURL = window.location.origin + '/join/' + room_id;
            }

            // Share Media Data on Join
            if (
                room.shareMediaData &&
                Object.keys(room.shareMediaData).length !== 0 &&
                room.shareMediaData.action === 'open'
            ) {
                this.shareVideoAction(room.shareMediaData);
            }

            // Dominant Speaker
            this.dominantSpeaker = room.dominantSpeaker || false;
            if (!this.dominantSpeaker) {
                elemDisplay('dominantSpeakerFocusDiv', false);
            }

            // Open Chat on Join
            if (chat) {
                const chatButton = getId('chatButton');
                if (chatButton) {
                    chatButton.click();
                }
            }
        }

        // PARTICIPANTS
        for (let peer of Array.from(this.peers.keys()).filter((id) => id !== this.peer_id)) {
            let peer_info = this.peers.get(peer).peer_info;
            // console.log('07.1 ----> Remote Peer info', peer_info);
            const { peer_id, peer_name, peer_avatar, peer_presenter, peer_video, peer_recording, peer_lobby } =
                peer_info;

            if (peer_lobby) {
                this.lobbyAddPear({ peer_id, peer_avatar, peer_name });
                continue;
            }

            const canSetVideoOff = !isBroadcastingEnabled || (isBroadcastingEnabled && peer_presenter);

            if (!peer_video && canSetVideoOff) {
                console.log('Detected peer video off ' + peer_name);
                this.setVideoOff(peer_info, true);
            }

            if (peer_recording) {
                this.handleRecordingAction({
                    peer_id: peer_id,
                    peer_name: peer_name,
                    peer_avatar: peer_avatar,
                    action: enums.recording.started,
                });
            }
        }

        this.refreshParticipantsCount();

        console.log('07.2 Participants Count ---->', participantsCount);

        if (BUTTONS.popup.shareRoomPopup && notify && participantsCount == 1) {
            shareRoom();
        } else {
            if (this.isScreenAllowed) {
                this.shareScreen();
            }
            sound('joined');
        }
    }

    async loadDevice(routerRtpCapabilities) {
        if (!routerRtpCapabilities) {
            console.error('Router RTP Capabilities are required to load the device.');
            this.userLog('error', '缺少路由器RTP功能', 'center', 6000);
            return null;
        }

        let device;
        try {
            device = await this.mediasoupClient.Device.factory();
            // device = await this.mediasoupClient.Device.factory({ handlerName: 'Safari12' }); // for testing only
            console.log('Device created successfully:', device.handlerName);
        } catch (error) {
            if (error.name === 'UnsupportedError') {
                console.error('Browser not supported:', error);
                this.userLog('error', '浏览器不支持。请尝试使用其他浏览器。', 'center', 6000);
            } else {
                console.error('Error creating device:', error);
                this.userLog('error', `创建设备失败：${error.message}`, 'center', 6000);
            }
            return null;
        }

        try {
            await device.load({
                routerRtpCapabilities,
                preferLocalCodecsOrder: !!this.preferLocalCodecsOrder,
            });
            console.log(
                `Device loaded successfully with router RTP capabilities (preferLocalCodecsOrder: ${!!this.preferLocalCodecsOrder})`,
                device.rtpCapabilities
            );
        } catch (error) {
            console.error('Error loading device with router RTP capabilities:', error);
            this.userLog('error', `加载设备失败: ${error.message}`, 'center', 6000);
            return null;
        }

        return device;
    }

    // ####################################################
    // TRANSPORTS
    // ####################################################

    async initTransports(device) {
        await this.initProducerTransport(device);
        await this.initConsumerTransport(device);
    }

    // ####################################################
    // PRODUCER TRANSPORT
    // ####################################################

    async initProducerTransport(device) {
        const producerTransportData = await this.socket.request('createWebRtcTransport', {
            forceTcp: false,
            rtpCapabilities: device.rtpCapabilities,
        });

        if (producerTransportData.error) {
            console.error('Producer Transport creation failed', producerTransportData.error);
            return;
        }

        this.producerTransport = device.createSendTransport(producerTransportData);
        this.setupProducerTransportHandlers();
    }

    setupProducerTransportHandlers() {
        this.producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
                await this.socket.request('connectTransport', {
                    transport_id: this.producerTransport.id,
                    dtlsParameters,
                });
                callback();
            } catch (err) {
                console.error('Producer Transport connection error', err);
                errback(err);
            }
        });

        this.producerTransport.on('produce', async ({ kind, appData, rtpParameters }, callback, errback) => {
            try {
                const { producer_id } = await this.socket.request('produce', {
                    producerTransportId: this.producerTransport.id,
                    kind,
                    appData,
                    rtpParameters,
                });
                callback({ id: producer_id });
            } catch (err) {
                errback(err);
            }
        });

        this.producerTransport.on('connectionstatechange', async (state) => {
            console.log(`Producer Transport state changed to: ${state}`, { id: this.producerTransport.id });

            switch (state) {
                case 'connecting':
                    console.log('Producer Transport connecting...');
                    break;
                case 'connected':
                    console.log('✅ Producer Transport connected', { id: this.producerTransport.id });
                    break;
                case 'disconnected':
                    console.warn('⚠️ Producer Transport disconnected', { id: this.producerTransport.id });
                    console.warn('⚠️ Producer Attempting ICE restart...');
                    try {
                        await this.restartProducerIce();
                    } catch (error) {
                        console.error('❌ Producer ICE restart failed', error.message);
                    }
                    break;
                case 'failed':
                    console.warn('❌ Producer Transport failed', { id: this.producerTransport.id });
                    break;
                default:
                    console.log('Producer transport connection state changed', {
                        state,
                        id: this.producerTransport.id,
                    });
                    break;
            }
        });

        this.producerTransport.on('icegatheringstatechange', (state) => {
            console.warn('Producer ICE gathering change state', {
                state: state,
                id: this.producerTransport.id,
            });
        });

        this.producerTransport.on('icecandidateerror', (error) => {
            console.error('❌ Producer ICE candidate error', {
                error: error,
                id: this.producerTransport.id,
            });
        });
    }

    // ####################################################
    // CONSUMER TRANSPORT
    // ####################################################

    async initConsumerTransport(device) {
        const consumerTransportData = await this.socket.request('createWebRtcTransport', {
            forceTcp: false,
        });

        if (consumerTransportData.error) {
            console.error('Consumer Transport creation failed', consumerTransportData.error);
            return;
        }

        this.consumerTransport = device.createRecvTransport(consumerTransportData);
        this.setupConsumerTransportHandlers();
    }

    setupConsumerTransportHandlers() {
        this.consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
                await this.socket.request('connectTransport', {
                    transport_id: this.consumerTransport.id,
                    dtlsParameters,
                });
                callback();
            } catch (err) {
                console.error('Consumer Transport connection error', err);
                errback(err);
            }
        });

        this.consumerTransport.on('connectionstatechange', async (state) => {
            console.log(`Consumer Transport state changed to: ${state}`, { id: this.consumerTransport.id });

            switch (state) {
                case 'connecting':
                    console.log('Consumer Transport connecting...');
                    break;
                case 'connected':
                    console.log('✅ Consumer Transport connected', { id: this.consumerTransport.id });
                    break;
                case 'disconnected':
                    console.warn('⚠️ Consumer Transport disconnected', { id: this.consumerTransport.id });
                    console.warn('⚠️ Consumer Attempting ICE restart...');
                    try {
                        await this.restartConsumerIce();
                    } catch (error) {
                        console.error('❌ Consumer ICE restart failed', error.message);
                    }
                    break;
                case 'failed':
                    console.warn('❌ Consumer Transport failed', { id: this.consumerTransport.id });
                    break;
                default:
                    console.log('Consumer transport connection state changed', {
                        state,
                        id: this.consumerTransport.id,
                    });
                    break;
            }
        });

        this.consumerTransport.on('icegatheringstatechange', (state) => {
            console.warn('Consumer ICE gathering change state', {
                state: state,
                id: this.consumerTransport.id,
            });
        });

        this.consumerTransport.on('icecandidateerror', (error) => {
            console.error('❌ Consumer ICE candidate error', {
                error: error,
                id: this.consumerTransport.id,
            });
        });
    }

    // ####################################################
    // TODO: DATA TRANSPORT
    // ####################################################

    // ####################################################
    // HANDLE ICE
    // ####################################################

    async restartTransportIce(transport, type) {
        if (!transport || typeof transport !== 'object' || transport.closed) return false;

        try {
            console.warn(`🔄 ${type} Restarting ICE...`, {
                id: transport.id,
                state: transport.connectionState,
            });

            const iceParameters = await this.socket.request('restartIce', {
                transport_id: transport.id,
            });

            if (!iceParameters) {
                console.warn(`⚠️ No ${type} ICE Parameters received`);
                return false;
            }

            console.info(`🚀 ${type} Restarting transport ICE`, iceParameters);

            await transport.restartIce({ iceParameters });

            console.info(`✅ Successfully restarted ${type} ICE`);
            return true;
        } catch (error) {
            console.error(`🔥 ${type} Restart ICE error`, {
                id: transport?.id,
                error: error,
            });
            return false;
        }
    }

    async restartTransportWithRetry(transport, transportType, maxRetries = 5, initialDelay = 1000) {
        let delay = initialDelay;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const reconnected = await this.restartTransportIce(transport, transportType);

            if (reconnected) {
                console.info(`✅ ${transportType} reconnected successfully on attempt ${attempt}.`);
                return true;
            }

            if (attempt < maxRetries) {
                console.warn(`🌀 ${transportType} reconnection attempt ${attempt} failed. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff: 1s -> 2s -> 4s -> 8s -> 16s
            } else {
                console.error(`❌ ${transportType} failed to reconnect after ${maxRetries} attempts.`);
            }
        }

        console.error('❌ Failed to reconnect after multiple attempts.');
        transport.close();

        popupHtmlMessage(
            null,
            image.network,
            `${transportType} 传输`,
            '无法重新连接。请检查您的网络。',
            'center',
            false,
            true
        );

        return false;
    }

    async restartProducerIce(retries = 5, delay = 1000) {
        return this.restartTransportWithRetry(this.producerTransport, 'Producer', retries, delay);
    }

    async restartConsumerIce(retries = 5, delay = 1000) {
        return this.restartTransportWithRetry(this.consumerTransport, 'Consumer', retries, delay);
    }

    async restartIce() {
        if (this.iceRestarting) return;

        console.warn('Restart ICE...', {
            producerTransportConnectionState: this.producerTransport.connectionState,
            consumerTransportConnectionState: this.consumerTransport.connectionState,
        });

        try {
            this.iceRestarting = true;
            await this.restartProducerIce();
            await this.restartConsumerIce();
            console.log('✅ Restart ICE done');
        } catch (error) {
            console.error('❌ Restart ICE error', error);
        } finally {
            this.iceRestarting = false;
        }
    }

    // ####################################################
    // SOCKET ON
    // ####################################################

    initSockets() {
        this.socket.io.on('reconnect_attempt', this.handleSocketReconnectAttempt);
        this.socket.io.on('reconnect', this.handleSocketReconnect);
        this.socket.io.on('reconnect_failed', this.handleSocketReconnectFailed);
        this.socket.on('connect', this.handleSocketConnect);
        this.socket.on('connect_error', this.handleSocketConnectionError);
        this.socket.on('disconnect', this.handleSocketDisconnect);
        this.socket.on('consumerClosed', this.handleConsumerClosed);
        this.socket.on('setVideoOff', this.handleSetVideoOff);
        this.socket.on('removeMe', this.handleRemoveMe);
        this.socket.on('refreshParticipantsCount', this.handleRefreshParticipantsCount);
        this.socket.on('newProducers', this.handleNewProducers);
        this.socket.on('message', this.handleMessage);
        this.socket.on('roomAction', this.handleRoomAction);
        this.socket.on('roomPassword', this.handleRoomPassword);
        this.socket.on('roomLobby', this.handleRoomLobby);
        this.socket.on('cmd', this.handleCmdData);
        this.socket.on('peerAction', this.handlePeerAction);
        this.socket.on('updatePeerInfo', this.handleUpdatePeerInfo);
        this.socket.on('fileInfo', this.handleFileInfoData);
        this.socket.on('file', this.handleFileData);
        this.socket.on('shareVideoAction', this.handleShareVideoAction);
        this.socket.on('fileAbort', this.handleFileAbortData);
        this.socket.on('receiveFileAbort', this.handleReceiveFileAbortData);
        this.socket.on('wbCanvasToJson', this.handleWbCanvasToJson);
        this.socket.on('whiteboardAction', this.handleWhiteboardAction);
        this.socket.on('audioVolume', this.handleAudioVolumeData);
        this.socket.on('dominantSpeaker', this.handleDominantSpeakerData);
        this.socket.on('updateRoomModerator', this.handleUpdateRoomModeratorData);
        this.socket.on('updateRoomModeratorALL', this.handleUpdateRoomModeratorALLData);
        this.socket.on('recordingAction', this.handleRecordingActionData);
        this.socket.on('endRTMP', this.handleEndRTMP);
        this.socket.on('errorRTMP', this.handleErrorRTMP);
        this.socket.on('endRTMPfromURL', this.handleEndRTMPfromURL);
        this.socket.on('errorRTMPfromURL', this.handleErrorRTMPfromURL);
        this.socket.on('updatePolls', this.handleUpdatePolls);
        this.socket.on('editorChange', this.handleEditorChange);
        this.socket.on('editorActions', this.handleEditorActions);
        this.socket.on('editorUpdate', this.handleEditorUpdate);
    }

    // ####################################################
    // HANDLE SOCKET DATA
    // ####################################################

    handleSocketConnect = () => {
        console.log('SocketOn Connected to signaling server!');
    };

    handleSocketDisconnect = (reason) => {
        console.log(`SocketOn Disconnect Reason: ${reason}`);
        this.handleDisconnect(reason);
    };

    handleSocketConnectionError = (err) => {
        console.log(`SocketOn Disconnect Error: ${err.message}`);
    };

    handleSocketReconnectAttempt = (attempt) => {
        console.log(`SocketOn Reconnect Attempt: ${attempt}`);
        this.handleReconnectAttempt(attempt);
    };

    handleSocketReconnect = () => {
        console.log('SocketOn Reconnected to signaling server!');
        this.handleReconnect();
    };

    handleSocketReconnectFailed = () => {
        console.error('SocketOn Reconnect failed');
        this.handleReconnectFailed();
    };

    handleConsumerClosed = ({ consumer_id, consumer_kind }) => {
        console.log('SocketOn Closing consumer', { consumer_id, consumer_kind });
        this.removeConsumer(consumer_id, consumer_kind);
    };

    handleSetVideoOff = (data) => {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && data.peer_presenter)) {
            console.log('SocketOn setVideoOff', {
                peer_name: data.peer_name,
                peer_presenter: data.peer_presenter,
            });
            this.setVideoOff(data, true);
        }
    };

    handleRemoveMe = (data) => {
        console.log('SocketOn Remove me:', data);
        this.removeVideoOff(data.peer_id);
        this.lobbyRemoveMe(data.peer_id);
        participantsCount = data.peer_counts;
        if (!isBroadcastingEnabled) adaptAspectRatio(participantsCount);
        if (isParticipantsListOpen) getRoomParticipants();
        if (isBroadcastingEnabled && data.isPresenter) {
            this.userLog('info', `${icons.broadcaster} ${data.peer_name} 已断开`, 'top-end', 6000);
        }
    };

    handleRefreshParticipantsCount = (data) => {
        console.log('SocketOn Participants Count:', data);
        participantsCount = data.peer_counts;
        if (isBroadcastingEnabled) {
            if (isParticipantsListOpen) getRoomParticipants();
            wbUpdate();
            this.editorUpdate();
        } else {
            adaptAspectRatio(participantsCount);
        }
    };

    handleNewProducers = async (data) => {
        if (data.length > 0) {
            console.log('SocketOn New producers', {
                data,
                password: {
                    roomIsLocked: this.RoomIsLocked,
                    roomPasswordValid: this.RoomPasswordValid,
                },
                lobby: {
                    roomIsLobby: this.RoomIsLobby,
                    roomLobbyAccepted: this.RoomLobbyAccepted,
                },
            });

            if (this.RoomIsLocked && !this.RoomPasswordValid) {
                console.log('Access denied: Room is locked and password has not been validated yet', data);
                return;
            }

            if (this.RoomIsLobby && !this.RoomLobbyAccepted) {
                console.log('Access pending: Lobby mode is active, waiting for approval to join', data);
                return;
            }

            for (let { producer_id, peer_name, peer_info, type } of data) {
                await this.consume(producer_id, peer_name, peer_info, type);
            }
        }
    };

    handleMessage = (data) => {
        console.log('SocketOn New message:', data);
        this.showMessage(data);
    };

    handleRoomAction = (data) => {
        console.log('SocketOn Room action:', data);
        this.roomAction(data, false);
    };

    handleRoomPassword = (data) => {
        console.log('SocketOn Room password:', data.password);
        this.roomPassword(data);
    };

    handleRoomLobby = (data) => {
        console.log('SocketOn Room lobby:', data);
        this.roomLobby(data);
    };

    handleCmdData = (data) => {
        console.log('SocketOn Peer cmd:', data);
        this.handleCmd(data);
    };

    handlePeerAction = (data) => {
        console.log('SocketOn Peer action:', data);
        this.peerAction(data.from_peer_name, data.peer_id, data.action, false, data.broadcast, true, data.message);
    };

    handleUpdatePeerInfo = (data) => {
        console.log('SocketOn Peer info update:', data);
        this.updatePeerInfo(data.peer_name, data.peer_id, data.type, data.status, false, data.peer_presenter);
    };

    handleFileInfoData = (data) => {
        console.log('SocketOn File info:', data);
        this.handleFileInfo(data);
    };

    handleFileData = (data) => {
        this.handleFile(data);
    };

    handleShareVideoAction = (data) => {
        this.shareVideoAction(data);
    };

    handleFileAbortData = (data) => {
        this.handleFileAbort(data);
    };

    handleReceiveFileAbortData = (data) => {
        this.handleReceiveFileAbort(data);
    };

    handleWbCanvasToJson = (data) => {
        console.log('SocketOn Received whiteboard canvas JSON');
        JsonToWbCanvas(data);
    };

    handleWhiteboardAction = (data) => {
        console.log('Whiteboard action', data);
        whiteboardAction(data, false);
    };

    handleAudioVolumeData = (data) => {
        this.handleAudioVolume(data);
    };

    handleDominantSpeakerData = (data) => {
        this.handleDominantSpeaker(data);
    };

    handleUpdateRoomModeratorData = (data) => {
        console.log('SocketOn Update room moderator', data);
        this.handleUpdateRoomModerator(data);
    };

    handleUpdateRoomModeratorALLData = (data) => {
        console.log('SocketOn Update room moderator ALL', data);
        this.handleUpdateRoomModeratorALL(data);
    };

    handleRecordingActionData = (data) => {
        console.log('SocketOn Recording action:', data);
        this.handleRecordingAction(data);
    };

    handleEndRTMP = (data) => {
        this.endRTMP(data);
    };

    handleErrorRTMP = (data) => {
        this.errorRTMP(data);
    };

    handleEndRTMPfromURL = (data) => {
        this.endRTMPfromURL(data);
    };

    handleErrorRTMPfromURL = (data) => {
        this.errorRTMPfromURL(data);
    };

    handleUpdatePolls = (data) => {
        this.pollsUpdate(data);
    };

    handleEditorChange = (data) => {
        this.handleEditorData(data);
    };

    handleEditorActions = (data) => {
        this.handleEditorActionsData(data);
    };

    handleEditorUpdate = (data) => {
        this.handleEditorUpdateData(data);
    };

    // ####################################################
    // SOCKET RECONNECT/DISCONNECT
    // ####################################################

    showReconnectAlert(reason) {
        if (this.silentReconnect) return;
        this.reconnectAlert = Swal.fire({
            background: swalBackground,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: false,
            position: 'top',
            icon: 'warning',
            title: '连接丢失',
            text: `${reason}，正在尝试重新连接...`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });
    }

    showMaxAttemptsAlert() {
        if (this.silentReconnect) return;
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: true,
            background: swalBackground,
            position: 'top',
            icon: 'warning',
            title: '无法重新连接',
            text: '请检查您的互联网连接！',
            icon: 'error',
            confirmButtonText: '加入房间',
            confirmButtonColor: '#18392B',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                this.refreshBrowser();
            }
        });
    }

    showServerAwayMessage() {
        if (this.serverAwayShown) return;
        this.serverAwayShown = true;
        console.warn('Server away or in maintenance, please wait...');
        this.ServerAway();
        this.exit(true);
    }

    attemptReconnect(attempt) {
        if (this._isConnected || attempt >= this.maxReconnectAttempts) return;

        const delay = Math.min(this.reconnectInterval * attempt, this.maxReconnectInterval);

        this.updateReconnectAlert(delay);
    }

    handleDisconnect(reason) {
        endRoomSession();

        window.localStorage.isReconnected = true;
        console.log('Disconnected. Attempting to reconnect...');

        // Immediately save recording if active
        if (this.isRecording()) {
            this.saveRecording('套接字已断开');
        }

        this.serverAwayShown = false;
        this._isConnected = false;

        this.showReconnectAlert(reason);
    }

    handleReconnectAttempt(attempt) {
        attempt < this.maxReconnectAttempts ? this.attemptReconnect(attempt) : this.showServerAwayMessage();
    }

    handleReconnect() {
        this._isConnected = true;
        this.closeReconnectAlert();
        this.refreshBrowser();
    }

    handleReconnectFailed() {
        if (!this._isConnected) {
            this.closeReconnectAlert();
            this.showMaxAttemptsAlert();
        }
    }

    updateReconnectAlert(delay) {
        if (this.reconnectAlert) {
            this.reconnectAlert.update({
                title: '重新连接',
                text: `重新连接尝试将在 ${delay / 1000} 秒后进行...`,
            });
        }
    }

    closeReconnectAlert() {
        if (this.reconnectAlert) {
            this.reconnectAlert.close();
        }
    }

    // ####################################################
    // SERVER AWAY/MAINTENANCE
    // ####################################################

    ServerAway() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: false,
            background: swalBackground,
            position: 'top',
            icon: 'warning',
            title: '服务器离线',
            text: '服务器似乎已离线或正在维护中，请等待它重新上线。',
            denyButtonText: `离开房间`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (!result.isConfirmed) {
                this.event(_EVENTS.exitRoom);
            }
        });
    }

    removePeerInfoFromLocalStorage() {
        try {
            localStorage.removeItem('sfu_peer_info');
        } catch (e) {
            console.warn('Unable to remove sfu_peer_info from localStorage:', e);
        }
    }

    updatePeerInfoInLocalStorage() {
        try {
            localStorage.setItem('sfu_peer_info', JSON.stringify(this.peer_info));
        } catch (e) {
            console.warn('Unable to save peer_info to localStorage:', e);
        }
    }

    getPeerInfoFromLocalStorage() {
        try {
            const sfu_peer_info = localStorage.getItem('sfu_peer_info');
            return sfu_peer_info ? JSON.parse(sfu_peer_info) : null;
        } catch (e) {
            console.warn('Unable to get sfu_peer_info from localStorage:', e);
            return null;
        }
    }

    refreshBrowser() {
        endRoomSession();
        this.updatePeerInfoInLocalStorage();
        const reconnectDirectJoinURL = this.getReconnectDirectJoinURL();
        setTimeout(() => {
            this.exit(true);
            openURL(reconnectDirectJoinURL);
            this.removePeerInfoFromLocalStorage();
        }, 100);
    }

    getReconnectDirectJoinURL() {
        const sfu_peer_info = this.getPeerInfoFromLocalStorage();
        const { peer_presenter, peer_audio, peer_video, peer_screen, peer_token } = sfu_peer_info
            ? sfu_peer_info
            : this.peer_info;
        const baseUrl = `${window.location.origin}/join`;
        const queryParams = {
            room: this.room_id,
            roomPassword: this.RoomPassword,
            name: this.peer_name,
            audio: peer_audio,
            video: peer_video,
            screen: peer_screen,
            notify: 0,
            isPresenter: peer_presenter || isPresenter,
        };
        if (peer_token) queryParams.token = peer_token;
        const url = `${baseUrl}?${Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;
        return url;
    }

    // ####################################################
    // CHECK USER
    // ####################################################

    userNameAlreadyInRoom() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.user,
            position: 'center',
            title: '用户名',
            html: `用户名已被使用。<br/> 请尝试使用另一个。`,
            showDenyButton: false,
            confirmButtonText: `确定`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                endRoomSession();
                openURL((window.location.href = '/join/' + this.room_id));
            }
        });
    }

    // ####################################################
    // HANDLE ROOM BROADCASTING
    // ####################################################

    handleRoomBroadcasting() {
        console.log('07.4 ----> Room Broadcasting is currently active, and you are not the designated presenter');

        this.peer_info.peer_audio = false;
        this.peer_info.peer_video = false;
        this.peer_info.peer_screen = false;

        const mediaTypes = ['audio', 'video', 'screen'];

        mediaTypes.forEach((type) => {
            const data = {
                room_id: this.room_id,
                peer_name: this.peer_name,
                peer_id: this.peer_id,
                peer_presenter: isPresenter,
                type: type,
                status: false,
                broadcast: true,
            };
            this.socket.emit('updatePeerInfo', data);
        });

        handleRulesBroadcasting();
    }

    toggleRoomBroadcasting() {
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.broadcasting,
            title: '房间广播已启用',
            text: '您是否希望继续房间广播？',
            showDenyButton: true,
            confirmButtonColor: '#18392B',
            confirmButtonText: `是`,
            denyButtonText: `否`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isDenied) {
                switchBroadcasting.click();
            }
        });
    }

    // ####################################################
    // START LOCAL AUDIO VIDEO MEDIA
    // ####################################################

    async startLocalMedia() {
        console.log('08 ----> START LOCAL MEDIA...');
        const audioProducerExist = this.producerExist(mediaType.audio);
        if (this.isAudioAllowed) {
            if (!audioProducerExist) {
                await this.produce(mediaType.audio, microphoneSelect.value);
                console.log('09 ----> START AUDIO MEDIA');
            }
            if (this._moderator.audio_start_muted) {
                await this.sleep(300);
                await this.pauseAudioProducer();
            }
        } else {
            if (isEnumerateAudioDevices && !audioProducerExist) {
                await this.produce(mediaType.audio, microphoneSelect.value);
                console.log('09 ----> START AUDIO MEDIA');
                await this.sleep(300);
                await this.pauseAudioProducer();
            }
        }

        if (this.isVideoAllowed && !this._moderator.video_start_hidden) {
            await this.produce(mediaType.video, videoSelect.value);
            console.log('10 ----> START VIDEO MEDIA');
        } else {
            setColor(startVideoButton, 'red');
            this.setVideoOff(this.peer_info, false);
            this.sendVideoOff();
            if (BUTTONS.main.startVideoButton) this.event(_EVENTS.stopVideo);
            this.updatePeerInfo(this.peer_name, this.peer_id, 'video', false);
            console.log('10 ----> VIDEO IS OFF');
        }

        if (this.joinRoomWithScreen && !this._moderator.screen_cant_share) {
            await this.produce(mediaType.screen, null, false, true);
            console.log('11 ----> START SCREEN MEDIA');
        }

        console.log('[startLocalMedia] - PRODUCER LABEL', this.producerLabel);
    }

    async pauseAudioProducer() {
        setColor(startAudioButton, 'red');
        this.setIsAudio(this.peer_id, false);
        if (BUTTONS.main.startAudioButton) this.event(_EVENTS.stopAudio);
        await this.pauseProducer(mediaType.audio);
        console.log('09 ----> PAUSE AUDIO MEDIA');
        this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', false);
    }

    // ####################################################
    // PRODUCER
    // ####################################################

    async produce(type, deviceId = null, swapCamera = false, init = false) {
        let mediaConstraints = {};
        let elem;
        let stream;
        let audio = false;
        let video = false;
        let screen = false;

        switch (type) {
            case mediaType.audio:
                this.isAudioAllowed = true;
                mediaConstraints = this.getAudioConstraints(deviceId);
                this.peer_info.peer_audio = true;
                audio = true;
                break;
            case mediaType.video:
                this.isVideoAllowed = true;
                mediaConstraints = swapCamera ? this.getCameraConstraints() : this.getVideoConstraints(deviceId);
                this.peer_info.peer_video = true;
                video = true;
                break;
            case mediaType.screen:
                mediaConstraints = this.getScreenConstraints();
                this.peer_info.peer_screen = true;
                screen = true;
                break;
            default:
                return;
        }

        if (!this.device.canProduce('video') && !audio) {
            return console.error('Cannot produce video');
        }

        if (this.producerLabel.has(type)) {
            return console.warn('Producer already exists for this type ' + type);
        }

        const videoPrivacyBtn = this.getId(this.peer_id + '__vp');
        if (videoPrivacyBtn) videoPrivacyBtn.style.display = screen ? 'none' : 'inline';

        console.log(`Media constraints ${type}:`, mediaConstraints);

        try {
            if (init) {
                stream = initStream;
            } else {
                stream = screen
                    ? await navigator.mediaDevices.getDisplayMedia(mediaConstraints)
                    : await navigator.mediaDevices.getUserMedia(mediaConstraints);

                // Handle Virtual Background and Blur using MediaPipe
                if (video && isMediaStreamTrackAndTransformerSupported) {
                    const videoTrack = stream.getVideoTracks()[0];

                    if (virtualBackgroundBlurLevel) {
                        // Apply blur before sending it to WebRTC stream
                        stream = await virtualBackground.applyBlurToWebRTCStream(
                            videoTrack,
                            virtualBackgroundBlurLevel
                        );
                    } else if (virtualBackgroundSelectedImage) {
                        // Apply virtual background to WebRTC stream
                        stream = await virtualBackground.applyVirtualBackgroundToWebRTCStream(
                            videoTrack,
                            virtualBackgroundSelectedImage
                        );
                    } else if (virtualBackgroundTransparent) {
                        // Apply Transparent virtual background to WebRTC stream
                        stream = await virtualBackground.applyTransparentVirtualBackgroundToWebRTCStream(videoTrack);
                    }
                }
            }

            if (audio && BUTTONS.settings.customNoiseSuppression) {
                /*
                 * Initialize RNNoise Suppression if enabled and supported
                 * This will only apply to audio tracks
                 * and will not affect video tracks.
                 */
                this.initRNNoiseSuppression();
                stream = await this.getRNNoiseSuppressionStream(stream);
            }

            console.log('Supported Constraints', navigator.mediaDevices.getSupportedConstraints());

            const track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

            if (screen) {
                /*
                 * track.contentHint helps optimize media tracks for specific use cases:
                 * - 'motion': For high frame rate (video playback, game streaming)
                 * - 'detail': For high fidelity (screen sharing with text/graphics)
                 */
                if ('contentHint' in track) {
                    show(ScreenOptimizationDiv);

                    const contentHint = screenOptimization.value;
                    if (contentHint !== 'None') {
                        track.contentHint = contentHint;
                        console.info(`Optimized video track for screen sharing: ${contentHint}`);
                    }
                } else {
                    hide(ScreenOptimizationDiv);
                    console.warn('contentHint is not supported in this browser');
                }
            }

            console.log(`${type} settings ->`, track.getSettings());

            const params = {
                track,
                headerExtensionOptions: {
                    absCaptureTime: true,
                },
                appData: {
                    mediaType: type,
                },
            };

            if (audio) {
                console.log('AUDIO ENABLE OPUS');
                params.codecOptions = {
                    opusStereo: true,
                    opusDtx: true,
                    opusFec: true,
                    opusNack: true,
                };
            }

            if (video) {
                const { encodings, codec } = this.getWebCamEncoding();
                console.log('GET WEBCAM ENCODING', {
                    encodings: encodings,
                    codecs: codec,
                });
                params.encodings = encodings;
                params.codecs = codec;
                params.codecOptions = {
                    videoGoogleStartBitrate: 1000,
                };
            }

            if (screen) {
                const { encodings, codec } = this.getScreenEncoding();
                console.log('GET SCREEN ENCODING', {
                    encodings: encodings,
                    codecs: codec,
                });
                params.encodings = encodings;
                params.codecs = codec;
                params.codecOptions = {
                    videoGoogleStartBitrate: 1000,
                };
            }

            console.log('PRODUCER TYPE AND PARAMS', {
                type: type,
                params: params,
            });

            const producer = await this.producerTransport.produce(params);

            if (!producer) {
                throw new Error('Producer not found!');
            }

            console.log('PRODUCER MEDIA TYPE ----> ' + type);
            console.log('PRODUCER', producer);

            this.producers.set(producer.id, producer);
            this.producerLabel.set(type, producer.id);

            // if screen sharing produce the tab audio + microphone
            if (screen && stream.getAudioTracks()[0]) {
                await this.produceScreenAudio(stream);
            }

            if (!audio) {
                this.localVideoStream = stream;

                elem = await this.handleProducer(producer.id, type, stream);

                if (video) {
                    this.localVideoElement = elem;
                    this.videoProducerId = producer.id;
                    camera = detectCameraFacingMode(stream);
                    handleCameraMirror(elem);
                }

                if (screen) {
                    this.screenProducerId = producer.id;
                    if (elem.classList.contains('mirror')) {
                        elem.classList.remove('mirror');
                    }
                }
            } else {
                this.localAudioStream = stream;

                elem = await this.handleProducer(producer.id, type, stream);

                this.audioProducerId = producer.id;

                getMicrophoneVolumeIndicator(stream);
            }

            if (video) {
                this.handleHideMe();
            }

            producer.on('trackended', () => {
                this.closeProducer(type, 'trackended');
            });

            producer.on('transportclose', () => {
                this.closeProducer(type, 'transportclose');
            });

            producer.on('close', () => {
                this.closeProducer(type, 'close');
            });

            switch (type) {
                case mediaType.audio:
                    this.setIsAudio(this.peer_id, true);
                    this.event(_EVENTS.startAudio);
                    break;
                case mediaType.video:
                    this.setIsVideo(true);
                    this.event(_EVENTS.startVideo);
                    break;
                case mediaType.screen:
                    this.setIsScreen(true);
                    this.event(_EVENTS.startScreen);
                    break;
                default:
                    break;
            }

            this.sound('joined');
            return producer;
        } catch (err) {
            console.error('Produce error:', err);
            handleMediaError(type, err);
        }
    }

    // ####################################################
    // HANDLE VIRTUAL BACKGROUND AND BLUR
    // ####################################################

    showVideoImageSelector() {
        const imageGrid = document.getElementById('imageGrid');
        const imageGridVideo = document.getElementById('imageGridVideo');

        elemDisplay('imageGridVideo', true, 'grid');
        if (imageGridVideo.innerHTML != '') return;

        imageGrid.innerHTML = ''; // Clear previous init images
        imageGridVideo.innerHTML = ''; // Clear previous images

        function createImage(id, src, tooltip, index, clickHandler) {
            const img = document.createElement('img');
            img.id = id;
            img.src = src;
            img.dataset.index = index;
            img.addEventListener('click', clickHandler);
            imageGridVideo.appendChild(img);
            if (tooltip) {
                setTippy(img.id, tooltip, 'top');
            }
        }

        // Common function to handle virtual background changes
        async function handleVirtualBackground(blurLevel = null, imgSrc = null, transparentBg = null) {
            if (!blurLevel && !imgSrc && !transparentBg) {
                virtualBackgroundBlurLevel = null;
                virtualBackgroundSelectedImage = null;
                virtualBackgroundTransparent = null;
            }
            await rc.applyVirtualBackground(blurLevel, imgSrc, transparentBg);
        }

        // 创建干净的虚拟背景图片
        createImage('cleanVbImg', image.user, '移除虚拟背景', 'cleanVb', () =>
            handleVirtualBackground(null, null)
        );
        // 创建高模糊图片
        createImage('highBlurImg', image.blurHigh, '高模糊', 'high', () => handleVirtualBackground(20));

        // 创建低模糊图片
        createImage('lowBlurImg', image.blurLow, '低模糊', 'low', () => handleVirtualBackground(10));

        // 创建透明虚拟背景图片
        createImage('transparentBg', image.transparentBg, '透明虚拟背景', 'transparentVb', () =>
            handleVirtualBackground(null, null, true)
        );

        // Handle file upload (common logic for file selection)
        function setupFileUploadButton(buttonId, sourceImg, tooltip, handler) {
            const imgButton = document.createElement('img');
            imgButton.id = buttonId;
            imgButton.src = sourceImg;
            imgButton.addEventListener('click', handler);
            imageGridVideo.appendChild(imgButton);
            setTippy(imgButton.id, tooltip, 'top');
        }

        function handleFileUpload(file) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const imgData = e.target.result;
                    await indexedDBHelper.saveImage(imgData);
                    addImageToUI(imgData);
                };
                reader.readAsDataURL(file);
            }
        }

        function createUploadImageButton() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            fileInput.addEventListener('change', (event) => {
                handleFileUpload(event.target.files[0]);
            });

            setupFileUploadButton('uploadImg', image.upload, '上传您的自定义图片', () => fileInput.click());

            return fileInput;
        }

        // Function to add an image to UI
        function addImageToUI(imgData) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-wrapper';

            const customImg = document.createElement('img');
            customImg.src = imgData;
            customImg.addEventListener('click', () => handleVirtualBackground(null, imgData));

            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-icon fas fa-times';
            deleteBtn.addEventListener('click', async (event) => {
                event.stopPropagation();
                await indexedDBHelper.removeImage(imgData);
                imageContainer.remove();
            });

            imageContainer.appendChild(customImg);
            imageContainer.appendChild(deleteBtn);
            imageGridVideo.appendChild(imageContainer);
        }

        // Function to fetch and store an image from URL
        async function fetchAndStoreImage(url) {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const imgData = e.target.result;
                    await indexedDBHelper.saveImage(imgData);
                    addImageToUI(imgData);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error fetching image:', error);
                // Detect CORS issue and provide a clearer error message
                error.message.includes('Failed to fetch')
                    ? showError(errorMessage, '错误：无法获取图片。CORS策略可能阻止了此请求。')
                    : showError(errorMessage, `获取图片时出错: ${error.message}`);
            }
        }

        // Paste image from URL
        function askForImageURL() {
            elemDisplay(imageUrlModal.id, true);
            navigator.clipboard
                .readText()
                .then((clipboardText) => {
                    if (isValidImageURL(filterXSS(clipboardText))) {
                        imageUrlInput.value = clipboardText;
                    }
                })
                .catch(() => {});
        }

        saveImageUrlBtn.addEventListener('click', async () => {
            elemDisplay(imageUrlModal.id, false);
            if (isValidImageURL(imageUrlInput.value)) {
                await fetchAndStoreImage(imageUrlInput.value);
                imageUrlInput.value = '';
            }
        });

        cancelImageUrlBtn.addEventListener('click', () => {
            elemDisplay(imageUrlModal.id, false);
            imageUrlInput.value = '';
        });

        // Upload from file button
        createUploadImageButton();

        // Upload from URL button
        setupFileUploadButton('linkImage', image.link, '从URL上传图片', askForImageURL);

        // Load default virtual backgrounds
        virtualBackgrounds.forEach((imageUrl, index) => {
            createImage(`virtualBg${index}`, imageUrl, null, index + 1, () => handleVirtualBackground(null, imageUrl));
        });

        // Load stored images and add to image grid UI
        indexedDBHelper.getAllImages().then((images) => images.forEach(addImageToUI));

        // Upload image with drag and drop
        imageGridVideo.addEventListener('dragover', (event) => {
            event.preventDefault();
            imageGridVideo.classList.add('drag-over');
        });

        imageGridVideo.addEventListener('dragleave', () => {
            imageGridVideo.classList.remove('drag-over');
        });

        imageGridVideo.addEventListener('drop', (event) => {
            event.preventDefault();
            imageGridVideo.classList.remove('drag-over');
            if (event.dataTransfer.files.length > 0) {
                handleFileUpload(event.dataTransfer.files[0]);
            }
        });
    }

    // ####################################################
    // VIRTUAL BACKGROUND HELPER
    // ####################################################

    async applyVirtualBackground(blurLevel, backgroundImage, backgroundTransparent) {
        if (blurLevel) {
            virtualBackgroundBlurLevel = blurLevel;
            virtualBackgroundSelectedImage = null;
            virtualBackgroundTransparent = null;
        } else if (backgroundImage) {
            virtualBackgroundBlurLevel = null;
            virtualBackgroundSelectedImage = backgroundImage;
            virtualBackgroundTransparent = null;
        } else if (backgroundTransparent) {
            virtualBackgroundBlurLevel = null;
            virtualBackgroundSelectedImage = null;
            virtualBackgroundTransparent = true;
        } else {
            virtualBackgroundBlurLevel = null;
            virtualBackgroundSelectedImage = null;
            virtualBackgroundTransparent = null;
        }

        videoSelect.onchange();
        saveVirtualBackgroundSettings(blurLevel, backgroundImage, backgroundTransparent);
    }

    // ####################################################
    // NOISE SUPPRESSION
    // ####################################################

    initRNNoiseSuppression() {
        if (typeof RNNoiseProcessor === 'undefined') {
            console.warn('RNNoiseProcessor is not available.');
            return;
        }

        this.disableRNNoiseSuppression();

        this.RNNoiseProcessor = new RNNoiseProcessor();
    }

    async getRNNoiseSuppressionStream(stream) {
        if (!this.RNNoiseProcessor) {
            console.warn('RNNoiseProcessor not initialized.');
            return stream;
        }

        try {
            const processedStream = await this.RNNoiseProcessor.startProcessing(stream);

            if (localStorageSettings.mic_noise_suppression) {
                this.RNNoiseProcessor.toggleNoiseSuppression();
                switchNoiseSuppression.checked = this.RNNoiseProcessor.noiseSuppressionEnabled;
            }

            if (typeof labelNoiseSuppression !== 'undefined') {
                labelNoiseSuppression.style.color = this.RNNoiseProcessor.noiseSuppressionEnabled ? 'lime' : 'white';
            }

            return processedStream;
        } catch (err) {
            console.warn('RNNoiseProcessor failed, using original stream:', err);
            return stream;
        }
    }

    disableRNNoiseSuppression() {
        if (this.RNNoiseProcessor) {
            this.RNNoiseProcessor.stopProcessing();
            this.RNNoiseProcessor = null;
            console.warn('RNNoiseProcessor already initialized, stopping previous instance.');
        }
    }

    // ####################################################
    // AUDIO/VIDEO/SCREEN CONSTRAINTS
    // ####################################################

    getAudioConstraints(deviceId) {
        const audioConstraints = deviceId ? { deviceId: { exact: deviceId } } : true;
        return {
            audio: audioConstraints,
            video: false,
        };
    }

    getCameraConstraints() {
        camera = camera == 'user' ? 'environment' : 'user';
        if (camera != 'user') this.camVideo = { facingMode: { exact: camera } };
        else this.camVideo = true;
        return {
            audio: false,
            video: this.camVideo,
        };
    }

    getVideoConstraints(deviceId) {
        const defaultFrameRate = { ideal: 30 };
        const selectedValue = this.getSelectedIndexValue(videoFps);
        const customFrameRate = parseInt(selectedValue, 10);
        const frameRate = selectedValue === 'max' ? defaultFrameRate : customFrameRate;

        // Helper to create constraints
        function createConstraints(width, height, frameRate, isIdeal = false) {
            const constraints = {
                width: isIdeal ? { ideal: width } : { exact: width },
                height: isIdeal ? { ideal: height } : { exact: height },
            };
            // Only add frameRate for non-Firefox browsers
            if (!isFirefox) {
                constraints.frameRate = isIdeal ? { ideal: frameRate } : frameRate;
            }
            return constraints;
        }

        let constraints = {};

        switch (videoQuality.value) {
            case 'default':
                constraints = createConstraints(1280, 720, 30, true);
                videoFps.selectedIndex = 0;
                videoFps.disabled = true;
                break;
            case 'qvga':
                constraints = createConstraints(320, 240, frameRate, isFirefox);
                break;
            case 'vga':
                constraints = createConstraints(640, 480, frameRate, isFirefox);
                break;
            case 'hd':
                constraints = createConstraints(1280, 720, frameRate, isFirefox);
                break;
            case 'fhd':
                constraints = createConstraints(1920, 1080, frameRate, isFirefox);
                break;
            case '2k':
                constraints = createConstraints(2560, 1440, frameRate, isFirefox);
                break;
            case '4k':
                constraints = createConstraints(3840, 2160, frameRate, isFirefox);
                break;
            case '6k':
                constraints = createConstraints(6144, 3456, frameRate, isFirefox);
                break;
            case '8k':
                constraints = createConstraints(7680, 4320, frameRate, isFirefox);
                break;
            default:
                // fallback to HD
                constraints = createConstraints(1280, 720, frameRate, isFirefox);
                break;
        }

        // Add deviceId if provided
        if (deviceId) {
            constraints.deviceId = { exact: deviceId };
        }

        // Compose final constraints object
        return {
            audio: false,
            video: constraints,
        };
    }

    getScreenConstraints() {
        const defaultFrameRate = { ideal: 30 };
        const selectedValue = this.getSelectedIndexValue(screenFps);
        const customFrameRate = parseInt(selectedValue, 10);
        const frameRate = selectedValue === 'max' ? defaultFrameRate : { ideal: customFrameRate };

        // Base constraints structure with dynamic values for resolution and frame rate
        const screenBaseConstraints = (width, height) => {
            const videoConstraints = {
                width: { ideal: width },
                height: { ideal: height },
                aspectRatio: 1.777, // 16:9 aspect ratio
            };
            if (!isFirefox) {
                videoConstraints.frameRate = frameRate;
            }
            return {
                audio: true,
                video: videoConstraints,
            };
        };

        const screenResolutionMap = {
            hd: { width: 1280, height: 720 },
            fhd: { width: 1920, height: 1080 },
            '2k': { width: 2560, height: 1440 },
            '4k': { width: 3840, height: 2160 },
            '6k': { width: 6144, height: 3456 },
            '8k': { width: 7680, height: 4320 },
        };

        // Default to Full HD if no match found in the screen resolution map
        const { width, height } = screenResolutionMap[screenQuality.value] || { width: 1920, height: 1080 };

        return screenBaseConstraints(width, height);
    }

    // ####################################################
    // WEBCAM ENCODING
    // ####################################################

    getWebCamEncoding() {
        let encodings;
        let codec;

        console.log('WEBCAM ENCODING', {
            forceVP8: this.forceVP8,
            forceVP9: this.forceVP9,
            forceH264: this.forceH264,
            forceAV1: this.forceAV1,
            numSimulcastStreamsWebcam: this.numSimulcastStreamsWebcam,
            enableWebcamLayers: this.enableWebcamLayers,
            webcamScalabilityMode: this.webcamScalabilityMode,
            rtpCapabilitiesCodecs: this.device.rtpCapabilities.codecs,
        });

        if (this.forceVP8) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('所需的 VP8 编解码器+配置不支持');
        } else if (this.forceH264) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('所需的 H264 编解码器+配置不支持');
        } else if (this.forceVP9) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('所需的 VP9 编解码器+配置不支持');
        } else if (this.forceAV1) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/av1');
            if (!codec) throw new Error('所需的 AV1 编解码器+配置不支持');
        }

        if (this.enableWebcamLayers) {
            console.log('WEBCAM SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.device.rtpCapabilities.codecs.find((c) => c.kind === 'video');
            console.log('WEBCAM ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            // If VP9 is the only available video codec then use SVC.
            if (
                ((this.forceVP9 || this.forceAV1) && codec) ||
                (firstVideoCodec?.mimeType &&
                    ['video/vp9', 'video/av1'].includes(firstVideoCodec.mimeType.toLowerCase()))
            ) {
                console.log('WEBCAM ENCODING: VP9 or AV1 with SVC');
                encodings = [
                    {
                        maxBitrate: 5000000,
                        scalabilityMode: this.webcamScalabilityMode || 'L3T3_KEY',
                    },
                ];
            } else {
                console.log('WEBCAM ENCODING: VP8 or H264 with simulcast');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: 5000000,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    },
                ];
                if (this.numSimulcastStreamsWebcam > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: 1000000,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    });
                }
                if (this.numSimulcastStreamsWebcam > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: 500000,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    });
                }
            }
        }
        return { encodings, codec };
    }

    // ####################################################
    // SCREEN ENCODING
    // ####################################################

    getScreenEncoding() {
        let encodings;
        let codec;

        console.log('SCREEN ENCODING', {
            forceVP8: this.forceVP8,
            forceVP9: this.forceVP9,
            forceH264: this.forceH264,
            forceAV1: this.forceAV1,
            numSimulcastStreamsSharing: this.numSimulcastStreamsSharing,
            enableSharingLayers: this.enableSharingLayers,
            sharingScalabilityMode: this.sharingScalabilityMode,
            rtpCapabilitiesCodecs: this.device.rtpCapabilities.codecs,
        });

        if (this.forceVP8) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('所需的 VP8 编解码器+配置不支持');
        } else if (this.forceH264) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('所需的 H264 编解码器+配置不支持');
        } else if (this.forceVP9) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('所需的 VP9 编解码器+配置不支持');
        } else if (this.forceAV1) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/av1');
            if (!codec) throw new Error('所需的 AV1 编解码器+配置不支持');
        }

        if (this.enableSharingLayers) {
            console.log('SCREEN SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.device.rtpCapabilities.codecs.find((c) => c.kind === 'video');
            console.log('SCREEN ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            // If VP9 is the only available video codec then use SVC.
            if (
                ((this.forceVP9 || this.forceAV1) && codec) ||
                (firstVideoCodec?.mimeType &&
                    ['video/vp9', 'video/av1'].includes(firstVideoCodec.mimeType.toLowerCase()))
            ) {
                console.log('SCREEN ENCODING: VP9 or AV1 with SVC');
                encodings = [
                    {
                        maxBitrate: 5000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L3T3',
                        dtx: true,
                    },
                ];
            } else {
                console.log('SCREEN ENCODING: VP8 or H264 with simulcast.');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: 5000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    },
                ];
                if (this.numSimulcastStreamsSharing > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: 1000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
                if (this.numSimulcastStreamsSharing > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: 500000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
            }
        }
        return { encodings, codec };
    }

    // ####################################################
    // HELPERS
    // ####################################################

    createButton(id, className) {
        const button = document.createElement('button');
        button.id = id;
        button.className = className;
        return button;
    }

    getConsumerIdByProducerId(producerId) {
        for (let [consumerId, consumer] of this.consumers.entries()) {
            if (consumer._producerId === producerId) {
                return consumerId;
            }
        }
        return null;
    }

    getProducerIdByConsumerId(consumerId) {
        const consumer = this.consumers.get(consumerId);
        if (consumer) {
            return consumer._producerId;
        }
        return null;
    }

    // ####################################################
    // PRODUCER
    // ####################################################

    handleHideMe() {
        const myScreenWrap = this.getId(this.screenProducerId + '__video');
        const myVideoWrap = this.getId(this.videoProducerId + '__video');
        const myVideoWrapOff = this.getId(this.peer_id + '__videoOff');
        const myVideoPinBtn = this.getId(this.videoProducerId + '__pin');
        const myScreenPinBtn = this.getId(this.screenProducerId + '__pin');
        console.log('handleHideMe', {
            isHideMeActive: isHideMeActive,
            myScreenWrap: myScreenWrap ? myScreenWrap.id : null,
            myVideoWrap: myVideoWrap ? myVideoWrap.id : null,
            myVideoWrapOff: myVideoWrapOff ? myVideoWrapOff.id : null,
            myVideoPinBtn: myVideoPinBtn ? myVideoPinBtn.id : null,
            myScreenPinBtn: myScreenPinBtn ? myScreenPinBtn.id : null,
        });
        if (myScreenWrap) myScreenWrap.style.display = isHideMeActive ? 'none' : 'block';
        if (isHideMeActive && this.isVideoPinned && myVideoPinBtn) myVideoPinBtn.click();
        if (isHideMeActive && this.isVideoPinned && myScreenPinBtn) myScreenPinBtn.click();
        if (myVideoWrap) myVideoWrap.style.display = isHideMeActive ? 'none' : 'block';
        if (myVideoWrapOff) myVideoWrapOff.style.display = isHideMeActive ? 'none' : 'block';
        hideMeIcon.className = isHideMeActive ? html.hideMeOn : html.hideMeOff;
        hideMeIcon.style.color = isHideMeActive ? 'red' : 'white';
        isHideMeActive ? this.sound('left') : this.sound('joined');
        resizeVideoMedia();
    }

    producerExist(type) {
        return this.producerLabel.has(type);
    }

    closeThenProduce(type, deviceId = null, swapCamera = false) {
        this.closeProducer(type, 'closeThenProduce');
        setTimeout(async function () {
            await rc.produce(type, deviceId, swapCamera);
        }, 1000);
    }

    async handleProducer(id, type, stream) {
        let elem, vb, vp, ts, d, p, i, au, pip, fs, pm, pb, pn, pv, mv;
        switch (type) {
            case mediaType.video:
            case mediaType.screen:
                let isScreen = type === mediaType.screen;
                this.removeVideoOff(this.peer_id);

                d = document.createElement('div');
                d.className = 'Camera';
                d.id = id + '__video';

                elem = document.createElement('video');
                elem.setAttribute('id', id);
                elem.setAttribute('volume', this.peer_id + '___pVolume');
                !isScreen && elem.setAttribute('name', this.peer_id);
                elem.setAttribute('playsinline', true);
                elem.controls = isVideoControlsOn;
                elem.autoplay = true;
                elem.muted = true;
                elem.volume = 0;
                elem.poster = image.poster;
                elem.style.objectFit = isScreen || isBroadcastingEnabled ? 'contain' : 'var(--videoObjFit)';

                vb = document.createElement('div');
                vb.id = id + '__vb';
                vb.className = 'videoMenuBar hidden';

                pip = this.createButton(id + '__pictureInPicture', html.pip);
                fs = this.createButton(id + '__fullScreen', html.fullScreen);
                ts = this.createButton(id + '__snapshot', html.snapshot);
                mv = this.createButton(id + '__mirror', html.mirror);
                pn = this.createButton(id + '__pin', html.pin);
                vp = this.createButton(this.peer_id + '__vp', html.videoPrivacy);
                au = this.createButton(
                    this.peer_id + '__audio',
                    this.peer_info.peer_audio ? html.audioOn : html.audioOff
                );
                au.style.cursor = 'default';

                p = document.createElement('p');
                p.id = this.peer_id + '__name';
                p.className = html.userName;
                p.innerText = (isPresenter ? '⭐️ ' : '') + this.peer_name + ' (me)';

                i = document.createElement('i');
                i.id = this.peer_id + '__hand';
                i.className = html.userHand;

                pm = document.createElement('div');
                pb = document.createElement('div');
                pm.setAttribute('id', this.peer_id + '_pitchMeter');
                pb.setAttribute('id', this.peer_id + '_pitchBar');
                pm.className = 'speechbar';
                pb.className = 'bar';
                pb.style.height = '1%';
                pm.appendChild(pb);

                pv = document.createElement('input');
                pv.id = this.peer_id + '___pVolume';
                pv.type = 'range';
                pv.min = 0;
                pv.max = 100;
                pv.value = 100;

                BUTTONS.producerVideo.audioVolumeInput && vb.appendChild(pv);
                BUTTONS.producerVideo.muteAudioButton && vb.appendChild(au);
                BUTTONS.producerVideo.videoPrivacyButton && !isScreen && vb.appendChild(vp);
                BUTTONS.producerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.producerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);
                BUTTONS.producerVideo.videoMirrorButton && vb.appendChild(mv);
                BUTTONS.producerVideo.fullScreenButton && this.isVideoFullScreenSupported && vb.appendChild(fs);

                if (!this.isMobileDevice) vb.appendChild(pn);

                vb.appendChild(p);
                d.appendChild(elem);
                d.appendChild(pm);
                d.appendChild(i);
                d.appendChild(p);

                const hideVideoMenu = () => {
                    if (vb && !vb.classList.contains('hidden')) {
                        hide(vb);
                        setCamerasBorderNone();
                    }
                };

                if (this.isMobileDevice) {
                    vb.classList.add('mobile-floating');
                    document.body.appendChild(vb);
                } else {
                    vb.classList.remove('mobile-floating');
                    d.appendChild(vb);
                    d.addEventListener('mouseleave', hideVideoMenu);
                }
                vb.addEventListener('click', (e) => e.stopPropagation());

                this.videoMediaContainer.appendChild(d);

                await this.attachMediaStream(elem, stream, type, 'Producer');

                this.myVideoEl = elem;
                this.isVideoPictureInPictureSupported && this.handlePIP(elem.id, pip.id);
                this.isVideoFullScreenSupported && this.handleFS(elem.id, fs.id);
                this.handleVB(d.id, vb.id);
                this.handleDD(elem.id, this.peer_id, true);
                this.handleTS(elem.id, ts.id);
                this.handleMV(elem.id, mv.id);
                this.handlePN(elem.id, pn.id, d.id, isScreen);
                this.handleZV(elem.id, d.id, this.peer_id);
                this.handlePV(id + '___' + pv.id);

                this.setAV(
                    this.audioConsumers.get(this.peer_id + '___pVolume'),
                    this.peer_id + '___pVolume',
                    this.peer_info.peer_audio_volume
                );

                if (!isScreen) this.handleVP(elem.id, vp.id);

                this.popupPeerInfo(p.id, this.peer_info);
                this.checkPeerInfoStatus(this.peer_info);

                if (isScreen && this.videoMediaContainer.childElementCount > 1) pn.click();

                if (!this.isMobileDevice) {
                    this.setTippy(pn.id, '切换固定', 'bottom');
                    this.setTippy(mv.id, '切换镜像', 'bottom');
                    this.setTippy(pip.id, '切换画中画', 'bottom');
                    this.setTippy(ts.id, '快照', 'bottom');
                    this.setTippy(vp.id, '切换视频隐私', 'bottom');
                    this.setTippy(au.id, '音频状态', 'bottom');
                }

                handleAspectRatio();
                console.log('[addProducer] Video-element-count', this.videoMediaContainer.childElementCount);
                break;
            case mediaType.audio:
                elem = document.createElement('audio');
                elem.setAttribute('id', id);
                elem.setAttribute('name', 'LOCAL-AUDIO');
                elem.setAttribute('volume', this.peer_id + '___pVolume');
                elem.controls = false;
                elem.autoplay = true;
                elem.muted = true;
                elem.volume = 0;
                this.myAudioEl = elem;
                this.localAudioEl.appendChild(elem);

                await this.attachMediaStream(elem, stream, type, 'Producer');

                const audioConsumerId = this.peer_id + '___pVolume';
                this.audioConsumers.set(audioConsumerId, elem.id);

                this.setAV(elem.id, audioConsumerId, this.peer_info.peer_audio_volume);
                this.handlePV(elem.id + '___' + audioConsumerId);

                console.log('[addProducer] audio-element-count', this.localAudioEl.childElementCount);
                break;
            default:
                break;
        }
        return elem;
    }

    async pauseProducer(type) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).pause();

        try {
            const response = await this.socket.request('pauseProducer', { producer_id, type });
            console.log('Producer paused', response);
        } catch (error) {
            console.error('Error pausing producer', error);
        }

        switch (type) {
            case mediaType.audio:
                this.event(_EVENTS.pauseAudio);
                break;
            case mediaType.video:
                this.event(_EVENTS.pauseVideo);
                break;
            case mediaType.screen:
                this.event(_EVENTS.pauseScreen);
                break;
            default:
                return;
        }
    }

    async resumeProducer(type) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).resume();

        try {
            const response = await this.socket.request('resumeProducer', { producer_id, type });
            console.log('Producer resumed', response);
        } catch (error) {
            console.error('Error resuming producer', error);
        }

        switch (type) {
            case mediaType.audio:
                this.event(_EVENTS.resumeAudio);
                break;
            case mediaType.video:
                this.event(_EVENTS.resumeVideo);
                break;
            case mediaType.screen:
                this.event(_EVENTS.resumeScreen);
                break;
            default:
                return;
        }
    }

    closeProducer(type, event = 'Close Producer') {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        const producer = this.producers.get(producer_id);

        // Stop all tracks of the producer's stream
        if (producer && producer.track) {
            try {
                producer.track.stop();
            } catch (err) {
                console.warn('Error stopping producer track:', err);
            }
        }

        const data = {
            peer_name: this.peer_name,
            producer_id: producer_id,
            type: type,
            status: false,
        };
        console.log(`${event} ${type}`, data);

        this.socket.emit('producerClosed', data);

        this.producers.get(producer_id).close();
        this.producers.delete(producer_id);
        this.producerLabel.delete(type);

        console.log(`[${event}] - PRODUCER LABEL`, this.producerLabel);

        if (type === mediaType.video || type === mediaType.screen) {
            if (this.isVideoPinned && this.pinnedVideoPlayerId == producer_id) {
                this.removeVideoPinMediaContainer();
                console.log('Remove pin container due the Producer close', {
                    producer_id: producer_id,
                    producer_type: type,
                });
            }

            const video = this.getId(producer_id);
            this.removeVideoProducer(video, event);
        }

        if (type === mediaType.audio) {
            const audio = this.getId(producer_id);
            this.removeAudioProducer(audio, event);
        }

        if (type === mediaType.audioTab) {
            const auTab = this.getId(producer_id);
            this.removeAudioProducer(auTab, event);
        }

        switch (type) {
            case mediaType.audioTab:
                console.log('Closed audio tab');
                break;
            case mediaType.audio:
                this.setIsAudio(this.peer_id, false);
                this.event(_EVENTS.stopAudio);
                break;
            case mediaType.video:
                this.setIsVideo(false);
                this.event(_EVENTS.stopVideo);
                break;
            case mediaType.screen:
                this.setIsScreen(false);
                this.event(_EVENTS.stopScreen);
                break;
            default:
                break;
        }
        this.sound('left');
    }

    async produceScreenAudio(stream) {
        try {
            if (this.producerLabel.has(mediaType.audioTab)) {
                return console.warn('Producer already exists for this type ' + mediaType.audioTab);
            }

            const track = stream.getAudioTracks()[0];
            const params = {
                track,
                appData: {
                    mediaType: mediaType.audio,
                },
            };

            const producerSa = await this.producerTransport.produce(params);

            console.log('PRODUCER SCREEN AUDIO', producerSa);

            this.producers.set(producerSa.id, producerSa);
            this.producerLabel.set(mediaType.audioTab, producerSa.id);

            console.log('[produceScreenAudio] - PRODUCER LABEL', this.producerLabel);

            await this.handleProducer(producerSa.id, mediaType.audio, stream);

            producerSa.on('trackended', () => {
                this.closeProducer(mediaType.audioTab, 'trackended');
            });

            producerSa.on('transportclose', () => {
                this.closeProducer(mediaType.audioTab, 'transportclose');
            });

            producerSa.on('close', () => {
                this.closeProducer(mediaType.audioTab, 'close');
            });
        } catch (err) {
            console.error('Produce Screen Audio error:', err);
        }
    }

    // ####################################################
    // REMOVE PRODUCER VIDEO/AUDIO
    // ####################################################

    removeVideoProducer(video, event) {
        const d = this.getId(video.id + '__video');
        const vb = this.getId(video.id + '__vb');

        video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        video.parentNode.removeChild(video);

        d.parentNode.removeChild(d);
        vb.parentNode.removeChild(vb);

        handleAspectRatio();

        console.log(`[${event}] Video-element-count`, this.videoMediaContainer.childElementCount);
    }

    removeAudioProducer(audio, event) {
        audio.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        audio.parentNode.removeChild(audio);

        console.log(`[${event}] audio-element-count`, this.localAudioEl.childElementCount);
    }

    // ####################################################
    // CONSUMER
    // ####################################################

    async consume(producer_id, peer_name, peer_info, type) {
        try {
            wbUpdate();

            this.editorUpdate();

            const { consumer, stream, kind } = await this.getConsumeStream(producer_id, peer_info.peer_id, type);

            console.log('CONSUMER MEDIA TYPE ----> ' + type);
            console.log('CONSUMER', consumer);

            this.consumers.set(consumer.id, consumer);

            await this.handleConsumer(consumer.id, type, stream, peer_name, peer_info);

            // https://mediasoup.discourse.group/t/create-server-side-consumers-with-paused-true/244
            try {
                const response = await this.socket.request('resumeConsumer', { consumer_id: consumer.id, type });
                console.log('Consumer resumed', response);
            } catch (error) {
                console.error('Error resuming consumer', error);
            }

            consumer.on('trackended', () => {
                console.log('Consumer track end', { id: consumer.id, type });
                this.removeConsumer(consumer.id, consumer.kind);
            });

            consumer.on('transportclose', () => {
                console.log('Consumer transport close', { id: consumer.id, type });
                this.removeConsumer(consumer.id, consumer.kind);
            });

            if (kind === 'video' && isParticipantsListOpen) {
                await getRoomParticipants();
            }
        } catch (error) {
            console.error('Error in consume', error);

            popupHtmlMessage(null, image.network, 'Consume', error, 'center', false, false);
        }
    }

    async getConsumeStream(producerId, peer_id, type) {
        if (!this.device) {
            throw new Error('设备未初始化');
        }

        // Check if consumer transport exists
        if (!this.consumerTransport) {
            throw new Error('消费者传输未初始化');
        }

        const { rtpCapabilities } = this.device;

        const data = await this.socket.request('consume', {
            consumerTransportId: this.consumerTransport.id,
            rtpCapabilities,
            producerId,
            type,
        });

        const { id, kind, rtpParameters } = data;
        const codecOptions = {};
        const streamId = peer_id + (type == mediaType.screen ? '-screen-sharing' : '-mic-webcam');
        const consumer = await this.consumerTransport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions,
            streamId,
        });

        const stream = new MediaStream();
        stream.addTrack(consumer.track);

        return {
            consumer,
            stream,
            kind,
        };
    }

    async handleConsumer(id, type, stream, peer_name, peer_info) {
        let elem, vb, d, p, i, cm, au, pip, fs, ts, sf, sm, sv, gl, ban, ko, pb, pm, pv, pn, ha, mv;

        let eDiv, eBtn, eVc; // expand buttons

        console.log('PEER-INFO', peer_info);

        const remotePeerId = peer_info.peer_id;
        const remoteIsScreen = type == mediaType.screen;
        const remotePeerAudio = peer_info.peer_audio;
        const remotePeerAudioVolume = peer_info.peer_audio_volume;
        const remotePrivacyOn = peer_info.peer_video_privacy;
        const remotePeerPresenter = peer_info.peer_presenter;

        switch (type) {
            case mediaType.video:
            case mediaType.screen:
                this.removeVideoOff(remotePeerId);

                d = document.createElement('div');
                d.className = 'Camera';
                d.id = id + '__video';

                elem = document.createElement('video');
                elem.setAttribute('id', id);
                elem.setAttribute('volumeBar', remotePeerId + '___pVolume');
                !remoteIsScreen && elem.setAttribute('name', remotePeerId);
                elem.setAttribute('playsinline', true);
                elem.controls = isVideoControlsOn;
                elem.autoplay = true;
                elem.className = '';
                elem.poster = image.poster;
                elem.style.objectFit = remoteIsScreen || isBroadcastingEnabled ? 'contain' : 'var(--videoObjFit)';

                vb = document.createElement('div');
                vb.id = id + '__vb';
                vb.className = 'videoMenuBar hidden';

                eDiv = document.createElement('div');
                eDiv.className = 'expand-video';

                eBtn = this.createButton(
                    remotePeerId + (type === mediaType.screen ? '_screen_' : '_video_') + '_expandBtn',
                    html.expand
                );

                eVc = document.createElement('div');
                eVc.className = 'expand-video-content';
                eVc.id = remotePeerId + (type === mediaType.screen ? '_screen_' : '_video_') + '_videoExpandContent';

                pip = this.createButton(id + '__pictureInPicture', html.pip);
                mv = this.createButton(id + '__videoMirror', html.mirror);
                fs = this.createButton(id + '__fullScreen', html.fullScreen);
                ts = this.createButton(id + '__snapshot', html.snapshot);
                pn = this.createButton(id + '__pin', html.pin);
                ha = this.createButton(id + '__hideALL', html.hideALL + ' focusMode');
                sf = this.createButton(id + '___' + remotePeerId + '___sendFile', html.sendFile);
                sm = this.createButton(id + '___' + remotePeerId + '___sendMsg', html.sendMsg);
                sv = this.createButton(id + '___' + remotePeerId + '___sendVideo', html.sendVideo);
                cm = this.createButton(id + '___' + remotePeerId + '___video', html.videoOn);
                au = this.createButton(remotePeerId + '__audio', remotePeerAudio ? html.audioOn : html.audioOff);
                gl = this.createButton(id + '___' + remotePeerId + '___geoLocation', html.geolocation);
                ban = this.createButton(id + '___' + remotePeerId + '___ban', html.ban);
                ko = this.createButton(id + '___' + remotePeerId + '___kickOut', html.kickOut);

                i = document.createElement('i');
                i.id = remotePeerId + '__hand';
                i.className = html.userHand;

                p = document.createElement('p');
                p.id = remotePeerId + '__name';
                p.className = html.userName;
                p.innerText = (remotePeerPresenter ? '⭐️ ' : '') + peer_name;

                pm = document.createElement('div');
                pb = document.createElement('div');
                pm.setAttribute('id', remotePeerId + '__pitchMeter');
                pb.setAttribute('id', remotePeerId + '__pitchBar');
                pm.className = 'speechbar';
                pb.className = 'bar';
                pb.style.height = '1%';
                pm.appendChild(pb);

                const peerNameHeader = document.createElement('div');
                peerNameHeader.className = 'peer-name-header';

                const peerNameContainer = document.createElement('div');
                peerNameContainer.className = 'peer-name-container';

                const peerNameSpan = document.createElement('span');
                peerNameSpan.className = 'peer-name';
                peerNameSpan.textContent = peer_name;

                peerNameContainer.appendChild(peerNameSpan);

                pv = document.createElement('input');
                pv.id = remotePeerId + '___pVolume';
                pv.type = 'range';
                pv.min = 0;
                pv.max = 100;
                pv.value = 100;

                BUTTONS.consumerVideo.audioVolumeInput && peerNameContainer.appendChild(pv);
                peerNameHeader.appendChild(peerNameContainer);

                vb.appendChild(peerNameHeader);
                eVc.appendChild(peerNameHeader);

                const buttonGroup = document.createElement('div');
                buttonGroup.className = 'button-group';

                BUTTONS.consumerVideo.sendMessageButton && buttonGroup.appendChild(sm);
                BUTTONS.consumerVideo.sendFileButton && buttonGroup.appendChild(sf);
                BUTTONS.consumerVideo.sendVideoButton && buttonGroup.appendChild(sv);
                BUTTONS.consumerVideo.geolocationButton && buttonGroup.appendChild(gl);
                BUTTONS.consumerVideo.banButton && buttonGroup.appendChild(ban);
                BUTTONS.consumerVideo.ejectButton && buttonGroup.appendChild(ko);

                eVc.appendChild(buttonGroup);
                vb.appendChild(eBtn);
                vb.appendChild(au);
                vb.appendChild(cm);
                BUTTONS.consumerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.consumerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);
                BUTTONS.consumerVideo.videoMirrorButton && vb.appendChild(mv);
                BUTTONS.consumerVideo.fullScreenButton && this.isVideoFullScreenSupported && vb.appendChild(fs);
                BUTTONS.consumerVideo.focusVideoButton && vb.appendChild(ha);

                if (!this.isMobileDevice) vb.appendChild(pn);

                d.appendChild(elem);
                d.appendChild(i);
                d.appendChild(p);
                d.appendChild(pm);

                if (this.isMobileDevice) {
                    vb.classList.add('mobile-floating');
                    document.body.appendChild(eVc);
                    document.body.appendChild(vb);
                } else {
                    vb.classList.remove('mobile-floating');
                    d.appendChild(eVc);
                    d.appendChild(vb);
                }
                vb.addEventListener('click', (e) => e.stopPropagation());

                this.videoMediaContainer.appendChild(d);

                await this.attachMediaStream(elem, stream, type, 'Consumer');

                this.isVideoPictureInPictureSupported && this.handlePIP(elem.id, pip.id);
                this.isVideoFullScreenSupported && this.handleFS(elem.id, fs.id);
                this.handleVB(d.id, vb.id, eBtn.id, eVc.id);
                this.handleDD(elem.id, remotePeerId);
                this.handleTS(elem.id, ts.id);
                this.handleMV(elem.id, mv.id);
                this.handleSF(sf.id);
                this.handleHA(ha.id, d.id);
                this.handleSM(sm.id, peer_name);
                this.handleSV(sv.id);
                BUTTONS.consumerVideo.muteVideoButton && this.handleCM(cm.id);
                BUTTONS.consumerVideo.muteAudioButton && this.handleAU(au.id);
                this.handleCV(id + '___' + pv.id);
                this.handleGL(gl.id);
                this.handleBAN(ban.id);
                this.handleKO(ko.id);
                this.handlePN(elem.id, pn.id, d.id, remoteIsScreen, false, eVc.id);
                this.handleZV(elem.id, d.id, remotePeerId);
                this.popupPeerInfo(p.id, peer_info);
                this.checkPeerInfoStatus(peer_info);

                if (!remoteIsScreen && remotePrivacyOn) this.setVideoPrivacyStatus(remotePeerId, remotePrivacyOn);

                if (remoteIsScreen && !isHideALLVideosActive) pn.click();

                if (isHideALLVideosActive) {
                    isHideALLVideosActive = false;
                    const children = this.videoMediaContainer.children;
                    const btnsHA = document.querySelectorAll('.focusMode');
                    for (let child of children) {
                        child.style.display = 'block';
                    }
                    btnsHA.forEach((btn) => {
                        btn.style.color = 'white';
                    });
                }

                if (!this.isMobileDevice) {
                    this.setTippy(pn.id, '切换固定', 'bottom');
                    this.setTippy(ha.id, '切换专注模式', 'bottom');
                    this.setTippy(pip.id, '切换画中画', 'bottom');
                    this.setTippy(mv.id, '切换镜像', 'bottom');
                    this.setTippy(ts.id, '快照', 'bottom');
                    this.setTippy(sf.id, '发送文件', 'bottom');
                    this.setTippy(sm.id, '发送消息', 'bottom');
                    this.setTippy(sv.id, '发送视频', 'bottom');
                    this.setTippy(cm.id, '隐藏', 'bottom');
                    this.setTippy(au.id, '静音', 'bottom');
                    this.setTippy(pv.id, '🔊 音量', 'bottom');
                    this.setTippy(gl.id, '地理位置', 'bottom');
                    this.setTippy(ban.id, '禁止', 'bottom');
                    this.setTippy(ko.id, '踢出', 'bottom');
                }

                // Use helper function to set audio volume
                this.setAV(
                    this.audioConsumers.get(remotePeerId + '___pVolume'),
                    remotePeerId + '___pVolume',
                    remotePeerAudioVolume,
                    true
                );

                this.setPeerAudio(remotePeerId, remotePeerAudio);

                handleAspectRatio();
                console.log('[addConsumer] Video-element-count', this.videoMediaContainer.childElementCount);

                this.sound('joined');
                break;
            case mediaType.audio:
                elem = document.createElement('audio');
                elem.setAttribute('id', id);
                elem.setAttribute('volumeBar', remotePeerId + '___pVolume');
                elem.autoplay = true;
                elem.audio = 1.0;
                this.remoteAudioEl.appendChild(elem);

                await this.attachMediaStream(elem, stream, type, 'Consumer');

                // Store audio consumer and set volume
                const audioConsumerId = remotePeerId + '___pVolume';
                this.audioConsumers.set(audioConsumerId, id);

                // Use helper function to set audio volume
                this.setAV(id, audioConsumerId, remotePeerAudioVolume, true);
                this.handleCV(id + '___' + audioConsumerId);

                this.setPeerAudio(remotePeerId, remotePeerAudio);

                if (sinkId && speakerSelect.value) {
                    this.changeAudioDestination(elem);
                }

                //elem.addEventListener('play', () => { elem.volume = 0.1 });
                console.log('[Add audioConsumers]', this.audioConsumers);
                break;
            default:
                break;
        }
        return elem;
    }

    removeConsumer(consumer_id, consumer_kind) {
        if (!this.consumers.get(consumer_id)) return;

        console.log('Remove consumer', { consumer_id: consumer_id, consumer_kind: consumer_kind });

        const elem = this.getId(consumer_id);
        if (elem) {
            elem.srcObject.getTracks().forEach(function (track) {
                track.stop();
            });
            elem.parentNode.removeChild(elem);
        }

        if (consumer_kind === 'video') {
            const d = this.getId(consumer_id + '__video');
            const vb = this.getId(consumer_id + '__vb');

            if (d) {
                // Check if video is in focus-mode...
                if (d.hasAttribute('focus-mode')) {
                    const dhaBtn = this.getId(consumer_id + '__hideALL');
                    if (dhaBtn) {
                        dhaBtn.click();
                    }
                }
                d.parentNode.removeChild(d);
                vb.parentNode.removeChild(vb);

                //alert(this.pinnedVideoPlayerId + '==' + consumer_id);
                if (this.isVideoPinned && this.pinnedVideoPlayerId == consumer_id) {
                    this.removeVideoPinMediaContainer();
                    console.log('Remove pin container due the Consumer close', {
                        consumer_id: consumer_id,
                        consumer_kind: consumer_kind,
                    });
                }
            }

            handleAspectRatio();
            console.log(
                '[removeConsumer - ' + consumer_kind + '] Video-element-count',
                this.videoMediaContainer.childElementCount
            );
        }

        if (consumer_kind === 'audio') {
            const audioConsumerPlayerId = this.getMapKeyByValue(this.audioConsumers, consumer_id);
            if (audioConsumerPlayerId) {
                const inputPv = this.getId(audioConsumerPlayerId);
                if (inputPv) inputPv.style.display = 'none';
                this.audioConsumers.delete(audioConsumerPlayerId);
                console.log('Remove audio Consumer', {
                    consumer_id: consumer_id,
                    audioConsumerPlayerId: audioConsumerPlayerId,
                    audioConsumers: this.audioConsumers,
                });
            }
        }

        this.consumers.get(consumer_id).close();
        this.consumers.delete(consumer_id);
        this.sound('left');
    }

    // ####################################################
    // HANDLE VIDEO OFF
    // ####################################################

    setVideoOff(peer_info, remotePeer = false) {
        //console.log('setVideoOff', peer_info);
        let d, vb, i, h, au, sf, sm, sv, gl, ban, ko, p, pm, pb, pv;

        const { peer_id, peer_name, peer_avatar, peer_audio, peer_presenter } = peer_info;

        this.removeVideoOff(peer_id);

        d = document.createElement('div');
        d.className = 'Camera';
        d.id = peer_id + '__videoOff';

        vb = document.createElement('div');
        vb.id = peer_id + '__vb';
        vb.className = 'videoMenuBar hidden';

        au = this.createButton(peer_id + '__audio', peer_audio ? html.audioOn : html.audioOff);

        pv = document.createElement('input');
        pv.id = peer_id + '___pVolume';
        pv.type = 'range';
        pv.min = 0;
        pv.max = 100;
        pv.value = 100;

        if (remotePeer) {
            sf = this.createButton('remotePeer___' + peer_id + '___sendFile', html.sendFile);
            sm = this.createButton('remotePeer___' + peer_id + '___sendMsg', html.sendMsg);
            sv = this.createButton('remotePeer___' + peer_id + '___sendVideo', html.sendVideo);
            gl = this.createButton('remotePeer___' + peer_id + '___geoLocation', html.geolocation);
            ban = this.createButton('remotePeer___' + peer_id + '___ban', html.ban);
            ko = this.createButton('remotePeer___' + peer_id + '___kickOut', html.kickOut);
        }

        i = document.createElement('img');
        i.className = 'videoAvatarImage center'; // pulsate
        i.id = peer_id + '__img';

        p = document.createElement('p');
        p.id = peer_id + '__name';
        p.className = html.userName;
        p.innerText = (peer_presenter ? '⭐️ ' : '') + peer_name + (remotePeer ? '' : ' (me) ');

        h = document.createElement('i');
        h.id = peer_id + '__hand';
        h.className = html.userHand;

        pm = document.createElement('div');
        pb = document.createElement('div');
        pm.setAttribute('id', peer_id + '__pitchMeter');
        pb.setAttribute('id', peer_id + '__pitchBar');
        pm.className = 'speechbar';
        pb.className = 'bar';
        pb.style.height = '1%';
        pm.appendChild(pb);

        if (remotePeer) {
            BUTTONS.videoOff.ejectButton && vb.appendChild(ko);
            BUTTONS.videoOff.banButton && vb.appendChild(ban);
            BUTTONS.videoOff.geolocationButton && vb.appendChild(gl);
            BUTTONS.videoOff.sendVideoButton && vb.appendChild(sv);
            BUTTONS.videoOff.sendFileButton && vb.appendChild(sf);
            BUTTONS.videoOff.sendMessageButton && vb.appendChild(sm);
        }
        BUTTONS.videoOff.audioVolumeInput && vb.appendChild(pv);

        vb.appendChild(au);
        d.appendChild(i);
        d.appendChild(p);
        d.appendChild(h);
        d.appendChild(pm);

        const hideVideoMenu = () => {
            if (vb && !vb.classList.contains('hidden')) {
                hide(vb);
                setCamerasBorderNone();
            }
        };

        if (this.isMobileDevice) {
            vb.classList.add('mobile-floating');
            document.body.appendChild(vb);
        } else {
            vb.classList.remove('mobile-floating');
            d.appendChild(vb);
            d.addEventListener('mouseleave', hideVideoMenu);
        }
        vb.addEventListener('click', (e) => e.stopPropagation());

        this.videoMediaContainer.appendChild(d);
        BUTTONS.videoOff.muteAudioButton && this.handleAU(au.id);

        if (remotePeer) {
            this.handleCV('remotePeer___' + pv.id);
            this.handleSM(sm.id);
            this.handleSF(sf.id);
            this.handleSV(sv.id);
            this.handleGL(gl.id);
            this.handleBAN(ban.id);
            this.handleKO(ko.id);
        } else {
            this.handlePV(this.audioConsumers.get(pv.id) + '___' + pv.id);
        }

        this.handleVB(d.id, vb.id);
        this.handleDD(d.id, peer_id, !remotePeer);
        this.popupPeerInfo(p.id, peer_info);
        this.checkPeerInfoStatus(peer_info);
        this.setVideoAvatarImgName(i.id, peer_name, peer_avatar);
        this.getId(i.id).style.display = 'block';

        if (isParticipantsListOpen) getRoomParticipants();

        if (!this.isMobileDevice && remotePeer) {
            this.setTippy(sm.id, '发送消息', 'bottom');
            this.setTippy(sf.id, '发送文件', 'bottom');
            this.setTippy(sv.id, '发送视频', 'bottom');
            this.setTippy(au.id, '静音', 'bottom');
            this.setTippy(pv.id, '🔊 音量', 'bottom');
            this.setTippy(gl.id, '地理位置', 'bottom');
            this.setTippy(ban.id, '禁止', 'bottom');
            this.setTippy(ko.id, '踢出', 'bottom');
        }

        remotePeer ? this.setPeerAudio(peer_id, peer_audio) : this.setIsAudio(peer_id, peer_audio);

        handleAspectRatio();

        console.log('[setVideoOff] Video-element-count', this.videoMediaContainer.childElementCount);

        wbUpdate();

        this.editorUpdate();

        this.handleHideMe();
    }

    removeVideoOff(peer_id) {
        const pvOff = this.getId(peer_id + '__videoOff');
        const vb = this.getId(peer_id + '__vb');

        if (vb) vb.parentNode.removeChild(vb);

        if (pvOff) {
            pvOff.parentNode.removeChild(pvOff);
            handleAspectRatio();
            console.log('[removeVideoOff] Video-element-count', this.videoMediaContainer.childElementCount);
            if (peer_id != this.peer_id) this.sound('left');
        }
    }

    // ####################################################
    // SHARE SCREEN ON JOIN
    // ####################################################

    shareScreen() {
        if (!this.isMobileDevice && (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia)) {
            this.sound('open');
            // startScreenButton.click(); // Chrome - Opera - Edge - Brave
            // handle error: getDisplayMedia requires transient activation from a user gesture on Safari - FireFox
            Swal.fire({
                background: swalBackground,
                position: 'center',
                icon: 'question',
                text: '您是否要共享屏幕？',
                showDenyButton: true,
                confirmButtonText: `是`,
                denyButtonText: `否`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result) => {
                if (result.isConfirmed) {
                    startScreenButton.click();
                    console.log('11 ----> Screen is on');
                } else {
                    console.log('11 ----> Screen is on');
                }
            });
        } else {
            console.log('11 ----> Screen is off');
        }
    }

    // ####################################################
    // EXIT ROOM
    // ####################################################

    exit(offline = false) {
        if (VideoAI.active) this.stopSession();
        if (this.rtmpFilestreamer) this.stopRTMP();
        if (this.rtmpUrlstreamer) this.stopRTMPfromURL();
        if (this.RNNoiseProcessor) this.disableRNNoiseSuppression();

        const clean = () => {
            this._isConnected = false;
            if (this.consumerTransport) this.consumerTransport.close();
            if (this.producerTransport) this.producerTransport.close();
            this.socket.off('disconnect');
            this.socket.off('newProducers');
            this.socket.off('consumerClosed');
        };

        if (!offline) {
            this.socket
                .request('exitRoom')
                .then((e) => console.log('Exit Room', e))
                .catch((e) => console.warn('Exit Room ', e))
                .finally(() => {
                    clean();
                    this.event(_EVENTS.exitRoom);
                });
        } else {
            clean();
        }
    }

    exitRoom(disconnectAll = false) {
        if (isExiting) return;
        isExiting = true;

        const switchDisconnectAllOnLeave = getId('switchDisconnectAllOnLeave');
        if (isPresenter && (disconnectAll || (switchDisconnectAllOnLeave && switchDisconnectAllOnLeave.checked))) {
            this.ejectAllOnLeave();
        }
        this.exit();

        setTimeout(() => {
            isExiting = false;
        }, 2000);
    }

    // ####################################################
    // EJECT ALL ON LEAVE ROOM
    // ####################################################

    ejectAllOnLeave() {
        const cmd = {
            type: 'ejectAll',
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            broadcast: true,
        };
        this.emitCmd(cmd);
    }

    // ####################################################
    // HELPERS
    // ####################################################

    async attachMediaStream(elem, stream, type, who) {
        let track;
        switch (type) {
            case mediaType.audio:
                track = stream.getAudioTracks()[0];
                break;
            case mediaType.video:
            case mediaType.screen:
                track = stream.getVideoTracks()[0];
                break;
            default:
                break;
        }
        const consumerStream = new MediaStream();
        consumerStream.addTrack(track);
        elem.srcObject = consumerStream;
        console.log(who + ' Success attached media ' + type);
    }

    hasUserActivation() {
        if (navigator.userActivation) return !!navigator.userActivation.isActive;
        if ('hasTransientUserActivation' in document) return !!document.hasTransientUserActivation;
        return false;
    }

    runOnNextUserActivation(callback) {
        const fire = (e) => {
            cleanup();
            try {
                // Call synchronously to keep the user-activation
                callback(e);
            } catch (err) {
                console.error('runOnNextUserActivation callback error:', err);
            }
        };
        const cleanup = () => {
            window.removeEventListener('pointerdown', fire, true);
            window.removeEventListener('click', fire, true);
            window.removeEventListener('mousedown', fire, true);
            window.removeEventListener('touchstart', fire, true);
            window.removeEventListener('keydown', fire, true);
        };
        const opts = { capture: true, once: true, passive: true };
        window.addEventListener('pointerdown', fire, opts);
        window.addEventListener('click', fire, opts);
        window.addEventListener('mousedown', fire, opts);
        window.addEventListener('touchstart', fire, opts);
        window.addEventListener('keydown', fire, opts);
    }

    async changeAudioDestination(audioElement = false) {
        const sinkId = speakerSelect?.value;
        if (!sinkId) return;

        // Defer until a user gesture if needed
        if (!this.hasUserActivation()) {
            this.pendingSinkId = sinkId;
            this.userLog('info', '点击一次以应用选定的扬声器', 'top-end', 3000);
            this.runOnNextUserActivation(() => {
                const els = audioElement ? [audioElement] : this.remoteAudioEl.querySelectorAll('audio');
                els.forEach((el) => this.attachSinkId(el, this.pendingSinkId));
                this.pendingSinkId = null;
            });
            return;
        }

        const els = audioElement ? [audioElement] : this.remoteAudioEl.querySelectorAll('audio');
        for (const el of els) {
            await this.attachSinkId(el, sinkId);
        }
    }

    async attachSinkId(elem, sinkId) {
        if (typeof elem.setSinkId !== 'function') {
            const error = `浏览器不支持输出设备选择。`;
            console.warn(error);
            this.userLog('error', error, 'top-end', 6000);
            return;
        }

        return elem
            .setSinkId(sinkId)
            .then(() => console.log(`Success, audio output device attached: ${sinkId}`))
            .catch((err) => {
                console.error('Attach SinkId error: ', err);
                const speakerSel = this.getId('speakerSelect');
                if (err?.name === 'SecurityError') {
                    const msg = `请使用HTTPS选择音频输出设备：${err.message || err}`;
                    console.error('Attach SinkId error: ', msg);
                    this.userLog('error', msg, 'top-end', 6000);
                } else if (err?.name === 'NotAllowedError' || /user gesture/i.test(err?.message || '')) {
                    // Retry on next user gesture
                    this.userLog('info', '点击以允许更换发言人', 'top-end', 4000);
                    this.pendingSinkId = sinkId;
                    this.runOnNextUserActivation(() => this.attachSinkId(elem, this.pendingSinkId));
                } else {
                    this.userLog('warning', 'Attach SinkId 错误', err, 'top-end', 6000);
                }
                if (speakerSel) speakerSel.selectedIndex = 0;
                refreshLsDevices();
            });
    }

    event(evt) {
        if (this.eventListeners.has(evt)) {
            this.eventListeners.get(evt).forEach((callback) => callback());
        }
    }

    on(evt, callback) {
        this.eventListeners.get(evt).push(callback);
    }

    // ####################################################
    // SET
    // ####################################################

    setTippy(elem, content, placement, allowHTML = false) {
        if (this.isMobileDevice) return;
        const element = this.getId(elem);
        if (element) {
            if (element._tippy) {
                element._tippy.destroy();
            }
            try {
                tippy(element, {
                    content: content,
                    placement: placement,
                    allowHTML: allowHTML,
                });
            } catch (err) {
                console.error('setTippy error', err.message);
            }
        } else {
            console.warn('setTippy element not found with content', content);
        }
    }

    setVideoAvatarImgName(elemId, peer_name, peer_avatar = false) {
        let elem = this.getId(elemId);
        if (peer_avatar && rc.isImageURL(peer_avatar)) {
            elem.setAttribute('src', peer_avatar);
        } else if (cfg.useAvatarSvg) {
            rc.isValidEmail(peer_name)
                ? elem.setAttribute('src', this.genGravatar(peer_name))
                : elem.setAttribute('src', this.genAvatarSvg(peer_name, 250));
        } else {
            elem.setAttribute('src', image.avatar);
        }
    }

    genGravatar(email, size = false) {
        const hash = md5(email.toLowerCase().trim());
        const gravatarURL = `https://www.gravatar.com/avatar/${hash}` + (size ? `?s=${size}` : '?s=250') + '?d=404';
        return gravatarURL;
        function md5(input) {
            return CryptoJS.MD5(input).toString();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }

    genAvatarSvg(peerName, avatarImgSize) {
        const charCodeRed = peerName.charCodeAt(0);
        const charCodeGreen = peerName.charCodeAt(1) || charCodeRed;
        const red = Math.pow(charCodeRed, 7) % 200;
        const green = Math.pow(charCodeGreen, 7) % 200;
        const blue = (red + green) % 200;
        const bgColor = `rgb(${red}, ${green}, ${blue})`;
        const textColor = '#ffffff';
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        width="${avatarImgSize}px" 
        height="${avatarImgSize}px" 
        viewBox="0 0 ${avatarImgSize} ${avatarImgSize}" 
        version="1.1">
            <circle 
                fill="${bgColor}" 
                width="${avatarImgSize}" 
                height="${avatarImgSize}" 
                cx="${avatarImgSize / 2}" 
                cy="${avatarImgSize / 2}" 
                r="${avatarImgSize / 2}"
            />
            <text 
                x="50%" 
                y="50%" 
                style="color:${textColor}; 
                line-height:1; 
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                alignment-baseline="middle" 
                text-anchor="middle" 
                font-size="${Math.round(avatarImgSize * 0.4)}" 
                font-weight="normal" 
                dy=".1em" 
                dominant-baseline="middle" 
                fill="${textColor}">${peerName.substring(0, 2).toUpperCase()}
            </text>
        </svg>`;
        return 'data:image/svg+xml,' + svg.replace(/#/g, '%23').replace(/"/g, "'").replace(/&/g, '&amp;');
    }

    setPeerAudio(peer_id, status) {
        console.log('Set peer audio enabled: ' + status);
        const audioStatus = this.getPeerAudioBtn(peer_id); // producer, consumers
        const audioVolume = this.getPeerAudioVolumeBar(peer_id); // consumers
        if (audioStatus) audioStatus.className = status ? html.audioOn : html.audioOff;
        if (audioVolume) status ? show(audioVolume) : hide(audioVolume);
    }

    setIsAudio(peer_id, status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            console.log('Set local audio enabled: ' + status);
            this.peer_info.peer_audio = status;
            const audioStatus = this.getPeerAudioBtn(peer_id); // producer, consumers
            const audioVolume = this.getPeerAudioVolumeBar(peer_id); // consumers
            if (audioStatus) audioStatus.className = status ? html.audioOn : html.audioOff;
            if (audioVolume) status ? show(audioVolume) : hide(audioVolume);
        }
    }

    setIsVideo(status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.peer_info.peer_video = status;
            if (!this.peer_info.peer_video) {
                console.log('Set local video enabled: ' + status);
                this.setVideoOff(this.peer_info, false);
                this.sendVideoOff();
            }
        }
    }

    setIsScreen(status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.peer_info.peer_screen = status;
            if (!this.peer_info.peer_screen && !this.peer_info.peer_video) {
                console.log('Set local screen enabled: ' + status);
                this.setVideoOff(this.peer_info, false);
                this.sendVideoOff();
            }
        }
    }

    sendVideoOff() {
        this.socket.emit('setVideoOff', this.peer_info);
    }

    // ####################################################
    // GET
    // ####################################################

    isConnected() {
        return this._isConnected;
    }

    isRecording() {
        return this._isRecording;
    }

    static get mediaType() {
        return mediaType;
    }

    static get EVENTS() {
        return _EVENTS;
    }

    getTimeNow() {
        return new Date().toTimeString().split(' ')[0];
    }

    getId(id) {
        return document.getElementById(id);
    }

    getName(name) {
        return document.getElementsByName(name)[0];
    }

    getEcN(cn) {
        return document.getElementsByClassName(cn);
    }

    async getRoomInfo() {
        let room_info = await this.socket.request('getRoomInfo');
        return room_info;
    }

    refreshParticipantsCount() {
        this.socket.emit('refreshParticipantsCount');
    }

    getPeerAudioBtn(peer_id) {
        return this.getId(peer_id + '__audio');
    }

    getPeerAudioVolumeBar(peer_id) {
        return this.getId(peer_id + '___pVolume');
    }

    getPeerHandBtn(peer_id) {
        return this.getId(peer_id + '__hand');
    }

    getMapKeyByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue) return key;
        }
    }

    getSelectedIndexValue(elem) {
        return elem.options[elem.selectedIndex].value;
    }

    // ####################################################
    // UTILITY
    // ####################################################

    async sound(name, force = false, path = '../sounds/', ext = '.wav') {
        if (!isSoundEnabled && !force) return;
        let sound = path + name + ext;
        let audio = new Audio(sound);
        try {
            audio.volume = 0.5;
            await audio.play();
        } catch (err) {
            return false;
        }
    }

    userLog(icon, message, position, timer = 5000) {
        const Toast = Swal.mixin({
            background: swalBackground,
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
        });
        switch (icon) {
            case 'html':
                Toast.fire({
                    icon: icon,
                    html: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            default:
                Toast.fire({
                    icon: icon,
                    title: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
        }
    }

    toast(icon, title, text, position = 'top-end', timer = 5000, sound = false) {
        if (sound) this.sound('alert');

        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            background: swalBackground,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });
        Toast.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    msgPopup(type, message, timer = 3000, position = 'center') {
        switch (type) {
            case 'warning':
            case 'error':
                Swal.fire({
                    background: swalBackground,
                    position: position,
                    icon: type,
                    title: type,
                    text: message,
                    showClass: { popup: 'animate__animated animate__rubberBand' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                this.sound('alert');
                break;
            case 'info':
            case 'success':
                Swal.fire({
                    background: swalBackground,
                    position: position,
                    icon: type,
                    title: type,
                    text: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            case 'html':
                Swal.fire({
                    background: swalBackground,
                    position: position,
                    icon: type,
                    html: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            case 'toast':
                const Toast = Swal.mixin({
                    background: swalBackground,
                    position: 'top-end',
                    icon: 'info',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    toast: true,
                    timer: timer,
                });
                Toast.fire({
                    icon: 'info',
                    title: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            // ......
            default:
                alert(message);
        }
    }

    msgHTML(data, icon, imageUrl, title, html, position = 'center') {
        switch (data.type) {
            case 'recording':
                switch (data.action) {
                    case enums.recording.started:
                    case enums.recording.start:
                        html = html + '<br/>您的出席意味着您同意被记录';
                        toastMessage(6000);
                        break;
                    case enums.recording.stop:
                        toastMessage(3000);
                        break;
                    //...
                    default:
                        break;
                }
                if (!this.speechInMessages) this.speechText(`${data.peer_name} ${data.action}`);
                break;
            //...
            default:
                defaultMessage();
                break;
        }
        // TOAST less invasive
        function toastMessage(duration = 3000) {
            const Toast = Swal.mixin({
                background: swalBackground,
                position: 'top-end',
                icon: icon,
                showConfirmButton: false,
                timerProgressBar: true,
                toast: true,
                timer: duration,
            });
            Toast.fire({
                title: title,
                html: html,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
        // DEFAULT
        function defaultMessage() {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: swalBackground,
                position: position,
                icon: icon,
                imageUrl: imageUrl,
                title: title,
                html: html,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
        //...
    }

    thereAreParticipants() {
        // console.log('participantsCount ---->', participantsCount);
        return this.consumers.size > 0 || participantsCount > 1;
    }

    // ####################################################
    // MY SETTINGS
    // ####################################################

    toggleMySettings() {
        let mySettings = this.getId('mySettings');
        mySettings.style.top = '50%';
        mySettings.style.left = '50%';
        if (this.isMobileDevice) {
            mySettings.style.width = '100%';
            mySettings.style.height = '100%';
        }
        mySettings.classList.toggle('show');
        this.isMySettingsOpen = !this.isMySettingsOpen;
        this.videoMediaContainer.style.opacity = this.isMySettingsOpen ? 0.3 : 1;
    }

    openTab(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = this.getEcN('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = this.getEcN('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        this.getId(tabName).style.display = 'block';
        evt.currentTarget.className += ' active';
    }

    changeBtnsBarPosition(position) {
        switch (position) {
            case 'vertical':
                document.documentElement.style.setProperty('--btns-top', '50%');
                document.documentElement.style.setProperty('--btns-right', '0%');
                document.documentElement.style.setProperty('--btns-left', '10px');
                document.documentElement.style.setProperty('--btns-margin-left', '0px');
                document.documentElement.style.setProperty('--btns-width', '60px');
                document.documentElement.style.setProperty('--btns-flex-direction', 'column');
                // bottomButtons horizontally
                document.documentElement.style.setProperty('--bottom-btns-top', 'auto');
                document.documentElement.style.setProperty('--bottom-btns-left', '50%');
                document.documentElement.style.setProperty('--bottom-btns-bottom', '0');
                document.documentElement.style.setProperty('--bottom-btns-translate-X', '-50%');
                document.documentElement.style.setProperty('--bottom-btns-translate-Y', '0%');
                document.documentElement.style.setProperty('--bottom-btns-margin-bottom', '16px');
                document.documentElement.style.setProperty('--bottom-btns-flex-direction', 'row');
                break;
            case 'horizontal':
                document.documentElement.style.setProperty('--btns-top', '95%');
                document.documentElement.style.setProperty('--btns-right', '25%');
                document.documentElement.style.setProperty('--btns-left', '50%');
                document.documentElement.style.setProperty('--btns-margin-left', '-240px');
                document.documentElement.style.setProperty('--btns-width', '480px');
                document.documentElement.style.setProperty('--btns-flex-direction', 'row');
                // bottomButtons vertically
                document.documentElement.style.setProperty('--bottom-btns-top', '50%');
                document.documentElement.style.setProperty('--bottom-btns-left', '15px');
                document.documentElement.style.setProperty('--bottom-btns-bottom', 'auto');
                document.documentElement.style.setProperty('--bottom-btns-translate-X', '0%');
                document.documentElement.style.setProperty('--bottom-btns-translate-Y', '-50%');
                document.documentElement.style.setProperty('--bottom-btns-margin-bottom', '0');
                document.documentElement.style.setProperty('--bottom-btns-flex-direction', 'column');
                break;
            default:
                break;
        }
    }

    // ####################################################
    // PICTURE IN PICTURE
    // ####################################################

    handlePIP(elemId, pipId) {
        let videoPlayer = this.getId(elemId);
        let btnPIP = this.getId(pipId);
        if (btnPIP) {
            btnPIP.addEventListener('click', () => {
                if (videoPlayer.pictureInPictureElement) {
                    videoPlayer.exitPictureInPicture();
                } else if (document.pictureInPictureEnabled) {
                    videoPlayer.requestPictureInPicture().catch((error) => {
                        console.error('Failed to enter Picture-in-Picture mode:', error);
                        this.userLog('warning', error.message, 'top-end', 6000);
                        elemDisplay(btnPIP.id, false);
                    });
                }
            });
        }
        if (videoPlayer) {
            videoPlayer.addEventListener('leavepictureinpicture', (event) => {
                console.log('Exited PiP mode');
                if (videoPlayer.paused) {
                    videoPlayer.play().catch((error) => {
                        console.error('Error playing video after exit PIP mode:', error);
                    });
                }
            });
        }
    }

    // ####################################################
    // HANDLE DOCUMENT PIP
    // ####################################################

    async toggleDocumentPIP() {
        if (documentPictureInPicture.window) {
            documentPictureInPicture.window.close();
            console.log('DOCUMENT PIP close');
            return;
        }
        await this.documentPictureInPictureOpen();
    }

    documentPictureInPictureClose() {
        if (!showDocumentPipBtn) return;
        if (documentPictureInPicture.window) {
            documentPictureInPicture.window.close();
            console.log('DOCUMENT PIP close');
        }
    }

    async documentPictureInPictureOpen() {
        if (!showDocumentPipBtn) return;
        try {
            const pipWindow = await documentPictureInPicture.requestWindow({
                width: 300,
                height: 720,
            });

            function updateCustomProperties() {
                const documentStyle = getComputedStyle(document.documentElement);

                pipWindow.document.documentElement.style = `
                    --body-bg: ${documentStyle.getPropertyValue('--body-bg')};
                `;
            }

            updateCustomProperties();

            const pipStylesheet = document.createElement('link');
            const pipVideoContainer = document.createElement('div');

            pipStylesheet.type = 'text/css';
            pipStylesheet.rel = 'stylesheet';
            pipStylesheet.href = '../css/DocumentPiP.css';

            pipVideoContainer.className = 'pipVideoContainer';

            pipWindow.document.head.append(pipStylesheet);
            pipWindow.document.body.append(pipVideoContainer);

            function cloneVideoElements() {
                let foundVideo = false;

                pipVideoContainer.innerHTML = '';

                [...document.querySelectorAll('video')].forEach((video) => {
                    console.log('DOCUMENT PIP found video id -----> ' + video.id);

                    // No video stream detected or is video share from URL...
                    if (!video.srcObject || video.id === '__videoShare') return;

                    const videoElement = rc.getId(video.id);

                    const isPIPAllowed = !videoElement.classList.contains('videoCircle'); // Check if not in privacy mode

                    const logMessage = [rc.videoProducerId, rc.screenProducerId].includes(video.id)
                        ? `DOCUMENT PIP PRODUCER: PiP allowed? -----> ${isPIPAllowed}`
                        : `DOCUMENT PIP CONSUMER: PiP allowed? -----> ${isPIPAllowed}`;

                    console.log(logMessage);

                    if (!isPIPAllowed) return;

                    // Video is ON and not in privacy mode continue....

                    foundVideo = true;

                    const pipVideo = document.createElement('video');

                    pipVideo.classList.add('pipVideo');
                    pipVideo.classList.toggle('mirror', video.classList.contains('mirror'));
                    pipVideo.srcObject = video.srcObject;
                    pipVideo.autoplay = true;
                    pipVideo.muted = true;

                    pipVideoContainer.append(pipVideo);

                    const videoElementObserver = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                                // Handle class changes in video elements
                                console.log(`Video ${mutation.target.id} class changed:`, mutation.target.className);
                                cloneVideoElements();
                            }
                        });
                    });

                    // Start observing for new videos and class changes
                    videoElementObserver.observe(video, { attributes: true, attributeFilter: ['class'] });
                });

                return foundVideo;
            }

            if (!cloneVideoElements()) {
                rc.documentPictureInPictureClose();
                return userLog('warning', '不允许在Document PIP中插入视频', 'top-end', 6000);
            }

            const videoObserver = new MutationObserver(() => {
                cloneVideoElements();
            });

            videoObserver.observe(rc.videoMediaContainer, {
                childList: true,
            });

            const documentObserver = new MutationObserver(() => {
                updateCustomProperties();
            });

            documentObserver.observe(document.documentElement, {
                attributeFilter: ['style'],
            });

            pipWindow.addEventListener('unload', () => {
                videoObserver.disconnect();
                documentObserver.disconnect();
            });
        } catch (err) {
            userLog('warning', err.message, 'top-end', 6000);
        }
    }

    // ####################################################
    // FULL SCREEN
    // ####################################################

    isFullScreenSupported() {
        const fsSupported =
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;

        fsSupported ? this.handleFullScreenEvents() : (this.getId('fullScreenButton').style.display = 'none');

        return fsSupported;
    }

    handleFullScreenEvents() {
        document.addEventListener('fullscreenchange', (e) => {
            const fullscreenElement = document.fullscreenElement;
            if (!fullscreenElement) {
                const fullScreenIcon = this.getId('fullScreenIcon');
                fullScreenIcon.className = html.fullScreenOff;
                this.isDocumentOnFullScreen = false;
            }
        });
    }

    toggleRoomFullScreen() {
        const fullScreenIcon = this.getId('fullScreenIcon');
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullScreenIcon.className = html.fullScreenOn;
            this.isDocumentOnFullScreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullScreenIcon.className = html.fullScreenOff;
                this.isDocumentOnFullScreen = false;
            }
        }
    }

    toggleFullScreen(elem = null) {
        if (this.isDocumentOnFullScreen) return;
        const element = elem ? elem : document.documentElement;
        const fullScreen = this.isFullScreen();
        fullScreen ? this.goOutFullscreen(element) : this.goInFullscreen(element);
        if (elem === null) this.isVideoOnFullScreen = fullScreen;
    }

    isFullScreen() {
        const elementFullScreen =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null;
        if (elementFullScreen === null) return false;
        return true;
    }

    goInFullscreen(element) {
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
        else if (element.msRequestFullscreen) element.msRequestFullscreen();
        else this.userLog('warning', '此设备上的浏览器不支持全屏模式', 'top-end');
    }

    goOutFullscreen(element) {
        if (element.exitFullscreen) element.exitFullscreen();
        else if (element.mozCancelFullScreen) element.mozCancelFullScreen();
        else if (element.webkitExitFullscreen) element.webkitExitFullscreen();
        else if (element.msExitFullscreen) element.msExitFullscreen();
    }

    handleFS(elemId, fsId) {
        let videoPlayer = this.getId(elemId);
        let btnFs = this.getId(fsId);
        if (videoPlayer && btnFs) {
            this.setTippy(fsId, 'Full screen', 'bottom');
            btnFs.addEventListener('click', () => {
                if (videoPlayer.classList.contains('videoCircle')) {
                    return this.userLog('info', '如果视频处于隐私模式不允许开启全屏', 'top-end');
                }
                videoPlayer.style.pointerEvents = this.isVideoOnFullScreen ? 'auto' : 'none';
                this.toggleFullScreen(videoPlayer);
            });
            videoPlayer.addEventListener('fullscreenchange', (e) => {
                if (!document.fullscreenElement) {
                    videoPlayer.style.pointerEvents = 'auto';
                    this.isVideoOnFullScreen = false;
                }
            });
            videoPlayer.addEventListener('webkitfullscreenchange', (e) => {
                if (!document.webkitIsFullScreen) {
                    videoPlayer.style.pointerEvents = 'auto';
                    this.isVideoOnFullScreen = false;
                }
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO | OBJ FIT | CONTROLS | PIN-UNPIN
    // ####################################################

    handleVideoObjectFit(value) {
        document.documentElement.style.setProperty('--videoObjFit', value);
    }

    handleVideoControls(value) {
        isVideoControlsOn = value == 'on' ? true : false;
        let cameras = this.getEcN('Camera');
        for (let i = 0; i < cameras.length; i++) {
            let cameraId = cameras[i].id.replace('__video', '');
            let videoPlayer = this.getId(cameraId);
            videoPlayer.hasAttribute('controls')
                ? videoPlayer.removeAttribute('controls')
                : videoPlayer.setAttribute('controls', isVideoControlsOn);
        }
    }

    handlePN(elemId, pnId, camId, isScreen = false, isAvatar = false, eVcId = null) {
        let videoPlayer = this.getId(elemId);
        let btnPn = this.getId(pnId);
        let cam = this.getId(camId);
        let eVc = this.getId(eVcId);
        if (btnPn && videoPlayer && cam) {
            btnPn.addEventListener('click', () => {
                if (this.isMobileDevice) return;
                this.sound('click');
                this.isVideoPinned = !this.isVideoPinned;
                if (this.isVideoPinned) {
                    if (!videoPlayer.classList.contains('videoCircle')) {
                        videoPlayer.style.objectFit = 'contain';
                    }
                    cam.className = '';
                    cam.style.width = '100%';
                    cam.style.height = '100%';
                    this.toggleVideoPin(pinVideoPosition.value);
                    if (eVc) this.videoPinMediaContainer.appendChild(eVc);
                    this.videoPinMediaContainer.appendChild(cam);
                    this.videoPinMediaContainer.style.display = 'block';
                    this.pinnedVideoPlayerId = elemId;
                    setColor(btnPn, 'lime');
                } else {
                    if (this.pinnedVideoPlayerId != videoPlayer.id) {
                        this.isVideoPinned = true;
                        if (this.isScreenAllowed) return;
                        return this.msgPopup('toast', '另一个视频似乎被固定了，在固定这个之前先解固定那个');
                    }
                    if (!isScreen && !isBroadcastingEnabled) videoPlayer.style.objectFit = 'var(--videoObjFit)';
                    this.videoPinMediaContainer.removeChild(cam);
                    if (eVc) {
                        this.videoPinMediaContainer.removeChild(eVc);
                        cam.appendChild(eVc);
                    }
                    cam.className = 'Camera';
                    this.videoMediaContainer.appendChild(cam);
                    this.removeVideoPinMediaContainer();
                    setColor(btnPn, 'white');
                }
                this.resizeVideoMenuBar();
                handleAspectRatio();
            });

            if (isAvatar && !this.isMobileDevice && this.videoMediaContainer.childElementCount > 1) btnPn.click();
        }
    }

    toggleVideoPin(position) {
        if (!this.isVideoPinned) return;
        switch (position) {
            case 'top':
                this.videoPinMediaContainer.style.top = '25%';
                this.videoPinMediaContainer.style.width = '100%';
                this.videoPinMediaContainer.style.height = '75%';
                this.videoMediaContainer.style.top = '0%';
                this.videoMediaContainer.style.right = null;
                this.videoMediaContainer.style.width = null;
                this.videoMediaContainer.style.width = '100% !important';
                this.videoMediaContainer.style.height = '25%';
                break;
            case 'vertical':
                this.videoPinMediaContainer.style.top = 0;
                this.videoPinMediaContainer.style.width = '75%';
                this.videoPinMediaContainer.style.height = '100%';
                this.videoMediaContainer.style.top = 0;
                this.videoMediaContainer.style.width = '25%';
                this.videoMediaContainer.style.height = '100%';
                this.videoMediaContainer.style.right = 0;
                break;
            case 'horizontal':
                this.videoPinMediaContainer.style.top = 0;
                this.videoPinMediaContainer.style.width = '100%';
                this.videoPinMediaContainer.style.height = '75%';
                this.videoMediaContainer.style.top = '75%';
                this.videoMediaContainer.style.right = null;
                this.videoMediaContainer.style.width = null;
                this.videoMediaContainer.style.width = '100% !important';
                this.videoMediaContainer.style.height = '25%';
                break;
            default:
                break;
        }
        resizeVideoMedia();
    }

    // ####################################################
    // HANDLE VIDEO ZOOM-IN/OUT
    // ####################################################

    handleZV(elemId, divId, peerId) {
        let videoPlayer = this.getId(elemId);
        let videoWrap = this.getId(divId);
        let videoPeerId = peerId;
        let zoom = 1;

        const ZOOM_IN_FACTOR = 1.1;
        const ZOOM_OUT_FACTOR = 0.9;
        const MAX_ZOOM = 15;
        const MIN_ZOOM = 1;

        if (this.isZoomCenterMode) {
            if (videoPlayer) {
                videoPlayer.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                    delta > 0 ? (zoom *= 1.2) : (zoom /= 1.2);
                    if (zoom < 1) zoom = 1;
                    videoPlayer.style.scale = zoom;
                });
            }
        } else {
            if (videoPlayer && videoWrap) {
                videoPlayer.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    if (isVideoPrivacyActive) return;
                    const rect = videoWrap.getBoundingClientRect();
                    const cursorX = e.clientX - rect.left;
                    const cursorY = e.clientY - rect.top;
                    const zoomDirection = e.deltaY > 0 ? 'zoom-out' : 'zoom-in';
                    const scaleFactor = zoomDirection === 'zoom-out' ? ZOOM_OUT_FACTOR : ZOOM_IN_FACTOR;
                    zoom *= scaleFactor;
                    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
                    videoPlayer.style.transformOrigin = `${cursorX}px ${cursorY}px`;
                    videoPlayer.style.transform = `scale(${zoom})`;
                    videoPlayer.style.cursor = zoom === 1 ? 'pointer' : zoomDirection;
                });

                videoWrap.addEventListener('mouseleave', () => {
                    videoPlayer.style.cursor = 'pointer';
                    if (videoPeerId === this.peer_id) {
                        zoom = 1;
                        videoPlayer.style.transform = '';
                        videoPlayer.style.transformOrigin = 'center';
                    }
                });
                videoPlayer.addEventListener('mouseleave', () => {
                    videoPlayer.style.cursor = 'pointer';
                });
            }
        }
    }

    // ####################################################
    // HANDLE VIDEO AND MENU BAR
    // ####################################################

    handleVB(videoId, videoBarId, eBtnId = null, eVcId = null) {
        const videoPlayer = this.getId(videoId);
        const videoBar = this.getId(videoBarId);
        const eBtn = this.getId(eBtnId);
        const eVc = this.getId(eVcId);

        if (eBtn && eVc) {
            const showDropdown = () => {
                eVc.classList.add('show');
                rc.isVideoBarDropDownOpen = true;
            };
            const hideDropdown = () => {
                eVc.classList.remove('show');
                rc.isVideoBarDropDownOpen = false;
            };

            const handleDocumentClick = (e) => {
                if (!eBtn.contains(e.target) && !eVc.contains(e.target)) {
                    hideDropdown();
                }
            };

            if (this.isDesktopDevice) {
                eBtn.addEventListener('mouseenter', showDropdown);
                eVc.addEventListener('mouseleave', hideDropdown);
            } else {
                eBtn.addEventListener('click', showDropdown);
                document.addEventListener('click', handleDocumentClick);
            }
            eVc.addEventListener('click', hideDropdown);
        }

        if (videoPlayer && videoBar) {
            const eventType = this.isDesktopDevice ? 'mouseenter' : 'click';
            videoPlayer.addEventListener(eventType, async () => {
                hideVideoMenuBar(videoBarId);
                rc.resizeVideoMenuBar();
                setCamerasBorderNone();
                if (videoBar.classList.contains('hidden')) {
                    show(videoBar);
                    animateCSS(videoBar, 'fadeInDown');
                    if (participantsCount > 1) {
                        videoPlayer.style.setProperty('border', 'var(--videoBar-active)', 'important');
                    }
                } else {
                    setCamerasBorderNone();
                    hide(videoBar);
                }
            });

            if (this.isDesktopDevice) {
                videoPlayer.addEventListener('mouseleave', () => {
                    setCamerasBorderNone();
                    hideVideoMenuBar('ALL');
                });
            }
        }
    }

    resizeVideoMenuBar() {
        const somethingPinned =
            this.isVideoPinned ||
            this.isChatPinned ||
            this.isEditorPinned ||
            this.isPollPinned ||
            transcription.isPin();
        const menuBarWidth =
            this.isVideoPinned || this.isChatPinned || this.isPollPinned || transcription.isPin() ? '75%' : '70%';
        const videoMenuBar = rc.getEcN('videoMenuBar');
        for (let i = 0; i < videoMenuBar.length; i++) {
            const menuBar = videoMenuBar[i];
            menuBar.style.width = this.isMobileDevice && somethingPinned ? menuBarWidth : '100%';
        }
    }

    // ####################################################
    // REMOVE VIDEO PIN MEDIA CONTAINER
    // ####################################################

    removeVideoPinMediaContainer() {
        this.videoPinMediaContainer.style.display = 'none';
        this.videoMediaContainerUnpin();
        this.pinnedVideoPlayerId = null;
        this.isVideoPinned = false;
        if (this.isChatPinned) {
            this.chatPin();
        }
        if (this.isPollPinned) {
            this.pollPin();
        }
        if (this.isEditorPinned) {
            this.editorPin();
        }
        if (this.transcription.isPin()) {
            this.transcription.pinned();
        }
    }

    videoMediaContainerPin() {
        this.videoMediaContainer.style.top = 0;
        this.videoMediaContainer.style.width = '75%';
        this.videoMediaContainer.style.height = '100%';
        this.resizeVideoMenuBar();
    }

    videoMediaContainerUnpin() {
        this.videoMediaContainer.style.top = 0;
        this.videoMediaContainer.style.right = null;
        this.videoMediaContainer.style.width = '100%';
        this.videoMediaContainer.style.height = '100%';
        this.resizeVideoMenuBar();
    }

    adaptVideoObjectFit(index) {
        // 1 (cover) 2 (contain)
        BtnVideoObjectFit.selectedIndex = index;
        BtnVideoObjectFit.onchange();
    }

    // ####################################################
    // TAKE SNAPSHOT
    // ####################################################

    handleTS(elemId, tsId) {
        let videoPlayer = this.getId(elemId);
        let btnTs = this.getId(tsId);
        if (btnTs && videoPlayer) {
            btnTs.addEventListener('click', () => {
                if (videoPlayer.classList.contains('videoCircle')) {
                    return this.userLog('info', '在隐私模式下不允许截屏', 'top-end');
                }
                this.sound('snapshot');
                let context, canvas, width, height, dataURL;
                width = videoPlayer.videoWidth;
                height = videoPlayer.videoHeight;
                canvas = canvas || document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                context = canvas.getContext('2d');
                context.drawImage(videoPlayer, 0, 0, width, height);
                dataURL = canvas.toDataURL('image/png');
                // console.log(dataURL);
                saveDataToFile(dataURL, getDataTimeString() + '-SNAPSHOT.png');
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO MIRROR
    // ####################################################

    handleMV(elemId, tsId) {
        let videoPlayer = this.getId(elemId);
        let btnMv = this.getId(tsId);
        if (btnMv && videoPlayer) {
            btnMv.addEventListener('click', () => {
                videoPlayer.classList.toggle('mirror');
            });
        }
    }

    // ####################################################
    // VIDEO CIRCLE - PRIVACY MODE
    // ####################################################

    handleVP(elemId, vpId) {
        const startVideoInPrivacyMode =
            this._moderator.video_start_privacy || localStorageSettings.moderator_video_start_privacy;
        let videoPlayer = this.getId(elemId);
        let btnVp = this.getId(vpId);
        if (btnVp && videoPlayer) {
            btnVp.addEventListener('click', () => {
                this.sound('click');
                this.toggleVideoPrivacyMode();
            });

            if (startVideoInPrivacyMode) {
                btnVp.click();
            }
        }
    }

    toggleVideoPrivacyMode() {
        isVideoPrivacyActive = !isVideoPrivacyActive;
        this.setVideoPrivacyStatus(this.peer_id, isVideoPrivacyActive);
        this.emitCmd({
            type: 'privacy',
            peer_id: this.peer_id,
            active: isVideoPrivacyActive,
            broadcast: true,
        });
    }

    setVideoPrivacyStatus(elemName, privacy) {
        let videoPlayer = this.getName(elemName);
        if (!videoPlayer) return;
        if (privacy) {
            videoPlayer.classList.remove('videoDefault');
            videoPlayer.classList.add('videoCircle');
            videoPlayer.style.objectFit = 'cover';
        } else {
            videoPlayer.classList.remove('videoCircle');
            videoPlayer.classList.add('videoDefault');
            videoPlayer.style.objectFit = 'var(--videoObjFit)';
        }
    }

    // ####################################################
    // DRAGGABLE
    // ####################################################

    makeDraggable(elmnt, dragObj) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (dragObj) {
            dragObj.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
            elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    makeUnDraggable(elmnt, dragObj) {
        if (dragObj) {
            dragObj.onmousedown = null;
        } else {
            elmnt.onmousedown = null;
        }
        elmnt.style.top = '';
        elmnt.style.left = '';
    }

    // ####################################################
    // CHAT
    // ####################################################

    handleSM(uid, name) {
        const words = uid.split('___');
        let peer_id = words[1];
        let peer_name = name;
        let btnSm = this.getId(uid);
        if (btnSm) {
            btnSm.addEventListener('click', () => {
                this.sendMessageTo(peer_id, peer_name);
            });
        }
    }

    isPlistOpen() {
        const plist = this.getId('plist');
        return !plist.classList.contains('hidden');
    }

    async toggleChat() {
        const chatRoom = this.getId('chatRoom');
        chatRoom.classList.toggle('show');
        if (!this.isChatOpen) {
            await getRoomParticipants();
            hide(chatMinButton);

            if (!this.isMobileDevice) {
                BUTTONS.chat.chatMaxButton && show(chatMaxButton);
            }
            this.chatCenter();
            this.sound('open');
            this.showPeerAboutAndMessages(this.chatPeerId, this.chatPeerName, this.chatPeerAvatar);
        }
        isParticipantsListOpen = !isParticipantsListOpen;
        this.isChatOpen = !this.isChatOpen;

        if (this.isChatPinned) this.chatUnpin();

        if (!this.isMobileDevice && this.isChatOpen && this.canBePinned()) {
            this.toggleChatPin();
        }

        resizeChatRoom();
    }

    toggleShowParticipants() {
        const plist = this.getId('plist');
        const chat = this.getId('chat');
        plist.classList.toggle('hidden');
        const isParticipantsListHidden = !this.isPlistOpen();
        chat.style.marginLeft = isParticipantsListHidden ? 0 : '300px';
        chat.style.borderLeft = isParticipantsListHidden ? 'none' : '1px solid rgb(255 255 255 / 32%)';
        if (this.isChatPinned) elemDisplay(chat.id, isParticipantsListHidden);
        if (!this.isChatPinned) elemDisplay(chat.id, true);
        this.toggleChatHistorySize(isParticipantsListHidden && (this.isChatPinned || this.isChatMaximized));
        plist.style.width = this.isChatPinned || this.isMobileDevice ? '100%' : '300px';
        plist.style.position = this.isMobileDevice ? 'fixed' : 'absolute';
    }

    toggleChatHistorySize(max = true) {
        const chatHistory = this.getId('chatHistory');
        chatHistory.style.minHeight = max ? 'calc(100vh - 210px)' : '490px';
        chatHistory.style.maxHeight = max ? 'calc(100vh - 210px)' : '490px';
    }

    toggleChatPin() {
        if (transcription.isPin()) {
            return userLog('info', '请取消固定当前已固定的转录', 'top-end');
        }
        if (this.isPollPinned) {
            return userLog('info', '请取消固定当前已固定的投票', 'top-end');
        }
        if (this.isEditorPinned) {
            return userLog('info', '请取消固定当前已固定的编辑器', 'top-end');
        }
        this.isChatPinned ? this.chatUnpin() : this.chatPin();
        this.sound('click');
    }

    chatMaximize() {
        this.isChatMaximized = true;
        hide(chatMaxButton);
        BUTTONS.chat.chatMaxButton && show(chatMinButton);
        this.chatCenter();
        document.documentElement.style.setProperty('--msger-width', '100%');
        document.documentElement.style.setProperty('--msger-height', '100%');
        this.toggleChatHistorySize(true);
    }

    chatMinimize() {
        this.isChatMaximized = false;
        hide(chatMinButton);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        if (this.isChatPinned) {
            this.chatPin();
        } else {
            this.chatCenter();
            document.documentElement.style.setProperty('--msger-width', '800px');
            document.documentElement.style.setProperty('--msger-height', '700px');
            this.toggleChatHistorySize(false);
        }
    }

    canBePinned() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        return viewportWidth >= 1024 && viewportHeight >= 768;
    }

    chatPin() {
        if (!this.isVideoPinned) {
            this.videoMediaContainerPin();
        }
        this.chatPinned();
        this.isChatPinned = true;
        setColor(chatTogglePin, 'lime');
        this.resizeVideoMenuBar();
        resizeVideoMedia();
        chatRoom.style.resize = 'none';
        if (!this.isMobileDevice) this.makeUnDraggable(chatRoom, chatHeader);
        if (this.isPlistOpen()) this.toggleShowParticipants();
        if (chatRoom.classList.contains('container')) chatRoom.classList.remove('container');
    }

    chatUnpin() {
        if (!this.isVideoPinned) {
            this.videoMediaContainerUnpin();
        }
        document.documentElement.style.setProperty('--msger-width', '800px');
        document.documentElement.style.setProperty('--msger-height', '700px');
        hide(chatMinButton);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        this.chatCenter();
        this.isChatPinned = false;
        setColor(chatTogglePin, 'white');
        this.resizeVideoMenuBar();
        resizeVideoMedia();
        if (!this.isMobileDevice) this.makeDraggable(chatRoom, chatHeader);
        if (!this.isPlistOpen()) this.toggleShowParticipants();
        if (!chatRoom.classList.contains('container')) chatRoom.classList.add('container');
        resizeChatRoom();
    }

    chatCenter() {
        chatRoom.style.position = 'fixed';
        chatRoom.style.transform = 'translate(-50%, -50%)';
        chatRoom.style.top = '50%';
        chatRoom.style.left = '50%';
    }

    chatPinned() {
        chatRoom.style.position = 'absolute';
        chatRoom.style.top = 0;
        chatRoom.style.right = 0;
        chatRoom.style.left = null;
        chatRoom.style.transform = null;
        document.documentElement.style.setProperty('--msger-width', '25%');
        document.documentElement.style.setProperty('--msger-height', '100%');
    }

    toggleChatEmoji() {
        this.getId('chatEmoji').classList.toggle('show');
        this.isChatEmojiOpen = this.isChatEmojiOpen ? false : true;
        this.getId('chatEmojiButton').style.color = this.isChatEmojiOpen ? '#FFFF00' : '#FFFFFF';
    }

    addEmojiToMsg(data) {
        msgerInput.value += data.native;
        toggleChatEmoji();
    }

    cleanMessage() {
        chatMessage.value = '';
        chatMessage.setAttribute('rows', '1');
    }

    pasteMessage() {
        navigator.clipboard
            .readText()
            .then((text) => {
                chatMessage.value += text;
                isChatPasteTxt = true;
                this.checkLineBreaks();
            })
            .catch((err) => {
                console.error('Failed to read clipboard contents: ', err);
            });
    }

    sendMessage() {
        if (!this.thereAreParticipants() && !isChatGPTOn && !isDeepSeekOn) {
            this.cleanMessage();
            isChatPasteTxt = false;
            return this.userLog('info', '房间里没有参与者', 'top-end');
        }

        // Prevent long messages
        if (this.chatMessageLengthCheck && chatMessage.value.length > this.chatMessageLength) {
            return this.userLog(
                'warning',
                `消息似乎太长了，最多允许${this.chatMessageLength}个字符`,
                'top-end'
            );
        }

        // Spamming detected ban the user from the room
        if (this.chatMessageSpamCount == this.chatMessageSpamCountToBan) {
            return this.roomAction('isBanned', true);
        }

        // Prevent Spam messages
        const currentTime = Date.now();
        if (chatMessage.value && currentTime - this.chatMessageTimeLast <= this.chatMessageTimeBetween) {
            this.cleanMessage();
            chatMessage.readOnly = true;
            chatSendButton.disabled = true;
            setTimeout(function () {
                chatMessage.readOnly = false;
                chatSendButton.disabled = false;
            }, this.chatMessageNotifyDelay);
            this.chatMessageSpamCount++;
            return this.userLog(
                'warning',
                `请勿刷屏。请等待 ${this.chatMessageNotifyDelay / 1000} 秒后再发送消息`,
                'top-end',
                this.chatMessageNotifyDelay
            );
        }
        this.chatMessageTimeLast = currentTime;

        chatMessage.value = filterXSS(chatMessage.value.trim());
        const peer_msg = this.formatMsg(chatMessage.value);
        if (!peer_msg) {
            return this.cleanMessage();
        }
        this.peer_name = filterXSS(this.peer_name);

        const data = {
            room_id: this.room_id,
            peer_name: this.peer_name,
            peer_avatar: this.peer_avatar,
            peer_id: this.peer_id,
            to_peer_id: '',
            to_peer_name: '',
            peer_msg: peer_msg,
        };

        if (isChatGPTOn) {
            data.to_peer_id = 'ChatGPT';
            data.to_peer_name = 'ChatGPT';
            console.log('Send message:', data);
            this.socket.emit('message', data);
            this.setMsgAvatar('left', this.peer_name, this.peer_avatar);
            this.appendMessage(
                'left',
                this.leftMsgAvatar,
                this.peer_name,
                this.peer_id,
                peer_msg,
                data.to_peer_id,
                data.to_peer_name
            );
            this.cleanMessage();

            this.socket
                .request('getChatGPT', {
                    time: getDataTimeString(),
                    room: this.room_id,
                    name: this.peer_name,
                    prompt: peer_msg,
                    context: this.chatGPTContext,
                })
                .then((completion) => {
                    if (!completion) return;
                    const { message, context } = completion;
                    this.chatGPTContext = context ? context : [];
                    console.log('Receive message:', message);
                    this.setMsgAvatar('right', 'ChatGPT');
                    this.appendMessage('right', image.chatgpt, 'ChatGPT', this.peer_id, message, 'ChatGPT', 'ChatGPT');
                    this.cleanMessage();
                    this.streamingTask(message); // Video AI avatar speak
                    this.speechInMessages && !VideoAI.active
                        ? this.speechMessage(true, 'ChatGPT', message)
                        : this.sound('message');
                })
                .catch((err) => {
                    console.log('ChatGPT error:', err);
                });
        }

        if (isDeepSeekOn) {
            data.to_peer_id = 'DeepSeek';
            data.to_peer_name = 'DeepSeek';
            console.log('Send message:', data);
            this.socket.emit('message', data);
            this.setMsgAvatar('left', this.peer_name, this.peer_avatar);
            this.appendMessage(
                'left',
                this.leftMsgAvatar,
                this.peer_name,
                this.peer_id,
                peer_msg,
                data.to_peer_id,
                data.to_peer_name
            );
            this.cleanMessage();

            this.socket
                .request('getDeepSeek', {
                    time: getDataTimeString(),
                    room: this.room_id,
                    name: this.peer_name,
                    prompt: peer_msg,
                    context: this.deepSeekContext,
                })
                .then((completion) => {
                    if (!completion) return;
                    const { message, context } = completion;
                    this.deepSeekContext = context ? context : [];
                    console.log('Receive message:', message);
                    this.setMsgAvatar('right', 'DeepSeek');
                    this.appendMessage(
                        'right',
                        image.deepSeek,
                        'DeepSeek',
                        this.peer_id,
                        message,
                        'DeepSeek',
                        'DeepSeek'
                    );
                    this.cleanMessage();
                    this.streamingTask(message);
                    this.speechInMessages && !VideoAI.active
                        ? this.speechMessage(true, 'DeepSeek', message)
                        : this.sound('message');
                })
                .catch((err) => {
                    console.log('DeepSeek error:', err);
                });
        }

        if (!isChatGPTOn && !isDeepSeekOn) {
            const participantsList = this.getId('participantsList');
            const participantsListItems = participantsList.getElementsByTagName('li');
            for (let i = 0; i < participantsListItems.length; i++) {
                const li = participantsListItems[i];
                if (li.classList.contains('active')) {
                    data.to_peer_id = li.getAttribute('data-to-id');
                    data.to_peer_name = li.getAttribute('data-to-name');
                    console.log('Send message:', data);
                    this.socket.emit('message', data);
                    this.setMsgAvatar('left', this.peer_name, this.peer_avatar);
                    this.appendMessage(
                        'left',
                        this.leftMsgAvatar,
                        this.peer_name,
                        this.peer_id,
                        peer_msg,
                        data.to_peer_id,
                        data.to_peer_name
                    );
                    this.cleanMessage();
                }
            }
        }
    }

    sendMessageTo(to_peer_id, to_peer_name) {
        if (!this.thereAreParticipants()) {
            isChatPasteTxt = false;
            this.cleanMessage();
            return this.userLog('info', '除了你，房间里没有其他参与者', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.message,
            input: 'text',
            inputPlaceholder: '💬 输入您的消息...',
            showCancelButton: true,
            confirmButtonText: `发送`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.value) {
                result.value = filterXSS(result.value.trim());
                let peer_msg = this.formatMsg(result.value);
                if (!peer_msg) {
                    return this.cleanMessage();
                }
                this.peer_name = filterXSS(this.peer_name);
                const toPeerName = filterXSS(to_peer_name);
                let data = {
                    peer_name: this.peer_name,
                    peer_avatar: this.peer_avatar,
                    peer_id: this.peer_id,
                    to_peer_id: to_peer_id,
                    to_peer_name: toPeerName,
                    peer_msg: peer_msg,
                };
                console.log('Send message:', data);
                this.socket.emit('message', data);
                this.setMsgAvatar('left', this.peer_name, this.peer_avatar);
                this.appendMessage(
                    'left',
                    this.leftMsgAvatar,
                    this.peer_name,
                    this.peer_id,
                    peer_msg,
                    to_peer_id,
                    toPeerName
                );
                if (!this.isChatOpen) this.toggleChat();
            }
        });
    }

    async showMessage(data, toggleChat = true) {
        if (toggleChat && !this.isChatOpen && this.showChatOnMessage) {
            await this.toggleChat();
        }

        this.setMsgAvatar('right', data.peer_name, data.peer_avatar);
        this.appendMessage(
            'right',
            this.rightMsgAvatar,
            data.peer_name,
            data.peer_id,
            data.peer_msg,
            data.to_peer_id,
            data.to_peer_name
        );

        if (!this.showChatOnMessage) {
            this.userLog('info', `💬 来自 ${data.peer_name} 的新消息`, 'top-end');
        }

        if (this.speechInMessages) {
            VideoAI.active
                ? this.streamingTask(`来自 ${data.peer_name} 的新消息，消息内容为: ${data.peer_msg}`)
                : this.speechMessage(true, data.peer_name, data.peer_msg);
        } else {
            this.sound('message');
        }

        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');
        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            // INCOMING PRIVATE MESSAGE
            if (li.id === data.peer_id && data.to_peer_id != 'all') {
                li.classList.add('pulsate');
                if (!['all', 'ChatGPT', 'DeepSeek'].includes(data.to_peer_id)) {
                    this.getId(`${data.peer_id}-unread-msg`).classList.remove('hidden');
                }
            }
        }
    }

    setMsgAvatar(avatar, peerName, peerAvatar = false) {
        const avatarImg =
            peerAvatar && this.isImageURL(peerAvatar)
                ? peerAvatar
                : this.isValidEmail(peerName)
                  ? this.genGravatar(peerName)
                  : this.genAvatarSvg(peerName, 32);
        avatar === 'left' ? (this.leftMsgAvatar = avatarImg) : (this.rightMsgAvatar = avatarImg);
    }

    appendMessage(side, img, fromName, fromId, msg, toId, toName) {
        const getSide = filterXSS(side);
        const getImg = filterXSS(img);
        const getFromName = filterXSS(fromName);
        const getFromId = filterXSS(fromId);
        const getMsg = filterXSS(msg);
        const getToId = filterXSS(toId);
        const getToName = filterXSS(toName);
        const time = this.getTimeNow();

        const myMessage = getSide === 'left';
        const messageClass = myMessage ? 'my-message' : 'other-message float-right';
        const messageData = myMessage ? 'text-start' : 'text-end';
        const timeAndName = myMessage
            ? `<span class="message-data-time">${time}, ${getFromName} ( me ) </span>`
            : `<span class="message-data-time">${time}, ${getFromName} </span>`;

        const formatMessage = this.formatMsg(getMsg);
        const speechButton = this.isSpeechSynthesisSupported
            ? `<button 
                    id="msg-speech-${chatMessagesId}" 
                    class="mr5" 
                    onclick="rc.speechElementText('message-${chatMessagesId}')">
                    <i class="fas fa-volume-high"></i>
                </button>`
            : '';

        const positionFirst = myMessage
            ? `<img src="${getImg}" alt="avatar" />${timeAndName}`
            : `${timeAndName}<img src="${getImg}" alt="avatar" />`;

        const newMessageHTML = `
            <li id="msg-${chatMessagesId}"  
                data-from-id="${getFromId}" 
                data-from-name="${getFromName}"
                data-to-id="${getToId}" 
                data-to-name="${getToName}"
                class="clearfix"
            >
                <div class="message-data ${messageData}">
                    ${positionFirst}
                </div>
                <div class="message ${messageClass}">
                    <span class="text-start" id="message-${chatMessagesId}"></span>
                    <hr/>
                    <div class="about-buttons mt5">
                        <button 
                            id="msg-copy-${chatMessagesId}" 
                            class="mr5" 
                            onclick="rc.copyToClipboard('message-${chatMessagesId}')">
                            <i class="fas fa-paste"></i>
                        </button>
                        ${speechButton}
                        <button 
                            id="msg-delete-${chatMessagesId}"   
                            class="mr5" 
                            onclick="rc.deleteMessage('msg-${chatMessagesId}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </li>
        `;

        this.collectMessages(time, getFromName, getMsg);

        console.log('Append message to:', { to_id: getToId, to_name: getToName });

        switch (getToId) {
            case 'ChatGPT':
                chatGPTMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            case 'DeepSeek':
                deepSeekMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            case 'all':
                chatPublicMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            default:
                chatPrivateMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
        }

        const message = getId(`message-${chatMessagesId}`);
        if (message) {
            if (['ChatGPT', 'DeepSeek'].includes(getFromName)) {
                // Stream the message for ChatGPT or DeepSeek
                this.streamMessage(message, getMsg, 100);
            } else {
                // Process the message for other senders
                message.innerHTML = this.processMessage(getMsg);
                hljs.highlightAll();
            }
        }

        chatHistory.scrollTop += 500;

        if (!this.isMobileDevice) {
            this.setTippy('msg-delete-' + chatMessagesId, 'Delete', 'top');
            this.setTippy('msg-copy-' + chatMessagesId, 'Copy', 'top');
            this.setTippy('msg-speech-' + chatMessagesId, 'Speech', 'top');
        }

        chatMessagesId++;
    }

    streamMessage(element, message, speed = 100) {
        const parts = this.processMessage(message);
        const words = parts.split(' ');

        let textBuffer = '';
        let wordIndex = 0;

        const interval = setInterval(() => {
            if (wordIndex < words.length) {
                textBuffer += words[wordIndex] + ' ';
                element.innerHTML = textBuffer;
                wordIndex++;
            } else {
                clearInterval(interval);
                highlightCodeBlocks(element);
            }
        }, speed);

        function highlightCodeBlocks(element) {
            const codeBlocks = element.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    }

    processMessage(message) {
        const codeBlockRegex = /```([a-zA-Z0-9]+)?\n([\s\S]*?)```/g;
        let parts = [];
        let lastIndex = 0;

        message.replace(codeBlockRegex, (match, lang, code, offset) => {
            if (offset > lastIndex) {
                parts.push({ type: 'text', value: message.slice(lastIndex, offset) });
            }
            parts.push({ type: 'code', lang, value: code });
            lastIndex = offset + match.length;
        });

        if (lastIndex < message.length) {
            parts.push({ type: 'text', value: message.slice(lastIndex) });
        }

        return parts
            .map((part) => {
                if (part.type === 'text') {
                    return part.value;
                } else if (part.type === 'code') {
                    return `<pre><code class="language-${part.lang || ''}">${part.value}</code></pre>`;
                }
            })
            .join('');
    }

    deleteMessage(id) {
        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: '删除此消息？',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `删除`,
            denyButtonText: `取消`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                this.getId(id).remove();
                this.sound('delete');
            }
        });
    }

    copyToClipboard(id) {
        const text = this.getId(id).innerText;
        navigator.clipboard
            .writeText(text)
            .then(() => {
                this.userLog('success', '消息已复制!', 'top-end', 1000);
            })
            .catch((err) => {
                this.userLog('error', err, 'top-end', 6000);
            });
    }

    formatMsg(msg) {
        const message = filterXSS(msg);
        if (message.trim().length == 0) return;
        if (this.isHtml(message)) return this.sanitizeHtml(message);
        if (this.isValidHttpURL(message)) {
            if (this.isImageURL(message)) return this.getImage(message);
            //if (this.isVideoTypeSupported(message)) return this.getIframe(message);
            return this.getLink(message);
        }
        if (isChatMarkdownOn) return marked.parse(message);
        if (isChatPasteTxt && this.getLineBreaks(message) > 1) {
            isChatPasteTxt = false;
            return this.getPre(message);
        }
        if (this.getLineBreaks(message) > 1) return this.getPre(message);
        console.log('FormatMsg', message);
        return message;
    }

    sanitizeHtml(input) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
        };
        return input.replace(/[&<>"'/]/g, (m) => map[m]);
    }

    isHtml(str) {
        const a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true;
        }
        return false;
    }

    isValidHttpURL(input) {
        try {
            new URL(input);
            return true;
        } catch (_) {
            return false;
        }
    }

    isImageURL(input) {
        if (!input || typeof input !== 'string') return false;
        try {
            const url = new URL(input);
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg'].some((ext) =>
                url.pathname.toLowerCase().endsWith(ext)
            );
        } catch (e) {
            return false;
        }
    }

    getImage(input) {
        const url = filterXSS(input);
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('width', '200px');
        img.setAttribute('height', 'auto');
        div.appendChild(img);
        console.log('GetImg', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getLink(input) {
        const url = filterXSS(input);
        const a = document.createElement('a');
        const div = document.createElement('div');
        const linkText = document.createTextNode(url);
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.appendChild(linkText);
        div.appendChild(a);
        console.log('GetLink', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getPre(input) {
        const text = filterXSS(input);
        const pre = document.createElement('pre');
        const div = document.createElement('div');
        pre.textContent = text;
        div.appendChild(pre);
        console.log('GetPre', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getIframe(input) {
        const url = filterXSS(input);
        const iframe = document.createElement('iframe');
        const div = document.createElement('div');
        const is_youtube = this.getVideoType(url) == 'na' ? true : false;
        const video_audio_url = is_youtube ? this.getYoutubeEmbed(url) : url;
        iframe.setAttribute('title', 'Chat-IFrame');
        iframe.setAttribute('src', video_audio_url);
        iframe.setAttribute('width', 'auto');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
            'allow',
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        );
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
        div.appendChild(iframe);
        console.log('GetIFrame', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getLineBreaks(message) {
        return (message.match(/\n/g) || []).length;
    }

    checkLineBreaks() {
        chatMessage.style.height = '';
        if (this.getLineBreaks(chatMessage.value) > 0 || chatMessage.value.length > 50) {
            chatMessage.setAttribute('rows', '2');
        }
    }

    collectMessages(time, from, msg) {
        this.chatMessages.push({
            time: time,
            from: from,
            msg: msg,
        });
    }

    speechMessage(newMsg = true, from, msg) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = (newMsg ? '新' : '') + '消息来自:' + from + '。消息内容为:' + msg;
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    }

    speechElementText(elemId) {
        const element = this.getId(elemId);
        this.speechText(element.innerText);
    }

    speechText(msg) {
        if (VideoAI.active) {
            this.streamingTask(msg);
        } else {
            const speech = new SpeechSynthesisUtterance();
            speech.text = msg;
            speech.rate = 0.9;
            window.speechSynthesis.speak(speech);
        }
    }

    chatToggleBg() {
        this.isChatBgTransparent = !this.isChatBgTransparent;
        this.isChatBgTransparent
            ? document.documentElement.style.setProperty('--msger-bg', 'rgba(0, 0, 0, 0.100)')
            : setTheme();
    }

    chatClean() {
        if (this.chatMessages.length === 0) {
            return userLog('info', '没有聊天消息需要清理', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: '清理所有聊天消息？',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `是`,
            denyButtonText: `否`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                function removeAllChildNodes(parentNode) {
                    while (parentNode.firstChild) {
                        parentNode.removeChild(parentNode.firstChild);
                    }
                }
                // Remove child nodes from different message containers
                removeAllChildNodes(chatGPTMessages);
                removeAllChildNodes(deepSeekMessages);
                removeAllChildNodes(chatPublicMessages);
                removeAllChildNodes(chatPrivateMessages);
                this.chatMessages = [];
                this.chatGPTContext = [];
                this.deepSeekContext = [];
                this.sound('delete');
            }
        });
    }

    chatSave() {
        if (this.chatMessages.length === 0) {
            return userLog('info', '没有聊天消息需要保存', 'top-end');
        }
        saveObjToJsonFile(this.chatMessages, 'CHAT');
    }

    // ##############################################
    // POOLS
    // ##############################################

    togglePoll() {
        pollRoom.classList.toggle('show');
        if (!this.isPollOpen) {
            hide(pollMinButton);
            if (!this.isMobileDevice) {
                BUTTONS.poll.pollMaxButton && show(pollMaxButton);
            }
            this.pollCenter();
            this.sound('open');
        }
        this.isPollOpen = !this.isPollOpen;

        if (this.isPollPinned) this.pollUnpin();

        if (!this.isMobileDevice && this.isPollOpen && this.canBePinned()) {
            this.togglePollPin();
        }
    }

    togglePollPin() {
        if (transcription.isPin()) {
            return userLog('info', '请取消固定当前已固定的转录', 'top-end');
        }
        if (this.isChatPinned) {
            return userLog('info', '请取消固定当前已固定的聊天', 'top-end');
        }
        if (this.isEditorPinned) {
            return userLog('info', '请取消固定当前已固定的编辑器', 'top-end');
        }
        this.isPollPinned ? this.pollUnpin() : this.pollPin();
        this.sound('click');
    }

    pollPin() {
        if (!this.isVideoPinned) {
            this.videoMediaContainerPin();
        }
        this.pollPinned();
        this.isPollPinned = true;
        setColor(pollTogglePin, 'lime');
        this.resizeVideoMenuBar();
        resizeVideoMedia();
        pollRoom.style.resize = 'none';
        if (!this.isMobileDevice) this.makeUnDraggable(pollRoom, pollHeader);
    }

    pollUnpin() {
        if (!this.isVideoPinned) {
            this.videoMediaContainerUnpin();
        }
        pollRoom.style.maxWidth = '600px';
        pollRoom.style.maxHeight = '700px';
        this.pollCenter();
        this.isPollPinned = false;
        setColor(pollTogglePin, 'white');
        this.resizeVideoMenuBar();
        resizeVideoMedia();
        if (!this.isMobileDevice) this.makeDraggable(pollRoom, pollHeader);
    }

    pollPinned() {
        pollRoom.style.position = 'absolute';
        pollRoom.style.top = 0;
        pollRoom.style.right = 0;
        pollRoom.style.left = null;
        pollRoom.style.transform = null;
        pollRoom.style.maxWidth = '25%';
        pollRoom.style.maxHeight = '100%';
    }

    pollCenter() {
        pollRoom.style.position = 'fixed';
        pollRoom.style.transform = 'translate(-50%, -50%)';
        pollRoom.style.top = '50%';
        pollRoom.style.left = '50%';
    }

    pollMaximize() {
        pollRoom.style.maxHeight = '100vh';
        pollRoom.style.maxWidth = '100vw';
        this.pollCenter();
        hide(pollMaxButton);
        BUTTONS.poll.pollMaxButton && show(pollMinButton);
    }

    pollMinimize() {
        this.pollCenter();
        hide(pollMinButton);
        BUTTONS.poll.pollMaxButton && show(pollMaxButton);
        if (this.isPollPinned) {
            this.pollPin();
        } else {
            pollRoom.style.maxWidth = '600px';
            pollRoom.style.maxHeight = '700px';
        }
    }

    pollsUpdate(polls) {
        if (!this.isPollOpen) this.togglePoll();

        pollsContainer.innerHTML = '';
        polls.forEach((poll, index) => {
            const pollDiv = document.createElement('div');
            pollDiv.className = 'poll';

            const question = document.createElement('p');
            question.className = 'poll-question';
            question.textContent = poll.question;
            pollDiv.appendChild(question);

            const options = document.createElement('div');
            options.className = 'options';

            poll.options.forEach((option) => {
                const optionDiv = document.createElement('div');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `poll${index}`;
                input.value = option;
                if (this.pollSelectedOptions[index] === option) {
                    input.checked = true;
                }

                input.addEventListener('change', () => {
                    this.pollSelectedOptions[index] = option;
                    this.socket.emit('vote', { pollIndex: index, option });
                });

                const label = document.createElement('label');
                label.textContent = option;

                optionDiv.appendChild(input);
                optionDiv.appendChild(label);
                options.appendChild(optionDiv);
            });
            pollDiv.appendChild(options);

            // Only the presenters
            // if (isPresenter) {
            const pollButtonsDiv = document.createElement('div');
            pollButtonsDiv.className = 'poll-btns';

            // Toggle voters button
            const toggleButton = document.createElement('button');
            const toggleButtonIcon = document.createElement('i');
            toggleButtonIcon.className = 'fas fa-users';
            toggleButton.id = 'toggleVoters';
            toggleButton.className = 'view-btn';
            // Append the icon to the button
            toggleButton.insertBefore(toggleButtonIcon, toggleButton.firstChild);
            toggleButton.addEventListener('click', () => {
                votersList.style.display === 'none'
                    ? (votersList.style.display = 'block')
                    : (votersList.style.display = 'none');
            });
            pollButtonsDiv.appendChild(toggleButton);

            // Edit poll button using swal
            const editPollButton = document.createElement('button');
            const editPollButtonIcon = document.createElement('i');
            editPollButtonIcon.className = 'fas fa-pen-to-square';
            editPollButton.id = 'editPoll';
            editPollButton.className = 'poll-btn';
            editPollButton.insertBefore(editPollButtonIcon, editPollButton.firstChild);
            editPollButton.addEventListener('click', () => {
                Swal.fire({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    background: swalBackground,
                    title: '编辑投票',
                    html: this.createPollInputs(poll),
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: '保存',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#dc3545',
                    preConfirm: () => {
                        const newQuestion = document.getElementById('swal-input-question').value;
                        const newOptions = this.getPollOptions(poll.options.length);
                        this.socket.emit('editPoll', {
                            index,
                            question: newQuestion,
                            options: newOptions,
                            peer_name: this.peer_name,
                            peer_uuid: this.peer_uuid,
                        });
                    },
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
            });
            pollButtonsDiv.appendChild(editPollButton);

            // Delete poll button
            const deletePollButton = document.createElement('button');
            const deletePollButtonIcon = document.createElement('i');
            deletePollButtonIcon.className = 'fas fa-trash';
            deletePollButton.id = 'delPoll';
            deletePollButton.className = 'del-btn';
            deletePollButton.insertBefore(deletePollButtonIcon, deletePollButton.firstChild);
            deletePollButton.addEventListener('click', () => {
                // confirm before delete poll
                Swal.fire({
                    background: swalBackground,
                    position: 'top',
                    title: '删除此投票？',
                    imageUrl: image.delete,
                    showDenyButton: true,
                    confirmButtonText: `是`,
                    denyButtonText: `否`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.socket.emit('deletePoll', { index, peer_name: this.peer_name, peer_uuid: this.peer_uuid });
                    }
                });
            });
            pollButtonsDiv.appendChild(deletePollButton);

            // Add thematic break
            const hr = document.createElement('hr');
            pollDiv.appendChild(hr);

            // Append buttons to poll
            pollDiv.appendChild(pollButtonsDiv);

            // Create voter lists
            const votersList = document.createElement('ul');
            votersList.style.display = 'none';
            for (const [user, vote] of Object.entries(poll.voters)) {
                const voter = document.createElement('li');
                voter.textContent = `${user}: ${vote}`;
                votersList.appendChild(voter);
            }
            pollDiv.appendChild(votersList);
            // }

            pollsContainer.appendChild(pollDiv);

            if (!this.isMobileDevice) {
                setTippy('toggleVoters', '切换投票者', 'top');
                setTippy('delPoll', '删除投票', 'top');
                setTippy('editPoll', '编辑投票', 'top');
            }
        });
    }

    pollCreateNewForm(e) {
        e.preventDefault();

        const question = e.target.question.value;
        const optionInputs = document.querySelectorAll('.option-input');
        const options = Array.from(optionInputs).map((input) => input.value.trim());

        this.socket.emit('createPoll', { question, options });

        e.target.reset();
        optionsContainer.innerHTML = '';
        const initialOptionInput = document.createElement('input');
        initialOptionInput.type = 'text';
        initialOptionInput.name = 'option';
        initialOptionInput.className = 'option-input';
        initialOptionInput.required = true;
        optionsContainer.appendChild(initialOptionInput);
    }

    pollAddOptions() {
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.name = 'option';
        optionInput.className = 'option-input';
        optionInput.required = true;
        optionsContainer.appendChild(optionInput);
    }

    pollDeleteOptions() {
        const optionInputs = document.querySelectorAll('.option-input');
        if (optionInputs.length > 1) {
            optionsContainer.removeChild(optionInputs[optionInputs.length - 1]);
        }
    }

    createPollInputs(poll) {
        const questionInput = `<input id="swal-input-question" class="swal2-input" value="${poll.question}">`;
        const optionsInputs = poll.options
            .map((option, i) => `<input id="swal-input-option${i}" class="swal2-input" value="${option}">`)
            .join('');
        return questionInput + optionsInputs;
    }

    getPollOptions(optionCount) {
        const options = [];
        for (let i = 0; i < optionCount; i++) {
            options.push(document.getElementById(`swal-input-option${i}`).value);
        }
        return options;
    }

    pollSaveResults() {
        const polls = document.querySelectorAll('.poll');
        const results = [];

        polls.forEach((poll, index) => {
            const question = poll.querySelector('.poll-question').textContent;
            const options = poll.querySelectorAll('.options div label');

            const optionsText = Array.from(options).reduce((acc, option, index) => {
                acc[index + 1] = option.textContent.trim();
                return acc;
            }, {});

            const votersList = poll.querySelector('ul');
            const voters = Array.from(votersList.querySelectorAll('li')).reduce((acc, li) => {
                const [name, vote] = li.textContent.split(':').map((item) => item.trim());
                acc[name] = vote;
                return acc;
            }, {});

            results.push({
                Poll: `${index + 1}`,
                question: question,
                options: optionsText,
                voters: voters,
            });
        });

        results.length > 0
            ? saveObjToJsonFile(results, 'Poll')
            : this.userLog('info', '没有投票数据可供保存', 'top-end');
    }

    getPollFileName() {
        const dateTime = getDataTimeStringFormat();
        const roomName = this.room_id.trim();
        return `Poll_${roomName}_${dateTime}.txt`;
    }

    // ####################################################
    // EDITOR
    // ####################################################

    toggleEditor() {
        editorRoom.classList.toggle('show');
        if (!this.isEditorOpen) {
            this.editorCenter();
            this.sound('open');
        }
        this.isEditorOpen = !this.isEditorOpen;

        if (this.isEditorPinned) this.editorUnpin();

        if (!this.isMobileDevice && this.isEditorOpen && this.canBePinned()) {
            this.toggleEditorPin();
        }
    }

    toggleLockUnlockEditor() {
        this.isEditorLocked = !this.isEditorLocked;

        const btnToShow = this.isEditorLocked ? editorLockBtn : editorUnlockBtn;
        const btnToHide = this.isEditorLocked ? editorUnlockBtn : editorLockBtn;
        const btnColor = this.isEditorLocked ? 'red' : 'white';
        const action = this.isEditorLocked ? 'lock' : 'unlock';

        show(btnToShow);
        hide(btnToHide);
        setColor(editorLockBtn, btnColor);

        this.editorSendAction(action);

        if (this.isEditorLocked) {
            userLog('info', '编辑器已锁定。\n参与者无法与其交互。', 'top-right');
            sound('locked');
        }
    }

    editorCenter() {
        editorRoom.style.position = 'fixed';
        editorRoom.style.transform = 'translate(-50%, -50%)';
        editorRoom.style.top = '50%';
        editorRoom.style.left = '50%';
    }

    toggleEditorPin() {
        if (transcription.isPin()) {
            return userLog('info', '请取消固定当前已固定的转录', 'top-end');
        }
        if (this.isPollPinned) {
            return userLog('info', '请取消固定当前已固定的投票', 'top-end');
        }
        if (this.isChatPinned) {
            return userLog('info', '请取消固定当前已固定的聊天', 'top-end');
        }
        this.isEditorPinned ? this.editorUnpin() : this.editorPin();
        this.sound('click');
    }

    editorPin() {
        if (!this.isVideoPinned) {
            this.videoMediaContainer.style.top = 0;
            this.videoMediaContainer.style.width = '70%';
            this.videoMediaContainer.style.height = '100%';
        }
        this.editorPinned();
        this.isEditorPinned = true;
        setColor(editorTogglePin, 'lime');
        this.resizeVideoMenuBar();
        resizeVideoMedia();
        document.documentElement.style.setProperty('--editor-height', '80vh');
        //if (!this.isMobileDevice) this.makeUnDraggable(editorRoom, editorHeader);
    }

    editorUnpin() {
        if (!this.isVideoPinned) {
            this.videoMediaContainerUnpin();
        }
        editorRoom.style.maxWidth = '100%';
        editorRoom.style.maxHeight = '100%';
        this.pollCenter();
        this.isEditorPinned = false;
        setColor(editorTogglePin, 'white');
        this.resizeVideoMenuBar();
        resizeVideoMedia();
        document.documentElement.style.setProperty('--editor-height', '85vh');
        //if (!this.isMobileDevice) this.makeDraggable(editorRoom, editorHeader);
    }

    editorPinned() {
        editorRoom.style.position = 'absolute';
        editorRoom.style.top = 0;
        editorRoom.style.right = 0;
        editorRoom.style.left = null;
        editorRoom.style.transform = null;
        editorRoom.style.maxWidth = '30%';
        editorRoom.style.maxHeight = '100%';
    }

    editorUpdate() {
        if (this.isEditorOpen && (!isRulesActive || isPresenter)) {
            console.log('IsPresenter: update editor content to the participants in the room');
            const content = quill.getContents(); // Get content in Delta format
            this.socket.emit('editorUpdate', content);
            const action = this.isEditorLocked ? 'lock' : 'unlock';
            this.editorSendAction(action);
        }
    }

    handleEditorUpdateData(data) {
        this.editorOpen();
        quill.setContents(data);
    }

    handleEditorData(data) {
        this.editorOpen();
        quill.updateContents(data);
    }

    editorOpen() {
        if (!this.isEditorOpen) {
            this.sound('open');
            this.toggleEditor();
        }
    }

    handleEditorActionsData(data) {
        const { peer_name, action } = data;
        switch (action) {
            case 'open':
                if (this.isEditorOpen) return;
                this.toggleEditor();
                this.userLog('info', `${icons.editor} ${peer_name} 打开编辑器`, 'top-end', 6000);
                break;
            case 'close':
                if (!this.isEditorOpen) return;
                this.toggleEditor();
                this.userLog('info', `${icons.editor} ${peer_name} 关闭编辑器`, 'top-end', 6000);
                break;
            case 'clean':
                quill.setText('');
                this.userLog('info', `${icons.editor} ${peer_name} 清空编辑器`, 'top-end', 6000);
                break;
            case 'lock':
                this.isEditorLocked = true;
                quill.enable(false);
                this.userLog('info', `${icons.editor} ${peer_name} 锁定编辑器`, 'top-end', 6000);
                break;
            case 'unlock':
                this.isEditorLocked = false;
                quill.enable(true);
                this.userLog('info', `${icons.editor} ${peer_name} 解锁编辑器`, 'top-end', 6000);
                break;
            default:
                break;
        }
    }

    editorIsLocked() {
        return this.isEditorLocked;
    }

    editorUndo() {
        quill.history.undo();
    }

    editorRedo() {
        quill.history.redo();
    }

    editorCopy() {
        const content = quill.getText();
        if (content.trim().length === 0) {
            return this.userLog('info', '没有内容可以复制', 'top-end');
        }
        copyToClipboard(content, false);
    }

    editorClean() {
        if (!isPresenter && this.editorIsLocked()) {
            userLog('info', '编辑器已锁定。\n您无法与其交互。', 'top-right');
            return;
        }
        const content = quill.getText();
        if (content.trim().length === 0) {
            return this.userLog('info', '没有内容可以清理', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: '清空编辑器内容？',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `是`,
            denyButtonText: `否`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                quill.setText('');
                this.editorSendAction('clean');
                this.sound('delete');
            }
        });
    }

    editorSave() {
        Swal.fire({
            background: swalBackground,
            position: 'top',
            imageUrl: image.save,
            title: '编辑器保存选项',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonColor: 'red',
            denyButtonColor: 'green',
            confirmButtonText: `文本`,
            denyButtonText: `Html`,
            cancelButtonText: `取消`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            this.handleEditorSaveResult(result);
        });
    }

    handleEditorSaveResult(result) {
        if (result.isConfirmed) {
            this.saveEditorAsText();
        } else if (result.isDenied) {
            this.saveEditorAsHtml();
        }
    }

    saveEditorAsText() {
        const content = quill.getText().trim();
        if (content.length === 0) {
            return this.userLog('info', '没有数据可以保存！', 'top-end');
        }
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const fileName = this.generateFileName('editor.txt');
        this.saveBlobToFile(blob, fileName);
        this.sound('download');
    }

    saveEditorAsHtml() {
        const content = quill.root.innerHTML.trim();
        if (content === '<p><br></p>') {
            return this.userLog('info', '没有数据可以保存！', 'top-end');
        }
        const fileName = this.generateFileName('editor.html');
        this.saveAsHtml(content, fileName);
        this.sound('download');
    }

    generateFileName(extension) {
        return `Room_${this.room_id}_${getDataTimeString()}_${extension}`;
    }

    saveAsHtml(content, file) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    editorSendAction(action) {
        this.socket.emit('editorActions', { peer_name: this.peer_name, action: action });
    }

    // ####################################################
    // RECORDING
    // ####################################################

    toggleVideoAudioTabs(disabled = false) {
        tabAudioDevicesBtn.disabled = disabled;
        tabVideoDevicesBtn.disabled = disabled;
    }

    handleRecordingError(error, popupLog = true) {
        this.toggleVideoAudioTabs(false);
        console.error('Recording error', error);
        if (popupLog) this.userLog('error', error, 'top-end', 6000);
    }

    getSupportedMimeTypes() {
        const possibleTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/mp4'];
        console.log('POSSIBLE CODECS', possibleTypes);
        return possibleTypes.filter((mimeType) => {
            return MediaRecorder.isTypeSupported(mimeType);
        });
    }

    startRecording() {
        recordedBlobs = [];

        // Toggle Video/Audio tabs
        this.toggleVideoAudioTabs(true);

        // Get supported MIME types and set options
        const supportedMimeTypes = this.getSupportedMimeTypes();
        console.log('MediaRecorder supported options', supportedMimeTypes);
        const options = { mimeType: supportedMimeTypes[0] };

        recCodecs = supportedMimeTypes[0];

        try {
            this.audioRecorder = new MixedAudioRecorder();
            const audioStreams = this.getAudioStreamFromAudioElements();
            console.log('Audio streams tracks --->', audioStreams.getTracks());

            const audioMixerStreams = this.audioRecorder.getMixedAudioStream(
                audioStreams
                    .getTracks()
                    .filter((track) => track.kind === 'audio')
                    .map((track) => new MediaStream([track]))
            );

            const audioMixerTracks = audioMixerStreams.getTracks();
            console.log('Audio mixer tracks --->', audioMixerTracks);

            this.isMobileDevice
                ? this.startMobileRecording(options, audioMixerTracks)
                : this.recordingOptions(options, audioMixerTracks);
        } catch (err) {
            this.handleRecordingError('Exception while creating MediaRecorder: ' + err);
        }
    }

    recordingOptions(options, audioMixerTracks) {
        Swal.fire({
            background: swalBackground,
            position: 'top',
            imageUrl: image.recording,
            title: '录制选项',
            text: '选择您想要开始的录制类型。音频将从所有参与者录制。',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonColor: 'red',
            denyButtonColor: 'green',
            confirmButtonText: `摄像头`,
            denyButtonText: `屏幕/窗口`,
            cancelButtonText: `取消`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                this.startMobileRecording(options, audioMixerTracks);
            } else if (result.isDenied) {
                this.startDesktopRecording(options, audioMixerTracks);
            }
        });
    }

    startMobileRecording(options, audioMixerTracks) {
        try {
            // Combine audioMixerTracks and videoTracks into a single array
            const combinedTracks = [];

            if (Array.isArray(audioMixerTracks)) {
                combinedTracks.push(...audioMixerTracks);
            }

            if (this.localVideoStream !== null) {
                const videoTracks = this.localVideoStream.getVideoTracks();
                console.log('Cam video tracks --->', videoTracks);

                if (Array.isArray(videoTracks)) {
                    combinedTracks.push(...videoTracks);
                }
            }

            const recCamStream = new MediaStream(combinedTracks);
            console.log('New Cam Media Stream tracks  --->', recCamStream.getTracks());

            this.mediaRecorder = new MediaRecorder(recCamStream, options);
            console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);

            this.getId('swapCameraButton').className = 'hidden';

            this.initRecording();
        } catch (err) {
            this.handleRecordingError('Unable to record the camera + audio: ' + err, false);
        }
    }

    startDesktopRecording(options, audioMixerTracks) {
        // On desktop devices, record camera or screen/window... + all audio tracks
        const constraints = { video: true };
        navigator.mediaDevices
            .getDisplayMedia(constraints)
            .then((screenStream) => {
                const screenTracks = screenStream.getVideoTracks();
                console.log('Screen video tracks --->', screenTracks);

                const combinedTracks = [];

                if (Array.isArray(screenTracks)) {
                    combinedTracks.push(...screenTracks);
                }
                if (Array.isArray(audioMixerTracks)) {
                    combinedTracks.push(...audioMixerTracks);
                }

                const recScreenStream = new MediaStream(combinedTracks);
                console.log('New Screen/Window Media Stream tracks  --->', recScreenStream.getTracks());

                this.recScreenStream = recScreenStream;
                this.mediaRecorder = new MediaRecorder(recScreenStream, options);
                console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);

                this.initRecording();
            })
            .catch((err) => {
                this.handleRecordingError('Unable to record the screen + audio: ' + err, false);
            });
    }

    initRecording() {
        this._isRecording = true;
        this.handleMediaRecorder();
        this.event(_EVENTS.startRec);
        this.recordingAction(enums.recording.start);
        this.sound('recStart');
    }

    hasAudioTrack(mediaStream) {
        if (!mediaStream) return false;
        const audioTracks = mediaStream.getAudioTracks();
        return audioTracks.length > 0;
    }

    hasVideoTrack(mediaStream) {
        if (!mediaStream) return false;
        const videoTracks = mediaStream.getVideoTracks();
        return videoTracks.length > 0;
    }

    getAudioTracksFromAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        const audioTracks = [];
        audioElements.forEach((audio) => {
            // Exclude avatar Preview Audio
            if (audio.id !== 'avatarPreviewAudio') {
                const audioTrack = audio.srcObject.getAudioTracks()[0];
                if (audioTrack) {
                    audioTracks.push(audioTrack);
                }
            }
        });
        return audioTracks;
    }

    getAudioStreamFromAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        const audioStream = new MediaStream();
        audioElements.forEach((audio) => {
            // Exclude avatar Preview Audio
            if (audio.id !== 'avatarPreviewAudio') {
                const audioTrack = audio.srcObject.getAudioTracks()[0];
                if (audioTrack) {
                    audioStream.addTrack(audioTrack);
                }
            }
        });
        return audioStream;
    }

    handleMediaRecorder() {
        if (this.mediaRecorder) {
            this.recServerFileName = this.getServerRecFileName();
            rc.recording.recSyncServerRecording
                ? this.mediaRecorder.start(this.recSyncTime)
                : this.mediaRecorder.start();
            this.mediaRecorder.addEventListener('start', this.handleMediaRecorderStart);
            this.mediaRecorder.addEventListener('dataavailable', this.handleMediaRecorderData);
            this.mediaRecorder.addEventListener('stop', this.handleMediaRecorderStop);
        }
    }

    generateUUIDv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
    }

    getServerRecFileName() {
        const roomName = this.room_id.trim();
        const dateTime = getDataTimeStringFormat();
        const uuid = this.generateUUIDv4();
        return `Rec_${roomName}_${dateTime}_${uuid}.webm`;
    }

    handleMediaRecorderStart(evt) {
        console.log('MediaRecorder started: ', evt);
        rc.cleanLastRecordingInfo();
        rc.disableRecordingOptions();
        rc._recStartTs = performance.now();
    }

    handleMediaRecorderData(evt) {
        // console.log('MediaRecorder data: ', evt);
        if (evt.data && evt.data.size > 0) {
            rc.recording.recSyncServerRecording ? rc.syncRecordingInCloud(evt.data) : recordedBlobs.push(evt.data);
        }
    }

    async syncRecordingInCloud(data) {
        if (!this._isRecording) return;

        const arrayBuffer = await data.arrayBuffer();
        const chunkSize = rc.recSyncChunkSize;
        const totalChunks = Math.ceil(arrayBuffer.byteLength / chunkSize);
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const chunk = arrayBuffer.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
            try {
                const response = await axios.post(
                    `${this.recording.recSyncServerEndpoint}/recSync?fileName=` + rc.recServerFileName,
                    chunk,
                    {
                        headers: {
                            'Content-Type': 'application/octet-stream',
                        },
                    }
                );
                console.log('Chunk synced successfully:', response.data);
            } catch (error) {
                let errorMessage = '录音已停止！';
                if (error.response) {
                    errorMessage += error.response.data.message;
                    console.error('Error syncing chunk', {
                        status_code: error.response.status,
                        response_data: error.response.data,
                        response_headers: error.response.headers,
                    });
                } else if (error.request) {
                    console.error('Error syncing chunk: No response received', { request_details: error.request });
                } else {
                    errorMessage += error.message;
                    console.error('Error syncing chunk:', error.message);
                }
                userLog('warning', errorMessage, 'top-end', 3000);
                rc.stopRecording();
                rc.saveLastRecordingInfo('<br/><span class="red">' + errorMessage + '.</span>');
            }
        }
    }

    async handleMediaRecorderStop(evt) {
        try {
            console.log('MediaRecorder stopped: ', evt);
            rc.recording.recSyncServerRecording ? rc.handleServerRecordingStop() : rc.handleLocalRecordingStop();
            rc.disableRecordingOptions(false);

            // If cloud sync is enabled, patch duration on the server
            if (rc.recording.recSyncServerRecording) {
                const durationMs = rc._recStartTs ? Math.round(performance.now() - rc._recStartTs) : undefined;

                // Option S3: pass duration to your existing finalize endpoint (preferred if it uploads to S3)
                if (rc.recording.recSyncServerToS3) {
                    try {
                        await axios.post(`${rc.recording.recSyncServerEndpoint}/recSyncFinalize`, null, {
                            params: { fileName: rc.recServerFileName, durationMs },
                        });
                        console.log('Finalized (with duration fix) and uploaded to S3');
                        userLog('success', '录音已成功上传到S3.', 'top-end', 3000);
                    } catch (error) {
                        let errorMessage = '最终化失败！ ';
                        if (error.response) errorMessage += error.response.data?.message || '服务器错误';
                        else if (error.request) errorMessage += '服务器无响应';
                        else errorMessage += error.message;
                        userLog('warning', errorMessage, 'top-end', 3000);
                    }
                } else {
                    // Option Disk: if you don’t use S3 finalize, call a dedicated “fix” endpoint
                    try {
                        await axios.post(`${rc.recording.recSyncServerEndpoint}/recSyncFixWebm`, null, {
                            params: { fileName: rc.recServerFileName, durationMs },
                        });
                        console.log('Server-side WEBM duration fixed for', rc.recServerFileName);
                    } catch (error) {
                        console.warn('WEBM duration server-side fix failed:', error?.message || error);
                    }
                }

                rc._recStartTs = null;
            }
        } catch (err) {
            console.error('Recording save failed', err);
        }
    }

    async handleMediaRecorderStopOLD(evt) {
        try {
            console.log('MediaRecorder stopped: ', evt);
            rc.recording.recSyncServerRecording ? rc.handleServerRecordingStop() : rc.handleLocalRecordingStop();
            rc.disableRecordingOptions(false);

            // Only do this if cloud sync was enabled and upload to s3
            if (rc.recording.recSyncServerRecording && rc.recording.recSyncServerToS3) {
                try {
                    const response = await axios.post(
                        `${rc.recording.recSyncServerEndpoint}/recSyncFinalize?fileName=` + rc.recServerFileName
                    );
                    console.log('Finalized and uploaded to S3:', response.data);
                    userLog('success', '录音已成功上传到S3.', 'top-end', 3000);
                } catch (error) {
                    let errorMessage = '最终化失败！ ';
                    if (error.response) {
                        errorMessage += error.response.data?.message || '服务器错误';
                        console.error('最终化错误响应:', error.response);
                    } else if (error.request) {
                        errorMessage += '服务器无响应';
                        console.error('最终化错误: 无响应', error.request);
                    } else {
                        errorMessage += error.message;
                        console.error('最终化错误:', error.message);
                    }
                    userLog('warning', errorMessage, 'top-end', 3000);
                }
            }
        } catch (err) {
            console.error('Recording save failed', err);
        }
    }

    disableRecordingOptions(disabled = true) {
        switchServerRecording.disabled = disabled;
        switchHostOnlyRecording.disabled = disabled;
    }

    getWebmFixerFn() {
        const fn = window.FixWebmDuration;
        return typeof fn === 'function' ? fn : null;
    }

    handleLocalRecordingStop() {
        console.log('MediaRecorder Blobs: ', recordedBlobs);

        const dateTime = getDataTimeString();
        const type = recordedBlobs[0].type.includes('mp4') ? 'mp4' : 'webm';
        const rawBlob = new Blob(recordedBlobs, { type: 'video/' + type });
        const recFileName = `Rec_${dateTime}.${type}`;
        const currentDevice = this.isMobileDevice ? 'MOBILE' : 'PC';
        const blobFileSize = bytesToSize(rawBlob.size);
        const recTime = document.getElementById('recordingStatus');
        const recType = 'Locally';
        const recordingInfo = `
        <br/><br/>
        <ul>
            <li>Stored: ${recType}</li>
            <li>Time: ${recTime.innerText}</li>
            <li>File: ${recFileName}</li>
            <li>Codecs: ${recCodecs}</li>
            <li>Size: ${blobFileSize}</li>
        </ul>
        <br/>
        `;
        const recordingMsg = `请等待处理完成，然后将下载到您的 ${currentDevice} 设备上。`;

        this.saveLastRecordingInfo(recordingInfo);
        this.showRecordingInfo(recType, recordingInfo, recordingMsg);

        // Fix WebM duration to make it seekable
        const fixWebmDuration = async (blob) => {
            if (type !== 'webm') return blob;
            try {
                const fix = this.getWebmFixerFn();
                const durationMs = this._recStartTs ? performance.now() - this._recStartTs : undefined;
                const fixed = await fix(blob, durationMs);
                return fixed || blob;
            } catch (e) {
                console.warn('WEBM duration fix failed, saving original blob:', e);
                return blob;
            } finally {
                this._recStartTs = null;
            }
        };

        (async () => {
            const finalBlob = await fixWebmDuration(rawBlob);
            this.saveRecordingInLocalDevice(finalBlob, recFileName, recTime);
        })();
    }

    handleServerRecordingStop() {
        console.log('MediaRecorder Stop');
        const recTime = document.getElementById('recordingStatus');
        const recType = 'Server';
        const recordingInfo = `
        <br/><br/>
        <ul>
            <li>Stored: ${recType}</li>
            <li>Time: ${recTime.innerText}</li>
            <li>File: ${this.recServerFileName}</li>
            <li>Codecs: ${recCodecs}</li>
        </ul>
        <br/>
        `;
        this.saveLastRecordingInfo(recordingInfo);
        this.showRecordingInfo(recType, recordingInfo);
    }

    saveLastRecordingInfo(recordingInfo) {
        const lastRecordingInfo = document.getElementById('lastRecordingInfo');
        lastRecordingInfo.style.color = '#FFFFFF';
        lastRecordingInfo.innerHTML = `Last Recording Info: ${recordingInfo}`;
        show(lastRecordingInfo);
    }

    cleanLastRecordingInfo() {
        const lastRecordingInfo = document.getElementById('lastRecordingInfo');
        lastRecordingInfo.innerHTML = '';
        hide(lastRecordingInfo);
    }

    showRecordingInfo(recType, recordingInfo, recordingMsg = '') {
        if (window.localStorage.isReconnected === 'false') {
            Swal.fire({
                background: swalBackground,
                position: 'top',
                title: '录音',
                html: `<div style="text-align: left;">
                🔴 ${recType} 录音信息: 
                ${recordingInfo}
                ${recordingMsg}
                </div>`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
    }

    saveRecordingInLocalDevice(blob, recFileName, recTime) {
        console.log('MediaRecorder Download Blobs');
        const url = window.URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = url;
        downloadLink.download = recFileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();

        setTimeout(() => {
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);
            console.log(`🔴 Recording FILE: ${recFileName} done 👍`);
            recordedBlobs = [];
            recTime.innerText = '0s';
        }, 100);
    }

    pauseRecording() {
        if (this.mediaRecorder) {
            this._isRecording = false;
            this.mediaRecorder.pause();
            this.event(_EVENTS.pauseRec);
            this.recordingAction('暂停录音');
        }
    }

    resumeRecording() {
        if (this.mediaRecorder) {
            this._isRecording = true;
            this.mediaRecorder.resume();
            this.event(_EVENTS.resumeRec);
            this.recordingAction('恢复录音');
        }
    }

    stopRecording() {
        if (this.mediaRecorder) {
            this.toggleVideoAudioTabs(false);
            this._isRecording = false;
            this.mediaRecorder.stop();
            this.mediaRecorder = null;
            if (this.recScreenStream) {
                this.recScreenStream.getTracks().forEach((track) => {
                    if (track.kind === 'video') track.stop();
                });
            }
            if (this.isMobileDevice) this.getId('swapCameraButton').className = '';
            this.event(_EVENTS.stopRec);
            this.audioRecorder.stopMixedAudioStream();
            this.recordingAction(enums.recording.stop);
            this.sound('recStop');
        }
    }

    recordingAction(action) {
        if (!this.thereAreParticipants()) return;
        this.socket.emit('recordingAction', {
            peer_name: this.peer_name,
            peer_id: this.peer_id,
            action: action,
        });
    }

    handleRecordingAction(data) {
        console.log('Handle recording action', data);

        const { peer_name, peer_avatar, peer_id, action } = data;

        const recAction = {
            side: 'left',
            img: this.leftMsgAvatar,
            peer_name: peer_name,
            peer_avatar: peer_avatar,
            peer_id: peer_id,
            peer_msg: `🔴 ${action}`,
            to_peer_id: 'all',
            to_peer_name: 'all',
        };
        this.showMessage(recAction, false);

        const recData = {
            type: 'recording',
            action: action,
            peer_name: peer_name,
        };

        this.msgHTML(
            recData,
            null,
            image.recording,
            null,
            `${icons.user} ${peer_name} 
            <br /><br /> 
            <span>🔴 ${action}</span>
            <br />`
        );
    }

    saveRecording(reason) {
        if (this._isRecording || recordingStatus.innerText != '0s') {
            console.log(`Save recording: ${reason}`);
            this.stopRecording();
        }
    }

    // ####################################################
    // ACTIVE ROOMS
    // ####################################################

    showActiveRooms() {
        openURL('/activeRooms', true);
    }

    // ####################################################
    // FILE SHARING
    // ####################################################

    handleSF(uid) {
        const words = uid.split('___');
        let peer_id = words[1];
        let btnSf = this.getId(uid);
        if (btnSf) {
            btnSf.addEventListener('click', () => {
                this.selectFileToShare(peer_id);
            });
        }
    }

    handleDD(uid, peer_id, itsMe = false) {
        let videoPlayer = this.getId(uid);
        if (videoPlayer) {
            videoPlayer.addEventListener('dragover', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.target.parentElement.style.outline = `2px dashed var(--dd-color)`;
            });

            videoPlayer.addEventListener('dragleave', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.target.parentElement.style.outline = 'none';
            });

            videoPlayer.addEventListener('drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.target.parentElement.style.outline = 'none';
                if (itsMe) {
                    return userLog('warning', '您不能给自己发送文件。', 'top-end');
                }
                if (thisInProgress) {
                    return userLog('warning', '请等待之前文件发送完成。', 'top-end');
                }
                if (e.dataTransfer.items && e.dataTransfer.items.length > 1) {
                    return userLog('warning', '请拖拽单个文件。', 'top-end');
                }
                if (e.dataTransfer.items) {
                    let item = e.dataTransfer.items[0].webkitGetAsEntry();
                    console.log('拖拽放置', item);
                    if (item.isDirectory) {
                        return userLog('warning', '请拖拽单个文件，不要拖拽文件夹。', 'top-end');
                    }
                    var file = e.dataTransfer.items[0].getAsFile();
                    rc.sendFileInformations(file, peer_id);
                } else {
                    rc.sendFileInformations(e.dataTransfer.files[0], peer_id);
                }
            });
        }
    }

    selectFileToShare(peer_id, broadcast = false) {
        this.sound('open');

        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            imageAlt: 'mirotalksfu-file-sharing',
            imageUrl: image.share,
            position: 'center',
            title: '分享文件',
            input: 'file',
            html: `
            <div id="dropArea">
                <p>将您的文件拖拽到此处</p>
            </div>
            `,
            inputAttributes: {
                accept: this.fileSharingInput,
                'aria-label': 'Select file',
            },
            didOpen: () => {
                const dropArea = document.getElementById('dropArea');
                dropArea.addEventListener('dragenter', handleDragEnter);
                dropArea.addEventListener('dragover', handleDragOver);
                dropArea.addEventListener('dragleave', handleDragLeave);
                dropArea.addEventListener('drop', handleDrop);
            },
            showDenyButton: true,
            confirmButtonText: `发送`,
            denyButtonText: `取消`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                this.sendFileInformations(result.value, peer_id, broadcast);
            }
        });

        function handleDragEnter(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.style.background = 'var(--body-bg)';
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'copy';
        }

        function handleDragLeave(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.style.background = '';
        }

        function handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
            e.target.style.background = '';
        }

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                console.log('Selected file:', file);
                Swal.close();
                rc.sendFileInformations(file, peer_id, broadcast);
            }
        }
    }

    sendFileInformations(file, peer_id, broadcast = false) {
        if (this.isFileReaderRunning()) {
            return this.userLog('warning', '文件传输正在进行中。请等待完成', 'top-end');
        }
        this.fileToSend = file;
        //
        if (this.fileToSend && this.fileToSend.size > 0) {
            if (!this.thereAreParticipants()) {
                return userLog('info', '未检测到参与者', 'top-end');
            }
            // 防止XSS注入
            if (this.isHtml(this.fileToSend.name) || !this.isValidFileName(this.fileToSend.name))
                return userLog('warning', '文件名无效！', 'top-end', 5000);

            const fileInfo = {
                peer_id: peer_id,
                broadcast: broadcast,
                peer_name: this.peer_name,
                peer_avatar: this.peer_avatar,
                fileName: this.fileToSend.name,
                fileSize: this.fileToSend.size,
                fileType: this.fileToSend.type,
            };
            this.setMsgAvatar('left', this.peer_name, this.peer_avatar);
            this.appendMessage(
                'left',
                this.leftMsgAvatar,
                this.peer_name,
                this.peer_id,
                `${icons.fileSend} File send: 
                <br/> 
                <ul>
                    <li>名称: ${this.fileToSend.name}</li>
                    <li>大小: ${this.bytesToSize(this.fileToSend.size)}</li>
                </ul>`,
                'all',
                'all'
            );
            // send some metadata about our file to peers in the room
            this.socket.emit('fileInfo', fileInfo);
            setTimeout(() => {
                this.sendFileData(peer_id, broadcast);
            }, 1000);
        } else {
            userLog('error', '未选择文件或文件为空。', 'top-end');
        }
    }

    handleFileInfo(data) {
        this.incomingFileInfo = data;
        this.incomingFileData = [];
        this.receiveBuffer = [];
        this.receivedSize = 0;
        let fileToReceiveInfo =
            ' 来自: ' +
            this.incomingFileInfo.peer_name +
            html.newline +
            ' 收到的文件: ' +
            this.incomingFileInfo.fileName +
            html.newline +
            ' 文件类型: ' +
            this.incomingFileInfo.fileType +
            html.newline +
            ' 文件大小: ' +
            this.bytesToSize(this.incomingFileInfo.fileSize);
        this.setMsgAvatar('right', this.incomingFileInfo.peer_name, this.incomingFileInfo.peer_avatar);
        this.appendMessage(
            'right',
            this.rightMsgAvatar,
            this.incomingFileInfo.peer_name,
            this.incomingFileInfo.peer_id,
            `${icons.fileReceive} 文件接收: 
            <br/> 
            <ul>
                <li>来自: ${this.incomingFileInfo.peer_name}</li>
                <li>ID: ${this.incomingFileInfo.peer_id}</li>
                <li>名称: ${this.incomingFileInfo.fileName}</li>
                <li>大小: ${this.bytesToSize(this.incomingFileInfo.fileSize)}</li>
            </ul>`,
            'all',
            'all'
        );
        receiveFileInfo.innerText = fileToReceiveInfo;
        receiveFileDiv.style.display = 'inline';
        receiveProgress.max = this.incomingFileInfo.fileSize;
        this.userLog('info', fileToReceiveInfo, 'top-end');
        this.receiveInProgress = true;
    }

    sendFileData(peer_id, broadcast) {
        console.log('Send file ', {
            name: this.fileToSend.name,
            size: this.bytesToSize(this.fileToSend.size),
            type: this.fileToSend.type,
        });

        this.sendInProgress = true;

        sendFileInfo.innerText =
            '文件名称: ' +
            this.fileToSend.name +
            html.newline +
            '文件类型: ' +
            this.fileToSend.type +
            html.newline +
            '文件大小: ' +
            this.bytesToSize(this.fileToSend.size) +
            html.newline;

        sendFileDiv.style.display = 'inline';
        sendProgress.max = this.fileToSend.size;

        this.fileReader = new FileReader();
        let offset = 0;

        this.fileReader.addEventListener('error', (err) => console.error('fileReader error', err));
        this.fileReader.addEventListener('abort', (e) => console.log('fileReader aborted', e));
        this.fileReader.addEventListener('load', (e) => {
            if (!this.sendInProgress) return;

            let data = {
                peer_id: peer_id,
                broadcast: broadcast,
                fileData: e.target.result,
            };
            this.sendFSData(data);
            offset += data.fileData.byteLength;

            sendProgress.value = offset;
            sendFilePercentage.innerText = '发送进度: ' + ((offset / this.fileToSend.size) * 100).toFixed(2) + '%';

            // 文件发送完成
            if (offset === this.fileToSend.size) {
                this.sendInProgress = false;
                sendFileDiv.style.display = 'none';
                userLog('success', '文件 ' + this.fileToSend.name + ' 已成功发送。', 'top-end');
            }

            if (offset < this.fileToSend.size) readSlice(offset);
        });
        const readSlice = (o) => {
            const slice = this.fileToSend.slice(offset, o + this.chunkSize);
            this.fileReader.readAsArrayBuffer(slice);
        };
        readSlice(0);
    }

    sendFSData(data) {
        if (data) this.socket.emit('file', data);
    }

    abortFileTransfer() {
        if (this.isFileReaderRunning()) {
            this.fileReader.abort();
            sendFileDiv.style.display = 'none';
            this.sendInProgress = false;
            this.socket.emit('fileAbort', {
                peer_name: this.peer_name,
            });
        }
    }

    abortReceiveFileTransfer() {
        const data = { peer_name: this.peer_name };
        this.socket.emit('receiveFileAbort', data);
        setTimeout(() => {
            this.handleFileAbort(data);
        }, 1000);
    }

    hideFileTransfer() {
        receiveFileDiv.style.display = 'none';
    }

    isFileReaderRunning() {
        return this.fileReader && this.fileReader.readyState === 1;
    }

    handleReceiveFileAbort(data) {
        if (this.isFileReaderRunning()) {
            this.userLog('info', data.peer_name + ' ⚠️ 中止了文件传输', 'top-end');
            this.fileReader.abort();
            sendFileDiv.style.display = 'none';
            this.sendInProgress = false;
        } else {
            this.handleFileAbort(data);
        }
    }

    handleFileAbort(data) {
        this.receiveBuffer = [];
        this.incomingFileData = [];
        this.receivedSize = 0;
        this.receiveInProgress = false;
        receiveFileDiv.style.display = 'none';
        console.log(data.peer_name + ' aborted the file transfer');
        this.userLog('info', data.peer_name + ' ⚠️ 中止了文件传输', 'top-end');
    }

    handleFile(data) {
        if (!this.receiveInProgress) return;
        this.receiveBuffer.push(data.fileData);
        this.receivedSize += data.fileData.byteLength;
        receiveProgress.value = this.receivedSize;
        receiveFilePercentage.innerText =
            '接收进度: ' + ((this.receivedSize / this.incomingFileInfo.fileSize) * 100).toFixed(2) + '%';
        if (this.receivedSize === this.incomingFileInfo.fileSize) {
            receiveFileDiv.style.display = 'none';
            this.incomingFileData = this.receiveBuffer;
            this.receiveBuffer = [];
            this.endFileDownload();
        }
    }

    endFileDownload() {
        this.sound('download');

        // save received file into Blob
        const blob = new Blob(this.incomingFileData);
        const file = this.incomingFileInfo.fileName;

        this.incomingFileData = [];

        // if file is image, show the preview
        if (isImageURL(this.incomingFileInfo.fileName)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    allowOutsideClick: false,
                    background: swalBackground,
                    position: 'center',
                    title: '收到的文件',
                    text: this.incomingFileInfo.fileName + ' 大小 ' + this.bytesToSize(this.incomingFileInfo.fileSize),
                    imageUrl: e.target.result,
                    imageAlt: 'mirotalksfu-file-img-download',
                    showDenyButton: true,
                    confirmButtonText: `保存`,
                    denyButtonText: `取消`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result) => {
                    if (result.isConfirmed) this.saveBlobToFile(blob, file);
                });
            };
            // blob where is stored downloaded file
            reader.readAsDataURL(blob);
        } else {
            // not img file
            Swal.fire({
                allowOutsideClick: false,
                background: swalBackground,
                position: 'center',
                title: '收到的文件',
                text: this.incomingFileInfo.fileName + ' 大小 ' + this.bytesToSize(this.incomingFileInfo.fileSize),
                showDenyButton: true,
                confirmButtonText: `保存`,
                denyButtonText: `取消`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result) => {
                if (result.isConfirmed) this.saveBlobToFile(blob, file);
            });
        }
    }

    saveBlobToFile(blob, file) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    bytesToSize(bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    toHtmlJson(obj) {
        return '<pre>' + JSON.stringify(obj, null, 4) + '</pre>';
    }

    isValidFileName(fileName) {
        const invalidChars = /[\\\/\?\*\|:"<>]/;
        return !invalidChars.test(fileName);
    }

    // ####################################################
    // SHARE VIDEO YOUTUBE - MP4 - WEBM - OGG or AUDIO mp3
    // ####################################################

    handleSV(uid) {
        const words = uid.split('___');
        let peer_id = words[1];
        let btnSv = this.getId(uid);
        if (btnSv) {
            btnSv.addEventListener('click', () => {
                this.shareVideo(peer_id);
            });
        }
    }

    shareVideo(peer_id = 'all') {
        if (this._moderator.media_cant_sharing) {
            return userLog('warning', '主持人不允许您共享任何媒体', 'top-end', 6000);
        }

        this.sound('open');

        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.videoShare,
            title: '分享视频或音频',
            text: '粘贴视频或音频URL',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: `分享`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.value) {
                result.value = filterXSS(result.value);
                // if (!this.thereAreParticipants()) {
                //     return userLog('info', 'No participants detected', 'top-end');
                // }
                if (!this.isVideoTypeSupported(result.value)) {
                    return userLog('warning', '出现问题，请尝试其他视频或音频URL');
                }
                /*
                    https://www.youtube.com/watch?v=RT6_Id5-7-s
                    https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
                    https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3
                */
                let is_youtube = this.getVideoType(result.value) == 'na' ? true : false;
                let video_url = is_youtube ? this.getYoutubeEmbed(result.value) : result.value;
                if (video_url) {
                    let data = {
                        peer_id: peer_id,
                        peer_name: this.peer_name,
                        video_url: video_url,
                        is_youtube: is_youtube,
                        action: 'open',
                    };
                    console.log('Video URL: ', video_url);
                    this.socket.emit('shareVideoAction', data);
                    this.openVideo(data);
                } else {
                    this.userLog('error', '无效的视频URL', 'top-end', 6000);
                }
            }
        });

        // Take URL from clipboard ex:
        // https://www.youtube.com/watch?v=1ZYbU82GVz4

        navigator.clipboard
            .readText()
            .then((clipboardText) => {
                if (!clipboardText) return false;
                const sanitizedText = filterXSS(clipboardText);
                const inputElement = Swal.getInput();
                if (this.isVideoTypeSupported(sanitizedText) && inputElement) {
                    inputElement.value = sanitizedText;
                }
                return false;
            })
            .catch(() => {
                return false;
            });
    }

    getVideoType(url) {
        if (url.endsWith('.mp4')) return 'video/mp4';
        if (url.endsWith('.mp3')) return 'video/mp3';
        if (url.endsWith('.webm')) return 'video/webm';
        if (url.endsWith('.ogg')) return 'video/ogg';
        return 'na';
    }

    isVideoTypeSupported(url) {
        if (
            url.endsWith('.mp4') ||
            url.endsWith('.mp3') ||
            url.endsWith('.webm') ||
            url.endsWith('.ogg') ||
            url.includes('youtube.com')
        )
            return true;
        return false;
    }

    getYoutubeEmbed(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return match && match[7].length == 11 ? 'https://www.youtube.com/embed/' + match[7] + '?autoplay=1' : false;
    }

    shareVideoAction(data) {
        const { peer_name, action } = data;

        switch (action) {
            case 'open':
                this.userLog('info', `${peer_name} <i class="fab fa-youtube"></i> 打开了视频`, 'top-end');
                this.openVideo(data);
                break;
            case 'close':
                this.userLog('info', `${peer_name} <i class="fab fa-youtube"></i> 关闭了视频`, 'top-end');
                this.closeVideo();
                break;
            default:
                break;
        }
    }

    openVideo(data) {
        let d, vb, e, video, pn, fsBtn;
        let peer_name = data.peer_name;
        let video_url = data.video_url + (this.isMobileSafari ? '&enablejsapi=1&mute=1' : ''); // Safari need user interaction
        let is_youtube = data.is_youtube;
        let video_type = this.getVideoType(video_url);
        this.closeVideo();
        show(videoCloseBtn);
        d = document.createElement('div');
        d.className = 'Camera';
        d.id = '__shareVideo';
        vb = document.createElement('div');
        vb.setAttribute('id', '__videoBar');
        vb.className = 'videoMenuBarShare fadein';
        e = this.createButton('__videoExit', 'fas fa-times');
        pn = this.createButton('__pinUnpin', html.pin);
        fsBtn = this.createButton('__videoFS', html.fullScreen);

        if (is_youtube) {
            video = document.createElement('iframe');
            video.setAttribute('title', peer_name);
            video.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            );
            video.setAttribute('frameborder', '0');
            video.setAttribute('allowfullscreen', true);

            // Safari on Mobile needs user interaction to unmute video
            if (this.isMobileSafari) {
                Swal.fire({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    background: swalBackground,
                    position: 'top',
                    imageUrl: image.videoShare,
                    title: '取消静音视频',
                    text: '点击下面的按钮取消静音并播放带声音的视频。',
                    confirmButtonText: '取消静音',
                    didOpen: () => {
                        const unmuteButton = Swal.getConfirmButton();
                        if (unmuteButton) unmuteButton.focus();
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (video && video.contentWindow) {
                            video.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                            video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        }
                    }
                });
            }
        } else {
            video = document.createElement('video');
            video.type = video_type;
            video.autoplay = true;
            video.controls = true;
            if (video_type == 'video/mp3') {
                video.poster = image.audio;
            }
        }
        video.setAttribute('id', '__videoShare');
        video.setAttribute('src', video_url);
        video.setAttribute('width', '100%');
        video.setAttribute('height', '100%');
        vb.appendChild(e);
        vb.appendChild(fsBtn);
        if (!this.isMobileDevice) vb.appendChild(pn);
        d.appendChild(video);
        d.appendChild(vb);
        this.videoMediaContainer.appendChild(d);

        fsBtn.addEventListener('click', () => {
            // Try to use the Fullscreen API
            if (
                video.requestFullscreen ||
                video.webkitRequestFullscreen ||
                video.mozRequestFullScreen ||
                video.msRequestFullscreen
            ) {
                this.isFullScreen() ? this.goOutFullscreen(video) : this.goInFullscreen(video);
            } else {
                elemDisplay('__videoFS', false);

                // Maximize video with CSS
                video.style.position = 'fixed';
                video.style.top = 0;
                video.style.left = 0;
                video.style.width = '100vw';
                video.style.height = '100vh';
                video.style.zIndex = 9999;

                // Add a close/maximize button for fallback
                let isMaximized = true;
                const closeBtn = document.createElement('button');
                closeBtn.innerText = isMaximized ? 'Minimize' : 'Maximize';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '1px';
                closeBtn.style.left = '1px';
                closeBtn.style.zIndex = 10000;
                closeBtn.style.background = 'rgba(0,0,0,0.5)';
                closeBtn.style.color = '#fff';
                closeBtn.style.border = 'none';
                closeBtn.style.padding = '8px 12px';
                closeBtn.style.borderRadius = '4px';
                closeBtn.style.cursor = 'pointer';

                closeBtn.onclick = () => {
                    if (isMaximized) {
                        video.style.position = '';
                        video.style.top = '';
                        video.style.left = '';
                        video.style.width = '';
                        video.style.height = '';
                        video.style.zIndex = '';
                        closeBtn.innerText = 'Maximize';
                        isMaximized = false;
                    } else {
                        video.style.position = 'fixed';
                        video.style.top = 0;
                        video.style.left = 0;
                        video.style.width = '100vw';
                        video.style.height = '100vh';
                        video.style.zIndex = 9999;
                        closeBtn.innerText = 'Minimize';
                        isMaximized = true;
                    }
                };

                // Ensure only one button is added
                if (!video.parentNode.querySelector('.mobile-video-close-btn')) {
                    closeBtn.classList.add('mobile-video-close-btn');
                    video.parentNode.appendChild(closeBtn);
                }
            }
        });

        const exitVideoBtn = this.getId(e.id);
        exitVideoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this._moderator.media_cant_sharing) {
                return userLog('warning', '主持人不允许您关闭此媒体', 'top-end', 6000);
            }
            this.closeVideo(true);
        });

        this.handlePN(video.id, pn.id, d.id);
        if (!this.isMobileDevice) {
            this.setTippy(pn.id, '切换固定视频播放器', 'bottom');
            this.setTippy(e.id, '关闭视频播放器', 'bottom');
            this.setTippy(fsBtn.id, '全屏', 'bottom');
        }

        handleAspectRatio();
        console.log('[openVideo] Video-element-count', this.videoMediaContainer.childElementCount);
        this.sound('joined');
    }

    closeVideo(emit = false, peer_id = 'all') {
        if (emit) {
            let data = {
                peer_id: peer_id,
                peer_name: this.peer_name,
                action: 'close',
            };
            this.socket.emit('shareVideoAction', data);
        }
        let shareVideoDiv = this.getId('__shareVideo');
        if (shareVideoDiv) {
            hide(videoCloseBtn);
            shareVideoDiv.parentNode.removeChild(shareVideoDiv);
            //alert(this.isVideoPinned + ' - ' + this.pinnedVideoPlayerId);
            if (this.isVideoPinned && this.pinnedVideoPlayerId == '__videoShare') {
                this.removeVideoPinMediaContainer();
                console.log('Remove pin container due the Video player close');
            }
            handleAspectRatio();
            console.log('[closeVideo] Video-element-count', this.videoMediaContainer.childElementCount);
            this.sound('left');
        }
    }

    // ####################################################
    // ROOM ACTION
    // ####################################################

    roomAction(action, emit = true, popup = true) {
        const data = {
            room_broadcasting: isBroadcastingEnabled,
            room_id: this.room_id,
            peer_id: this.peer_id,
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            action: action,
            password: null,
        };
        if (emit) {
            switch (action) {
                case 'broadcasting':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lock':
                    if (room_password) {
                        this.socket
                            .request('getPeerCounts')
                            .then(async (res) => {
                                // Only the presenter can lock the room
                                if (isPresenter || res.peerCounts == 1) {
                                    isPresenter = true;
                                    this.peer_info.peer_presenter = isPresenter;
                                    this.getId('isUserPresenter').innerText = isPresenter;
                                    data.password = room_password;
                                    this.socket.emit('roomAction', data);
                                    if (popup) this.roomStatus(action);
                                }
                            })
                            .catch((err) => {
                                console.log('Get peer counts:', err);
                            });
                    } else {
                        Swal.fire({
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showDenyButton: true,
                            background: swalBackground,
                            imageUrl: image.locked,
                            input: 'text',
                            inputPlaceholder: 'Set Room password',
                            confirmButtonText: `OK`,
                            denyButtonText: `Cancel`,
                            showClass: { popup: 'animate__animated animate__fadeInDown' },
                            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                            inputValidator: (pwd) => {
                                if (!pwd) return 'Please enter the Room password';
                                this.RoomPassword = pwd;
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                data.password = this.RoomPassword;
                                this.socket.emit('roomAction', data);
                                this.roomStatus(action);
                            }
                        });
                    }
                    break;
                case 'unlock':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lobbyOn':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lobbyOff':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'hostOnlyRecordingOn':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'hostOnlyRecordingOff':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'isBanned':
                    this.socket.emit('roomAction', data);
                    this.isBanned();
                    break;
                default:
                    break;
            }
        } else {
            this.roomStatus(action);
        }
    }

    roomStatus(action) {
        switch (action) {
            case 'broadcasting':
                this.userLog('info', `${icons.room} 广播 ${isBroadcastingEnabled ? '开启' : '关闭'}`, 'top-end');
                break;
            case 'lock':
                if (!isPresenter) return;
                this.sound('locked');
                this.event(_EVENTS.roomLock);
                this.userLog('info', `${icons.lock} 房间已通过密码锁定`, 'top-end');
                break;
            case 'unlock':
                if (!isPresenter) return;
                this.userLog('info', `${icons.unlock} 房间已解锁`, 'top-end');
                this.event(_EVENTS.roomUnlock);
                break;
            case 'lobbyOn':
                this.event(_EVENTS.lobbyOn);
                this.userLog('info', `${icons.lobby} 会议室已启用`, 'top-end');
                break;
            case 'lobbyOff':
                this.event(_EVENTS.lobbyOff);
                this.userLog('info', `${icons.lobby} 会议室已禁用`, 'top-end');
                break;
            case 'hostOnlyRecordingOn':
                this.event(_EVENTS.hostOnlyRecordingOn);
                this.userLog('info', `${icons.recording} 仅主持人录制已启用`, 'top-end');
                break;
            case 'hostOnlyRecordingOff':
                this.event(_EVENTS.hostOnlyRecordingOff);
                this.userLog('info', `${icons.recording} 仅主持人录制已禁用`, 'top-end');
                break;
            default:
                break;
        }
    }

    roomMessage(action, active = false) {
        const status = active ? 'ON' : 'OFF';
        this.sound('switch');
        switch (action) {
            case 'toggleVideoMirror':
                this.userLog('info', `${icons.mirror} 视频镜像 ${status}`, 'top-end');
                break;
            case 'pitchBar':
                this.userLog('info', `${icons.pitchBar} 音频音调条 ${status}`, 'top-end');
                break;
            case 'sounds':
                this.userLog('info', `${icons.sounds} 声音通知 ${status}`, 'top-end');
                break;
            case 'ptt':
                this.userLog('info', `${icons.ptt} 按讲模式 ${status}`, 'top-end');
                break;
            case 'notify':
                this.userLog('info', `${icons.share} 加入时共享房间 ${status}`, 'top-end');
                break;
            case 'hostOnlyRecording':
                this.userLog('info', `${icons.recording} 仅主持人录制 ${status}`, 'top-end');
                break;
            case 'showChat':
                active
                    ? this.userLog('info', `${icons.chat} 聊天将在收到消息时显示`, 'top-end')
                    : this.userLog(
                          'info',
                          `${icons.chat} 聊天将不会在收到消息时显示`,
                          'top-end'
                      );
                break;
            case 'speechMessages':
                this.userLog('info', `${icons.speech} 语音传入消息 ${status}`, 'top-end');
                break;
            case 'transcriptShowOnMsg':
                active
                    ? this.userLog(
                          'info',
                          `${icons.transcript} 转录将在收到消息时显示`,
                          'top-end'
                      )
                    : this.userLog(
                          'info',
                          `${icons.transcript} 转录将不会在收到消息时显示`,
                          'top-end'
                      );
                break;
            case 'video_start_privacy':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都以隐私模式启动 ${status}`,
                    'top-end'
                );
                break;
            case 'audio_start_muted':
                this.userLog('info', `${icons.moderator} 主持人: 每个人都以静音启动 ${status}`, 'top-end');
                break;
            case 'video_start_hidden':
                this.userLog('info', `${icons.moderator} 主持人: 每个人都以隐藏启动 ${status}`, 'top-end');
                break;
            case 'audio_cant_unmute':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都不能自己取消静音 ${status}`,
                    'top-end'
                );
                break;
            case 'video_cant_unhide':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都不能自己取消隐藏 ${status}`,
                    'top-end'
                );
                break;
            case 'screen_cant_share':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都不能分享屏幕 ${status}`,
                    'top-end'
                );
                break;
            case 'chat_cant_privately':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都不能私聊 ${status}`,
                    'top-end'
                );
                break;
            case 'chat_cant_chatgpt':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都不能与ChatGPT聊天 ${status}`,
                    'top-end'
                );
                break;
            case 'chat_cant_deep_seek':
                this.userLog(
                    'info',
                    `${icons.moderator} 主持人: 每个人都不能与DeepSeek聊天 ${status}`,
                    'top-end'
                );
                break;
            case 'media_cant_sharing':
                this.userLog('info', `${icons.moderator} 主持人: 每个人都不能分享媒体 ${status}`, 'top-end');
                break;
            case 'disconnect_all_on_leave':
                this.userLog('info', `${icons.moderator} 主持人: 离开房间时断开所有连接 ${status}`, 'top-end');
                break;
            case 'recSyncServer':
                this.userLog('info', `${icons.RecSync} 服务器同步录制 ${status}`, 'top-end');
                break;
            case 'customThemeKeep':
                this.userLog('info', `${icons.theme} 自定义主题保持 ${status}`, 'top-end');
                break;
            case 'save_room_notifications':
                this.userLog('success', '房间通知保存成功', 'top-end');
                break;
            default:
                break;
        }
    }

    async roomPassword(data) {
        switch (data.password) {
            case 'OK':
                this.RoomPasswordValid = true;
                await this.joinAllowed(data.room);
                break;
            case 'KO':
                this.RoomPasswordValid = false;
                this.roomIsLocked();
                break;
            default:
                break;
        }
    }

    // ####################################################
    // ROOM LOBBY
    // ####################################################

    async roomLobby(data) {
        console.log('LOBBY--->', data);
        switch (data.lobby_status) {
            case 'waiting':
                if (!isRulesActive || isPresenter) {
                    const { peer_id, peer_name, peer_avatar } = data;
                    this.lobbyAddPear({ peer_id, peer_name, peer_avatar });
                    this.userLog('info', peer_name + ' 想要加入会议', 'top-end');
                }
                break;
            case 'accept':
                if (this.lobbyRemovePearForPresenter(data)) {
                    return;
                }
                this.RoomLobbyAccepted = true;
                await this.joinAllowed(data.room);
                control.style.display = 'flex';
                bottomButtons.style.display = 'flex';
                this.msgPopup('info', '您的加入会议请求已被主持人接受', 3000, 'top');
                break;
            case 'reject':
                if (this.lobbyRemovePearForPresenter(data)) {
                    return;
                }
                this.RoomLobbyAccepted = false;
                this.sound('eject');
                Swal.Fire({
                    icon: 'warning',
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    showDenyButton: false,
                    showConfirmButton: true,
                    background: swalBackground,
                    title: '已拒绝',
                    text: '您的加入会议请求已被主持人拒绝',
                    confirmButtonText: `确定`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.exit();
                    }
                });
                break;
            default:
                break;
        }
    }

    lobbyRemovePearForPresenter(data) {
        const peers_id = data.peers_id?.length > 0 ? data.peers_id : [data.peer_id];

        // This current pear is in lobby accept request
        // It means that most probably we this pear is eaitin in lobby right now
        // so no need to update lobby list UI modal since there is no one
        if (peers_id.includes(this.peer_id)) {
            return false;
        }

        for (const peer_id of peers_id) {
            this.lobbyRemovePear(peer_id);
        }
        return true;
    }

    lobbyAction(id, lobby_status) {
        const words = id.split('___');
        const peer_name = words[0];
        const peer_id = words[1];
        const data = {
            room_id: this.room_id,
            peer_id: peer_id,
            peer_name: peer_name,
            lobby_status: lobby_status,
            broadcast: true,
        };
        this.socket.emit('roomLobby', data);
        this.lobbyRemovePear(peer_id);
    }

    lobbyAcceptAll() {
        const lobbyPearsIds = this.lobbyGetPeerIds();
        console.log('lobbyAcceptAll', lobbyPearsIds, lobbyPearsIds.length);
        if (lobbyPearsIds.length > 0) {
            const data = this.lobbyGetData('accept', lobbyPearsIds);
            this.socket.emit('roomLobby', data);
            this.lobbyRemoveAll();
        } else {
            this.userLog('info', '大厅没有检测到参与者', 'top-end');
        }
    }

    lobbyRejectAll() {
        const lobbyPearsIds = this.lobbyGetPeerIds();
        if (lobbyPearsIds.length > 0) {
            const data = this.lobbyGetData('reject', lobbyPearsIds);
            this.socket.emit('roomLobby', data);
            this.lobbyRemoveAll();
        } else {
            this.userLog('info', '大厅没有检测到参与者', 'top-end');
        }
    }

    lobbyRemoveAll() {
        this.lobbyPears = {};
        this.lobbyRefreshUi();
    }

    lobbyRemoveMe(peer_id) {
        this.lobbyRemovePear(peer_id);
    }

    lobbyAddPear(data) {
        this.lobbyPears[data.peer_id] = data;
        this.lobbyRefreshUi();
    }

    lobbyRemovePear(peer_id) {
        delete this.lobbyPears[peer_id];
        this.lobbyRefreshUi();
    }

    lobbyRefreshUi() {
        let lobbyTr = this.getId('lobbyTbTemplate').innerHTML;
        const lobbyTb = this.getId('lobbyTb');

        for (const peer_id of Object.keys(this.lobbyPears)) {
            const { peer_name, peer_avatar } = this.lobbyPears[peer_id];

            const avatarImg =
                peer_avatar && this.isImageURL(peer_avatar)
                    ? peer_avatar
                    : this.isValidEmail(peer_name)
                      ? this.genGravatar(peer_name, 32)
                      : this.genAvatarSvg(peer_name, 32);

            const lobbyAcceptId = `${peer_name}___${peer_id}___lobbyAccept`;
            const lobbyRejectId = `${peer_name}___${peer_id}___lobbyReject`;

            lobbyTr += `
            <tr id='${peer_id}'>
                <td><img src="${avatarImg}" /></td>
                <td>${peer_name}</td>
                <td><button id='${lobbyAcceptId}' onclick="rc.lobbyAction(this.id, 'accept')">${_PEER.acceptPeer}</button></td>
                <td><button id='${lobbyRejectId}' onclick="rc.lobbyAction(this.id, 'reject')">${_PEER.ejectPeer}</button></td>
            </tr>
            `;

            if (!this.isMobileDevice) {
                setTippy(lobbyAcceptId, '接受', 'top');
                setTippy(lobbyRejectId, '拒绝', 'top');
            }
        }
        lobbyTb.innerHTML = lobbyTr;
        lobbyHeaderTitle.innerText = '大厅用户 (' + this.lobbyParticipantsCount() + ')';
        this.lobbyToggle();
    }

    lobbyParticipantsCount() {
        return Object.keys(this.lobbyPears).length;
    }

    lobbyGetPeerIds() {
        return Object.keys(this.lobbyPears);
    }

    lobbyGetData(status, peers_id = []) {
        return {
            room_id: this.room_id,
            peer_id: this.peer_id,
            peer_name: this.peer_name,
            peers_id: peers_id,
            lobby_status: status,
            broadcast: true,
        };
    }

    lobbyToggle() {
        const isAllowed = !isRulesActive || isPresenter;
        if (this.lobbyParticipantsCount() > 0 && isAllowed) {
            lobby.style.display = 'block';
            lobby.style.top = '50%';
            lobby.style.left = '50%';
            if (this.isMobileDevice) {
                lobby.style.width = '100%';
                lobby.style.height = '100%';
            }
            this.sound('lobby');
        } else {
            lobby.style.display = 'none';
        }
    }

    // ####################################################
    // HANDLE ROOM ACTION
    // ####################################################

    roomInvalid() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: '哎呀，房间无效',
            text: '房间名称无效！检测到路径遍历模式！',
            confirmButtonText: `确定`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            openURL(`/`);
        });
    }

    userRoomNotAllowed() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: '哎呀，房间不允许',
            text: '此房间不被此用户允许',
            confirmButtonText: `确定`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            openURL(`/`); // Select the new allowed room name for this user and login to join
        });
    }

    userUnauthorized() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: '哎呀，未授权',
            text: '主持人已启用用户认证',
            confirmButtonText: `登录`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            // Login required to join room
            endRoomSession();
            openURL(`/login/?room=${this.room_id}`);
        });
    }

    unlockTheRoom() {
        if (room_password) {
            this.RoomPassword = room_password;
            let data = {
                action: 'checkPassword',
                password: this.RoomPassword,
            };
            this.socket.emit('roomAction', data);
        } else {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: swalBackground,
                imageUrl: image.locked,
                title: '哎呀，房间已锁定',
                input: 'text',
                inputPlaceholder: '输入房间密码',
                confirmButtonText: `确定`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                inputValidator: (pwd) => {
                    if (!pwd) return '请输入房间密码';
                    this.RoomPassword = pwd;
                },
            }).then(() => {
                let data = {
                    action: 'checkPassword',
                    password: this.RoomPassword,
                };
                this.socket.emit('roomAction', data);
            });
        }
    }

    roomIsLocked() {
        this.sound('eject');
        this.event(_EVENTS.roomLock);
        console.log('Room is Locked, try with another one');
        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            position: 'center',
            imageUrl: image.locked,
            title: '哎呀，房间密码错误',
            text: '房间已锁定，请尝试其他房间。',
            showDenyButton: false,
            confirmButtonText: `确定`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) this.exit();
        });
    }

    presenterNotInRoom() {
        this.sound('lobby');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            showConfirmButton: false,
            background: swalBackground,
            icon: 'warning',
            title: '会议室已启用且无主持人可用',
            text: '需要主持人来开始会议。请稍后再尝试加入。',
            denyButtonText: `离开房间`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            timer: 6000,
            timerProgressBar: true,
        }).then(() => {
            this.exit();
        });
    }

    waitJoinConfirm() {
        this.sound('lobby');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            showConfirmButton: false,
            background: swalBackground,
            imageUrl: image.poster,
            title: '房间已启用会议室',
            text: '正在请求加入会议...',
            confirmButtonText: `确定`,
            denyButtonText: `离开房间`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                control.style.display = 'none';
                bottomButtons.style.display = 'none';
            } else {
                this.exit();
            }
        });
    }

    isBanned() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: true,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: '已禁止',
            text: '您已被禁止进入此房间！',
            confirmButtonText: `确定`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            this.exit();
        });
    }

    // ####################################################
    // HANDLE AUDIO VOLUME
    // ####################################################

    handleAudioVolume(data) {
        //console.log('Active speaker', data);

        const { peer_id, peer_name, audioVolume } = data;
        const audioVolumeTmp = audioVolume * 10; //10-100

        let audioColorTmp = 'lime';
        if ([50, 60, 70].includes(audioVolumeTmp)) audioColorTmp = 'orange';
        if ([80, 90, 100].includes(audioVolumeTmp)) audioColorTmp = 'red';

        if (!isPitchBarEnabled) {
            const peerVideo = this.getName(peer_id);
            const peerAvatarImg = this.getId(peer_id + '__img');
            if (peerAvatarImg) {
                this.applyBoxShadowEffect(peerAvatarImg, audioColorTmp, 200);
            }
            if (peerVideo && peerVideo.classList.contains('videoCircle')) {
                this.applyBoxShadowEffect(peerVideo, audioColorTmp, 200);
            }
            return;
        }
        const producerAudioBtn = this.getId(peer_id + '_audio');
        const consumerAudioBtn = this.getId(peer_id + '__audio');
        const pbProducer = this.getId(peer_id + '_pitchBar');
        const pbConsumer = this.getId(peer_id + '__pitchBar');
        if (producerAudioBtn) producerAudioBtn.style.color = audioColorTmp;
        if (consumerAudioBtn) consumerAudioBtn.style.color = audioColorTmp;
        if (pbProducer) pbProducer.style.backgroundColor = audioColorTmp;
        if (pbConsumer) pbConsumer.style.backgroundColor = audioColorTmp;
        if (pbProducer) pbProducer.style.height = audioVolumeTmp + '%';
        if (pbConsumer) pbConsumer.style.height = audioVolumeTmp + '%';
        setTimeout(function () {
            audioColorTmp = 'white';
            if (producerAudioBtn) producerAudioBtn.style.color = audioColorTmp;
            if (consumerAudioBtn) consumerAudioBtn.style.color = audioColorTmp;
            if (pbProducer) pbProducer.style.height = '0%';
            if (pbConsumer) pbConsumer.style.height = '0%';
        }, 200);
    }

    applyBoxShadowEffect(element, color, delay = 200) {
        if (element) {
            element.style.boxShadow = `0 0 20px ${color}`;
            setTimeout(() => {
                element.style.boxShadow = 'none';
            }, delay);
        }
    }

    // ####################################################
    // HANDLE PEERS AUDIO VOLUME
    // ####################################################

    handleCV(uid) {
        this.handleVolumeControl(uid, true); // Consumer
    }

    handlePV(uid) {
        this.handleVolumeControl(uid, false); // Producer
    }

    setAV(audioElementId, volumeElementId, volumeValue, isConsumer = false) {
        const volumeInput = this.getId(volumeElementId);
        const audioPlayer = this.getId(audioElementId);
        const volume = volumeValue / 100;

        if (volumeInput && audioPlayer) {
            console.log('Setting audio volume:', volumeValue);
            volumeInput.value = volumeValue;
            if (!audioPlayer.muted) {
                if (isConsumer) {
                    this.toggleVolumeInput(volumeInput, volumeValue);
                }
                this.setAudioVolume(audioPlayer, volume);
            } else {
                console.log('Audio player is muted, volume not adjusted.');
            }
        }
    }

    toggleVolumeInput(volumeInput, volumeValue) {
        /* 
            If the producer has changed the volume from the default value of 100,
            disable the volume input control on the consumer side to prevent further adjustments.
            Otherwise, keep the input enabled if the volume is still at 100.
        */
        volumeInput.disabled = volumeValue < 100;
    }

    handleVolumeControl(uid, isConsumer = true) {
        const words = uid.split('___');
        const volumeInputId = `${words[1]}___pVolume`;
        const audioPlayer = this.getId(isConsumer ? this.audioConsumers.get(volumeInputId) : words[0]);
        const inputElement = this.getId(volumeInputId);

        if (inputElement && audioPlayer) {
            //
            // Check if audio is enabled/disabled
            const isAudioEnabled = isConsumer
                ? !audioPlayer.muted && audioPlayer.volume > 0
                : this.peer_info.peer_audio;

            isAudioEnabled ? show(inputElement) : hide(inputElement);
            inputElement.value = 100;

            let volumeUpdateTimeout;

            const updateVolume = () => {
                const volume = inputElement.value / 100;
                this.setAudioVolume(audioPlayer, volume);

                // Update producer audio volume
                if (!isConsumer) this.peer_info.peer_audio_volume = inputElement.value;

                // Clear any existing timeout to prevent sending too frequently
                if (volumeUpdateTimeout) {
                    clearTimeout(volumeUpdateTimeout);
                }

                // Set a timeout to send the update after 0.5 second
                volumeUpdateTimeout = setTimeout(() => {
                    // Prepare the command to update peer volume
                    const cmd = {
                        type: 'peerAudio',
                        peer_name: this.peer_name,
                        [isConsumer ? 'audioConsumerId' : 'audioProducerId']: isConsumer
                            ? this.audioConsumers.get(volumeInputId)
                            : this.audioProducerId,
                        volumeInputId: volumeInputId,
                        volume: volume,
                        broadcast: true,
                    };
                    this.emitCmd(cmd);
                }, 500); // 0.5 second delay
            };

            this.addVolumeEventListeners(inputElement, updateVolume);
        }
    }

    setAudioVolume(audioPlayer, volume) {
        if (audioPlayer) {
            if (this.isMobileDevice) {
                audioPlayer.muted = volume === 0;
                if (!audioPlayer.muted) {
                    // Adjust playback rate as volume on mobile devices
                    audioPlayer.playbackRate = Math.max(0.1, volume);
                }
            } else {
                // Set volume directly on desktop devices
                audioPlayer.volume = volume;
            }
        }
    }

    handlePeerAudio(cmd) {
        console.log('handlePeerAudio', { cmd });

        const { volumeInputId, audioProducerId, audioConsumerId, volume } = cmd;

        const volumeInput = this.getId(volumeInputId);

        if (!volumeInput) return;

        volumeInput.value = volume * 100;

        if (audioProducerId) {
            this.handleConsumerAudio(audioProducerId, volume);
            this.toggleVolumeInput(volumeInput, volumeInput.value);
        }

        if (audioConsumerId) this.handleProducerAudio(audioConsumerId, volume);
    }

    handleConsumerAudio(audioProducerId, volume) {
        const consumerAudioId = this.getConsumerIdByProducerId(audioProducerId);
        if (!consumerAudioId) return;

        const consumerAudioPlayer = this.getId(consumerAudioId);
        if (!consumerAudioPlayer) return;

        this.setAudioVolume(consumerAudioPlayer, volume);

        console.log('handleConsumerPeerAudio', { consumerAudioId, consumerAudioPlayer });
    }

    handleProducerAudio(audioConsumerId, volume) {
        const producerAudioId = this.getProducerIdByConsumerId(audioConsumerId);
        if (!producerAudioId) return;

        const producerAudioPlayer = this.getId(producerAudioId);
        if (!producerAudioPlayer) return;

        this.setAudioVolume(producerAudioPlayer, volume);

        console.log('handleProducerPeerAudio', { producerAudioId, producerAudioPlayer });
    }

    addVolumeEventListeners(inputElement, updateVolumeCallback) {
        inputElement.addEventListener('input', updateVolumeCallback);
        inputElement.addEventListener('change', updateVolumeCallback);

        if (this.isMobileDevice) {
            inputElement.addEventListener('touchstart', updateVolumeCallback);
            inputElement.addEventListener('touchmove', updateVolumeCallback);
        }
    }

    // ####################################################
    // HANDLE DOMINANT SPEAKER
    // ###################################################

    handleDominantSpeakerHighlight(peer_id) {
        // Highlight the peer name
        const peerNameElement = this.getId(peer_id + '__name');
        if (peerNameElement) {
            peerNameElement.style.color = 'lime';
            setTimeout(function () {
                peerNameElement.style.color = '#FFFFFF';
            }, 5000);
        }
    }

    handleDominantSpeakerFocus(producer_id, consumer_id = null, timeout = 10000) {
        // Find the consumer id for this producer
        const consumerId = consumer_id ? consumer_id : this.getConsumerIdByProducerId(producer_id);

        console.log('handleDominantSpeakerFocus', { consumersList: this.consumers, consumerId, producer_id });

        if (!consumerId) return;

        // Track the currently focused video container
        if (!this._dominantSpeakerState) {
            this._dominantSpeakerState = { prevConsumerId: null, timeout: null };
        }

        // Remove focus mode from previous dominant speaker if any
        if (this._dominantSpeakerState.prevConsumerId && this._dominantSpeakerState.prevConsumerId !== consumerId) {
            const prevVideoContainer = this.getId(this._dominantSpeakerState.prevConsumerId + '__video');
            const prevFocusBtn = this.getId(this._dominantSpeakerState.prevConsumerId + '__hideALL');
            if (prevVideoContainer && prevVideoContainer.hasAttribute('focus-mode') && prevFocusBtn) {
                prevFocusBtn.click();
            }
        }

        // Set focus mode for the new dominant speaker
        const videoContainer = this.getId(consumerId + '__video');
        const focusBtn = this.getId(consumerId + '__hideALL');
        if (videoContainer && focusBtn && !videoContainer.hasAttribute('focus-mode')) {
            focusBtn.click();
        }

        // Update the state
        this._dominantSpeakerState.prevConsumerId = consumerId;

        // Clear any previous timeout
        if (this._dominantSpeakerState.timeout) {
            clearTimeout(this._dominantSpeakerState.timeout);
        }

        // Set a timeout to remove focus after 'timeout' seconds of inactivity
        this._dominantSpeakerState.timeout = setTimeout(() => {
            // Remove focus mode if still focused
            if (this._dominantSpeakerState.prevConsumerId) {
                const prevVideoContainer = this.getId(this._dominantSpeakerState.prevConsumerId + '__video');
                const prevFocusBtn = this.getId(this._dominantSpeakerState.prevConsumerId + '__hideALL');
                if (prevVideoContainer && prevVideoContainer.hasAttribute('focus-mode') && prevFocusBtn) {
                    prevFocusBtn.click();
                }
                this._dominantSpeakerState.prevConsumerId = null;
            }
        }, timeout); // 10 seconds
    }

    handleDominantSpeaker(data) {
        console.log('Dominant Speaker', data);
        const { peer_id, producer_id } = data;
        this.handleDominantSpeakerHighlight(peer_id);
        if (this.dominantSpeaker && switchDominantSpeakerFocus.checked) {
            this.handleDominantSpeakerFocus(producer_id);
        }
    }

    // ####################################################
    // HANDLE BAN
    // ###################################################

    handleGL(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pGeoLocation';
        let btnGl = this.getId(uid);
        if (btnGl) {
            btnGl.addEventListener('click', () => {
                isPresenter
                    ? this.askPeerGeoLocation(peer_id)
                    : this.userLog('warning', '只有主持人可以向参与者请求地理位置信息', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE BAN
    // ###################################################

    handleBAN(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pBan';
        let btnBan = this.getId(uid);
        if (btnBan) {
            btnBan.addEventListener('click', () => {
                isPresenter
                    ? this.peerAction('me', peer_id, 'ban')
                    : this.userLog('warning', '只有主持人可以禁止参与者', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE KICK-OUT
    // ###################################################

    handleKO(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pEject';
        let btnKo = this.getId(uid);
        if (btnKo) {
            btnKo.addEventListener('click', () => {
                isPresenter
                    ? this.peerAction('me', peer_id, 'eject')
                    : this.userLog('warning', '只有主持人可以踢出参与者', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO
    // ###################################################

    toggleFocusMode(videoContainerId, btnHa = null) {
        if (isHideMeActive) {
            this.userLog('warning', '请在使用此功能前切换到隐藏自我视图模式', 'top-end', 6000);
            return;
        }
        const videoContainer = this.getId(videoContainerId);
        isHideALLVideosActive = !isHideALLVideosActive;
        if (btnHa) btnHa.style.color = isHideALLVideosActive ? 'lime' : 'white';
        if (isHideALLVideosActive) {
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
            videoContainer.setAttribute('focus-mode', 'true');
        } else {
            resizeVideoMedia();
            videoContainer.removeAttribute('focus-mode');
        }
        const children = this.videoMediaContainer.children;
        for (let child of children) {
            if (child.id != videoContainerId) {
                child.style.display = isHideALLVideosActive ? 'none' : 'block';
            }
        }
    }

    handleHA(uid, videoContainerId) {
        let btnHa = this.getId(uid);
        if (btnHa) {
            btnHa.addEventListener('click', (e) => {
                this.toggleFocusMode(videoContainerId, btnHa);
            });
        }
    }

    handleCM(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pVideo';
        let btnCm = this.getId(uid);
        if (btnCm) {
            btnCm.addEventListener('click', (e) => {
                if (e.target.className === html.videoOn) {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'hide')
                        : this.userLog('warning', '只有主持人可以隐藏参与者', 'top-end');
                } else {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'unhide')
                        : this.userLog('warning', '只有主持人可以取消隐藏参与者', 'top-end');
                }
            });
        }
    }

    // ####################################################
    // HANDLE AUDIO
    // ###################################################

    handleAU(uid) {
        const words = uid.split('__');
        let peer_id = words[0] + '___pAudio';
        let btnAU = this.getId(uid);
        if (btnAU) {
            btnAU.addEventListener('click', (e) => {
                if (e.target.className === html.audioOn) {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'mute')
                        : this.userLog('warning', '只有主持人可以静音参与者', 'top-end');
                } else {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'unmute')
                        : this.userLog('warning', '只有主持人可以取消静音参与者', 'top-end');
                }
            });
        }
    }

    // ####################################################
    // HANDLE COMMANDS
    // ####################################################

    emitCmd(cmd) {
        this.socket.emit('cmd', cmd);
    }

    handleCmd(cmd) {
        switch (cmd.type) {
            case 'privacy':
                this.setVideoPrivacyStatus(cmd.peer_id, cmd.active);
                break;
            case 'roomEmoji':
                this.handleRoomEmoji(cmd);
                break;
            case 'transcriptionAll':
                this.transcription.handleTranscriptionAll(cmd);
                break;
            case 'transcript':
                this.transcription.handleTranscript(cmd);
                break;
            case 'geoLocation':
                this.confirmPeerGeoLocation(cmd);
                break;
            case 'geoLocationOK':
                this.handleGeoPeerLocation(cmd);
                break;
            case 'geoLocationKO':
                this.sound('alert');
                this.userLog('warning', cmd.data, 'top-end', 5000);
                break;
            case 'ejectAll':
                this.exit();
                break;
            case 'peerAudio':
                this.handlePeerAudio(cmd);
                break;
            default:
                break;
            //...
        }
    }

    handleRoomEmoji(cmd, duration = 5000) {
        const userEmoji = document.getElementById(`userEmoji`);
        if (userEmoji) {
            const emojiDisplay = document.createElement('div');
            emojiDisplay.className = 'animate__animated animate__backInUp';
            emojiDisplay.style.padding = '10px';
            emojiDisplay.style.fontSize = '2vh';
            emojiDisplay.style.color = '#FFF';
            emojiDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            emojiDisplay.style.borderRadius = '10px';
            emojiDisplay.style.marginBottom = '5px';
            emojiDisplay.innerText = `${cmd.emoji} ${cmd.peer_name}`;
            userEmoji.appendChild(emojiDisplay);

            setTimeout(() => {
                emojiDisplay.remove();
            }, duration);

            this.handleEmojiSound(cmd);
        }
    }

    handleEmojiSound(cmd) {
        const path = '../sounds/emoji/';
        const ext = '.mp3';
        switch (cmd.shortcodes) {
            case ':+1:':
            case ':ok_hand:':
                this.sound('ok', true, path, ext);
                break;
            case ':-1:':
                this.sound('boo', true, path, ext);
                break;
            case ':clap:':
                this.sound('applause', true, path, ext);
                break;
            case ':smiley:':
            case ':grinning:':
                this.sound('smile', true, path, ext);
                break;
            case ':joy:':
                this.sound('laughs', true, path, ext);
                break;
            case ':tada:':
                this.sound('congrats', true, path, ext);
                break;
            case ':open_mouth:':
                this.sound('woah', true, path, ext);
                break;
            case ':trumpet:':
                this.sound('trombone', true, path, ext);
                break;
            case ':kissing_heart:':
                this.sound('kiss', true, path, ext);
                break;
            case ':heart:':
            case ':hearts:':
                this.sound('heart', true, path, ext);
                break;
            case ':rocket:':
                this.sound('rocket', true, path, ext);
                break;
            case ':sparkles:':
            case ':star:':
            case ':star2:':
            case ':dizzy:':
                this.sound('tinkerbell', true, path, ext);
                break;
            // ...
            default:
                break;
        }
    }

    // ####################################################
    // PEER ACTION
    // ####################################################

    async peerAction(from_peer_name, id, action, emit = true, broadcast = false, info = true, msg = '') {
        const words = id.split('___');
        const peer_id = words[0];

        if (emit) {
            // send...
            const data = {
                from_peer_name: this.peer_name,
                from_peer_id: this.peer_id,
                from_peer_uuid: this.peer_uuid,
                to_peer_uuid: '',
                peer_id: peer_id,
                action: action,
                message: '',
                broadcast: broadcast,
            };
            console.log('peerAction', data);

            if (!this.thereAreParticipants()) {
                if (info) return this.userLog('info', '未检测到参与者', 'top-end');
            }
            if (!broadcast) {
                switch (action) {
                    case 'mute':
                        const audioMessage =
                            '参与者已被静音，只有他们自己才能解除静音';
                        if (isBroadcastingEnabled) {
                            const peerAudioButton = this.getId(data.peer_id + '___pAudio');
                            if (peerAudioButton) {
                                const peerAudioIcon = peerAudioButton.querySelector('i');
                                if (peerAudioIcon && peerAudioIcon.classList.contains('red')) {
                                    if (isRulesActive && isPresenter) {
                                        data.action = 'unmute';
                                        return this.confirmPeerAction(data.action, data);
                                    }
                                    return this.userLog('info', audioMessage, 'top-end');
                                }
                            }
                        } else {
                            const peerAudioStatus = this.getId(data.peer_id + '__audio');
                            if (!peerAudioStatus || peerAudioStatus.className == html.audioOff) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'unmute';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', audioMessage, 'top-end');
                            }
                        }
                        break;
                    case 'hide':
                        const videoMessage =
                            '参与者当前是隐藏的，只有他们自己有选项使自己显现';
                        if (isBroadcastingEnabled) {
                            const peerVideoButton = this.getId(data.peer_id + '___pVideo');
                            if (peerVideoButton) {
                                const peerVideoIcon = peerVideoButton.querySelector('i');
                                if (peerVideoIcon && peerVideoIcon.classList.contains('red')) {
                                    if (isRulesActive && isPresenter) {
                                        data.action = 'unhide';
                                        return this.confirmPeerAction(data.action, data);
                                    }
                                    return this.userLog('info', videoMessage, 'top-end');
                                }
                            }
                        } else {
                            const peerVideoOff = this.getId(data.peer_id + '__videoOff');
                            if (peerVideoOff) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'unhide';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', videoMessage, 'top-end');
                            }
                        }
                    case 'stop':
                        const screenMessage =
                            '参与者屏幕未共享，仅参与者可以发起共享';
                        const peerScreenButton = this.getId(id);
                        if (peerScreenButton) {
                            const peerScreenStatus = peerScreenButton.querySelector('i');
                            if (peerScreenStatus && peerScreenStatus.classList.contains('red')) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'start';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', screenMessage, 'top-end');
                            }
                        }
                        break;
                    case 'ban':
                        if (!isRulesActive || isPresenter) {
                            const peer_info = await getRemotePeerInfo(peer_id);
                            console.log('BAN PEER', peer_info);
                            if (peer_info) {
                                data.to_peer_uuid = peer_info.peer_uuid;
                                return this.confirmPeerAction(data.action, data);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            this.confirmPeerAction(data.action, data);
        } else {
            // receive...
            const peerActionAllowed = peer_id === this.peer_id || broadcast;
            switch (action) {
                case 'ban':
                    if (peerActionAllowed) {
                        const message = `将把你从房间中封禁${
                            msg ? `<br><br><span class="red">原因: ${msg}</span>` : ''
                        }`;
                        this.exit(true);
                        this.sound(action);
                        this.peerActionProgress(from_peer_name, message, 5000, action);
                    }
                    break;
                case 'eject':
                    if (peerActionAllowed) {
                        const message = `将把你从房间中踢出${
                            msg ? `<br><br><span class="red">原因: ${msg}</span>` : ''
                        }`;
                        this.exit(true);
                        this.sound(action);
                        this.peerActionProgress(from_peer_name, message, 5000, action);
                    }
                    break;
                case 'mute':
                    if (peerActionAllowed) {
                        if (this.producerExist(mediaType.audio)) {
                            await this.pauseProducer(mediaType.audio);
                            this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', false);
                            this.userLog(
                                'warning',
                                from_peer_name + '  ' + _PEER.audioOff + ' 已关闭你的音频',
                                'top-end',
                                10000
                            );
                        }
                    }
                    break;
                case 'unmute':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.audio,
                            image.unmute,
                            '启用麦克风',
                            '允许主持人开启你的麦克风？'
                        );
                    }
                    break;
                case 'hide':
                    if (peerActionAllowed) {
                        this.closeProducer(mediaType.video, 'moderator');
                        this.userLog(
                            'warning',
                            from_peer_name + '  ' + _PEER.videoOff + ' 已关闭你的视频',
                            'top-end',
                            10000
                        );
                    }
                    break;
                case 'unhide':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.video,
                            image.unhide,
                            '启用摄像头',
                            '允许主持人开启你的摄像头？'
                        );
                    }
                    break;
                case 'stop':
                    if (this.isScreenShareSupported) {
                        if (peerActionAllowed) {
                            this.closeProducer(mediaType.screen, 'moderator');
                            this.userLog(
                                'warning',
                                from_peer_name + '  ' + _PEER.screenOff + ' 已关闭你的屏幕共享',
                                'top-end',
                                10000
                            );
                        }
                    }
                    break;
                case 'start':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.screen,
                            image.start,
                            '开始屏幕共享',
                            '允许主持人开启你的屏幕共享？'
                        );
                    }
                    break;
                default:
                    break;
                //...
            }
        }
    }

    peerMediaStartConfirm(type, imageUrl, title, text) {
        sound('notify');
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: imageUrl,
            title: title,
            text: text,
            showDenyButton: true,
            confirmButtonText: `确定`,
            denyButtonText: `取消`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(async (result) => {
            if (result.isConfirmed) {
                switch (type) {
                    case mediaType.audio:
                        this.producerExist(mediaType.audio)
                            ? await this.resumeProducer(mediaType.audio)
                            : await this.produce(mediaType.audio, microphoneSelect.value);
                        this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', true);
                        break;
                    case mediaType.video:
                        await this.produce(mediaType.video, videoSelect.value);
                        break;
                    case mediaType.screen:
                        await this.produce(mediaType.screen);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    peerActionProgress(tt, msg, time, action = 'na') {
        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            icon: action == 'eject' ? 'warning' : 'success',
            title: tt,
            html: msg,
            timer: time,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(() => {
            switch (action) {
                case 'refresh':
                    getRoomParticipants();
                    break;
                case 'ban':
                case 'eject':
                    this.exit();
                    break;
                default:
                    break;
            }
        });
    }

    confirmPeerAction(action, data) {
        console.log('Confirm peer action', action);
        switch (action) {
            case 'ban':
                let banConfirmed = false;
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: image.forbidden,
                    title: '封禁当前参与者',
                    input: 'text',
                    inputPlaceholder: '封禁原因',
                    showDenyButton: true,
                    confirmButtonText: `是`,
                    denyButtonText: `否`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            banConfirmed = true;
                            const message = result.value;
                            if (message) data.message = message;
                            this.socket.emit('peerAction', data);
                            let peer = this.getId(data.peer_id);
                            if (peer) {
                                peer.parentNode.removeChild(peer);
                                participantsCount--;
                                refreshParticipantsCount(participantsCount);
                            }
                        }
                    })
                    .then(() => {
                        if (banConfirmed) this.peerActionProgress(action, 'In progress, wait...', 6000, 'refresh');
                    });
                break;
            case 'eject':
                let ejectConfirmed = false;
                let whoEject = data.broadcast ? '所有参与者（包括你自己）？' : '当前参与者？';
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: data.broadcast ? image.users : image.user,
                    title: '踢出 ' + whoEject,
                    input: 'text',
                    inputPlaceholder: '踢出原因',
                    showDenyButton: true,
                    confirmButtonText: `是`,
                    denyButtonText: `否`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            ejectConfirmed = true;
                            const message = result.value;
                            if (message) data.message = message;
                            if (!data.broadcast) {
                                this.socket.emit('peerAction', data);
                                let peer = this.getId(data.peer_id);
                                if (peer) {
                                    peer.parentNode.removeChild(peer);
                                    participantsCount--;
                                    refreshParticipantsCount(participantsCount);
                                }
                            } else {
                                this.socket.emit('peerAction', data);
                                let actionButton = this.getId(action + 'AllButton');
                                if (actionButton) actionButton.style.display = 'none';
                                participantsCount = 1;
                                refreshParticipantsCount(participantsCount);
                            }
                        }
                    })
                    .then(() => {
                        if (ejectConfirmed) this.peerActionProgress(action, '进行中，请等待...', 6000, 'refresh');
                    });
                break;
            case 'mute':
            case 'unmute':
            case 'hide':
            case 'unhide':
            case 'stop':
            case 'start':
                let muteHideStopConfirmed = false;
                let who = data.broadcast ? '所有人（包括你自己）？' : '当前参与者？';
                let imageUrl, title, text;
                switch (action) {
                    case 'mute':
                        imageUrl = image.mute;
                        title = '静音 ' + who;
                        text =
                            '一旦被静音，只有主持人能够取消参与者的静音状态，但参与者可以随时自行取消静音';
                        break;
                    case 'unmute':
                        imageUrl = image.unmute;
                        title = '取消静音 ' + who;
                        text = '将弹出一个提示消息，以提示并允许此操作。';
                        break;
                    case 'hide':
                        title = '隐藏 ' + who;
                        imageUrl = image.hide;
                        text =
                            '一旦被隐藏，只有主持人能够取消参与者的隐藏状态，但参与者可以随时自行取消隐藏';
                        break;
                    case 'unhide':
                        title = '取消隐藏 ' + who;
                        imageUrl = image.unhide;
                        text = '将弹出一个提示消息，以提示并允许此操作。';
                        break;
                    case 'stop':
                        imageUrl = image.stop;
                        title = '停止屏幕共享给 ' + who;
                        text =
                            "一旦被停止，只有主持人能够重新开始参与者的屏幕共享，但参与者可以随时自行启动自己的屏幕共享";
                        break;
                    case 'start':
                        imageUrl = image.start;
                        title = '开始屏幕共享给 ' + who;
                        text = '将弹出一个提示消息，以提示并允许此操作。';
                        break;
                    default:
                        break;
                }
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: imageUrl,
                    title: title,
                    text: text,
                    showDenyButton: true,
                    confirmButtonText: `是`,
                    denyButtonText: `否`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            muteHideStopConfirmed = true;
                            if (!data.broadcast) {
                                switch (action) {
                                    case 'mute':
                                        let peerAudioButton = this.getId(data.peer_id + '___pAudio');
                                        if (peerAudioButton) peerAudioButton.innerHTML = _PEER.audioOff;
                                        break;
                                    case 'hide':
                                        let peerVideoButton = this.getId(data.peer_id + '___pVideo');
                                        if (peerVideoButton) peerVideoButton.innerHTML = _PEER.videoOff;
                                        break;
                                    case 'stop':
                                        let peerScreenButton = this.getId(data.peer_id + '___pScreen');
                                        if (peerScreenButton) peerScreenButton.innerHTML = _PEER.screenOff;
                                        break;
                                    default:
                                        break;
                                }
                                this.socket.emit('peerAction', data);
                            } else {
                                this.socket.emit('peerAction', data);
                                let actionButton = this.getId(action + 'AllButton');
                                if (actionButton) actionButton.style.display = 'none';
                            }
                        }
                    })
                    .then(() => {
                        if (muteHideStopConfirmed)
                            this.peerActionProgress(action, '进行中，请等待...', 2000, 'refresh');
                    });
                break;
            default:
                break;
            //...
        }
    }

    peerGuestNotAllowed(action) {
        console.log('peerGuestNotAllowed', action);
        switch (action) {
            case 'audio':
                this.userLog('warning', '只有主持人可以对参与者进行静音/取消静音操作', 'top-end');
                break;
            case 'video':
                this.userLog('warning', '只有主持人可以对参与者进行隐藏/显示操作', 'top-end');
                break;
            case 'screen':
                this.userLog('warning', '只有主持人可以对参与者的屏幕进行开始/停止操作', 'top-end');
                break;
            default:
                break;
        }
    }

    // ####################################################
    // SEARCH PEER FILTER
    // ####################################################

    searchPeer() {
        const searchParticipantsFromList = this.getId('searchParticipantsFromList');
        const searchFilter = searchParticipantsFromList.value.toUpperCase();
        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const participantName = li.getAttribute('data-to-name').toUpperCase();
            const shouldDisplay = participantName.includes(searchFilter);
            li.style.display = shouldDisplay ? '' : 'none';
        }
    }

    // ####################################################
    // FILTER PEER WITH RAISE HAND
    // ####################################################

    toggleRaiseHands() {
        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const hasPulsateClass = li.querySelector('i.pulsate') !== null;
            const shouldDisplay = (hasPulsateClass && !this.isToggleRaiseHand) || this.isToggleRaiseHand;
            li.style.display = shouldDisplay ? '' : 'none';
        }
        this.isToggleRaiseHand = !this.isToggleRaiseHand;
        setColor(participantsRaiseHandBtn, this.isToggleRaiseHand ? 'lime' : 'white');
    }

    // ####################################################
    // FILTER PEER WITH UNREAD MESSAGES
    // ####################################################

    toggleUnreadMsg() {
        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const shouldDisplay =
                (li.classList.contains('pulsate') && !this.isToggleUnreadMsg) || this.isToggleUnreadMsg;
            li.style.display = shouldDisplay ? '' : 'none';
        }
        this.isToggleUnreadMsg = !this.isToggleUnreadMsg;
        setColor(participantsUnreadMessagesBtn, this.isToggleUnreadMsg ? 'lime' : 'white');
    }

    // ####################################################
    // SHOW PEER ABOUT AND MESSAGES
    // ####################################################

    showPeerAboutAndMessages(peer_id, peer_name, peer_avatar = false, event = null) {
        this.hidePeerMessages();

        this.chatPeerId = peer_id;
        this.chatPeerName = peer_name;
        this.chatPeerAvatar = peer_avatar;

        const chatAbout = this.getId('chatAbout');
        const participant = this.getId(peer_id);
        const participantsList = this.getId('participantsList');
        const chatPrivateMessages = this.getId('chatPrivateMessages');
        const messagePrivateListItems = chatPrivateMessages.getElementsByTagName('li');
        const participantsListItems = participantsList.getElementsByTagName('li');
        const avatarImg = getParticipantAvatar(peer_name, peer_avatar);

        const generateChatAboutHTML = (imgSrc, title, status = 'online', participants = '') => {
            const isSensitiveChat = !['all', 'ChatGPT', 'DeepSeek'].includes(peer_id) && title.length > 15;
            const truncatedTitle = isSensitiveChat ? `${title.substring(0, 10)}*****` : title;
            return `
                <img class="all-participants-img" 
                    style="border: var(--border); width: 43px; margin-right: 5px; cursor: pointer;"
                    id="chatShowParticipantsList" 
                    src="${image.users}"
                    alt="participants"
                    onclick="rc.toggleShowParticipants()" 
                />
                <a data-toggle="modal" data-target="#view_info">
                    <img src="${imgSrc}" alt="avatar" />
                </a>
                <div class="chat-about">
                    <h6 class="mb-0">${truncatedTitle}</h6>
                    <span class="status">
                        <i class="fa fa-circle ${status}"></i> ${status} ${participants}
                    </span>
                </div>
            `;
        };

        // CURRENT SELECTED PEER
        for (let i = 0; i < participantsListItems.length; i++) {
            participantsListItems[i].classList.remove('active');
            participantsListItems[i].classList.remove('pulsate'); // private new message to read
            if (!['all', 'ChatGPT', 'DeepSeek'].includes(peer_id)) {
                // icon private new message to read
                this.getId(`${peer_id}-unread-msg`).classList.add('hidden');
            }
        }
        participant.classList.add('active');

        isChatGPTOn = false;
        isDeepSeekOn = false;

        console.log('Display messages', peer_id);

        switch (peer_id) {
            case 'ChatGPT':
                if (this._moderator.chat_cant_chatgpt) {
                    return userLog('warning', '管理员不允许您与ChatGPT聊天', 'top-end', 6000);
                }
                isChatGPTOn = true;
                chatAbout.innerHTML = generateChatAboutHTML(image.chatgpt, 'ChatGPT');
                this.getId('chatGPTMessages').style.display = 'block';
                break;
            case 'DeepSeek':
                if (this._moderator.chat_cant_deep_seek) {
                    return userLog(
                        'warning',
                        '管理员不允许你与DeepSeek聊天',
                        'top-end',
                        6000
                    );
                }
                isDeepSeekOn = true;
                chatAbout.innerHTML = generateChatAboutHTML(image.deepSeek, 'DeepSeek');
                this.getId('deepSeekMessages').style.display = 'block';
                break;
            case 'all':
                chatAbout.innerHTML = generateChatAboutHTML(image.all, 'Public chat', 'online', participantsCount);
                this.getId('chatPublicMessages').style.display = 'block';
                break;
            default:
                if (this._moderator.chat_cant_privately) {
                    return userLog('warning', '管理员不允许你私聊', 'top-end', 6000);
                }
                chatAbout.innerHTML = generateChatAboutHTML(avatarImg, peer_name);
                chatPrivateMessages.style.display = 'block';
                for (let i = 0; i < messagePrivateListItems.length; i++) {
                    const li = messagePrivateListItems[i];
                    const itemFromId = li.getAttribute('data-from-id');
                    const itemToId = li.getAttribute('data-to-id');
                    const shouldDisplay = itemFromId.includes(peer_id) || itemToId.includes(peer_id);
                    li.style.display = shouldDisplay ? '' : 'none';
                }
                break;
        }

        if (!this.isMobileDevice) setTippy('chatShowParticipantsList', '切换参与者列表', 'bottom');

        const clickedElement = event ? event.target : null;
        if (!event || (clickedElement.tagName != 'BUTTON' && clickedElement.tagName != 'I')) {
            if ((this.isMobileDevice || this.isChatPinned) && (!plist || !plist.classList.contains('hidden'))) {
                this.toggleShowParticipants();
            }
        }
    }

    hidePeerMessages() {
        elemDisplay('chatGPTMessages', false);
        elemDisplay('deepSeekMessages', false);
        elemDisplay('chatPublicMessages', false);
        elemDisplay('chatPrivateMessages', false);
    }

    // ####################################################
    // UPDATE ROOM MODERATOR
    // ####################################################

    updateRoomModerator(data) {
        if (!isRulesActive || isPresenter) {
            const moderator = this.getModeratorData(data);
            this.socket.emit('updateRoomModerator', moderator);
        }
    }

    updateRoomModeratorALL(data) {
        if (!isRulesActive || isPresenter) {
            const moderator = this.getModeratorData(data);
            this.socket.emit('updateRoomModeratorALL', moderator);
        }
    }

    getModeratorData(data) {
        return {
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            moderator: data,
        };
    }

    handleUpdateRoomModerator(data) {
        switch (data.type) {
            case 'audio_cant_unmute':
                this._moderator.audio_cant_unmute = data.status;
                this._moderator.audio_cant_unmute ? hide(tabAudioDevicesBtn) : show(tabAudioDevicesBtn);
                rc.roomMessage('audio_cant_unmute', data.status);
                break;
            case 'video_cant_unhide':
                this._moderator.video_cant_unhide = data.status;
                this._moderator.video_cant_unhide ? hide(tabVideoDevicesBtn) : show(tabVideoDevicesBtn);
                rc.roomMessage('video_cant_unhide', data.status);
                break;
            case 'screen_cant_share':
                this._moderator.screen_cant_share = data.status;
                rc.roomMessage('screen_cant_share', data.status);
                break;
            case 'chat_cant_privately':
                this._moderator.chat_cant_privately = data.status;
                rc.roomMessage('chat_cant_privately', data.status);
                break;
            case 'chat_cant_chatgpt':
                this._moderator.chat_cant_chatgpt = data.status;
                rc.roomMessage('chat_cant_chatgpt', data.status);
                break;
            case 'media_cant_sharing':
                this._moderator.media_cant_sharing = data.status;
                rc.roomMessage('media_cant_sharing', data.status);
                break;
            default:
                break;
        }
    }

    handleUpdateRoomModeratorALL(data) {
        this._moderator = data;
        console.log('Update Room Moderator data all', this._moderator);
    }

    getModerator() {
        console.log('Get Moderator', this._moderator);
        return this._moderator;
    }

    // ####################################################
    // UPDATE PEER INFO
    // ####################################################

    updatePeerInfo(peer_name, peer_id, type, status, emit = true, presenter = false) {
        if (emit) {
            switch (type) {
                case 'audio':
                    this.setIsAudio(peer_id, status);
                    break;
                case 'video':
                    this.setIsVideo(status);
                    break;
                case 'screen':
                    this.setIsScreen(status);
                    break;
                case 'hand':
                    this.peer_info.peer_hand = status;
                    const peer_hand = this.getPeerHandBtn(peer_id);
                    if (status) {
                        if (peer_hand) peer_hand.style.display = 'flex';
                        this.event(_EVENTS.raiseHand);
                        this.sound('raiseHand');
                    } else {
                        if (peer_hand) peer_hand.style.display = 'none';
                        this.event(_EVENTS.lowerHand);
                    }
                    break;
                default:
                    break;
            }
            const data = {
                room_id: this.room_id,
                peer_name: peer_name,
                peer_id: peer_id,
                type: type,
                status: status,
                broadcast: true,
            };
            this.socket.emit('updatePeerInfo', data);
        } else {
            const canUpdateMediaStatus = !isBroadcastingEnabled || (isBroadcastingEnabled && presenter);
            switch (type) {
                case 'audio':
                    if (canUpdateMediaStatus) this.setPeerAudio(peer_id, status);
                    break;
                case 'video':
                    break;
                case 'screen':
                    break;
                case 'hand':
                    const peer_hand = this.getPeerHandBtn(peer_id);
                    if (status) {
                        if (peer_hand) peer_hand.style.display = 'flex';
                        this.userLog(
                            'warning',
                            peer_name + '  ' + _PEER.raiseHand + ' 已举手',
                            'top-end',
                            10000
                        );
                        this.sound('raiseHand');
                    } else {
                        if (peer_hand) peer_hand.style.display = 'none';
                    }
                    break;
                default:
                    break;
            }
        }
        if (isParticipantsListOpen) getRoomParticipants();
    }

    checkPeerInfoStatus(peer_info) {
        let peer_id = peer_info.peer_id;
        let peer_hand_status = peer_info.peer_hand;
        if (peer_hand_status) {
            let peer_hand = this.getPeerHandBtn(peer_id);
            if (peer_hand) peer_hand.style.display = 'flex';
        }
        //...
    }

    popupPeerInfo(id, peer_info) {
        if (this.showPeerInfo && !this.isMobileDevice) {
            // Format the peer info into a structured string
            const peerInfoFormatted = this.getPeerUiInfos();

            // Apply the improved Tippy.js tooltip
            this.setTippy(
                id,
                `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">${peerInfoFormatted}</div>`,
                'top-start',
                true
            );
        }
    }

    getPeerUiInfos() {
        // console.log('PEER_INFO', peer_info);
        const {
            join_data_time,
            peer_name,
            peer_presenter,
            is_desktop_device,
            is_mobile_device,
            is_tablet_device,
            is_ipad_pro_device,
            os_name,
            os_version,
            browser_name,
            browser_version,
        } = peer_info;

        const emojiPeerInfo = [
            { label: '加入时间', value: join_data_time, emoji: '⏰' },
            { label: '名称', value: peer_name, emoji: '👤' },
            { label: '主持人', value: peer_presenter ? '是' : '否', emoji: peer_presenter ? '⭐' : '🎤' },
            { label: '桌面设备', value: is_desktop_device ? '是' : '否', emoji: '💻' },
            { label: '移动设备', value: is_mobile_device ? '是' : '否', emoji: '📱' },
            { label: '平板设备', value: is_tablet_device ? '是' : '否', emoji: '📲' },
            { label: 'iPad Pro', value: is_ipad_pro_device ? '是' : '否', emoji: '📱' },
            { label: '操作系统', value: `${os_name} ${os_version}`, emoji: '🖥️' },
            { label: '浏览器', value: `${browser_name} ${browser_version}`, emoji: '🌐' },
        ];

        // Format the peer info into a structured string
        return emojiPeerInfo.map((item) => `${item.emoji} <b>${item.label}:</b> ${item.value}`).join('<br/>');
    }

    // ####################################################
    // HANDLE PEER GEOLOCATION
    // ####################################################

    askPeerGeoLocation(id) {
        const words = id.split('___');
        const peer_id = words[0];
        const cmd = {
            type: 'geoLocation',
            from_peer_name: this.peer_name,
            from_peer_id: this.peer_id,
            peer_id: peer_id,
            broadcast: false,
        };
        this.emitCmd(cmd);
        this.peerActionProgress(
            'Geolocation',
            'Geolocation requested. Please wait for confirmation...',
            6000,
            'geolocation'
        );
    }

    sendPeerGeoLocation(peer_id, type, data) {
        const cmd = {
            type: type,
            from_peer_name: this.peer_name,
            from_peer_id: this.peer_id,
            peer_id: peer_id,
            data: data,
            broadcast: false,
        };
        this.emitCmd(cmd);
    }

    confirmPeerGeoLocation(cmd) {
        this.sound('notify');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.geolocation,
            position: 'center',
            title: '地理位置',
            html: `你是否希望与 ${cmd.from_peer_name} 分享你的位置信息？`,
            showDenyButton: true,
            confirmButtonText: `是`,
            denyButtonText: `否`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            result.isConfirmed ? this.getPeerGeoLocation(cmd.from_peer_id) : this.denyPeerGeoLocation(cmd.from_peer_id);
        });
    }

    getPeerGeoLocation(peer_id, options = {}) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const geoLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    console.log('GeoLocation --->', geoLocation);

                    rc.sendPeerGeoLocation(peer_id, 'geoLocationOK', geoLocation);
                    // openURL(`https://www.openstreetmap.org/?mlat=${geoLocation.latitude}&mlon=${geoLocation.longitude}`, true);
                    // openURL(`http://maps.apple.com/?ll=${geoLocation.latitude},${geoLocation.longitude}`, true);
                    // openURL(`https://www.google.com/maps/search/?api=1&query=${geoLocation.latitude},${geoLocation.longitude}`, true);
                },
                function (error) {
                    let geoError = error;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            geoError = '用户拒绝了地理位置请求';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            geoError = '位置信息不可用';
                            break;
                        case error.TIMEOUT:
                            geoError = '获取用户位置信息超时';
                            break;
                        case error.UNKNOWN_ERROR:
                            geoError = '发生了未知错误';
                            break;
                        default:
                            break;
                    }
                    rc.sendPeerGeoLocation(peer_id, 'geoLocationKO', `${rc.peer_name}: ${geoError}`);
                    rc.userLog('warning', geoError, 'top-end', 5000);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                    ...options,
                }
            );
        } else {
            rc.sendPeerGeoLocation(
                peer_id,
                'geoLocationKO',
                `${rc.peer_name}: 此浏览器不支持地理位置`
            );
            rc.userLog('warning', '此浏览器不支持地理位置', 'top-end', 5000);
        }
    }

    denyPeerGeoLocation(peer_id) {
        rc.sendPeerGeoLocation(peer_id, 'geoLocationKO', `${rc.peer_name}: 已拒绝地理位置权限`);
    }

    handleGeoPeerLocation(cmd) {
        const geoLocation = cmd.data;
        this.sound('notify');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.geolocation,
            position: 'center',
            title: '地理位置',
            html: `你是否希望打开 ${cmd.from_peer_name} 的地理位置信息？`,
            showDenyButton: true,
            confirmButtonText: `是`,
            denyButtonText: `否`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                // openURL(`https://www.openstreetmap.org/?mlat=${geoLocation.latitude}&mlon=${geoLocation.longitude}`, true);
                // openURL(`http://maps.apple.com/?ll=${geoLocation.latitude},${geoLocation.longitude}`, true);
                openURL(
                    `https://www.google.com/maps/search/?api=1&query=${geoLocation.latitude},${geoLocation.longitude}`,
                    true
                );
            }
        });
    }

    // ##############################################
    // HeyGen Video AI
    // ##############################################

    getAvatarList() {
        this.msgPopup('toast', '请稍等，我们正在处理头像列表...', 10000);
        this.socket
            .request('getAvatarList')
            .then(function (completion) {
                const avatarVideoAIPreview = document.getElementById('avatarVideoAIPreview');
                const avatarVideoAIcontainer = document.getElementById('avatarVideoAIcontainer');
                avatarVideoAIcontainer.innerHTML = ''; // cleanup the avatar container

                const excludedIds = [
                    'josh_lite3_20230714',
                    'josh_lite_20230714',
                    'Lily_public_lite1_20230601',
                    'Brian_public_lite1_20230601',
                    'Brian_public_lite2_20230601',
                    'Eric_public_lite1_20230601',
                    'Mido-lite-20221128',
                ];

                const freeAvatars = [
                    'Kristin in Black Suit',
                    'Angela in Black Dress',
                    'Kayla in Casual Suit',
                    'Anna in Brown T-shirt',
                    'Anna in White T-shirt',
                    'Briana in Brown suit',
                    'Justin in White Shirt',
                    'Leah in Black Suit',
                    'Wade in Black Jacket',
                    'Tyler in Casual Suit',
                    'Tyler in Shirt',
                    'Tyler in Suit',
                    'Edward in Blue Shirt',
                    'Susan in Black Shirt',
                    'Monica in Sleeveless',
                ];

                //console.log('AVATARS LISTS', completion.response.avatars);
                completion.response.avatars.forEach((avatar) => {
                    if (
                        !excludedIds.includes(avatar.avatar_id) &&
                        (showFreeAvatars ? freeAvatars.includes(avatar.avatar_name) : true)
                    ) {
                        const div = document.createElement('div');
                        div.style.float = 'left';
                        div.style.padding = '5px';
                        div.style.width = '100px';
                        div.style.height = '200px';
                        const img = document.createElement('img');
                        const hr = document.createElement('hr');
                        const label = document.createElement('label');
                        const textContent = document.createTextNode(avatar.avatar_name);
                        label.appendChild(textContent);
                        //label.style.fontSize = '12px';
                        img.setAttribute('id', avatar.avatar_id);
                        img.setAttribute('class', 'avatarImg');
                        img.setAttribute('src', avatar.preview_image_url);
                        img.setAttribute('width', '100%');
                        img.setAttribute('height', 'auto');
                        img.setAttribute('alt', avatar.avatar_name);
                        img.setAttribute('style', 'cursor:pointer; padding: 2px; border-radius: 5px;');
                        img.setAttribute(
                            'avatarData',
                            avatar.avatar_id + '|' + avatar.avatar_name + '|' + avatar.preview_video_url
                        );
                        img.onclick = () => {
                            const avatarImages = document.querySelectorAll('.avatarImg');
                            avatarImages.forEach((image) => {
                                image.style.border = 'none';
                            });
                            img.style.border = 'var(--border)';
                            const avatarData = img.getAttribute('avatarData');
                            const avatarDataArr = avatarData.split('|');
                            VideoAI.avatarId = avatarDataArr[0];
                            VideoAI.avatarName = avatarDataArr[1];

                            avatarVideoAIPreview.setAttribute('src', avatarDataArr[2]);
                            avatarVideoAIPreview.play();

                            console.log('Avatar image click event', {
                                avatar,
                                avatarDataArr,
                            });
                        };
                        div.append(img);
                        div.append(hr);
                        div.append(label);
                        avatarVideoAIcontainer.append(div);

                        // Show the first available free avatar
                        if (showFreeAvatars && avatar.avatar_name === 'Kristin in Black Suit') {
                            avatarVideoAIPreview.setAttribute('src', avatar.preview_video_url);
                            avatarVideoAIPreview.playsInline = true;
                            avatarVideoAIPreview.autoplay = true;
                            avatarVideoAIPreview.controls = true;
                            avatarVideoAIPreview.volume = 0.5;
                        }
                    }
                });
            })
            .catch((err) => {
                console.error('Video AI getAvatarList error:', err);
                this.userLog('warning', 'Video AI getAvatarList error:\n' + err, 'top-end', 6000);
                this.getId('tabVideoAI').style.display = 'none';
                this.getId('tabVideoAIBtn').style.display = 'none';
                this.getId('tabRoomBtn').click();
            });
    }

    getVoiceList() {
        this.socket
            .request('getVoiceList')
            .then((completion) => {
                //console.log('VOICES LISTS', completion.response.voices);

                // Ensure the response has the list of voices
                const voiceList = completion?.response?.voices || [];
                if (!voiceList.length) {
                    console.warn('No voices available in the response');
                    return;
                }

                const selectElement = document.getElementById('avatarVoiceIDs');
                selectElement.innerHTML = '<option value="">选择头像声音</option>'; // Reset options with default

                // Sort the list alphabetically by language
                const sortedList = voiceList.sort((a, b) => (a.language ?? '').localeCompare(b.language ?? ''));

                // Populate the select element with options
                sortedList.forEach((voice) => {
                    const { is_paid, voice_id, language, display_name, gender } = voice;
                    if (showFreeAvatars ? !is_paid : true) {
                        const option = document.createElement('option');
                        option.value = voice_id;
                        option.textContent = `${language ?? 'Unknown'}, ${display_name ?? 'Unnamed'} (${gender ?? 'N/A'})`;
                        selectElement.appendChild(option);
                    }
                });

                // Event listener for changes on the select element
                selectElement.addEventListener('change', (event) => {
                    const selectedVoiceID = event.target.value;
                    const selectedVoice = voiceList.find((voice) => voice.voice_id === selectedVoiceID);

                    VideoAI.avatarVoice = selectedVoiceID || null;

                    const previewAudioURL = selectedVoice?.preview_audio;
                    if (previewAudioURL) {
                        const avatarPreviewAudio = document.getElementById('avatarPreviewAudio');
                        avatarPreviewAudio.src = previewAudioURL;
                        avatarPreviewAudio.play().catch((err) => {
                            console.error('Error playing preview audio:', err);
                        });
                    }
                });
            })
            .catch((err) => {
                console.error('Video AI getVoiceList error', err);
            });
    }

    async handleVideoAI() {
        const vb = document.createElement('div');
        vb.setAttribute('id', 'avatar__vb');
        vb.className = 'videoAvatarMenuBar fadein';

        const interrupt = this.createButton('avatar__interrupt', html.stop);
        const fs = this.createButton('avatar__fs', html.fullScreen);
        const pin = this.createButton('avatar__pin', html.pin);
        const ss = this.createButton('avatar__stopSession', html.kickOut);

        const avatarName = document.createElement('div');
        const an = document.createElement('span');
        an.id = 'avatar__name';
        an.className = html.userName;
        an.innerText = VideoAI.avatarName;

        // Create video container element
        this.videoAIContainer = document.createElement('div');
        this.videoAIContainer.className = 'Camera';
        this.videoAIContainer.id = 'videoAIContainer';

        // Create canvas element for video rendering
        this.canvasAIElement = document.createElement('canvas');
        this.canvasAIElement.className = '';
        this.canvasAIElement.id = 'canvasAIElement';
        this.canvasAIElement.style.objectFit = this.isMobileDevice ? 'cover' : 'contain';

        // Create video element for avatar
        this.videoAIElement = document.createElement('video');
        this.videoAIElement.id = 'videoAIElement';
        this.videoAIElement.setAttribute('playsinline', true);
        this.videoAIElement.autoplay = true;
        this.videoAIElement.className = '';
        this.videoAIElement.poster = image.poster;
        this.videoAIElement.style.objectFit = this.isMobileDevice ? 'cover' : 'contain';

        // Append elements to video container
        vb.appendChild(ss);
        this.isVideoFullScreenSupported && vb.appendChild(fs);
        vb.appendChild(interrupt);
        !this.isMobileDevice && vb.appendChild(pin);
        avatarName.appendChild(an);

        this.videoAIContainer.appendChild(this.videoAIElement);
        VideoAI.virtualBackground && this.videoAIContainer.appendChild(this.canvasAIElement);
        this.videoAIContainer.appendChild(vb);
        this.videoAIContainer.appendChild(avatarName);
        this.videoMediaContainer.appendChild(this.videoAIContainer);

        // Hide canvas initially
        this.canvasAIElement.hidden = true;

        // Use video avatar virtual background
        if (VideoAI.virtualBackground) {
            this.isVideoFullScreenSupported && this.handleFS(this.canvasAIElement.id, fs.id);
            this.handlePN(this.canvasAIElement.id, pin.id, this.videoAIContainer.id, true, true);
        } else {
            this.isVideoFullScreenSupported && this.handleFS(this.videoAIElement.id, fs.id);
            this.handlePN(this.videoAIElement.id, pin.id, this.videoAIContainer.id, true, true);
        }

        interrupt.onclick = () => {
            this.streamingInterrupt();
        };

        ss.onclick = () => {
            this.stopSession();
        };

        if (!this.isMobileDevice) {
            this.setTippy(pin.id, '切换置顶', 'bottom');
            this.setTippy(interrupt.id, '中断头像说话', 'bottom');
            this.setTippy(fs.id, '切换全屏', 'bottom');
            this.setTippy(ss.id, '停止VideoAI会话', 'bottom');
        }

        handleAspectRatio();

        await this.streamingNew();
    }

    async streamingNew() {
        try {
            const { quality, avatarId, avatarVoice } = VideoAI;

            const response = await this.socket.request('streamingNew', {
                quality: quality,
                avatar_id: avatarId,
                voice_id: avatarVoice,
            });

            if (!response || Object.keys(response).length === 0 || response.error) {
                this.userLog('error', '创建头像时出错', 'top-end');
                this.stopSession();
                return;
            }

            if (response.response.code !== 100) {
                this.userLog('warning', response.response.message, 'top-end');
                this.stopSession();
                return;
            }

            VideoAI.info = response.response.data;

            console.log('Video AI streamingNew', VideoAI);

            const { sdp, ice_servers2 } = VideoAI.info;

            await this.setupPeerConnection(sdp, ice_servers2);

            await this.startSession();
        } catch (error) {
            switch (error.code) {
                case 'quota_not_enough':
                    this.msgPopup(
                        'warning',
                        '您已达到此演示账户的配额限制。请考虑升级以获得更多功能。',
                        6000,
                        'top'
                    );
                    break;
                // ...
                default:
                    this.userLog('error', error.message, 'top-end');
            }
            console.error('Video AI streamingNew error:', error);
            this.stopSession();
        }
    }

    async setupPeerConnection(sdp, iceServers) {
        this.peerConnection = new RTCPeerConnection({ iceServers: iceServers });

        this.peerConnection.ontrack = (event) => {
            if (event.track.kind === 'audio' || event.track.kind === 'video') {
                this.videoAIElement.srcObject = event.streams[0];
            }
        };

        this.peerConnection.ondatachannel = (event) => {
            event.channel.onmessage = this.handleVideoAIMessage;
        };

        const remoteDescription = new RTCSessionDescription(sdp);
        this.peerConnection.setRemoteDescription(remoteDescription);
    }

    handleVideoAIMessage(event) {
        console.log('handleVideoAIMessage', event.data);
    }

    async startSession() {
        if (!VideoAI.info) {
            this.userLog('warning', '请先创建连接', 'top-end');
            return;
        }
        this.userLog('info', '正在启动会话... 请稍候', 'top-end');
        try {
            const answer = await this.peerConnection.createAnswer();

            await this.peerConnection.setLocalDescription(answer);

            await this.streamingStart(VideoAI.info.session_id, answer);

            this.peerConnection.onicecandidate = async ({ candidate }) => {
                if (candidate) {
                    await this.streamingICE(candidate);
                }
            };
        } catch (error) {
            this.userLog('error', error, 'top-end');
            console.error('Video AI startSession error:', error);
        }
    }

    async streamingICE(candidate) {
        try {
            const response = await this.socket.request('streamingICE', {
                session_id: VideoAI.info.session_id,
                candidate: candidate.toJSON(),
            });

            if (response && !response.error) {
                return response.response;
            }
        } catch (error) {
            console.error('Video AI streamingICE error:', error);
        }
    }

    async streamingStart(sessionId, sdp) {
        try {
            const response = await this.socket.request('streamingStart', {
                session_id: sessionId,
                sdp: sdp,
            });

            if (!response || response.error) return;

            this.startRendering();

            this.isMobileDevice ? this.handleMobileVideoAiChat() : this.handleDesktopVideoAiChat();

            VideoAI.active = true;

            this.userLog('info', 'Video AI 流媒体已启动', 'top-end');
        } catch (error) {
            console.error('Video AI streamingStart error:', error);
        }
    }

    handleDesktopVideoAiChat() {
        if (!this.isChatOpen) {
            this.toggleChat();
        }
        this.sendMessageToVideoAi();
    }

    handleMobileVideoAiChat() {
        if (this.videoMediaContainer.childElementCount <= 2) {
            isHideMeActive = !isHideMeActive;
            this.handleHideMe();
        }
        setTimeout(() => {
            this.streamingTask(
                `欢迎使用 ${BRAND.app.name}！请打开聊天窗口并导航到 ChatGPT 部分。随时向我提问您有任何问题。`
            );
        }, 2000);
    }

    sendMessageToVideoAi() {
        const tasks = [
            { delay: 1000, action: () => this.chatPin() },
            { delay: 1200, action: () => this.toggleShowParticipants() },
            { delay: 1400, action: () => this.showPeerAboutAndMessages('ChatGPT', 'ChatGPT') },
            { delay: 1600, action: () => this.streamingTask(`Welcome to ${BRAND.app.name}!`) },
            {
                delay: 2000,
                action: () => {
                    chatMessage.value = 'Hello!';
                    this.sendMessage();
                },
            },
        ];
        this.executeTasksSequentially(tasks);
    }

    executeTasksSequentially(tasks) {
        tasks.reduce((promise, task) => {
            return promise.then(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            task.action();
                            resolve();
                        }, task.delay);
                    })
            );
        }, Promise.resolve());
    }

    streamingTask(message) {
        if (VideoAI.enabled && VideoAI.active && message) {
            const response = this.socket.request('streamingTask', {
                session_id: VideoAI.info.session_id,
                text: message,
            });
            console.log('Video AI streamingTask', response);
        }
    }

    streamingInterrupt() {
        if (VideoAI.enabled && VideoAI.active && VideoAI.info.session_id) {
            const response = this.socket.request('streamingInterrupt', { session_id: VideoAI.info.session_id });
            console.log('Video AI streamingInterrupt', response);
        }
    }

    startRendering() {
        if (!VideoAI.virtualBackground) return;

        let frameCounter = 0;

        this.renderAIToken = Math.trunc(1e9 * Math.random());
        frameCounter = this.renderAIToken;

        this.videoAIElement.hidden = true;
        this.canvasAIElement.hidden = false;

        const context = this.canvasAIElement.getContext('2d', { willReadFrequently: true });

        const renderFrame = () => {
            if (this.renderAIToken !== frameCounter) return;

            if (this.videoAIElement.videoWidth === 0 || this.videoAIElement.videoHeight === 0) {
                requestAnimationFrame(renderFrame);
                return;
            }

            this.canvasAIElement.width = this.videoAIElement.videoWidth;
            this.canvasAIElement.height = this.videoAIElement.videoHeight;

            context.drawImage(this.videoAIElement, 0, 0, this.canvasAIElement.width, this.canvasAIElement.height);

            const imageData = context.getImageData(0, 0, this.canvasAIElement.width, this.canvasAIElement.height);
            const pixels = imageData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                if (shouldHidePixel([pixels[i], pixels[i + 1], pixels[i + 2]])) {
                    pixels[i + 3] = 0; // Make pixel transparent
                }
            }

            function shouldHidePixel([r, g, b]) {
                const greenThreshold = 90;
                const redThreshold = 90;
                const blueThreshold = 90;
                return g > greenThreshold && r < redThreshold && b < blueThreshold;
            }

            context.putImageData(imageData, 0, 0);
            requestAnimationFrame(renderFrame);
        };

        // Ensure the video element is ready before starting rendering
        const startRenderingWhenReady = () => {
            if (this.videoAIElement.readyState >= 2) {
                // HAVE_CURRENT_DATA
                renderFrame();
            } else {
                this.videoAIElement.addEventListener('loadeddata', renderFrame, { once: true });
            }
        };

        // Set the background of the canvas' parent element to an image or color of your choice
        this.canvasAIElement.parentElement.style.background = `url("${VideoAI.background}") center / cover no-repeat`;

        setTimeout(startRenderingWhenReady, 1000);
    }

    stopRendering() {
        this.renderAIToken = null;
        if (isHideMeActive) {
            isHideMeActive = !isHideMeActive;
            this.handleHideMe();
        }
    }

    stopSession() {
        const videoAIElement = this.getId('videoAIElement');
        if (videoAIElement) {
            videoAIElement.parentNode.removeChild(videoAIElement);
        }
        const videoAIContainer = this.getId('videoAIContainer');
        if (videoAIContainer) {
            videoAIContainer.parentNode.removeChild(videoAIContainer);
            const removeVideoAI = ['videoAIElement', 'canvasAIElement'];
            if (this.isVideoPinned && removeVideoAI.includes(this.pinnedVideoPlayerId)) {
                this.removeVideoPinMediaContainer();
            }
        }

        handleAspectRatio();

        this.streamingStop();
    }

    streamingStop() {
        if (this.peerConnection) {
            console.info('Video AI streamingStop peerConnection close done!');
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (VideoAI.info && VideoAI.info.session_id) {
            const sessionId = VideoAI.info.session_id;
            this.socket
                .request('streamingStop', { session_id: sessionId })
                .then(() => {
                    console.info('Video AI streamingStop done!');
                })
                .catch((error) => {
                    console.error('Video AI streamingStop error:', error);
                });
        }

        this.stopRendering();

        VideoAI.active = false;
    }

    // ##############################################
    // RTMP from FILE
    // ##############################################

    getRTMP() {
        this.socket.request('getRTMP').then(function (filenames) {
            console.log('RTMP files', filenames);
            if (filenames.length === 0) {
                const fileNameDiv = rc.getId('file-name');
                fileNameDiv.textContent = '未找到要流式传输的文件';
                //elemDisplay('startRtmpButton', false);
            }

            //const f = Array.from({ length: 20 }, (_, index) => `My-file-video-to-stream-to-rtmp-server ${index + 1}`);

            const fileListTbody = rc.getId('file-list');
            fileListTbody.innerHTML = '';

            filenames.forEach((filename) => {
                const fileRow = document.createElement('tr');
                const fileCell = document.createElement('td');
                fileCell.textContent = filename;
                fileCell.className = 'file-item';
                fileCell.onclick = () => showFilename(fileCell, filename);
                fileRow.appendChild(fileCell);
                fileListTbody.appendChild(fileRow);
            });

            function showFilename(clickedItem, filename) {
                const fileNameDiv = rc.getId('file-name');
                fileNameDiv.textContent = `Selected file: ${filename}`;
                rc.selectedRtmpFilename = filename;
                const fileItems = document.querySelectorAll('.file-item');
                fileItems.forEach((item) => item.classList.remove('selected'));

                if (clickedItem) {
                    clickedItem.classList.add('selected');
                }
            }
        });
    }

    async startRTMP() {
        if (!this.isRTMPVideoSupported(filterXSS(this.selectedRtmpFilename))) {
            this.getId('file-name').textContent = '';
            return this.userLog(
                'warning',
                "提供的文件无效。请确保它是 .mp4、webm 或 ogg 视频文件",
                'top-end'
            );
        }

        this.socket
            .request('startRTMP', {
                file: filterXSS(this.selectedRtmpFilename),
                peer_name: filterXSS(this.peer_name),
                peer_uuid: filterXSS(this.peer_uuid),
            })
            .then(function (rtmp) {
                rc.event(_EVENTS.startRTMP);
                rc.showRTMP(rtmp, 'file');
                rc.rtmpFileStreamer = true;
            });
    }

    stopRTMP() {
        if (this.rtmpFileStreamer) {
            this.socket.request('stopRTMP');
            this.rtmpFileStreamer = false;
            this.cleanRTMPUrl();
            console.log('RTMP STOP');
            this.event(_EVENTS.stopRTMP);
        }
    }

    endRTMP(data) {
        const rtmpMessage = `${data.rtmpUrl} 处理已完成！`;
        this.rtmpFileStreamer = false;
        this.userLog('info', rtmpMessage, 'top-end');
        console.log(rtmpMessage);
        this.cleanRTMPUrl();
        this.socket.request('endOrErrorRTMP');
        this.event(_EVENTS.endRTMP);
    }

    errorRTMP(data) {
        const rtmpError = `${data.message}`;
        this.rtmpFileStreamer = false;
        this.userLog('error', rtmpError, 'top-end');
        console.error(rtmpError);
        this.cleanRTMPUrl();
        this.socket.request('endOrErrorRTMP');
        this.event(_EVENTS.endRTMP);
    }

    // ##############################################
    // RTMP from URL
    // ##############################################

    startRTMPfromURL(inputVideoURL) {
        if (!this.isRTMPVideoSupported(filterXSS(inputVideoURL))) {
            this.getId('rtmpStreamURL').value = '';
            return this.userLog(
                'warning',
                '提供的 URL 无效。请确保它链接到一个 .mp4 视频文件',
                'top-end'
            );
        }

        this.socket
            .request('startRTMPfromURL', {
                inputVideoURL: filterXSS(inputVideoURL),
                peer_name: filterXSS(this.peer_name),
                peer_uuid: filterXSS(this.peer_uuid),
            })
            .then(function (rtmp) {
                rc.event(_EVENTS.startRTMPfromURL);
                rc.showRTMP(rtmp, 'url');
                rc.rtmpUrlStreamer = true;
            });
    }

    stopRTMPfromURL() {
        if (this.rtmpUrlStreamer) {
            this.socket.request('stopRTMPfromURL');
            this.rtmpUrlStreamer = false;
            this.cleanRTMPUrl();
            console.log('RTMP from URL STOP');
            this.event(_EVENTS.stopRTMPfromURL);
        }
    }

    endRTMPfromURL(data) {
        const rtmpMessage = `${data.rtmpUrl} 处理已完成！`;
        this.rtmpUrlStreamer = false;
        this.userLog('info', rtmpMessage, 'top-end');
        console.log(rtmpMessage);
        this.cleanRTMPUrl();
        this.socket.request('endOrErrorRTMPfromURL');
        this.event(_EVENTS.endRTMPfromURL);
    }

    errorRTMPfromURL(data) {
        const rtmpError = `${data.message}`;
        this.rtmpUrlStreamer = false;
        this.userLog('error', rtmpError, 'top-end');
        console.error(rtmpError);
        this.cleanRTMPUrl();
        this.socket.request('endOrErrorRTMPfromURL');
        this.event(_EVENTS.endRTMPfromURL);
    }

    // ##############################################
    // RTMP common
    // ##############################################

    openRTMPStreamer() {
        const themeColor = encodeURIComponent(themeCustom.color);

        const options =
            `&vr=${videoQuality.value}` +
            `&vf=${videoFps.value}` +
            `&sf=${screenFps.value}` +
            `&ts=${selectTheme.value}` +
            (themeCustom.keep ? `&tc=${themeColor}` : '');

        const url = `/rtmp?v=${videoSelect.value}&a=${microphoneSelect.value}${options}`;

        openURL(url, true);
    }

    isRTMPVideoSupported(video) {
        if (video.endsWith('.mp4') || video.endsWith('.webm')) return true;
        return false;
    }

    copyRTMPUrl(url) {
        if (!url) return this.userLog('info', '未检测到 RTMP URL', 'top-end');
        copyToClipboard(url);
    }

    cleanRTMPUrl() {
        const rtmpUrl = rc.getId('rtmpLiveUrl');
        rtmpUrl.value = '';
    }

    showRTMP(rtmp, type = 'file') {
        console.log('rtmp', rtmp);

        if (!rtmp) {
            switch (type) {
                case 'file':
                    this.event(_EVENTS.endRTMP);
                    break;
                case 'url':
                    this.event(_EVENTS.endRTMPfromURL);
                    break;
                default:
                    break;
            }
            return this.userLog(
                'warning',
                '无法启动 RTMP 流。请确保 RTMP 服务器正在运行。如果问题仍然存在，请联系管理员',
                'top-end',
                6000
            );
        }

        const rtmpUrl = rc.getId('rtmpLiveUrl');
        rtmpUrl.value = filterXSS(rtmp);

        Swal.fire({
            background: swalBackground,
            imageUrl: image.rtmp,
            position: 'center',
            title: '直播',
            html: `
                <p style="background:transparent; color:rgb(8, 189, 89);">${rtmp}</p>
                `,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `复制链接`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                copyToClipboard(rtmp);
            }
        });
    }

    // ####################################################
    // ROOM SNAPSHOT WINDOW/SCREEN/TAB
    // ####################################################

    async snapshotRoom() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const video = document.createElement('video');

        try {
            const captureStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });

            video.srcObject = captureStream;
            video.onloadedmetadata = () => {
                video.play();
            };

            // Wait for the video to start playing
            video.onplay = async () => {
                this.sound('snapshot');

                // Sleep some ms
                await this.sleep(1000);

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Create a link element to download the image
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'Room_' + this.room_id + '_' + getDataTimeString() + '_snapshot.png';
                link.click();

                // Stop all video tracks to release the capture stream
                captureStream.getTracks().forEach((track) => track.stop());

                // Clean up: remove references to avoid memory leaks
                video.srcObject = null;
                canvas.width = 0;
                canvas.height = 0;
            };
        } catch (err) {
            console.error('Error: ' + err);
            this.userLog('error', 'Snapshot room error ' + err.message, 'top-end', 6000);
        }
    }

    // ####################################################
    // ROOM NOTIFICATIONS
    // ####################################################

    cleanNotifications() {
        getId('notifyEmailInput').value = '';
        getId('switchNotifyUserJoin').checked = false;
        return true;
    }

    saveNotifications(validate = true) {
        if (validate && !this.isValidNotifications()) return;

        const data = this.getNotificationsData();

        if (!data) return;

        this.setNotificationsData(data);
    }

    setNotificationsData(data) {
        this.socket.emit('updateRoomNotifications', data, (response) => {
            response.error
                ? this.cleanNotifications() && this.userLog('warning', response.error, 'top-end', 6000)
                : this.roomMessage('save_room_notifications', true);
        });
    }

    isValidNotifications() {
        const notifyEmailInput = getId('notifyEmailInput');
        if (!this.isValidEmail(notifyEmailInput.value)) {
            notifyEmailInput.value = '';
            this.userLog('warning', '邮箱无效', 'top-end', 6000);
            return false;
        }
        return true;
    }

    getNotificationsData() {
        const notifyEmailInput = getId('notifyEmailInput');
        const switchNotifyUserJoin = getId('switchNotifyUserJoin');

        return {
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            notifications: {
                mode: {
                    email: notifyEmailInput.value,
                    //slack...
                },
                events: {
                    join: switchNotifyUserJoin.checked,
                    // leave...
                },
            },
        };
    }

    // ####################################################
    // HELPERS
    // ####################################################

    toggleVideoMirror() {
        const peerVideo = this.getName(this.peer_id);
        if (peerVideo) peerVideo.classList.toggle('mirror');
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
} // End
