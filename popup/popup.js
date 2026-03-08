/******************************************************************************
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                                                                      
 *  Betty Tube                                                
 *  Personalize YouTube's UI with personalized CSS/JS styles                                 
 *                           
 *  Script:          popup.js                  
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
 *  - To be associated with popup.html, popup.css 
 *
 *  ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 ******************************************************************************/

const styles = [
  { id: "style1", name: "Centered Video Player*", image: "../assets/images/style1.png" },
  { id: "style2", name: "Resize Video Player", image: "../assets/images/style2.png" },
  { id: "style3", name: "Comments - Right*", image: "../assets/images/style3.png" },
  { id: "style4", name: "Comments - Left*", image: "../assets/images/style4.png" },
  { id: "style5", name: "Suggestions - Left*", image: "../assets/images/style5.png" },
  { id: "style6", name: "Disable Shorts Suggestions", image: "../assets/images/style6.png" },
  { id: "style7", name: "Thumbnail Hover Zoom", image: "../assets/images/style7.png" },
  { id: "style8", name: "Comment Fade-in Animation", image: "../assets/images/style8.png" },
  { id: "style9", name: "Smooth Dropdown Menu Animation", image: "../assets/images/style9.png" },
  { id: "style10", name: "Button Hover Pop & Glow", image: "../assets/images/style10.png" },
  { id: "style11", name: "Enable Youtube Dislikes", image: "../assets/images/style11.png" },
  { id: "style12", name: "Engagement Chip Enhancer", image: "../assets/images/style12.png" }
];

const listContainer = document.getElementById('style-list');

function loadStyles() {
  chrome.storage.sync.get(['enabledStyles', 'playerZoom', 'buttonGlowColor'], data => {
    const enabled = data.enabledStyles || [];
    const playerZoom = data.playerZoom || 111;

    listContainer.innerHTML = '';

    styles.forEach(style => {
      const div = document.createElement('div');
      div.className = 'style-item';

      const img = document.createElement('img');
      img.src = style.image;
      img.alt = style.name;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = style.id;
      checkbox.checked = enabled.includes(style.id);

      const label = document.createElement('label');
      label.htmlFor = style.id;
      label.textContent = style.name;

      div.appendChild(img);
      div.appendChild(label);
      

      // SLIDER SOLO PER style2
      let zoomSliderContainer, zoomSlider, zoomValue;
      if (style.id === 'style2') {
        zoomSliderContainer = document.createElement('div');
        zoomSliderContainer.className = 'slider-container';
        zoomSliderContainer.style.display = checkbox.checked ? 'flex' : 'none';

        zoomSlider = document.createElement('input');
        zoomSlider.type = 'range';
        zoomSlider.min = 50;
        zoomSlider.max = 120;
        zoomSlider.step = 1;
        zoomSlider.value = playerZoom;

        zoomValue = document.createElement('span');
        zoomValue.className = 'zoom-value';
        zoomValue.textContent = `${playerZoom}%`;

        zoomSliderContainer.appendChild(zoomSlider);
        zoomSliderContainer.appendChild(zoomValue);
        div.appendChild(zoomSliderContainer);

        // Aggiorna zoom
        zoomSlider.addEventListener('input', () => {
          const value = zoomSlider.value;
          zoomValue.textContent = `${value}%`;
          chrome.storage.sync.set({ playerZoom: value });
          if (checkbox.checked) {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'updateZoom', value });
            });
          }
        });
      }

      // Gestione checkbox
      checkbox.addEventListener('change', () => {
        let current = [...enabled];
        if (checkbox.checked) {
          if (!current.includes(style.id)) current.push(style.id);

          if (style.id === 'style2' && zoomSliderContainer) {
            zoomSliderContainer.style.display = 'flex';
            // applica zoom subito
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateZoom',
                value: zoomSlider.value
              });
            });
          }

        } else {
          current = current.filter(id => id !== style.id);

          if (style.id === 'style2' && zoomSliderContainer) {
            zoomSliderContainer.style.display = 'none';
            // reset zoom
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'updateZoom', value: 100 });
            });
          }
        }
        chrome.storage.sync.set({ enabledStyles: current });
      });

      // SOLO per Button Hover Pop & Glow
      if (style.id === 'style10') {
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.className = 'color-picker';
        colorInput.value = data.buttonGlowColor || '#ff2c2c';

        colorInput.addEventListener('input', () => {
          chrome.storage.sync.set({ buttonGlowColor: colorInput.value });
        });

        div.appendChild(colorInput);
      }

      listContainer.appendChild(div);
      div.appendChild(checkbox);
    });
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('img');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    icon.src = '../assets/icons/half-moon.svg';
  } else {
    icon.src = '../assets/icons/sun-light.svg';
  }

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
      icon.src = '../assets/icons/sun-light.svg';
    } else {
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      icon.src = '../assets/icons/half-moon.svg';
    }
  });
}

function displayVersion() {
  const versionSpan = document.getElementById('version');
  if (!versionSpan) return;
  versionSpan.textContent = chrome.runtime.getManifest().version;
}

document.addEventListener('DOMContentLoaded', () => {
  loadStyles();
  initThemeToggle();
  displayVersion();
});
