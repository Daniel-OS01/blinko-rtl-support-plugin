# GEMINI.md - Blinko RTL Support Plugin (v2.0.7+)

## Project Overview
The **Blinko RTL Support Plugin** is an advanced extension for the [Blinko](https://blinko.mintlify.app/) note-taking application. It provides professional-grade Right-to-Left (RTL) language support, primarily targeting Hebrew, Arabic, and Persian, while being extensible to all RTL scripts.

### Key Features:
- **🧠 Strategy-Based Detection**: Decoupled detection logic using `CharacterCodeStrategy` and `RegexStrategy`.
- **🎨 Dynamic CSS Presets**: A switchable styling system allowing users to choose between 'Strict', 'Auto-BiDi', 'Minimal', or 'Debug' strategies.
- **📚 Specialized Reading Presets**: Pre-configured CSS for Hebrew Long-Form reading, Mixed BiDi isolation, and Card Grid (Masonry) layouts.
- **📝 Editor Mastery (Vditor)**:
    - **Task List Protection**: Prevents task items from collapsing horizontally in RTL mode.
    - **SV Mode Bidi**: Intelligent per-line bidi detection in the raw Markdown editor.
    - **Split Preview Support**: Targets `.vditor-preview` for accurate live rendering.
- **🎛️ Manual & Granular Controls**: Floating global toggle (ע/א), hover context manager (⇄) for block-level flipping, and right-click menu integration.
- **📋 Smart Paste Interceptor**: Detects mixed content on paste and offers split-block or Unicode isolation (`U+2067`) wrapping.
- **📱 Mobile Optimized**: Responsive layouts and dedicated "Mobile View" for small screen compatibility.
- **🌙 persistence & Sync**: Settings are persisted via `StorageManager` and synchronized across the UI using `CustomEvent` signaling.

### Core Technologies:
- **Frontend**: Preact (React-compatible) with TypeScript.
- **Build System**: Vite with `vite-plugin-blinko`.
- **Styles**: Vanilla CSS with logical properties (where supported) and `!important` overrides for layout protection.
- **Testing**: Bun test runner with `@testing-library/preact` and `happy-dom`.
- **Verification**: Python-based visual regression tests using Playwright.

---

## Building and Running

### Prerequisites:
- [Bun](https://bun.sh/) (preferred package manager and test runner)
- Node.js (v18+)

### Key Commands:
- **Install Dependencies**:
  ```bash
  bun install
  ```
- **Development Mode**:
  ```bash
  bun run dev
  # Runs: blinko-cli dev server
  ```
- **Build (Development)**:
  ```bash
  bun run build
  ```
- **Build (Production)**:
  ```bash
  npm run build:prod
  # Generates files in release/ directory (index.js, style.css)
  ```
- **Run Tests**:
  ```bash
  bun test
  ```
- **Visual Verification** (Requires Playwright):
  ```bash
  python verification/verify_rtl_ui.py
  ```

---

## Architecture & Conventions

### Directory Structure:
- `src/index.tsx`: Main entry point, registers the plugin and initializes `RTLService`.
- `src/services/`: Core logic and state management.
  - `rtlService.ts`: Central service for state, observers, and CSS injection.
  - `storageManager.ts`: Handles settings persistence and cross-session migration.
  - `constants.ts`: Default settings, target selectors, and CSS templates for presets.
- `src/utils/`: Shared utilities.
  - `rtlDetector.ts`: Logic for detecting RTL text using strategies.
  - `pasteInterceptor.ts`: Logic for handling clipboard events and mixed content.
- `src/assets/styles/Blinko-RTL.css`: Base layout and protection styles.
- `src/locales/`: i18n support (English, Arabic, Hebrew, Chinese).
- `tests/`: Comprehensive test suite (unit, integration, e2e).
- `blinko-plugin-examples-and-template/`: Reorganized directory containing plugin templates and reference examples.

### Development Conventions:
1. **Surgical Updates**: Always use `RTLService` for state changes. Avoid direct DOM manipulation for direction flipping; prefer the `rtl-force` and `ltr-force` classes.
2. **Preset Registry**: When adding new CSS presets, update both `BUILT_IN_PRESETS` in `src/setting.tsx` and the corresponding templates in `src/services/constants.ts`.
3. **Selector Precision**: Target specific content areas (e.g., `.markdown-body`, `.vditor-reset`) to avoid breaking the application shell.
4. **i18n**: All UI strings must be localized via `window.Blinko.i18n.t()`.
5. **Mutation Observation**: Content scanning is debounced via the `processInterval` setting to maintain performance.

### Logic Flow:
1. `index.tsx` initializes `RTLService`.
2. `RTLService` loads settings from `StorageManager`.
3. `RTLService` injects base CSS and starts `MutationObserver`.
4. On change, `RTLProcessor` (via `RTLService`) scans nodes, evaluates them against `rtlDetector`, and applies classes.
5. `CustomEvent` ('rtl-settings-changed') ensures the Settings UI stays in sync with global state.
