# Blinko RTL Language Support Plugin (v2.0.7+)

The most advanced Right-to-Left (RTL) extension for the [Blinko](https://blinko.mintlify.app/) note-taking application. This plugin provides professional-grade support for Hebrew, Arabic, Persian, and other RTL scripts with dynamic detection, layout-aware styling, and precise editor integration.

[![Release Pipeline](https://github.com/Daniel-OS01/blinko-rtl-support-plugin/actions/workflows/release.yml/badge.svg)](https://github.com/Daniel-OS01/blinko-rtl-support-plugin/actions/workflows/release.yml)
[![Version](https://img.shields.io/github/v/release/Daniel-OS01/blinko-rtl-support-plugin?label=Version)](https://github.com/Daniel-OS01/blinko-rtl-support-plugin/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <img width="335" alt="Hebrew Support" src="https://github.com/user-attachments/assets/3ea8530d-060c-48d1-844f-14c50f2612f7" /> 
  <img width="335" alt="Arabic Support" src="https://github.com/user-attachments/assets/6e7da3b0-37e8-44a4-9028-6055b583e15d" />
</div>

## ✨ Core Features

### 🧠 Intelligent Engine
- **Strategy Pattern Detection**: Uses a combination of `CharacterCodeStrategy` and `RegexStrategy` for high-accuracy language detection.
- **Dynamic CSS Presets**: Choose between different styling strategies (Default, Minimal, Strict, Auto-BiDi, or Debug) to suit your workflow.
- **Auto-Processing**: High-performance mutation observer scans content in real-time without impacting application responsiveness.

### 🎛️ Manual & Granular Controls
- **Floating Global Toggle (ע/א)**: Instantly enable/disable RTL logic with a single click.
- **Hover Context Manager**: Hover over any block to reveal the `⇄` button for immediate direction flipping of that specific element.
- **Context Menu Integration**: Right-click any text block to access localized RTL actions.

### 📝 Editor & Mixed Content Mastery
- **Vditor Optimization**: 
  - **Task List Protection**: Prevents task items from collapsing into horizontal rows when RTL is applied.
  - **Raw Markdown (SV Mode)**: Intelligent per-line bidi detection that preserves editor performance and correctly aligns mixed lines.
  - **Live Preview & Split View**: Deep integration with all Vditor rendering modes.
- **Smart Paste Interceptor**: Intercepts clipboard events to detect mixed RTL/LTR content, offering to split blocks or wrap segments in Unicode isolation characters (`U+2067`).

### 📱 Responsive & Visual UX
- **Mobile View Mode**: Optimized layouts for smaller screens, ensuring sidebars and headers don't overflow in RTL mode.
- **Visual Debugger**: Real-time visualization of detected directions and element scopes for advanced troubleshooting.
- **Dark Mode**: Seamlessly integrates with Blinko's theme, featuring specialized color inversion for RTL indicators.

## 🎨 Built-in Style Presets

The plugin now includes specialized CSS presets for different reading and layout scenarios:

| Preset | Best For |
| :--- | :--- |
| **Default** | Balanced RTL support for general note-taking. |
| **Hebrew Long-Form** | Optimized typography, line-height (1.85), and font-weight for reading documents. |
| **Mixed BiDi** | Auto-isolates each paragraph's direction — ideal for technical notes with Hebrew/English. |
| **Card Grid RTL** | Specifically targets card masonry and grid layouts in the dashboard. |
| **Minimal RTL** | Pure direction/alignment fixes without any layout modifications. |

## 🚀 Getting Started

1. **Install**: Add the plugin to your Blinko instance.
2. **Enable**: Click the floating **ע/א** button (top-right) to activate the engine.
3. **Configure**: Open the settings panel to:
   - Adjust **Sensitivity** (10% to 40% threshold).
   - Set a **Minimum Character** count for detection.
   - Choose your preferred **CSS Preset**.
   - Enable **Mixed Content Handling** for advanced bidirectional text.

## 🛠️ Configuration & Customization

### Detection Sensitivity
- **High (10%)**: Triggers RTL styling even with a few Hebrew/Arabic words.
- **Medium (15%)**: Balanced for mixed notes.
- **Low (25%)**: Only triggers if the block is substantially RTL.

### Dynamic Styling System
The plugin allows you to customize the CSS classes injected into your notes. You can use the **Dynamic CSS Presets** in the settings panel to switch between:
- **Strict Mode**: High-specificity overrides for complex layouts.
- **Auto BiDi (Plaintext)**: Relies on the browser's native `unicode-bidi: plaintext` logic.
- **Debug Mode**: Highlights RTL blocks with purple outlines for inspection.

## 🎯 Technical Details

### Target Selectors
The plugin targets the following areas by default:
- `.markdown-body` (Note Content)
- `.vditor-reset` (Live Preview/Editor)
- `.vditor-preview` (Split View Preview)
- `textarea`, `[contenteditable="true"]` (Input Areas)
- `li`, `p`, `div`, `blockquote` (Text blocks)

### Supported Scripts
- **Hebrew**: `\u0590-\u05FF`
- **Arabic**: `\u0600-\u06FF`
- **Persian/Farsi**: `\u0750-\u077F`
- **Other RTL Scripts**: Syriac, Thaana, N'Ko, and Extended Arabic.

## 🔧 Developer Reference

The plugin exposes a global `window.blinkoRTL` object for programmatic control:

```javascript
// Test if a string is RTL
const isHebrew = window.blinkoRTL.test("שלום עולם"); 

// Trigger a manual scan of the whole page
window.blinkoRTL.processAll();

// Check current stats (how many RTL elements are active)
console.log(window.blinkoRTL.getStats());

// Toggle manual mode programmatically
window.blinkoRTL.toggleManual();
```

## 🏗️ Build & Development

```bash
# Clone the repo
git clone https://github.com/Daniel-OS01/blinko-rtl-support-plugin.git
cd blinko-rtl-support-plugin

# Install dependencies (requires Bun)
bun install

# Run dev server
bun run dev

# Build production bundle (files in release/)
bun run build:prod
```

## 🧪 Verification & QA
We use a comprehensive verification suite:
- **Bun Test**: Unit testing for detection logic and services.
- **Playwright (Python)**: Visual regression testing for desktop/mobile layouts (see `verification/` folder).

## 📋 Recent Changelog (v2.0.7)
- **Feature**: Added **Dynamic CSS Presets** system to the settings panel.
- **Fix**: Resolved Vditor task list collapse issue.
- **Enhancement**: Improved raw Markdown editor (SV Mode) with per-line bidi protection.
- **Architecture**: Refactored logic to use a centralized `RTLService` for state management.
- **UI**: Added specialized "Hebrew Long-Form Reading" and "Card Grid" CSS presets.

## 📄 License
MIT License - Developed with ❤️ by [Daniel](https://github.com/Daniel-OS01)
