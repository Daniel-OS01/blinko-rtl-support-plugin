# GEMINI.md - Blinko RTL Support Plugin

## Project Overview
The **Blinko RTL Support Plugin** is an advanced extension for the Blinko note-taking application. It provides comprehensive Right-to-Left (RTL) language support, primarily targeting Hebrew and Arabic, but extensible to other RTL scripts.

### Key Features:
- **Smart Detection**: Uses Character Code and Regex strategies to identify RTL text.
- **Dynamic Styling**: Injects CSS to handle text alignment and direction without breaking the main UI.
- **Manual Controls**: Floating toggle button (ع/א), hover context manager for localized fixes, and right-click menu integration.
- **Mixed Content Handling**: Intercepts pastes to handle mixed RTL/LTR blocks and wraps segments in Unicode isolation characters.
- **Persistence**: Automatically saves and loads user settings via a specialized `StorageManager`.
- **Mobile View**: Optimized layouts for smaller screens.

### Core Technologies:
- **Frontend**: Preact (React-compatible) with TypeScript.
- **Build System**: Vite with `vite-plugin-blinko`.
- **Styles**: Vanilla CSS for layout protection and dynamic RTL application.
- **Testing**: Bun test runner with `@testing-library/preact` and `happy-dom`.
- **Verification**: Python-based visual regression tests using Playwright.

---

## Building and Running

### Prerequisites:
- [Bun](https://bun.sh/) (preferred package manager and test runner)
- Node.js

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
  bun run build:prod
  # Generates files in release/ directory
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
- `src/index.tsx`: Main entry point, registers the plugin with Blinko.
- `src/services/`: Core business logic.
  - `rtlService.ts`: Manages state, observers, and CSS injection.
  - `storageManager.ts`: Handles settings persistence.
  - `constants.ts`: Default settings and CSS templates.
- `src/utils/`: Shared utilities.
  - `rtlDetector.ts`: Logic for detecting RTL text.
  - `pasteInterceptor.ts`: Logic for handling clipboard events.
- `src/assets/styles/Blinko-RTL.css`: Base styles for the plugin.
- `src/locales/`: i18n support (English, Arabic, Hebrew, Chinese).
- `tests/`: Comprehensive test suite (unit, integration, e2e).

### Development Conventions:
1. **Strategy Pattern**: Detection logic is decoupled into strategies (`CharacterCodeStrategy`, `RegexStrategy`).
2. **Persistence**: Never access `localStorage` directly; always use `StorageManager`.
3. **Styles**: Use `!important` sparingly but necessarily for RTL overrides to ensure they take precedence over Blinko's default styles.
4. **i18n**: All user-facing strings must be added to the JSON files in `src/locales/` and accessed via `window.Blinko.i18n.t()`.
5. **State Management**: The plugin uses Preact's `useState` for local UI state and `RTLService` for global application state.
6. **Persistence Safety**: The `RTLService` dispatches a `rtl-settings-changed` CustomEvent whenever settings are updated to sync across the UI.

### Targeting Elements:
The plugin targets specific content areas to avoid breaking the application shell. Key selectors include:
- `.markdown-body`
- `.vditor-reset`
- `textarea`, `[contenteditable="true"]`
- `pre`, `code` (with special ratio-based detection)
