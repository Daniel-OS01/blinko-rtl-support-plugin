# Blinko RTL Language Support Plugin

Enhanced RTL (Right-to-Left) language support for Blinko with automatic detection, manual controls, mixed content handling, and mobile optimization.

<img width="335" height="220" alt="image" src="https://github.com/user-attachments/assets/3ea8530d-060c-48d1-844f-14c50f2612f7" /> <img width="335" height="220" alt="image" src="https://github.com/user-attachments/assets/6e7da3b0-37e8-44a4-9028-6055b583e15d" />


## ✨ Features

- **🔍 Smart Detection**: Advanced Hebrew/Arabic/Persian character detection with configurable sensitivity. Uses a flexible Strategy Pattern (Character Code & Regex).
- **🎛️ Manual Controls**:
  - Toggle RTL on/off globally with a floating button.
  - **Hover Context Manager**: Hover over any text block to see a quick "Switch Direction" button for localized fixes.
- **📝 Mixed Content Handling**:
  - **Paste Interceptor**: Detects mixed RTL/LTR content on paste and offers to split blocks or wrap text with Unicode isolation characters.
  - **Inline Processing**: Wraps LTR segments within RTL blocks for correct bidirectional display.
- **📱 Mobile Optimized**: Dedicated "Mobile View" setting for seamless usage on smaller screens.
- **🌙 Dark Mode**: Plugin-specific dark theme with color inversion.
- **⚡ Auto-Processing**: Continuous content scanning to handle dynamic content loading.
- **🎯 Precise Targeting**: Focused on Blinko content areas (Markdown, Vditor, etc.) without breaking the application shell.
- **💾 Settings Persistence**: Remembers all preferences across sessions.
- **🔧 Advanced Configuration**: Custom CSS injection and permanent styling options.

<img width="637" height="877" alt="image" src="https://github.com/user-attachments/assets/aa83fc9b-d0dc-4eeb-9dff-848677d89ce6" />

## 🌍 Supported Languages

- **Hebrew** (עברית) - `\u0590-\u05FF`
- **Arabic** (العربية) - `\u0600-\u06FF`
- **Persian/Farsi** (فارسی) - `\u0750-\u077F`
- **Syriac** - `\u0700-\u074F`
- **Thaana** - `\u0780-\u07BF`
- **Extended Arabic** - `\u08A0-\u08FF`

## 🚀 Quick Start

1. **Install Plugin**: Add to your Blinko instance.
2. **Toggle RTL**: Click the floating ع/א button (top-right) to enable the plugin.
3. **Configure**: Access settings via the plugin panel or right-click menu to adjust sensitivity or enable features like Mixed Content Handling.

## 🎛️ Controls

### Floating Toggle Button
- **Location**: Fixed top-right corner.
- **Function**: Quick RTL on/off toggle.
- **Visual**: Shows active state (Green = Enabled, Blue = Disabled).

### Hover Context Button
- **Trigger**: Hover over any paragraph or content block.
- **Function**: Click the "⇄" icon to manually flip the direction of that specific block.
- **Persistence**: Remembers manual overrides for the session.

### Paste Interceptor
- **Trigger**: Paste text containing both RTL and LTR characters.
- **Action**: A toast notification appears offering:
    - **Split Blocks**: Breaks mixed content into separate lines.
    - **Wrap**: Wraps RTL segments in Unicode Isolate characters.
    - **Original**: Pastes as is.

## ⚙️ Configuration Options

### Detection Settings
- **Sensitivity**: High (10%), Medium (15%), Low (25%) threshold of RTL characters.
- **Min Characters**: Minimum absolute number of RTL characters to trigger detection.
- **Mixed Content**: Enable experimental support for handling mixed text within blocks.

### Mode Options
- **Manual Mode**: Conservative detection.
- **Auto-Detect**: Continuous content processing (Recommended).
- **Manual Toggle**: Force RTL on all content.
- **Mobile View**: Optimizes UI elements for touch screens.
- **Dark Mode**: Inverts plugin UI colors.

### Advanced Features
- **Custom CSS**: Inject permanent styling rules (e.g., custom fonts for RTL).
- **Permanent CSS**: Keep custom styles active even when RTL logic is disabled.

## 🎯 Target Elements

Default selectors (Blinko-optimized):
```css
.markdown-body p, .markdown-body div, .markdown-body li,
.vditor-reset p, .vditor-reset div,
textarea, [contenteditable="true"]
```
*Note: You can check `src/config.ts` for the full list.*

## 🔧 API Reference

The plugin exposes a global `window.blinkoRTL` object for advanced control and debugging:

```javascript
// Check if plugin is enabled
window.blinkoRTL.isEnabled();

// Toggle plugin state
window.blinkoRTL.toggle();
window.blinkoRTL.enable();
window.blinkoRTL.disable();

// Test RTL detection on a string
window.blinkoRTL.test("שלום עולם"); // Returns true

// Process content
window.blinkoRTL.processAll(); // Re-scan all content
window.blinkoRTL.processElement(document.body); // Scan specific element

// Manual Mode
window.blinkoRTL.toggleManual(); // Toggle "Force RTL" mode

// Statistics & Debugging
window.blinkoRTL.getStats(); // Returns count of RTL-detected elements
window.blinkoRTL.getSettings(); // Returns current settings object

// Fix current selection (useful for bookmarklets)
window.blinkoRTL.fixSelection();
```

## 🛠️ Development

### Setup
```bash
git clone https://github.com/Daniel-OS01/blinko-rtl-language-support-plugin.git
cd blinko-rtl-language-support-plugin
npm install
```

### Build & Run
```bash
# Build for production
npm run build

# Start development server
npm run dev
```

### Architecture
- **Core Logic**: `src/utils/` (Detector, Processor, Strategies)
- **UI**: `src/app.tsx` (Stats), `src/setting.tsx` (Config Panel)
- **Entry**: `src/index.tsx` (Initialization, API exposure)

## 📄 License

MIT License - see LICENSE file for details.
