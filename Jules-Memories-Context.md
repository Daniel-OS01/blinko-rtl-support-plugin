Use context from past Jules sessions to improve responses:


The RTLService maintains a runtime actionLog of detection decisions (max 50 entries), exposed via getActionLog() and visualized in the "Real-time Action Log" section of the settings UI for transparency.


The Visual Debugger styles (.rtl-debug-rtl, .rtl-debug-ltr) utilize box-shadow for non-clipping visibility and ::after pseudo-elements for labels. Labels use opacity transitions to appear on hover, ensuring they do not obstruct content.


The 'Visual Debugger' feature (toggled via debugMode in RTLSettings) relies on CSS classes defined within the dynamicCSS setting. Toggling it immediately triggers processAllElements to update visuals without a page reload.


The Settings UI includes basic validation for the Dynamic CSS input field to catch syntax errors like unbalanced braces before saving.


Debug styles (.rtl-debug-rtl, .rtl-debug-ltr) are automatically injected by RTLService when debug mode is enabled, ensuring visibility even if the user clears the custom Dynamic CSS.


Code blocks (pre, code) are LTR by default but will flip to RTL if detected. Detection now uses a strict ratio of RTL chars to non-whitespace chars (ignoring indentation) to prevent mixed-content flipping.


The RTLService processElement method does not explicitly filter out layout elements or buttons; exclusion is managed entirely via disabledSelectors and targetSelectors configurations.


DEFAULT_DYNAMIC_CSS uses high-specificity selectors (e.g., input.rtl-force, textarea.rtl-force) and !important to override browser and framework defaults for input fields and buttons.


The project utilizes bun:test with happy-dom and @happy-dom/global-registrator. GlobalRegistrator.register() must be wrapped in a try-catch block in test files.


Presets in RTLSettings save and restore dynamicCSS, targetSelectors, and disabledSelectors configurations.


RTL application prioritization uses applyCSSClassRTL, applying CSS classes (.rtl-force, .ltr-force) defined in settings.dynamicCSS to the element's class list, overriding inline styles.


The project includes a dynamicCSS setting in RTLSettings which allows users to edit the CSS rules used for RTL/LTR enforcement and Visual Debugging.


The RTLSetting component safely handles cases where settings.disabledSelectors is undefined during render to prevent runtime crashes.


Tests in tests/components/settings.test.tsx require a complete mock of the RTLSettings object, including disabledSelectors and customCSS, to match the component's initial state.


DEFAULT_TARGET_SELECTORS includes a comprehensive list of text-bearing elements (including inputs, buttons, code blocks, and .markdown-body figcaption) to ensure broad RTL detection coverage.


The layout preservation CSS rules in src/services/constants.ts (advancedRTLCSS) exclude button and .btn selectors to allow RTL detection on interactive elements.


The RTLService injects user-defined CSS rules from settings.dynamicCSS into a <style id="blinko-rtl-dynamic-css"> element in the document head.


Visual verification of frontend changes is performed using a standalone Playwright script (verification/verify_rtl_ui.py) and a mock HTML file to simulate RTL and Dark Mode states.


Generic [role="button"] elements are no longer forced to text-align: center or direction: ltr in the CSS, allowing them to adapt to RTL content.


button elements and those with class .btn are no longer explicitly excluded from RTL processing; they are evaluated if they match active target selectors.


Target selectors in RTLSettings are managed via a targetSelectors list and a disabledSelectors list, allowing users to toggle selectors on/off via checkboxes in the UI.


Plugin settings are persisted using localStorage. The project uses a dynamicCSS field to allow user-editable CSS rules for RTL application and visualization.


The project follows a configuration-driven architecture where DOM selectors and RTL/LTR style definitions are centralized in src/config.ts (legacy) and src/services/constants.ts (current).


PasteInterceptor (src/utils/pasteInterceptor.ts) handles mixed-direction paste events by offering a UI with options to split blocks (newlines) or wrap content (Unicode isolation).


Default values for dynamic CSS and target selectors are defined in src/services/constants.ts.


The plugin version is injected globally as __PLUGIN_VERSION__ and is displayed in the UI footer (src/app.tsx) and appended to the toolbar icon tooltip (src/index.tsx).


The nested directory blinko-plugin-template-main is preserved in the repository to strictly adhere to the user's non-deletion policy, even if its contents appear redundant.


The RegexStrategy class constructor accepts minRTLChars as the fourth argument (checkHebrew, checkArabic, threshold, minRTLChars).


The release:publish script in package.json is configured to emit a warning to use GitHub Actions, disabling local execution of release publishing.


Blinko-RTL.css has been moved to src/assets/styles/ and is imported directly in src/index.tsx.


