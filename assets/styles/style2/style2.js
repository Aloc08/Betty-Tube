/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Enlarged Video Player script                                         
 *  Version:         1.0.0                                                    
 *  Data:            2026/01/25                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Displays the YouTube's videoplayer at the center of the screen with video 
 *  suggestion and comments in coloumn down the player.
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
 *  - Applies to: https://www.youtube.com/watch*
 *  - Works on: Chromium and forks
 *  - To be associated with respective .js file
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

function applyPlayerZoom(zoomPercent) {
  const zoom = zoomPercent / 100;
  const player = document.querySelector('#primary');
  const controls = document.querySelector('.ytp-chrome-bottom');

  if (!player || !controls) return;

  player.style.transform = `scale(${zoom})`;
  player.style.transformOrigin = 'top center';

  controls.style.transform = `scale(${1 / zoom})`;
  controls.style.transformOrigin = 'center';
  controls.style.width = `${zoom * 100}%`;
}

chrome.storage.sync.get(['enabledStyles', 'playerZoom'], data => {
  if (data.enabledStyles?.includes('style2')) {
    applyPlayerZoom(data.playerZoom || 111);
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'updateZoom') {
    chrome.storage.sync.get('enabledStyles', data => {
      if (data.enabledStyles?.includes('style2')) {
        applyPlayerZoom(msg.value);
      }
    });
  }
});
