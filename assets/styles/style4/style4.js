  /******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Comments on the left script                                       
 *  Version:         1.0.0                                                    
 *  Data:            2026/01/13                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Moves comments to the left, in place of suggested videos. 
 *  Suggested videos appear below the comments.
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
  function moveComments() {
    const comments = document.querySelector('ytd-comments#comments');
    const sidebar = document.querySelector('#secondary-inner');
    if (comments && sidebar && !document.querySelector('.my-comments-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'my-comments-wrapper';
      wrapper.appendChild(comments);
      sidebar.insertBefore(wrapper, sidebar.firstChild);
    }
  }

  const observer = new MutationObserver((mutations) => {
    requestAnimationFrame(moveComments);
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('yt-navigate-finish', () => setTimeout(moveComments, 500));
  // init
  setTimeout(moveComments, 1500);
})();

