/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Enable YouTube Dislikes                    
 *  Version:         1.0.0                                                    
 *  Data:            2026/01/13                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Displays the dislike count on YouTube videos using crowd-sourced data 
 *  provided by the public API from Return YouTube Dislike 
  * (https://returnyoutubedislike.com).
 *
 * ----------------------------------------------------------------------------
 *  SOFTWARE:
 *  - Language:       JS
 *  - APIs / Libs:    Return Youtube Dislikes
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

(function () {
  const styleId = "dislike-style-link";

  function injectStyleFromFile(fileName = "dislike-style.css") {
    if (document.getElementById(styleId)) return;

    const link = document.createElement("link");
    link.id = styleId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.runtime ? chrome.runtime.getURL(fileName) : fileName;

    document.head.appendChild(link);
  }

  async function fetchDislikeData(videoId) {
    try {
      const res = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`);
      return res.ok ? res.json() : null;
    } catch (err) {
      console.error("Dislike API error:", err);
      return null;
    }
  }

  function getVideoId() {
    const url = new URL(location.href);
    return url.searchParams.get("v");
  }

  const dislikeRegex = new RegExp(
    [
      'Dislike', 'Non mi piace', 'No me gusta', 'Je n’aime pas', 'Gefällt mir nicht',
      'Não curtir', 'Не нравится', '不喜欢', '低評価', '싫어요', 'Vind ik niet leuk',
      'Nie lubię', 'Beğenme', 'لم يعجبني', 'Ogilla', 'Kan ikke lide', 'Liker ikke'
    ].map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
    'i'
  );

  function findDislikeButton() {
    const buttons = document.querySelectorAll('#top-level-buttons-computed button');
    for (const btn of buttons) {
      const label = btn.getAttribute('aria-label') || '';
      if (dislikeRegex.test(label)) {
        return btn;
      }
    }
    return null;
  }

  function waitForDislikeButton() {
    return new Promise((resolve) => {
      const check = () => {
        const btn = findDislikeButton();
        if (btn) {
          resolve(btn);
        } else {
          setTimeout(check, 500);
        }
      };
      check();
    });
  }

  function injectDislikeCount(button, count) {
    if (button.querySelector(".dislike-count")) return;

    const countSpan = document.createElement("span");
    countSpan.className = "dislike-count";
    countSpan.textContent = count.toLocaleString();

    const iconContainer = button.querySelector(".yt-spec-button-shape-next__icon");
    if (iconContainer && iconContainer.parentElement) {
      iconContainer.parentElement.appendChild(countSpan);
    } else {
      button.appendChild(countSpan);
    }
  }

  async function run() {
    injectStyleFromFile();

    const videoId = getVideoId();
    if (!videoId) return;

    const data = await fetchDislikeData(videoId);
    if (!data || !data.dislikes) return;

    const button = await waitForDislikeButton();
    injectDislikeCount(button, data.dislikes);
  }

  let lastUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      run();
    }
  }).observe(document, { subtree: true, childList: true });

  run();
})();
