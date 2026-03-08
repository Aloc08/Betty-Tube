/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          Button Hover Pop & Glow                      
 *  Version:         2.0.0                                                    
 *  Data:            2026/01/25                                                
 *  Author:          Alessio Occulto (Aloc08)                                           
 *  
 * ----------------------------------------------------------------------------
 *  DESCRIPTION:
 *  Adds a soft zoom and subtle colored glow on hover to buttons across YouTube.
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
 *  - Works on: Chromium and forks
 *  - To be associated with respective .css file
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

chrome.storage.sync.get('buttonGlowColor', data => {
  if (!data.buttonGlowColor) return;

  const hex = data.buttonGlowColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  document.documentElement.style.setProperty(
    '--hover-glow-color',
    `${r}, ${g}, ${b}`
  );
});
