# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`blinko-rtl-support-plugin` — a Blinko plugin that auto-detects and applies RTL styling for Hebrew, Arabic, Persian, and other right-to-left languages in Blinko notes. Built with Preact + Vite, bundled as a SystemJS module.

## Commands

All commands run from `blinko-rtl-support-plugin/`:

```bash
bun install            # Install dependencies
bun run build          # Dev build → dist/
bun run build:prod     # Production build → release/
bun run dev            # Dev server via blinko-cli
bun test               # Run all tests
```

Run a specific test file:
```bash
bun test tests/strategies.test.ts
```

Run the same subset CI uses for unit tests:
```bash
bun test tests/unit tests/utils tests/regex_config.test.ts tests/strategies.test.ts tests/strategies_extra.test.ts
```

## Architecture

The plugin is registered as a SystemJS module (`System.register`) and loaded by the Blinko host application at runtime.

### Key files

- **`src/index.tsx`** — Plugin entry point. Exports a `BasePlugin` class that wires up `RTLService`, the floating toggle button, toolbar icon, right-click menu, and i18n bundles.
- **`src/services/rtlService.ts`** — Core engine. Manages enable/disable lifecycle, CSS injection (three separate `<style>` elements: dynamic, user, permanent), `MutationObserver` for live DOM changes, debounced processing queue, `PasteInterceptor`, and `StorageManager`. The public `processElement` method is the heart of per-element direction logic.
- **`src/utils/rtlDetector.ts`** — Wraps detection strategies behind a single `detectRTL(text)` call. Defaults to `CombinedStrategy` (character-code + regex); can be switched at runtime.
- **`src/utils/strategies/`** — Strategy pattern: `CharacterCodeStrategy`, `RegexStrategy`, `CombinedStrategy`, all implementing `DetectionStrategy.detect(text): boolean`.
- **`src/services/storageManager.ts`** — Persists settings to `localStorage`. Key is per-user (`blinko-rtl-settings-<userId>`) with fallback to the legacy anonymous key for migration.
- **`src/services/constants.ts`** — `DEFAULT_SETTINGS`, `DEFAULT_TARGET_SELECTORS`, `DEFAULT_DYNAMIC_CSS`, and `advancedRTLCSS` string.
- **`src/app.tsx`** / **`src/setting.tsx`** — Preact components for the toolbar panel and settings panel respectively.
- **`src/assets/styles/Blinko-RTL.css`** — Static CSS bundled into the plugin output.
- **`plugin.json`** — Plugin metadata (name, version, i18n display names, readme paths). Version here must stay in sync with `package.json`.

### Direction application methods

`RTLService.processElement` supports four methods (controlled by `settings.method`):
- `direct` — inline `style.direction` / `style.textAlign`
- `attributes` — `dir="rtl"` attribute
- `css` — adds `rtl-force` / `ltr-force` CSS classes
- `all` (default) — applies both `css` and `attributes`

### CSS injection

Three `<style>` elements are managed separately:
1. **`#blinko-dynamic-css`** — `settings.dynamicCSS` (user-editable CSS, always injected when enabled)
2. **`#blinko-rtl-dynamic-css`** — same content plus optional debug visuals; replaced on each `updateSettings`
3. **`#blinko-rtl-permanent-styles`** — `settings.customCSS` when `permanentCSS` is true; survives plugin disable

### Build output

- Dev build: `dist/` (used for local testing with `blinko-cli dev server`)
- Production build: `release/` (committed; contains `index.js` + `style.css` — what Blinko loads)

Vite is configured via `vite.config.ts` using `@preact/preset-vite` and `vite-plugin-blinko`. The `__PLUGIN_VERSION__` define is injected from `plugin.json`.

### Version bumping

`scripts/update-plugin-version.js` — keeps `plugin.json` and `package.json` versions in sync. Releases are handled via the `release.yml` GitHub Actions workflow; `npm run release:publish` is intentionally blocked.
