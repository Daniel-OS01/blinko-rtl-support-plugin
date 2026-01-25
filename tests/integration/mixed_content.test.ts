import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { DEFAULT_SETTINGS } from "../../src/services/constants";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("RTLService Mixed Content Integration", () => {
    let service: RTLService;
    let detector: RTLDetector;
    let container: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = '';
        container = document.createElement('div');
        document.body.appendChild(container);
        detector = new RTLDetector();
        service = new RTLService(detector);
        service.enable();
    });

    afterEach(() => {
        service.disable();
    });

    it("should process mixed content code block as RTL if ratio is high", () => {
        const codeBlock = document.createElement('pre');
        codeBlock.className = 'code-block';
        // Mostly Hebrew
        codeBlock.textContent = "שלום עולם code test";
        // Hebrew: 9 chars, English: 8 chars (including spaces).
        // Logic: rtl / nonWhitespace
        // Hebrew: 9. English: 8. Total non-white: 17. Ratio: 9/17 = 0.52.
        // Threshold is 0.6. So this should be LTR.

        container.appendChild(codeBlock);
        service.processElement(codeBlock);

        // Should be LTR (default or explicit)
        expect(codeBlock.classList.contains('rtl-force')).toBe(false);

        // Now try very high RTL content
        const codeBlock2 = document.createElement('pre');
        codeBlock2.className = 'code-block';
        codeBlock2.textContent = "שלום עולם וגם זה בעברית const x = 1";
        // RTL: ~20 chars. LTR: ~10. Ratio > 0.6.

        container.appendChild(codeBlock2);
        service.processElement(codeBlock2);

        expect(codeBlock2.classList.contains('rtl-force')).toBe(true);
    });

    it("should process normal text based on detector", () => {
        const p = document.createElement('p');
        p.textContent = "This is English";
        container.appendChild(p);
        service.processElement(p);
        expect(p.classList.contains('ltr-force')).toBe(true);

        const p2 = document.createElement('p');
        p2.textContent = "שלום עולם";
        container.appendChild(p2);
        service.processElement(p2);
        expect(p2.classList.contains('rtl-force')).toBe(true);
    });

    it("should respect manual overrides", () => {
        const p = document.createElement('p');
        p.textContent = "English Text";
        p.setAttribute('data-manual-dir', 'rtl');
        container.appendChild(p);
        service.processElement(p);

        expect(p.classList.contains('rtl-force')).toBe(true);
        expect(p.classList.contains('ltr-force')).toBe(false);
    });
});
