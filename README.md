<img src=https://github.com/Aloc08/Betty-Tube/blob/201210b879dd28d61b57c782ada253bbbcdaf9ac/assets/icons/bt_logo.png width=100>

# Betty Tube

![Version](https://img.shields.io/badge/1.0.0-155875)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)](#)
[![Chrome Extension](https://img.shields.io/badge/Platform-Chrome-blue)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A lightweight browser extension to customize and improve the YouTube interface.  
No need for additional tools — everything is built-in and runs directly via the extension.


## 🎨 Available Enhancements

### 1. 📺 Centered Video Player  
- Moves the video player to the center of the page.  
- Comments and suggested videos are displayed **below** the player, **side by side**.

### 2. 🔍 Resize Video Player  
- Enlarges or reduces the video player to better utilize screen space.

### 3. 🗨️ Comments on the Right  
- Keeps the player at the top.  
- Moves **comments to the right**, in place of suggested videos.  
- Suggested videos appear **below the comments**.

### 4. 🗨️ Comments on the Left  
- Similar layout to the previous one, but with **comments on the left**.

### 5. ⬅️ Suggestions on the Left  
- Moves the **suggested videos** to the **left** of the player.  
- Useful for left-handed layouts or alternative viewing preferences.

### 6. 🚫 Hide Shorts Suggestions  
- Removes YouTube Shorts from the suggested video sidebar and homepage.

### 7. 🖼️ Thumbnail Hover Zoom  
- Adds a subtle **zoom animation** on video thumbnails when hovering on the homepage.

### 8. ✨ Comment Fade-in Animation  
- Adds a **fade-in effect** to the comments section when it loads.

### 9. 🪄 Smooth Dropdown Menu Animation
- Adds a smooth fade-and-slide-down animation to YouTube’s dropdown menus (e.g., the “...” menus) for a more polished and fluid user experience.

### 10. 🔴 Button Hover Pop & Glow
- Adds a soft zoom and subtle colored glow on hover to buttons across YouTube.

### 11. 👎 Enable Youtube Dislikes
- Displays the dislike count on YouTube videos using crowd-sourced data provided by the public API from Return YouTube Dislike (https://returnyoutubedislike.com).

### 12. 🔲 Engagement Chip Enhancer
- Restyles YouTube's Like, Dislike, Share buttons and more with a cleaner, chip-style UI.

---

## 🧩 Popup Interface

The extension includes a **popup settings page**, accessible from the browser toolbar (pin it for **quick access**!):

- Toggle styles **on or off** easily
- Combine multiple layout changes as you wish 
- Changes take effect **immediately** when you reload or open a YouTube tab

---

## 📦 How to Install

1. Clone or download this repository.
2. Unzip the project folder.
3. Open your browser and go to `chrome://extensions` (or the Extensions panel).
4. Enable **Developer mode**.
5. Click **"Load unpacked"** and select the project folder.
6. **Done**! The extension will be installed and active — open [YouTube](https://www.youtube.com) and **enjoy your new layout** 🎉

---

## ⚙️ Notes

- You can enable multiple styles at the same time via the designed popup UI.
- Optimized for **desktop YouTube**
- This extension uses **MutationObserver** and **event listeners** to inject dynamic fixes as soon as YouTube elements become available — even after internal navigation between videos (SPA behavior).

---

## ⚠️ Warnings

This is a **pure client-side visual customization**  
Since YouTube's layout changes frequently, some features may break over time and may lead to bugs or layout issues — use at your own risk
**This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected to YouTube or Google LLC**  

---

## ❤️ User and Privacy Friendly
- This extension does **not collect, store, or transmit any personal data**
- It does **not communicate with YouTube or third-party servers**
- All changes are applied **locally in the browser** for visual customization only
- It requires only the minimal permissions needed (`scripting`, `storage`)


---

## 💡 Contributing

Found a bug? Have a suggestion? Want to contribute?  
Feel free to [open an issue](https://github.com/Aloc08/Better-YT-Videoplayer/issues).

---

## ☕ Donations

If you enjoy this project and want to support its development, consider buying me a coffee!  
Your contribution helps keep the project alive and motivates further updates and features.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/R5R01HZ2ZF)

---

## Credits

Developed and maintained by [Aloc08](https://github.com/Aloc08).

---

## License

This project is licensed under the [GPL-3.0 License](LICENSE).