The release.zip artifact generated by the workflow includes plugin.json, README.md (and variants), and the build artifacts from the release/ directory.


A helper script scripts/update-plugin-version.js is used to programmatically update the version field in plugin.json during the release process.


The release.yml workflow supports two distinct triggers: manual dispatch (allowing version selection) which bumps versions, commits to main, tags, and pushes; and v* tag pushes which build artifacts (release.zip) and upload them to GitHub Releases.


Version synchronicity across package.json and plugin.json is managed by npm version and a custom helper script (scripts/update-plugin-version.js) during the release workflow.


The project uses Vite as the build tool. Both local development and CI/CD workflows (including Internal-Plugin-Validation.yml and release.yml) utilize Bun.


The package.json includes dev and release:publish scripts, but the GitHub Action workflow relies on bun run build:prod and softprops/action-gh-release instead of the CLI release command.


Unit tests in tests/components/app.test.tsx explicitly mock global.__PLUGIN_VERSION__ to ensure component tests pass in the test environment.


The release workflow explicitly avoids using blinko-cli release plugin and relies solely on softprops/action-gh-release for release artifact management per user directive.


The user mandates preserving existing files (e.g., templates, docs, nested directories like blinko-plugin-template-main) unless they actively interfere with operations, strictly avoiding unnecessary deletions during refactoring.


vite.config.ts is configured to output to release/ when mode is production (used in release workflows) and dist/ otherwise.


The project follows the Blinko plugin directory structure: src/ for source code, dist/ for development build outputs, and release/ for production build outputs.


The RegexStrategy uses a configurable minimum character count (minRTLChars) to detect RTL content, preventing false positives from isolated characters in mixed strings.


In Blinko-RTL.css, physical properties are mapped to logical properties for RTL overrides using the convention: margin-left (LTR physical) becomes margin-inline-end (RTL logical), and text-align: right becomes text-align: start.


Blinko-RTL.css utilizes CSS Logical Properties (e.g., padding-inline-start) extensively to support bidirectional layouts and uses Blinko's native CSS variables (e.g., var(--borderColor-default)) for Dark Mode compatibility.


Directional icons (e.g., .icon-chevron-right) are visually mirrored in RTL contexts using transform: scaleX(-1) within Blinko-RTL.css.


The RTLProcessor uses a debounced MutationObserver (utilizing src/utils/debounce.ts) to batch DOM updates, having removed interval-based polling for performance.


RTLProcessor delegates detection logic entirely to RTLDetector strategies, having removed simple internal regex overrides to better handle mixed-content scenarios.


A custom debounce utility is implemented in src/utils/debounce.ts and is verified by unit tests to handle delay, reset, and argument passing.


The global window.blinkoRTL object exposes enableRTL, disableRTL, toggleRTL, getStats, fixSelection, and getSettings methods.


Maintain full JSDoc coverage for all public functions, methods, and classes, including descriptions for parameters and return values.


CharacterCodeStrategy includes support for Arabic Supplement (0x0750-0x077F) and Arabic Extended-A (0x08A0-0x08FF) Unicode ranges.


The 'Mobile View' feature (persisted as mobileView) toggles the .blinko-rtl-mobile class on document.body to apply responsive CSS adaptations (targeting max-width: 768px).


The entry point src/index.tsx delegates initialization and logic to modular classes (RTLProcessor, RTLDetector, DOMRTLRenderer) rather than containing monolithic logic.


RTL detection is implemented using the Strategy pattern (CharacterCodeStrategy, RegexStrategy, CombinedStrategy) within src/utils/strategies.


The RTLDetector class (src/utils/rtlDetector.ts) supports a numeric threshold (0.0 to 1.0) for fine-grained sensitivity control.


src/app.tsx contains the RTLControlCenter (exported as RTLApp), which polls window.blinkoRTL for stats and allows sensitivity adjustment.


Core RTL logic is distributed across src/utils/ (e.g., rtlDetector.ts, rtlStyler.ts, rtlProcessor.ts, pasteInterceptor.ts) and is orchestrated by src/index.tsx.


DOM manipulation is abstracted via a 'Renderer' adapter pattern, implemented in src/renderer.ts as DOMRTLRenderer.


Mixed content handling (processing individual text nodes within an element) is implemented in RTLProcessor via processChildTextNodes.


The HoverContextManager (src/utils/hoverManager.ts) handles per-block direction toggling via event delegation and a floating UI button.


Manual direction overrides are stored in the data-manual-dir attribute ("rtl" or "ltr") on DOM elements and take precedence over auto-detection in the element processing logic.


Use request_user_input and message_user tools to confirm assumptions and communicate during the planning phase.


The configuration UI and settings logic are contained in src/setting.tsx.


The repository is a Blinko plugin for RTL support, implemented using Preact and TypeScript.