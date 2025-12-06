const { ipcRenderer } = require('electron');

let currentUrl = '';

// DOM 요소 변수 선언
let urlBar, backBtn, forwardBtn, reloadBtn, settingsBtn, settingsModal, closeSettings;
let proxyEnabled, proxyType, proxyHost, proxyPort, proxyUsername, proxyPassword, saveProxy;
let dnsEnabled, dnsProvider, customDns, saveDns;
let testConnection, testResult;
let torEnabled, torAutoConnect, saveTor;

    // DOM 요소 초기화 함수
function initDOMElements() {
    urlBar = document.getElementById('urlBar');
    backBtn = document.getElementById('backBtn');
    forwardBtn = document.getElementById('forwardBtn');
    reloadBtn = document.getElementById('reloadBtn');
    settingsBtn = document.getElementById('settingsBtn');
    settingsModal = document.getElementById('settingsModal');
    closeSettings = document.getElementById('closeSettings');
    
    console.log('DOM 요소 초기화 완료:', {
        settingsBtn: !!settingsBtn,
        settingsModal: !!settingsModal,
        closeSettings: !!closeSettings
    });

    proxyEnabled = document.getElementById('proxyEnabled');
    proxyType = document.getElementById('proxyType');
    proxyHost = document.getElementById('proxyHost');
    proxyPort = document.getElementById('proxyPort');
    proxyUsername = document.getElementById('proxyUsername');
    proxyPassword = document.getElementById('proxyPassword');
    saveProxy = document.getElementById('saveProxy');

    dnsEnabled = document.getElementById('dnsEnabled');
    dnsProvider = document.getElementById('dnsProvider');
    customDns = document.getElementById('customDns');
    saveDns = document.getElementById('saveDns');

    testConnection = document.getElementById('testConnection');
    testResult = document.getElementById('testResult');

    torEnabled = document.getElementById('torEnabled');
    torAutoConnect = document.getElementById('torAutoConnect');
    saveTor = document.getElementById('saveTor');
    
    // 디버깅: 요소 찾기 확인
    console.log('DOM 요소 초기화:', {
        saveProxy: !!saveProxy,
        saveTor: !!saveTor,
        saveDns: !!saveDns,
        testConnection: !!testConnection,
        settingsModal: !!settingsModal
    });
}

// 이벤트 리스너 초기화 함수
function initEventListeners() {
    if (!urlBar || !backBtn || !forwardBtn || !reloadBtn || !settingsBtn || !settingsModal || !closeSettings) {
        console.error('필수 DOM 요소를 찾을 수 없습니다.');
        return;
    }

    // URL 바에서 엔터 키 처리
    urlBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            navigate(urlBar.value);
        }
    });

    // 네비게이션 버튼
    backBtn.addEventListener('click', async () => {
        await ipcRenderer.invoke('go-back');
    });

    forwardBtn.addEventListener('click', async () => {
        await ipcRenderer.invoke('go-forward');
    });

    reloadBtn.addEventListener('click', async () => {
        await ipcRenderer.invoke('reload');
    });

    // 설정 모달 열기
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', async () => {
            // BrowserView 숨기기 (모달이 위에 보이도록)
            await ipcRenderer.invoke('show-settings');
            settingsModal.classList.add('active');
            settingsModal.style.display = 'flex';
            loadSettings();
        });
    }

    // 설정 모달 닫기 함수
    async function closeSettingsModal() {
        settingsModal.classList.remove('active');
        settingsModal.style.display = 'none';
        // BrowserView 복원
        await ipcRenderer.invoke('hide-settings');
    }

    if (closeSettings) {
        closeSettings.addEventListener('click', closeSettingsModal);
    }

    // 모달 외부 클릭 시 닫기
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                closeSettingsModal();
            }
        });
    }

    // 프록시 설정 저장
    if (saveProxy) {
        console.log('프록시 저장 버튼 이벤트 리스너 등록');
        saveProxy.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('프록시 저장 버튼 클릭됨');
            
            const config = {
                enabled: proxyEnabled ? proxyEnabled.checked : false,
                type: proxyType ? proxyType.value : 'http',
                host: proxyHost ? proxyHost.value : '',
                port: proxyPort ? proxyPort.value : '',
                username: proxyUsername ? proxyUsername.value : '',
                password: proxyPassword ? proxyPassword.value : ''
            };

            // 필수 필드 검증
            if (config.enabled && (!config.host || !config.port)) {
                alert('프록시 호스트와 포트를 입력하세요.');
                return;
            }

            const result = await ipcRenderer.invoke('set-proxy', config);
            if (result.success) {
                alert('프록시 설정이 저장되었습니다. 브라우저를 재시작하거나 페이지를 새로고침하세요.');
                // 현재 페이지가 있다면 재로드
                if (currentUrl) {
                    setTimeout(() => {
                        navigate(currentUrl);
                    }, 500);
                }
            }
        });
    } else {
        console.error('saveProxy 요소를 찾을 수 없습니다!');
    }

    // Tor 설정 저장
    if (saveTor) {
        console.log('Tor 저장 버튼 이벤트 리스너 등록');
        saveTor.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Tor 저장 버튼 클릭됨');
            
            const config = {
                enabled: torEnabled ? torEnabled.checked : false,
                autoConnect: torAutoConnect ? torAutoConnect.checked : false
            };

            const result = await ipcRenderer.invoke('set-tor', config);
            if (result.success) {
                if (config.enabled) {
                    alert('Tor 네트워크가 활성화되었습니다. Tor Browser가 설치되어 있으면 자동으로 연결됩니다.');
                } else {
                    alert('Tor 설정이 저장되었습니다.');
                }
                // 현재 페이지가 있다면 재로드
                if (currentUrl) {
                    setTimeout(() => {
                        navigate(currentUrl);
                    }, 500);
                }
            }
        });
    } else {
        console.error('saveTor 요소를 찾을 수 없습니다!');
    }

    // DNS 설정 저장
    if (saveDns) {
        console.log('DNS 저장 버튼 이벤트 리스너 등록');
        saveDns.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('DNS 저장 버튼 클릭됨');
            
            const config = {
                enabled: dnsEnabled ? dnsEnabled.checked : false,
                provider: dnsProvider ? dnsProvider.value : 'cloudflare',
                customDns: customDns ? customDns.value : ''
            };

            const result = await ipcRenderer.invoke('set-dns', config);
            if (result.success) {
                alert('DNS 설정이 저장되었습니다.');
                // 현재 페이지가 있다면 재로드
                if (currentUrl) {
                    setTimeout(() => {
                        navigate(currentUrl);
                    }, 500);
                }
            }
        });
    } else {
        console.error('saveDns 요소를 찾을 수 없습니다!');
    }

    // 연결 테스트
    if (testConnection && testResult) {
        console.log('연결 테스트 버튼 이벤트 리스너 등록');
        testConnection.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('연결 테스트 버튼 클릭됨');
            
            testResult.textContent = '테스트 중...';
            testResult.className = 'test-result';
            
            const result = await ipcRenderer.invoke('test-connection');
            
            if (result.success) {
                testResult.textContent = `✓ 연결 성공! 상태 코드: ${result.status}`;
                testResult.className = 'test-result success';
            } else {
                testResult.textContent = `✗ 연결 실패: ${result.error}`;
                testResult.className = 'test-result error';
            }
        });
    } else {
        console.error('testConnection 또는 testResult 요소를 찾을 수 없습니다!');
    }
}


