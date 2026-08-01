# Blinko RTL Language Support Plugin (v3.1.0+)

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
The share of an element's *directional* characters that must be RTL. Whitespace,
punctuation and digits are excluded from the calculation, so spacing and
punctuation do not change the score.

- **High (10%)**: Triggers RTL styling even with a few Hebrew/Arabic words.
- **Medium (15%)**: Balanced for mixed notes.
- **Low (40%)**: Only triggers if the block is substantially RTL.

### Detection Thresholds
Two separate settings, which shared a single value before v3.1.0:

- **Minimum RTL Characters** — how many strong RTL characters an element needs
  before it can be classified RTL. Pure RTL text is not exempt: at a setting of
  3, `כן` (2 letters) is not enough. The default of 1 detects everything.
- **Minimum Text Length** — how much text an element needs before it is examined
  at all. Shorter elements are left untouched.

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
Every Unicode block of bidi type **R** or **AL**, defined once in
[`src/utils/strategies/rtlRanges.ts`](src/utils/strategies/rtlRanges.ts) and
shared by both detection strategies:

| Script | Range |
|---|---|
| Hebrew | `U+0590–05FF` |
| Arabic (incl. Persian, Urdu) | `U+0600–06FF` |
| Syriac | `U+0700–074F` |
| Arabic Supplement | `U+0750–077F` |
| Thaana | `U+0780–07BF` |
| N'Ko | `U+07C0–07FF` |
| Samaritan | `U+0800–083F` |
| Mandaic | `U+0840–085F` |
| Syriac Supplement | `U+0860–086F` |
| Arabic Extended-A / -B | `U+0870–08FF` |
| Hebrew & Arabic Presentation Forms | `U+FB1D–FEFF` |
| Astral RTL (Adlam, Mende Kikakui, Arabic Math, …) | `U+10800–1EEFF` |

Arabic-Indic digits (`U+0660–0669`, `U+06F0–06F9`) are deliberately **excluded**.
Their bidi type is AN (Arabic Number), which does not establish direction — `١٢٣`
is no more inherently RTL than `123`.

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

## 📋 Recent Changelog (v3.1.0)

**Detection engine — one consistent set of semantics.** The two detection
strategies previously disagreed with each other about the same text.

- **Fix**: `Minimum RTL Characters` and `Minimum Text Length` are now separate
  settings. One value used to govern both, so raising the RTL-evidence
  threshold also, silently, stopped short elements being processed. Existing
  installs are migrated at settings version 3 and keep their current behaviour.
- **Breaking**: `Minimum RTL Characters` is now a hard floor. Wholly-RTL text
  used to be exempt — but only when it contained no spaces, because the check
  compared against the trimmed length. `כן` was exempt, `שלום עולם` was not.
- **Fix**: Both strategies now share one range set, one denominator and one
  sampling budget. Syriac and Thaana were previously detected by one strategy
  and not the other.
- **Feature**: Added N'Ko, Samaritan, Mandaic, Syriac Supplement, Arabic
  Extended-B and the astral RTL blocks including Adlam. Detection iterates by
  code point, which is what made astral scripts reachable.
- **Fix**: Detection samples head, middle and tail rather than stopping after
  the first 100 characters, so a note that turns RTL further down is seen.
  A 200,000-character element still classifies in ~7µs.
- **Fix**: Arabic-Indic digits no longer count as RTL.
- **Fix**: `sensitivity` no longer scores the same content differently for being
  spaced out; `Low` is now genuinely conservative.

**Direction application.**

- **Fix**: The `unicode` method ignored the direction it computed — it marked
  LTR and neutral text identically to RTL and never cleaned up. It now uses
  `dir="auto"` with `unicode-bidi: plaintext`, delegating to the browser.
  Debug mode also works under this method for the first time.
- **Fix**: The `all` method now applies all three appliers, not two.
- **Fix**: Text falling below the length gate clears whatever the active method
  applied. It previously left inline `direction: rtl` or `dir="rtl"` behind.
- **Fix**: A container is no longer given a direction blended from its
  children's text, which could contradict the direction each child was
  separately assigned.

**Performance & hygiene.**

- **Perf**: The periodic full-document sweep backs off to 60s while the page is
  quiet and resets on any mutation. Set `processInterval: 0` to disable it.
- **Fix**: The action log stores a bounded 120-character preview rather than the
  element's entire text.
- **Fix**: Base CSS is removed on teardown.
- **Security**: The AI endpoint guard is scoped to same-origin requests and
  fails closed when the page origin cannot be determined. Note content is no
  longer interpreted as regex replacement tokens when building AI prompts.

## 📋 Changelog (v2.0.7)
- **Feature**: Added **Dynamic CSS Presets** system to the settings panel.
- **Fix**: Resolved Vditor task list collapse issue.
- **Enhancement**: Improved raw Markdown editor (SV Mode) with per-line bidi protection.
- **Architecture**: Refactored logic to use a centralized `RTLService` for state management.
- **UI**: Added specialized "Hebrew Long-Form Reading" and "Card Grid" CSS presets.

## 📄 License
MIT License - Developed with ❤️ by [Daniel](https://github.com/Daniel-OS01)
