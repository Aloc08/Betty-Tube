/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Thumbnail Hover Zoom script                                  
 *  Version:         1.0.0                                                    
 *  Data:            2026/01/13                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Adds a subtle zoom animation on video thumbnails when hovering on 
 *  the homepage and search pages.
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
 *  - Tested on: Chromium and forks
 *  - To be associated with respective .css file
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

(function(){
  const ZOOM_SCALE = 1.10;
  let currentThumb = null;
  let resetTimeout;

  function applyZoom(thumb) {
    if (!thumb) return;
    thumb.style.transform = `scale(${ZOOM_SCALE})`;
    thumb.style.transition = 'transform 0.5s ease';
    thumb.style.willChange = 'transform';
    thumb.style.zIndex = '10';
  }

  function removeZoom(thumb) {
    if (!thumb) return;
    thumb.style.transform = '';
    thumb.style.transition = '';
    thumb.style.willChange = '';
    thumb.style.zIndex = '';
  }

  document.body.addEventListener('mouseover', e => {
    const thumb = e.target.closest('ytd-thumbnail');
    if (thumb) {
      if (currentThumb && currentThumb !== thumb) {
        removeZoom(currentThumb);
      }
      currentThumb = thumb;
      applyZoom(currentThumb);
    }
  });

  document.body.addEventListener('mouseout', e => {
    const thumb = e.target.closest('ytd-thumbnail');
    if (thumb) {
      removeZoom(thumb);
      if (currentThumb === thumb) currentThumb = null;
    }
  });

  const observer = new MutationObserver(() => {
    if (!currentThumb) return;
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      const newThumb = document.querySelector('ytd-thumbnail.hover-zoom, ytd-thumbnail:hover');
      if (newThumb) {
        currentThumb = newThumb;
        applyZoom(currentThumb);
      }
    }, 100); 
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();