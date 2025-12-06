const { app, BrowserWindow, BrowserView, session, ipcMain, net, globalShortcut } = require('electron');
const path = require('path');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');

// SSL 및 네트워크 관련 명령줄 스위치 설정 (검열 우회를 위해)
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('ignore-ssl-errors');
app.commandLine.appendSwitch('ignore-certificate-errors-spki-list');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');
app.commandLine.appendSwitch('disable-features', 'VizDisplayCompositor');

let mainWindow;
let browserView = null;
let retryCount = {}; // URL별 재시도 횟수 추적
const MAX_RETRIES = 3; // 최대 재시도 횟수

let proxyConfig = {
  enabled: false,
  type: 'http', // 'http', 'socks4', 'socks5'
  host: '',
  port: '',
  username: '',
  password: ''
};

let dnsConfig = {
  enabled: false,
  provider: 'cloudflare', // 'cloudflare', 'google', 'quad9'
  customDns: ''
};

let torConfig = {
  enabled: false,
  autoConnect: true // Tor 네트워크 자동 연결
};

// Tor 네트워크 엔트리 포인트 (공개 Tor 브리지)
const torBridges = [
  '127.0.0.1:9050', // 로컬 Tor (설치된 경우)
  '127.0.0.1:9150'  // Tor Browser의 경우
];

// DNS over HTTPS 제공자
const dohProviders = {
  cloudflare: 'https://cloudflare-dns.com/dns-query',
  google: 'https://dns.google/dns-query',
  quad9: 'https://dns.quad9.net/dns-query'
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // 검열 우회를 위해 일부 보안 기능 비활성화
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  mainWindow.loadFile('index.html');

  // 개발자 도구 자동 열기 (개발용)
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // F12 단축키로 개발자 도구 열기
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      mainWindow.webContents.toggleDevTools();
    }
    // Ctrl+Shift+I도 지원
    if (input.control && input.shift && input.key === 'I') {
      mainWindow.webContents.toggleDevTools();
    }
  });

  // 프라이버시 설정 적용
  applyPrivacySettings();
  
  // BrowserView 초기화
  setupBrowserView();
}

function setupBrowserView() {
  if (browserView) {
    browserView.destroy();
  }
  
  browserView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  });
  
  // BrowserView를 메인 윈도우 뒤로 보내기 (모달이 위에 보이도록)
  mainWindow.setBrowserView(browserView);
  
  // BrowserView를 먼저 설정 (모달이 위에 보이도록)
  mainWindow.setBrowserView(browserView);
  
  // SSL 인증서 오류 처리 (검열 우회를 위해)
  const ses = browserView.webContents.session;
  ses.setCertificateVerifyProc((request, callback) => {
    // 검열 우회를 위해 인증서 검증 완화
    callback(0); // 0 = 성공, -2 = 실패, -3 = 기본 검증 사용
  });
  
  // certificate-error 이벤트 처리
  browserView.webContents.on('certificate-error', (event, url, error, certificate, callback) => {
    // 검열 우회를 위해 인증서 오류 무시
    event.preventDefault();
    callback(true); // true = 인증서 오류 무시
  });
  
  // SSL 관련 오류 처리
  browserView.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.log(`Failed to load: ${validatedURL}, Error: ${errorCode} - ${errorDescription}`);
    
    // 재시도 횟수 초기화
    if (!retryCount[validatedURL]) {
      retryCount[validatedURL] = 0;
    }
    
    // SSL 오류인 경우 제한된 재시도
    if ((errorCode === -101 || errorCode === -200) && retryCount[validatedURL] < MAX_RETRIES) {
      retryCount[validatedURL]++;
      console.log(`Retrying (${retryCount[validatedURL]}/${MAX_RETRIES}): ${validatedURL}`);
      
      setTimeout(() => {
        if (browserView && validatedURL) {
          browserView.webContents.loadURL(validatedURL, { 
            extraHeaders: 'Cache-Control: no-cache\nPragma: no-cache\n'
          });
        }
      }, 2000 * retryCount[validatedURL]); // 재시도 간격 증가
    } else {
      // 재시도 실패 시 사용자에게 프록시 사용 안내
      if (errorCode === -101 && !proxyConfig.enabled) {
        mainWindow.webContents.send('connection-failed', {
          url: validatedURL,
          error: 'ERR_CONNECTION_RESET',
          message: '연결이 차단되었습니다. 프록시를 사용하세요.'
        });
      }
      // 재시도 횟수 초기화
      retryCount[validatedURL] = 0;
    }
  });
  
  const bounds = mainWindow.getBounds();
  browserView.setBounds({
    x: 0,
    y: 60, // 헤더 높이
    width: bounds.width,
    height: bounds.height - 60
  });
  
  // BrowserView 이벤트 리스너
  browserView.webContents.on('did-navigate', (event, url) => {
    // 성공적으로 로드되면 재시도 횟수 초기화
    retryCount[url] = 0;
    mainWindow.webContents.send('url-changed', url);
  });
  
  browserView.webContents.on('did-navigate-in-page', (event, url) => {
    mainWindow.webContents.send('url-changed', url);
  });
  
  browserView.webContents.on('page-title-updated', (event, title) => {
    mainWindow.webContents.send('title-changed', title);
  });
  
  // 윈도우 리사이즈 시 BrowserView 크기 조정
  mainWindow.on('resize', () => {
    const bounds = mainWindow.getBounds();
    if (browserView) {
      browserView.setBounds({
        x: 0,
        y: 60,
        width: bounds.width,
        height: bounds.height - 60
      });
    }
  });
}

