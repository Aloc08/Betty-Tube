/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Centered videoplayer script                                        
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
 *  - Language:       JavaScript
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
 *  - To be associated with respective .css file
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

// aggiungere gli id degli script

(function() {
  'use strict';

  // Prima esecuzione garantita con un piccolo delay
  function reloadPage(){
    setTimeout(window.location.href = window.location.href, 100);
  }

  // Funzione principale per creare o aggiornare il wrapper
  function createOrUpdateWrapper() {
    const columns = document.getElementById('columns');
    const sidebar = document.querySelector('ytd-watch-next-secondary-results-renderer');
    const comments = document.getElementById('comments');
    const primary = document.getElementById('primary');

    if (!columns || !sidebar || !comments || !primary) return;

    // Crea il wrapper se non esiste
    let wrapper = document.getElementById('underPlayer');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'underPlayer';
      columns.insertBefore(wrapper, primary.nextSibling);
    }

    // Sposta sempre sidebar e comments dentro il wrapper
    if (sidebar.parentNode !== wrapper) wrapper.appendChild(sidebar);
    if (comments.parentNode !== wrapper) wrapper.appendChild(comments);

    // Applica gli stili CSS forzati
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";
    wrapper.style.gap = "24px";
    wrapper.style.marginTop = "40px";
    wrapper.style.marginLeft = "auto";
    wrapper.style.marginRight = "auto";
    wrapper.style.width = "87%";
    wrapper.style.maxWidth = "7680px";
    wrapper.style.zIndex = "10";

    sidebar.style.flex = "0 0 45%";
    sidebar.style.maxWidth = "45%";

    comments.style.flex = "1 1 auto";
    comments.style.maxWidth = "55%";
    comments.style.overflowY = "auto";
    comments.style.paddingLeft = "24px";

  }

  

  // Funzione per aggiornare la larghezza del wrapper in base all'aspect ratio
  function updateWrapperWidth() {
    const wrapper = document.getElementById('underPlayer');
    if (!wrapper) return;

    const aspectRatio = window.innerWidth / window.innerHeight;

    // Parametri sigmoide
    const minPct = 0.75;
    const maxPct = 0.9;
    const centerAR = 1.5;
    const k = 10;

    const sigmoid = x => 1 / (1 + Math.exp(-k*(x - centerAR)));
    let pct = minPct + sigmoid(aspectRatio) * (maxPct - minPct);

    const widthCalc = Math.min(window.innerWidth * pct, 6144);
    wrapper.style.width = widthCalc + "px";
  }

  // Funzione unica che crea/aggiorna wrapper e larghezza
  function refreshLayout() {
    createOrUpdateWrapper();
    updateWrapperWidth();
  }

  // ricarica la pagina
  if (!sessionStorage.getItem('pageReloaded')) {
    sessionStorage.setItem('pageReloaded', 'true');
    window.location.href = window.location.href; // ricarica
  }


  // Observer per intercettare cambiamenti dinamici di YouTube
  let timeoutObserver;
  const observer = new MutationObserver(() => {
    if (timeoutObserver) clearTimeout(timeoutObserver);
    timeoutObserver = setTimeout(refreshLayout, 100);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Prima esecuzione garantita con un piccolo delay
  setTimeout(refreshLayout(), 3000);

  // Aggiornamento al resize e al load
  window.addEventListener('resize', refreshLayout);
  window.addEventListener('load', refreshLayout);

})();
