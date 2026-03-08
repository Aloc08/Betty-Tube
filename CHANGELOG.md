# Changelog

All notable changes to this project will be documented in this file.

---

## [0.0.0] - 2025-07-13

### Added
- Centered video player with comments and suggested videos displayed below side by side.
- Enlarged video player option.
- Comments moved to the right of the player.
- Comments moved to the left of the player.
- Suggested videos moved to the left of the player.
- Option to hide Shorts suggestions.
- Thumbnail hover zoom animation on the homepage.
- Fade-in animation for comments section on load.
- Button Hover Pop & Glow
- Enable Youtube Dislikes
- Engagement Chip Enhancer

### Initial pre-release.

---
---

## [0.1.0] - 2026-01-25

### Solved some known bugs

- Misalignment of #cinematics relative to #primary on certain viewports 
**RESOLVED**: fixed spontaneously

- Some elements do not reposition correctly on resize
**PARTIALLY RESOLVED / MITIGATED**: the page reloads instantly to fix the issue, but the problem may sometimes reoccur.

- On some YouTube pages, the script runs too early (DOM loading delay)
**PARTIALLY RESOLVED / MITIGATED**: the page reloads instantly to fix the issue, but the problem may sometimes reoccur.
Note: these two issues might be related

---

### Refactoring

- Has been done a general refactoring to the entire extension.


---

### Enlarged Videoplayer

- **Refactored the "Enlarged Video Player"** 
now you can **make the player zoom factor customizable**, so it can adapt to all styles and not only the centered video player.  
Set a maximum (120%) and a minimum (50%).

- **Centered the entire timeline relative to `#cinematics` when the player is enlarged**  
  **RESOLVED:** the timeline is now correctly centered relative to `#cinematics` and appears larger.  

- **Some controls (settings, cinema mode, subtitles...) disappear**  
  **RESOLVED**

---

### Button Hover Pop & Glow

- **Added the ability to choose custom colors**  

---

### Enable YouTube Dislikes

- **Added support for additional languages**