function applyPrivacySettings() {
  const ses = session.defaultSession;
  
  // 기본 세션에도 SSL 인증서 검증 완화
  ses.setCertificateVerifyProc((request, callback) => {
    callback(0); // 검열 우회를 위해 인증서 검증 완화
  });
  
  // BrowserView의 세션도 가져오기
  const browserSession = browserView ? browserView.webContents.session : null;
  
  // Tor 네트워크 자동 연결 시도 (비동기로 실행하여 블로킹 방지)
  if (torConfig.enabled && torConfig.autoConnect) {
    connectToTor(browserSession || ses).catch(err => {
      console.error('Tor 연결 오류:', err);
    });
  } else if (torConfig.enabled && !torConfig.autoConnect) {
    // Tor가 활성화되어 있지만 자동 연결이 꺼져있으면 수동으로 연결
    connectToTor(browserSession || ses).catch(err => {
      console.error('Tor 연결 오류:', err);
    });
  }

  // 쿠키 및 추적 방지 설정
  const filter = { urls: ['*://*/*'] };
  
  ses.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    // User-Agent 랜덤화
    details.requestHeaders['User-Agent'] = getRandomUserAgent();
    
    // 추적 방지 헤더 제거 (일부 사이트는 Origin이 필요하므로 선택적으로)
    // delete details.requestHeaders['Referer'];
    // delete details.requestHeaders['Origin'];
    
    callback({ requestHeaders: details.requestHeaders });
  });

  // BrowserView 세션에도 동일한 설정 적용
  if (browserSession) {
    browserSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      details.requestHeaders['User-Agent'] = getRandomUserAgent();
      callback({ requestHeaders: details.requestHeaders });
    });
  }

  // 응답 헤더 수정 (추적 방지) - 선택적으로 적용
  ses.webRequest.onHeadersReceived(filter, (details, callback) => {
    if (details.responseHeaders) {
      // 일부 추적 헤더 제거 (쿠키는 필요할 수 있으므로 주석 처리)
      // delete details.responseHeaders['set-cookie'];
      delete details.responseHeaders['x-tracking-id'];
      delete details.responseHeaders['x-ad-id'];
    }
    callback({ responseHeaders: details.responseHeaders });
  });

  // 프록시 설정 적용
  if (proxyConfig.enabled && proxyConfig.host && proxyConfig.port) {
    let proxyUrl;
    if (proxyConfig.type === 'socks4' || proxyConfig.type === 'socks5') {
      proxyUrl = `${proxyConfig.type}://${proxyConfig.host}:${proxyConfig.port}`;
    } else {
      proxyUrl = `http://${proxyConfig.host}:${proxyConfig.port}`;
    }
    
    // 인증 정보가 있으면 추가
    if (proxyConfig.username && proxyConfig.password) {
      proxyUrl = proxyUrl.replace('://', `://${proxyConfig.username}:${proxyConfig.password}@`);
    }
    
    ses.setProxy({
      proxyRules: proxyUrl
    });
    
    // BrowserView 세션에도 프록시 적용
    if (browserSession) {
      browserSession.setProxy({
        proxyRules: proxyUrl
      });
    }
  } else {
    // 프록시 비활성화
    ses.setProxy({});
    if (browserSession) {
      browserSession.setProxy({});
    }
  }
}

