# Blinko RTL Language Support Plugin

Enhanced RTL (Right-to-Left) language support for Blinko with automatic detection, manual controls, and dark mode.

<img width="335" height="220" alt="image" src="https://github.com/user-attachments/assets/3ea8530d-060c-48d1-844f-14c50f2612f7" /> <img width="335" height="220" alt="image" src="https://github.com/user-attachments/assets/6e7da3b0-37e8-44a4-9028-6055b583e15d" />


## ✨ Features

- **🔍 Smart Detection**: Advanced Hebrew/Arabic character detection with configurable sensitivity
- **🎛️ Manual Controls**: Toggle RTL on/off with floating button and settings panel
- **🌙 Dark Mode**: Plugin-specific dark theme with color inversion
- **⚡ Auto-Processing**: Continuous content scanning every 2 seconds
- **🎯 Precise Targeting**: Focused on Blinko content areas without breaking layout
- **💾 Settings Persistence**: Remembers all preferences across sessions
- **🔧 Advanced Configuration**: Custom CSS injection and permanent styling options

<img width="637" height="877" alt="image" src="https://github.com/user-attachments/assets/aa83fc9b-d0dc-4eeb-9dff-848677d89ce6" />

## 🌍 Supported Languages

- **Hebrew** (עברית) - `\u0590-\u05FF`
- **Arabic** (العربية) - `\u0600-\u06FF`
- **Persian/Farsi** (فارسی) - `\u0750-\u077F`
- **Extended Arabic** - `\u08A0-\u08FF`

## 🚀 Quick Start

1. **Install Plugin**: Add to your Blinko instance
2. **Toggle RTL**: Click the floating ع/א button (top-right)
3. **Configure**: Access settings via plugin panel or right-click menu

## 🎛️ Controls

### Floating Toggle Button
- **Location**: Fixed top-right corner
- **Function**: Quick RTL on/off toggle
- **Visual**: Shows active state with color change
- **Dark Mode**: Inverted colors when enabled

### Settings Panel
- **Access**: Plugin settings or toolbar icon
- **Features**: Complete configuration interface
- **Dark Mode**: Full UI color inversion
- **Test Tools**: Built-in RTL detection testing

## ⚙️ Configuration Options

### Detection Settings
- **Sensitivity**: High (10%), Medium (15%), Low (25%)
- **Min Characters**: 1-20 character threshold
- **Direction Override**: Auto/Force RTL/Force LTR

### Mode Options
- **Manual Mode**: Conservative detection (recommended)
- **Auto-Detect**: Continuous content processing
- **Manual Toggle**: Force RTL on all content
- **Dark Mode**: Plugin UI color inversion

### Advanced Features
- **Custom CSS**: Inject permanent styling rules
- **Target Selectors**: Specify elements to process
- **Permanent CSS**: Keep styles active when RTL disabled

## 🎯 Target Elements

Default selectors (Blinko-optimized):
```css
.markdown-body p
.markdown-body div
.vditor-reset p
.vditor-reset div
.card-masonry-grid .markdown-body p
.card-masonry-grid .markdown-body div
textarea
[contenteditable="true"]
```

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
window.blinkoRTL.settings(); // Get current settings
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

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('blinko-rtl-debug', 'true');

// Test detection
window.blinkoRTL.test("your text here");
```

## 📋 Changelog

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

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/Daniel-OS01/blinko-rtl-language-support-plugin/issues)
- **Documentation**: [Blinko Plugin Docs](https://blinko.mintlify.app/plugins/get-started)
- **Testing**: Use built-in test tools in settings panel

---

**Made with ❤️ for the Blinko community**