// 설정 로드
async function loadSettings() {
    if (!proxyEnabled || !dnsEnabled || !torEnabled) {
        console.error('설정 요소를 찾을 수 없습니다.');
        return;
    }

    const proxy = await ipcRenderer.invoke('get-proxy');
    const dns = await ipcRenderer.invoke('get-dns');
    const tor = await ipcRenderer.invoke('get-tor');

    if (proxyEnabled) proxyEnabled.checked = proxy.enabled;
    if (proxyType) proxyType.value = proxy.type;
    if (proxyHost) proxyHost.value = proxy.host;
    if (proxyPort) proxyPort.value = proxy.port;
    if (proxyUsername) proxyUsername.value = proxy.username;
    if (proxyPassword) proxyPassword.value = proxy.password;

    if (dnsEnabled) dnsEnabled.checked = dns.enabled;
    if (dnsProvider) dnsProvider.value = dns.provider;
    if (customDns) customDns.value = dns.customDns;

    if (torEnabled) torEnabled.checked = tor.enabled;
    if (torAutoConnect) torAutoConnect.checked = tor.autoConnect;
}

// 네비게이션 함수
async function navigate(url) {
    // URL 형식 검증 및 수정
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // 검색어인지 URL인지 판단
        if (url.includes('.') && !url.includes(' ')) {
            url = 'https://' + url;
        } else {
            url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        }
    }

    currentUrl = url;
    urlBar.value = url;

    // 웰컴 스크린 숨기기
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    // 오류 메시지 숨기기
    hideErrorMessage();

    // BrowserView를 통해 네비게이션
    const result = await ipcRenderer.invoke('navigate', url);
    if (!result.success) {
        console.error('Navigation failed:', result.error);
        if (result.needsProxy) {
            showErrorMessage(result.message || '연결이 차단되었습니다. 프록시를 사용하세요.');
        } else {
            showErrorMessage(`연결 실패: ${result.error}`);
        }
    }
}

// 오류 메시지 표시 함수
function showErrorMessage(message) {
    let errorDiv = document.getElementById('errorMessage');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'errorMessage';
        errorDiv.className = 'error-message';
        document.body.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // 5초 후 자동 숨기기
    setTimeout(() => {
        hideErrorMessage();
    }, 5000);
}

// 오류 메시지 숨기기 함수
function hideErrorMessage() {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// IPC 이벤트 리스너
ipcRenderer.on('url-changed', (event, url) => {
    urlBar.value = url;
    currentUrl = url;
    hideErrorMessage(); // 성공적으로 로드되면 오류 메시지 숨기기
});

ipcRenderer.on('connection-failed', (event, data) => {
    showErrorMessage(data.message || '연결이 차단되었습니다. Tor 네트워크 또는 프록시를 사용하세요.');
});

ipcRenderer.on('tor-connected', (event, data) => {
    showSuccessMessage('Tor 네트워크에 연결되었습니다!');
    updateTorStatus('connected', 'Tor 연결됨');
});

ipcRenderer.on('tor-not-found', (event, data) => {
    showErrorMessage(data.message || 'Tor Browser를 설치하거나 프록시를 설정하세요.');
    updateTorStatus('disconnected', 'Tor 연결 안됨');
});

// Tor 상태 업데이트 함수
function updateTorStatus(status, message) {
    const torStatus = document.getElementById('torStatus');
    if (torStatus) {
        torStatus.textContent = message;
        torStatus.className = `status-indicator ${status}`;
    }
}

// 성공 메시지 표시 함수
function showSuccessMessage(message) {
    let successDiv = document.getElementById('successMessage');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'successMessage';
        successDiv.className = 'success-message';
        document.body.appendChild(successDiv);
    }
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

ipcRenderer.on('title-changed', (event, title) => {
    document.title = title + ' - UB';
});

// DOM 로드 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDOMElements();
        initEventListeners();
        loadSettings();
    });
} else {
    // 이미 로드된 경우
    initDOMElements();
    initEventListeners();
    loadSettings();
}