function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Tor 네트워크 자동 연결 함수
async function connectToTor(ses) {
  // 로컬 Tor 서비스 확인 및 연결
  for (const bridge of torBridges) {
    const [host, port] = bridge.split(':');
    try {
      console.log(`Tor 연결 테스트: ${bridge}`);
      
      // 실제 연결 테스트
      const testResult = await testTorConnection(ses, host, parseInt(port));
      if (testResult) {
        // Tor SOCKS5 프록시로 연결
        ses.setProxy({
          proxyRules: `socks5://${host}:${port}`,
          proxyBypassRules: 'localhost,127.0.0.1'
        });
        console.log(`Tor 연결 성공: ${bridge}`);
        mainWindow.webContents.send('tor-connected', { bridge });
        return true;
      } else {
        console.log(`Tor 연결 실패 (${bridge}): 서비스가 실행되지 않음`);
      }
    } catch (error) {
      console.log(`Tor 연결 실패 (${bridge}):`, error.message);
    }
  }
  
  // 로컬 Tor가 없으면 프록시 설정 해제
  ses.setProxy({});
  console.log('로컬 Tor 서비스가 없습니다. Tor Browser를 설치하거나 프록시를 사용하세요.');
  mainWindow.webContents.send('tor-not-found', {
    message: 'Tor Browser가 실행되지 않았습니다. Tor Browser를 실행하거나 DNS over HTTPS를 사용하세요.'
  });
  return false;
}

// Tor 연결 테스트
async function testTorConnection(ses, host, port) {
  return new Promise((resolve) => {
    try {
      // 간단한 TCP 연결 테스트
      const net = require('net');
      const socket = new net.Socket();
      let connected = false;
      
      socket.setTimeout(2000); // 2초 타임아웃
      
      socket.on('connect', () => {
        connected = true;
        socket.destroy();
        resolve(true);
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        if (!connected) resolve(false);
      });
      
      socket.on('error', () => {
        if (!connected) resolve(false);
      });
      
      socket.connect(port, host);
    } catch (error) {
      resolve(false);
    }
  });
}

