/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Smooth Dropdown Menu Animation script                         
 *  Version:         1.0.0                                                    
 *  Data:            2026/01/13                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Adds a smooth fade-and-slide-down animation to YouTube’s dropdown 
 *  menus (e.g., the “...” menus) for a more polished and fluid user experience.
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
 *  - Applies to: https://www.youtube.com/*
 *  - Tested on: Chromium and forks
 *  - To be associated with respective .css file
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

function animateMenu(menu) {
  if (!menu) return;
  menu.classList.remove('yt-menu-animated'); // reset animation
  void menu.offsetWidth; // reflow to restart animation
  menu.classList.add('yt-menu-animated');
}

const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;

        const selectors = [
          'ytd-popup-container',
          'tp-yt-paper-listbox',
          '.style-scope.ytd-menu-popup-renderer',
          'ytd-menu-popup-renderer',
          'tp-yt-iron-dropdown',
          'iron-dropdown'
        ];

        if (selectors.some(sel => node.matches(sel))) {
          animateMenu(node);
        } else {
          for (const sel of selectors) {
            const popup = node.querySelector(sel);
            if (popup) {
              animateMenu(popup);
              break;
            }
          }
        }
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
