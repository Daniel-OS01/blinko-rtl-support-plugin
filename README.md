# Blinko RTL Language Support Plugin

Enhanced RTL (Right-to-Left) language support for Blinko with automatic detection, manual controls, mixed content handling, and mobile optimization.
[![Release Pipeline](https://github.com/Daniel-OS01/blinko-rtl-support-plugin/actions/workflows/release.yml/badge.svg)](https://github.com/Daniel-OS01/blinko-rtl-support-plugin/actions/workflows/release.yml)

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
*Note: You can check `src/services/rtlService.ts` for the full list.*

## 🧪 Testing Examples

### Hebrew Text
```
שלום עולם - זהו טקסט בעברית
עברית Hebrew טקסט
```

### Arabic Text
```
مرحبا بالعالم - هذا نص باللغة العربية
العربية Arabic نص
```

### Mixed Content
```
Mixed שלום world טקסט
Hello مرحبا world
```

## 🔧 API Reference

Global `window.blinkoRTL` object:

```javascript
// Test RTL detection
window.blinkoRTL.test("שלום עולם"); // Returns true/false

// Toggle functions
window.blinkoRTL.toggle(); // Toggle RTL on/off
window.blinkoRTL.toggleManual(); // Toggle manual mode

// Processing
window.blinkoRTL.processAll(); // Process all content
window.blinkoRTL.processElement(element); // Process single element

// State
window.blinkoRTL.isEnabled(); // Check if RTL is active
window.blinkoRTL.getSettings(); // Get current settings

// Stats
window.blinkoRTL.getStats(); // Get count of active RTL blocks
```

## 🛠️ Development

### Build from Source
```bash
git clone https://github.com/Daniel-OS01/blinko-rtl-language-support-plugin.git
cd blinko-rtl-language-support-plugin
npm install
npm run build
```

### Development Mode
```bash
npm run dev
```

### Release
```bash
npm run release:publish
```

### Advanced Testing
The project now includes specialized testing tools for performance and accessibility:

```bash
# Run Performance Benchmark (Checks processing speed on 1000+ nodes)
npm run test:perf  # or bun run test:perf

# Run Accessibility Compliance Checks (A11y/ARIA)
npm run test:a11y  # or bun run test:a11y
```

## 🤖 CI/CD Pipeline

The project uses a robust **Advanced CI Pipeline** (`.github/workflows/advanced-ci.yml`) that enforces:
1.  **Integrity**: Unit & Integration tests + Build verification.
2.  **Performance Gate**: Fails if RTL processing exceeds **100ms** (Performance Budget).
3.  **A11y Gate**: Checks for WCAG/ARIA compliance in RTL layouts.
4.  **Cross-Environment**: Validates against multiple Bun versions.
5.  **Security**: Automatic high-severity vulnerability scanning.
6.  **Code Quality**: ESLint, Type Checking, and Bundle Size Monitoring (200KB limit).

## 🎨 CSS Integration

The plugin includes comprehensive CSS from `Blinko-RTL.css`:

- **Layout Preservation**: Maintains Blinko's flex/grid structure
- **Content Detection**: Uses `unicode-bidi: plaintext` for automatic detection
- **RTL Styling**: Proper text alignment and list positioning
- **Component Protection**: Preserves buttons, navigation, and toolbars

## 🐛 Troubleshooting

### Common Issues

1. **RTL Not Working**: 
   - Check if plugin is enabled
   - Verify sensitivity settings
   - Test with detection tool

2. **Layout Breaking**:
   - Plugin preserves layout containers
   - Only affects text content areas
   - Check target selectors

3. **Auto-Detection Issues**:
   - Disable auto-detect if causing problems
   - Use manual mode for better control
   - Adjust minimum character threshold

## 📋 Changelog

### v1.0.9 (Current)
**Consolidated Update**
- **Merged PRs**:
    - Repository structure and release workflow refactor.
    - Debug & Optimize RTL Engine (Performance improvements).
    - Unit test coverage improvements.
    - Architectural refactor to `RTLService`.
    - Documentation updates.
- **New Features**:
    - **Hover Context Manager**: Interactive direction flipping.
    - **Paste Interceptor**: Smart handling of mixed-content pastes.
    - **Performance**: Debounced processing and optimized mutation observers.

### v1.0.8 (Latest)
**Mobile Optimization & Codebase Stability**
- **📱 New Feature: Mobile View**
    - Introduced a dedicated toggle for mobile-optimized layouts.
    - Implemented responsive CSS adaptation for seamless usage on smaller screens.
    - Optimized the Settings Panel layout for touch interactions.
- **🏗️ Architecture & Refactoring**
    - Major refactoring of the core initialization logic (`src/index.tsx`) for better modularity.
    - Standardized `RTLProcessor` usage across the application.
- **🛡️ Quality Assurance**
    - Comprehensive codebase audit completed.
    - Implemented robust unit testing suite for core detection logic and UI components.
    - Resolved conflicts with global test environment variables.
- **🔒 Security**
    - Verified safety of settings persistence and CSS injection mechanisms.

### v1.0.7
**Advanced Detection Strategies**
- **🧠 New Feature: Strategy Pattern**
    - Implemented a flexible Strategy Pattern for RTL detection.
    - Added specialized strategies: `CharacterCodeStrategy`, `RegexStrategy`, and `CombinedStrategy`.
- **🌍 Expanded Language Support**
    - Improved detection for Syriac and Thaana scripts.
    - Refined character code ranges for higher accuracy.

### v1.0.6
**Performance & Stability**
- **⚡ Improvements**
    - Optimized auto-detection intervals for better performance.
    - Enhanced error handling for custom selector injections.
- **🐛 Bug Fixes**
    - Fixed minor layout regressions in mixed-content blocks.

### v1.0.5
**Dark Mode & UX Enhancements**
- **🌙 Enhancements**
    - Enhanced dark mode with complete color inversion.
    - Plugin-specific dark theme (isolated from main application).
- **⚙️ Improvements**
    - Fixed auto-detection to continuously process all content.
    - Improved manual RTL toggle synchronization.
    - Better settings panel integration.

### v1.0.4
- ✅ Fixed auto-detection to process all content continuously
- ✅ Added manual RTL toggle with settings sync
- ✅ Enhanced dark mode with full color inversion
- ✅ Improved settings panel with better controls
- ✅ Added comprehensive CSS from Blinko-RTL.css
- ✅ Fixed layout preservation for Blinko components

### v1.0.0
- 🎉 Initial release
- 🔍 Basic RTL detection
- ⚙️ Settings panel
- 🎯 Target selector configuration

## 📄 License

MIT License - see LICENSE file for details
