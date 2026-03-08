/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Engagement Chip Enhancer                    
 *  Version:         1.0.0                                                    
 *  Data:            2026/01/25                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Restyles YouTube's Like, Dislike, Share buttons and more with a cleaner, 
 *  chip-style UI.
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
 *  - To be associated with respective .css file
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

(function () {
  'use strict';

  const likeTerms = [
  'Like', 'Mi piace', 'Me gusta', 'J’aime', 'Gefällt mir', 'Curtir',
  'Нравится', '赞', 'いいね', '좋아요', 'Vind ik leuk', 'Lubię to',
  'Beğen', 'أعجبني', 'Gilla', 'Synes godt om', 'Liker',
  'אהבתי', 'हंसी', 'ฉันชอบ', 'मैं पसंद करता हूँ', '喜欢', 'ชอบ', 'حب', '我喜欢', 
  'Suka', 'Mabuti', 'Maithili', 'Szeretem', 'Mám rád', 'J’adore', 'Jag gillar', 
  'Gosto', 'Me like', 'Bhalobashi', 'Îmi place', 'Se mi piace', 'Eg líkar', 'I like'
];

const dislikeTerms = [
  'Dislike', 'Non mi piace', 'No me gusta', 'Je n’aime pas', 'Gefällt mir nicht',
  'Não curtir', 'Не нравится', '不喜欢', '低評価', '싫어요', 'Vind ik niet leuk',
  'Nie lubię', 'Beğenme', 'لم يعجبني', 'Ogilla', 'Kan ikke lide', 'Liker ikke',
  'לא אהבתי', 'नापसंद', 'ฉันไม่ชอบ', 'मैं नापसंद करता हूँ', '不喜欢', 'ไม่ชอบ', 'كره', '我不喜欢',
  'Tidak suka', 'Masama', 'Naapasand', 'Nem szeretem', 'Nemám rád', 'Je n’aime pas', 'Jag ogillar',
  'Não gosto', 'Me no like', 'Bhalobashina', 'Nu-mi place', 'Non mi piace', 'Mér líkar ekki', 'I dislike'
];


  const likeRegex = new RegExp(likeTerms.map(t => escapeRegExp(t)).join('|'), 'i');
  const dislikeRegex = new RegExp(dislikeTerms.map(t => escapeRegExp(t)).join('|'), 'i');

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function syncButtonState(button) {
    if (!button || !button.closest('#top-level-buttons-computed')) return;

    const label = button.getAttribute('aria-label') || '';

    const isDislike = dislikeRegex.test(label);
    const isLike = !isDislike && likeRegex.test(label); 

    const pressed = button.getAttribute('aria-pressed') === 'true';

    if (!isLike && !isDislike) return;

    console.log(`[syncButtonState] Detected button: "${label}" → ${pressed ? 'pressed' : 'not pressed'}`);

    if (isLike) {
      button.classList.toggle('pressed-like', pressed);
      console.log(` → Applied class: ${pressed ? 'pressed-like yes' : 'pressed-like no'}`);
    } else if (isDislike) {
      button.classList.toggle('pressed-dislike', pressed);
      console.log(` → Applied class: ${pressed ? 'pressed-dislike yes' : 'pressed-dislike no'}`);
    }

    if (pressed) {
      const container = button.closest('#top-level-buttons-computed');
      if (isLike) {
        container?.querySelectorAll('button.pressed-dislike').forEach(btn => {
          if (btn !== button) {
            btn.classList.remove('pressed-dislike');
            console.log(' → Rimosso stato dislike da altro pulsante');
          }
        });
      } else if (isDislike) {
        container?.querySelectorAll('button.pressed-like').forEach(btn => {
          if (btn !== button) {
            btn.classList.remove('pressed-like');
            console.log(' → Rimosso stato like da altro pulsante');
          }
        });
      }
    }
  }

  function attachListener(button) {
    if (!button.closest('#top-level-buttons-computed') || button.dataset.listenerAttached) return;
    button.dataset.listenerAttached = 'true';
    button.addEventListener('click', () => {
      console.log(`[attachListener] Clicked button: ${button.getAttribute('aria-label')}`);
      setTimeout(() => syncButtonState(button), 150);
    });
    console.log(`[attachListener] Listener attached to: ${button.getAttribute('aria-label')}`);
  }

  function scanButtons(root = document) {
    const buttons = root.querySelectorAll('#top-level-buttons-computed button');
    buttons.forEach(button => {
      const label = button.getAttribute('aria-label') || '';
      const isDislike = dislikeRegex.test(label);
      const isLike = !isDislike && likeRegex.test(label);
      if (isLike || isDislike) {
        console.log(`[scanButtons] Found target button: "${label}"`);
        attachListener(button);
        syncButtonState(button);
      }
    });
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          scanButtons(node);
        });
      } else if (mutation.type === 'attributes' && mutation.attributeName === 'aria-pressed') {
        const target = mutation.target;
        const label = target.getAttribute?.('aria-label') || '';
        const isDislike = dislikeRegex.test(label);
        const isLike = !isDislike && likeRegex.test(label);
        if (isLike || isDislike) {
          console.log(`[observer] Attribute change detected on: "${label}"`);
          syncButtonState(target);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-pressed']
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[init] DOMContentLoaded → scanning buttons');
      scanButtons();
    });
  } else {
    console.log('[init] Document ready → scanning buttons');
    scanButtons();
  }

  setInterval(() => {
    console.log('[interval] Scanning buttons again...');
    scanButtons();
  }, 3000);
})();
