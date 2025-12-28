import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLService } from "../src/services/rtlService";
import { RTLDetector } from "../src/utils/rtlDetector";
import { DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS } from "../src/services/constants";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe("RTLService Dynamic CSS and Selectors", () => {
    let service: RTLService;
    let detector: RTLDetector;

    beforeEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        localStorage.clear();

        // Mock Blinko API for toast
        window.Blinko = {
            toast: { success: jest.fn(), error: jest.fn() }
        } as any;

        detector = new RTLDetector();
        service = new RTLService(detector);
        service.enable();
    });

    afterEach(() => {
        service.disable();
    });

    it("should inject default dynamic CSS on enable", () => {
        const style = document.getElementById('blinko-rtl-dynamic-css');
        expect(style).toBeTruthy();
        expect(style?.textContent).toBe(DEFAULT_DYNAMIC_CSS);
    });

    it("should update dynamic CSS when settings change", () => {
        const newCSS = ".rtl-force { color: red; }";
        service.updateSettings({ dynamicCSS: newCSS });

        const style = document.getElementById('blinko-rtl-dynamic-css');
        expect(style?.textContent).toBe(newCSS);
    });

    it("should handle disabled selectors", () => {
        // Setup a DOM with elements
        document.body.innerHTML = `
            <div id="wrapper">
                <p id="p1">שלום</p>
                <div id="d1" class="markdown-body">
                    <p id="p2">שלום</p>
                </div>
                <code id="code1">console.log('hello')</code>
            </div>
        `;

        // Default: Code blocks are targeted (part of DEFAULT_TARGET_SELECTORS)

        // Update settings to target generic 'p' and 'code'
        service.updateSettings({ targetSelectors: ['p', 'code'] });

        // Force process immediately (updateSettings uses debounce)
        service.processAllElements();

        const p1 = document.getElementById('p1') as HTMLElement;
        const code1 = document.getElementById('code1') as HTMLElement;

        // Should be processed
        expect(p1.classList.contains('rtl-force')).toBe(true);
        // Code is LTR text, so it should get ltr-force (since we are checking it now)
        expect(code1.classList.contains('ltr-force')).toBe(true);

        // Now disable selector 'code'
        service.updateSettings({ disabledSelectors: ['code'] });

        // Clear classes to test again
        p1.classList.remove('rtl-force');
        code1.classList.remove('ltr-force');

        // Force process
        service.processAllElements();

        expect(p1.classList.contains('rtl-force')).toBe(true);
        expect(code1.classList.contains('ltr-force')).toBe(false); // Should be skipped
    });

    it("should process code blocks for RTL if they contain RTL text", () => {
        // This is a specific requirement: "code blocks... should be checked for RTL language"
        document.body.innerHTML = `
            <code id="hebrew-code">שלום עולם</code>
        `;
        service.updateSettings({ targetSelectors: ['code'] });
        service.processAllElements();

        const codeEl = document.getElementById('hebrew-code') as HTMLElement;

        expect(codeEl.classList.contains('rtl-force')).toBe(true);
    });

    it("should have comprehensive default target selectors", () => {
        const settings = service.getSettings();
        expect(settings.targetSelectors).toContain('pre');
        expect(settings.targetSelectors).toContain('code');
        expect(settings.targetSelectors).toContain('[role="button"]');
        expect(settings.targetSelectors).toContain('input[type="text"]');
    });
});
