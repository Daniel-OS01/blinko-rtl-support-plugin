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
- **📱 Mobile Optimized**: dedicated "Mobile View" toggle that optimizes layout, button positioning, and font sizes for smaller screens.
- **🌙 Dark Mode**: Plugin-specific dark theme with color inversion.
- **⚡ Auto-Processing**: Continuous content scanning using MutationObserver to handle dynamic content loading efficiently.
- **🎯 Precise Targeting**: Focused on Blinko content areas (Markdown, Vditor, etc.) without breaking the application shell.
- **💾 Settings Persistence**: Robust settings storage that handles SSO (GitHub/Google) and Password logins seamlessly.
- **🔧 Advanced Configuration**: Granular control over detection strategies, performance tuning, and custom CSS injection.

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
3. **Configure**: Access settings via the plugin panel. Use "Basic Settings" for quick toggles or "Advanced Settings" for fine-tuning.

## 🎛️ Controls

### Floating Toggle Button
- **Location**: Fixed top-right corner (adjustable in Mobile View).
- **Function**: Quick RTL on/off toggle.
- **Visual**: Shows active state (Green = Enabled, Blue = Disabled).

### Paste Interceptor
- **Trigger**: Paste text containing both RTL and LTR characters.
- **Action**: A toast notification appears offering:
    - **Split Blocks**: Breaks mixed content into separate lines.
    - **Wrap**: Wraps RTL segments in Unicode Isolate characters.
    - **Original**: Pastes as is.

## ⚙️ Configuration Options

### Basic Settings
- **Enable RTL Support**: Master switch.
- **Manual Mode**: Only applies RTL when explicitly detected or requested.
- **Mobile View**: Optimizes UI elements (FAB position, margins) for touch screens.
- **Dark Mode**: Inverts plugin UI colors.

### Advanced Settings
- **Detection & Performance**:
    - **Auto-Detect**: Background interval scanning.
    - **Mutation Observer**: Reacts to DOM changes instantly.
    - **Debounce Delay**: Tuning for performance vs responsiveness.
- **Strategies**: Toggle specific Regex engines (Hebrew/Arabic).
- **Interactions**: Enable/Disable Smart Paste Interception and Notifications.
- **Target Selectors**: Add/Remove specific CSS selectors to be processed.
- **Dynamic & Permanent CSS**: Inject custom styles with full control.

### Storage & SSO
The plugin uses `localStorage` keyed by the unique Blinko User ID. This ensures that:
- Settings are preserved per-user.
- If you log in via SSO (GitHub/Google) or Password, as long as Blinko provides the same User ID, your settings persist.
- Fallbacks are in place for anonymous or initial loading states.

## 🎯 Target Elements

Default selectors (Blinko-optimized):
```css
.markdown-body p, .markdown-body div, .markdown-body li,
.vditor-reset p, .vditor-reset div,
textarea, [contenteditable="true"]
```
*Note: You can edit this list in Advanced Settings.*

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

### Prerequisites
- [Bun](https://bun.sh) (v1.0+)

### Setup
```bash
bun install
```

### Build
```bash
bun run build
# Production build
bun run build:prod
```

### Testing & Quality Assurance
```bash
# Run all tests
bun test

# Lint code
bun run lint

# Type check
bun run typecheck
```

### Release
```bash
# Use GitHub Actions for release publishing
```

## 📋 Changelog

### v1.1.0 (Current)
**Advanced Configuration & Mobile Optimization**
- **⚙️ Advanced Settings UI**: New collapsible section with granular controls for all plugin features.
- **📱 Mobile View**: dedicated setting to optimize FAB positioning and layout margins for mobile devices.
- **🛡️ Robust Storage**: Enhanced handling of User IDs for consistent settings across SSO and Password logins.
- **🔧 Performance**: Configurable debounce delay and mutation observer toggles.
- **🧪 Quality**: Added Linting (ESLint), Type Checking (TSC), and expanded test coverage.

### v1.0.9
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

### v1.0.8
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

## 📄 License

MIT License - see LICENSE file for details
