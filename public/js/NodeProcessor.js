'use strict';

// Handle UI updates and interactions
class UIManager {
    constructor(elements) {
        this.elements = elements;
    }

    updateStatus(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const printMessage = `[${timestamp}] ${message}`;
        switch (type) {
            case 'error':
                console.error(printMessage);
                break;
            case 'success':
                console.info(printMessage);
                break;
            case 'warning':
                console.warn(printMessage);
                break;
            default:
                console.log(printMessage);
                break;
        }
    }

    updateUI(isProcessing, noiseSuppressionEnabled) {
        this.updateStatus(
            `${isProcessing ? '已开启' : '已结束'}音频处理`,
            isProcessing ? 'success' : 'info'
        );

        this.elements.labelNoiseSuppression.style.color = noiseSuppressionEnabled ? 'lime' : 'white';
    }
}

// Handle audio worklet message processing
class MessageHandler {
    constructor(uiManager, wasmLoader) {
        this.uiManager = uiManager;
        this.wasmLoader = wasmLoader;
    }

    handleMessage(event) {
        if (event.data.type === 'request-wasm') {
            this.wasmLoader.loadWasmBuffer();
        } else if (event.data.type === 'wasm-ready') {
            this.uiManager.updateStatus('✅ RNNoise WASM 初始化成功', 'success');
        } else if (event.data.type === 'wasm-error') {
            this.uiManager.updateStatus('❌ RNNoise WASM 错误: ' + event.data.error, 'error');
        } else if (event.data.type === 'vad') {
            if (event.data.isSpeech) {
                //this.uiManager.updateStatus(`🗣️ 检测到语音 (VAD: ${event.data.probability.toFixed(2)})`, 'info');
            }
        }
    }
}

// Handle only WASM module loading
class WasmLoader {
    constructor(uiManager, getWorkletNode) {
        this.uiManager = uiManager;
        this.getWorkletNode = getWorkletNode;
    }

    async loadWasmBuffer() {
        try {
            this.uiManager.updateStatus('📦 正在加载RNNoise同步模块...', 'info');

            const jsResponse = await fetch('../js/RnnoiseSync.js');

            if (!jsResponse.ok) {
                throw new Error('加载rnnoise-sync.js失败');
            }

            const jsContent = await jsResponse.text();
            this.uiManager.updateStatus('📦 正在将同步模块发送到工作单元...', 'info');

            this.getWorkletNode().port.postMessage({
                type: 'sync-module',
                jsContent: jsContent,
            });

            this.uiManager.updateStatus('📦 同步模块发送到工作单元', 'info');
        } catch (error) {
            this.uiManager.updateStatus('❌ 加载同步模块失败: ' + error.message, 'error');
            console.error('Sync module loading error:', error);
        }
    }
}

// Handle RNNoise processing
class RNNoiseProcessor {
    constructor() {
        this.audioContext = null;
        this.workletNode = null;
        this.mediaStream = null;
        this.sourceNode = null;
        this.destinationNode = null;
        this.isProcessing = false;
        this.noiseSuppressionEnabled = false;

        this.initializeUI();
        this.initializeDependencies();
    }

    initializeUI() {
        this.elements = {
            labelNoiseSuppression: document.getElementById('labelNoiseSuppression'),
            switchNoiseSuppression: document.getElementById('switchNoiseSuppression'),
        };

        this.elements.switchNoiseSuppression.onchange = (e) => {
            localStorageSettings.mic_noise_suppression = e.currentTarget.checked;
            lS.setSettings(localStorageSettings);
            userLog(
                localStorageSettings.mic_noise_suppression ? 'success' : 'info',
                `Noise suppression ${localStorageSettings.mic_noise_suppression ? 'enabled' : 'disabled'}`,
                'top-end',
                3000
            );
            this.toggleNoiseSuppression();
        };
    }

    initializeDependencies() {
        this.uiManager = new UIManager(this.elements);
        this.wasmLoader = new WasmLoader(this.uiManager, () => this.workletNode);
        this.messageHandler = new MessageHandler(this.uiManager, this.wasmLoader);
    }

    async toggleProcessing(mediaStream = null) {
        this.isProcessing ? this.stopProcessing() : await this.startProcessing(mediaStream);
    }

    async startProcessing(mediaStream = null) {
        if (!mediaStream) {
            throw new Error('无法启动，没有提供媒体流');
        }
        try {
            this.uiManager.updateStatus('🎤 开始音频处理...', 'info');

            this.audioContext = new AudioContext();
            const sampleRate = this.audioContext.sampleRate;
            this.uiManager.updateStatus(`🎵 创建的音频上下文: ${sampleRate}Hz`, 'info');

            this.mediaStream = mediaStream;
            if (!this.mediaStream.getAudioTracks().length) {
                throw new Error('在提供的媒体流中未找到音频轨道');
            }

            await this.audioContext.audioWorklet.addModule('../js/NoiseSuppressionProcessor.js');

            this.workletNode = new AudioWorkletNode(this.audioContext, 'NoiseSuppressionProcessor', {
                numberOfInputs: 1,
                numberOfOutputs: 1,
                outputChannelCount: [1],
            });

            this.workletNode.port.onmessage = (event) => this.messageHandler.handleMessage(event);

            this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);
            this.destinationNode = this.audioContext.createMediaStreamDestination();

            this.sourceNode.connect(this.workletNode);
            this.workletNode.connect(this.destinationNode);

            this.isProcessing = true;
            this.uiManager.updateUI(this.isProcessing, this.noiseSuppressionEnabled);
            this.uiManager.updateStatus('🎤 音频处理已开始', 'success');

            // Return the processed MediaStream (with noise suppression)
            return this.destinationNode.stream;
        } catch (error) {
            this.uiManager.updateStatus('❌ 错误: ' + error.message, 'error');
        }
    }

    stopProcessing() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track) => track.stop());
            this.mediaStream = null;
        }

        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
            this.audioContext = null;
        }

        this.workletNode = null;
        this.sourceNode = null;
        this.destinationNode = null;
        this.isProcessing = false;
        this.noiseSuppressionEnabled = false;

        this.uiManager.updateUI(this.isProcessing, this.noiseSuppressionEnabled);
        this.uiManager.updateStatus('🛑 音频处理已停止', 'info');
    }

    toggleNoiseSuppression() {
        this.noiseSuppressionEnabled = !this.noiseSuppressionEnabled;

        if (this.workletNode) {
            this.workletNode.port.postMessage({
                type: 'enable',
                enabled: this.noiseSuppressionEnabled,
            });
        }

        this.noiseSuppressionEnabled
            ? this.uiManager.updateStatus('🔊 RNNoise 开启 - 已处理背景噪音', 'success')
            : this.uiManager.updateStatus('🔇 RNNoise 禁用 - 关闭背景噪音处理器', 'info');

        this.uiManager.updateUI(this.isProcessing, this.noiseSuppressionEnabled);
    }
}
