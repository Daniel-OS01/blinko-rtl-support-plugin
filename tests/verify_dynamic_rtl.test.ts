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
        document.body.innerHTML = `
            <div id="wrapper">
                <p id="p1">שלום</p>
                <code id="code1">console.log('hello')</code>
            </div>
        `;

        // Update settings to target generic 'p' and 'code'
        // Using 'css' method by default now, so styles won't be inline unless we check classes
        service.updateSettings({ targetSelectors: ['p', 'code'], method: 'css' });

        // Force process
        service.processAllElements();

        const p1 = document.getElementById('p1') as HTMLElement;
        const code1 = document.getElementById('code1') as HTMLElement;

        // Should be processed
        expect(p1.classList.contains('rtl-force')).toBe(true);
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
        document.body.innerHTML = `
            <code id="hebrew-code">שלום עולם</code>
        `;
        service.updateSettings({ targetSelectors: ['code'] });
        service.processAllElements();

        const codeEl = document.getElementById('hebrew-code') as HTMLElement;

        expect(codeEl.classList.contains('rtl-force')).toBe(true);
    });

    it("should prioritize CSS classes and not set inline styles when method is 'css'", () => {
        document.body.innerHTML = `
            <p id="rtl-text">שלום</p>
        `;
        service.updateSettings({ targetSelectors: ['p'], method: 'css' });
        service.processAllElements();

        const p = document.getElementById('rtl-text') as HTMLElement;

        expect(p.classList.contains('rtl-force')).toBe(true);
        // Inline style should NOT be set
        expect(p.style.direction).toBe('');
    });

    it("should set inline styles when method is 'direct'", () => {
        document.body.innerHTML = `
            <p id="rtl-text-direct">שלום</p>
        `;
        service.updateSettings({ targetSelectors: ['p'], method: 'direct' });
        service.processAllElements();

        const p = document.getElementById('rtl-text-direct') as HTMLElement;

        expect(p.style.direction).toBe('rtl');
        // Class should NOT be set (technically applyCSSClassRTL isn't called in direct switch case)
        expect(p.classList.contains('rtl-force')).toBe(false);
    });

    it("should have comprehensive default target selectors", () => {
        const settings = service.getSettings();
        expect(settings.targetSelectors).toContain('pre');
        expect(settings.targetSelectors).toContain('code');
        expect(settings.targetSelectors).toContain('[role="button"]');
        expect(settings.targetSelectors).toContain('input[type="text"]');
    });
});
