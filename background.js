/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          background.js                  
 *  Version:         B.2.0                                                    
 *  Data:            2026/01/25                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  N/A
 *
 * ----------------------------------------------------------------------------
 *  SOFTWARE:
 *  - Language:       JS
 *  - APIs / Libs:    N/A
 *
 * ----------------------------------------------------------------------------
 *  CREDITS:
 *  Alessio Occulto
 *  ______________________________________
 *  Contacts: 
 *    -E-Mail: alessio.occulto.dev@gmail.com
 *
 * ----------------------------------------------------------------------------
 *  NOTES:
 *  - GitHub: https://github.com/Aloc08/Betty-Tube
 *  - Works on: Chromium and forks
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/


// background.js (MV3)

const styleFiles = {
  style1: { css: ['/assets/styles/style1/style1.css'], js: ['/assets/styles/style1/style1.js'] },
  style2: { css: ['/assets/styles/style2/style2.css'], js: ['/assets/styles/style2/style2.js'] },
  style3: { css: ['/assets/styles/style3/style3.css'], js: ['/assets/styles/style3/style3.js'] },
  style4: { css: ['/assets/styles/style4/style4.css'], js: ['/assets/styles/style4/style4.js'] },
  style5: { css: ['/assets/styles/style5/style5.css'], js: ['/assets/styles/style5/style5.js'] },
  style6: { css: ['/assets/styles/style6/style6.css'], js: ['/assets/styles/style6/style6.js'] },
  style7: { css: ['/assets/styles/style7/style7.css'], js: ['/assets/styles/style7/style7.js'] },
  style8: { css: ['/assets/styles/style8/style8.css'], js: ['/assets/styles/style8/style8.js'] },
  style9: { css: ['/assets/styles/style9/style9.css'], js: ['/assets/styles/style9/style9.js'] },
  style10: { css: ['/assets/styles/style10/style10.css'], js: ['/assets/styles/style10/style10.js'] },
  style11: { css: ['/assets/styles/style11/style11.css'], js: ['/assets/styles/style11/style11.js'] },
  style12: { css: ['/assets/styles/style12/style12.css'], js: ['/assets/styles/style12/style12.js'] }
};

// Styles that apply on /watch* pages
const watchStyles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style8'];

// Styles that apply on YouTube pages (exclude /watch*)
const otherStyles = ['style7'];

// Styles that apply everywhere on YouTube
const hybridStyles = ['style6', 'style9', 'style10', 'style11', 'style12'];

async function injectStyles(tabId, enabledStyles, url) {
  const isWatchPage = url.includes('/watch');

  for (const styleId of enabledStyles) {
    
    if (
    (isWatchPage && !watchStyles.includes(styleId) && !hybridStyles.includes(styleId)) ||
    (!isWatchPage && !otherStyles.includes(styleId) && !hybridStyles.includes(styleId))
    ) continue;

    const files = styleFiles[styleId];
    if (!files) continue;

    for (const cssFile of files.css) {
      try {
        await chrome.scripting.insertCSS({ target: { tabId }, files: [cssFile] });
        console.log('[success] CSS injected:', cssFile);
      } catch (e) {
        console.error('[error] insertCSS ERROR:', cssFile, e);
      }
    }

    for (const jsFile of files.js) {
      try {
        await chrome.scripting.executeScript({ target: { tabId }, files: [jsFile] });
        console.log('[success] JS injected:', jsFile);
      } catch (e) {
        console.error('[error] executeScript ERROR:', jsFile, e);
      }
    }
  }
}


async function tryInject(tabId, enabledStyles, url, retries = 10) {
  try {
    await injectStyles(tabId, enabledStyles, url);
  } catch (e) {
    if (retries > 0) {
      console.warn('[inject] retrying...', retries);
      setTimeout(() => tryInject(tabId, enabledStyles, url, retries - 1), 500);
    }
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
    chrome.storage.sync.get('enabledStyles', data => {
      tryInject(tabId, data.enabledStyles || [], tab.url);
    });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.enabledStyles) {
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
      for (const tab of tabs) {
        tryInject(tab.id, changes.enabledStyles.newValue, tab.url);
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("[i] Betty-Tube is ready!");
});