// DNS 우회를 위한 IP 주소 직접 접속 시도
async function resolveDomainWithDoH(domain) {
  if (!dnsConfig.enabled) {
    return null;
  }
  
  try {
    const dohUrl = dnsConfig.customDns || dohProviders[dnsConfig.provider];
    const queryUrl = `${dohUrl}?name=${domain}&type=A`;
    
    const response = await fetch(queryUrl, {
      headers: {
        'Accept': 'application/dns-json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.Answer && data.Answer.length > 0) {
        return data.Answer[0].data; // IP 주소 반환
      }
    }
  } catch (error) {
    console.error('DoH 쿼리 실패:', error);
  }
  
  return null;
}

// IPC 핸들러
ipcMain.handle('set-proxy', async (event, config) => {
  proxyConfig = { ...proxyConfig, ...config };
  applyPrivacySettings();
  // 프록시 변경 시 BrowserView 재설정
  if (browserView) {
    setupBrowserView();
  }
  return { success: true };
});

ipcMain.handle('get-proxy', async () => {
  return proxyConfig;
});

ipcMain.handle('set-dns', async (event, config) => {
  dnsConfig = { ...dnsConfig, ...config };
  applyPrivacySettings();
  return { success: true };
});

ipcMain.handle('set-tor', async (event, config) => {
  torConfig = { ...torConfig, ...config };
  
  // Tor가 비활성화되면 프록시 설정 해제
  if (!torConfig.enabled && browserView) {
    browserView.webContents.session.setProxy({});
    session.defaultSession.setProxy({});
  }
  
  applyPrivacySettings();
  return { success: true };
});

ipcMain.handle('get-tor', async () => {
  return torConfig;
});

ipcMain.handle('get-dns', async () => {
  return dnsConfig;
});

ipcMain.handle('test-connection', async () => {
  try {
    const testUrl = 'https://www.google.com';
    const response = await fetch(testUrl);
    return { success: response.ok, status: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('navigate', async (event, url) => {
  if (browserView) {
    // 새 URL로 이동 시 재시도 횟수 초기화
    retryCount[url] = 0;
    
    try {
      // DNS 우회 시도 (도메인인 경우)
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      
      // DNS over HTTPS로 IP 주소 조회 시도
      if (dnsConfig.enabled && domain) {
        const ip = await resolveDomainWithDoH(domain);
        if (ip) {
          // IP 주소로 직접 접속 시도
          const ipUrl = url.replace(domain, ip);
          try {
            await browserView.webContents.loadURL(ipUrl, {
              extraHeaders: `Host: ${domain}\nCache-Control: no-cache\nPragma: no-cache\n`,
              userAgent: getRandomUserAgent()
            });
            return { success: true };
          } catch (ipError) {
            console.log('IP 직접 접속 실패, 원본 URL로 시도:', ipError.message);
          }
        }
      }
      
      // 일반적인 방법으로 로드
      await browserView.webContents.loadURL(url, {
        extraHeaders: 'Cache-Control: no-cache\nPragma: no-cache\n',
        userAgent: getRandomUserAgent()
      });
      return { success: true };
    } catch (error) {
      console.error('Navigation error:', error);
      // ERR_CONNECTION_RESET 또는 ERR_PROXY_CONNECTION_FAILED 오류인 경우
      if ((error.code === 'ERR_CONNECTION_RESET' || error.code === 'ERR_PROXY_CONNECTION_FAILED') && !proxyConfig.enabled) {
        // Tor 연결 실패 시 Tor 비활성화
        if (torConfig.enabled && error.code === 'ERR_PROXY_CONNECTION_FAILED') {
          console.log('Tor 연결 실패, Tor 비활성화');
          torConfig.enabled = false;
          browserView.webContents.session.setProxy({});
          mainWindow.webContents.send('tor-not-found', {
            message: 'Tor Browser가 실행되지 않았습니다. DNS over HTTPS를 사용하세요.'
          });
        }
        
        // DNS over HTTPS로 재시도
        if (dnsConfig.enabled) {
          try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname;
            const ip = await resolveDomainWithDoH(domain);
            if (ip) {
              console.log(`DNS over HTTPS로 IP 조회 성공: ${domain} -> ${ip}`);
              const ipUrl = url.replace(domain, ip);
              await browserView.webContents.loadURL(ipUrl, {
                extraHeaders: `Host: ${domain}\nCache-Control: no-cache\nPragma: no-cache\n`,
                userAgent: getRandomUserAgent()
              });
              return { success: true };
            }
          } catch (dohError) {
            console.error('DNS over HTTPS 재시도 실패:', dohError);
          }
        }
        
        return { 
          success: false, 
          error: error.message,
          needsProxy: true,
          message: '연결이 차단되었습니다. DNS over HTTPS를 활성화하거나 프록시를 사용하세요.'
        };
      }
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'BrowserView not initialized' };
});

ipcMain.handle('go-back', async () => {
  if (browserView && browserView.webContents.canGoBack()) {
    browserView.webContents.goBack();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('go-forward', async () => {
  if (browserView && browserView.webContents.canGoForward()) {
    browserView.webContents.goForward();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('reload', async () => {
  if (browserView) {
    browserView.webContents.reload();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('get-current-url', async () => {
  if (browserView) {
    return { url: browserView.webContents.getURL() };
  }
  return { url: '' };
});

// 설정 모달 열기 - BrowserView 숨기기
ipcMain.handle('show-settings', async () => {
  if (browserView) {
    mainWindow.removeBrowserView(browserView);
  }
  return { success: true };
});

// 설정 모달 닫기 - BrowserView 복원
ipcMain.handle('hide-settings', async () => {
  if (browserView) {
    mainWindow.setBrowserView(browserView);
    const bounds = mainWindow.getBounds();
    browserView.setBounds({
      x: 0,
      y: 60,
      width: bounds.width,
      height: bounds.height - 60
    });
  }
  return { success: true };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

