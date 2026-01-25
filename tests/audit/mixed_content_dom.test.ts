import { describe, it, expect, beforeEach } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("Audit: Mixed Content DOM Integrity", () => {
    let service: RTLService;

    beforeEach(() => {
        document.body.innerHTML = '';
        service = new RTLService(new RTLDetector());
        service.enable();
    });

    it("preserves DOM structure when processing mixed content paragraphs", () => {
        // Create a complex mixed content structure
        const container = document.createElement('div');
        container.innerHTML = `
            <p id="mixed">
                Start English
                <span class="highlight">שלום</span>
                Middle English
                <strong>עולם</strong>
                End English
            </p>
        `;
        document.body.appendChild(container);

        const originalHTML = container.innerHTML;

        // Process - Ensure we target generic P tags for this audit
        service.updateSettings({ targetSelectors: ['p'] });
        service.processAllElements();

        // Check 1: No tags were lost
        const p = document.getElementById('mixed');
        expect(p?.querySelector('span.highlight')).toBeTruthy();
        expect(p?.querySelector('strong')).toBeTruthy();

        // Check 2: Text content is preserved (order in textContent should match source order)
        // Note: textContent ignores tags, just concatenation
        const expectedText = "Start EnglishשלוםMiddle EnglishעולםEnd English".replace(/\s+/g, '');
        const actualText = (p?.textContent || '').replace(/\s+/g, '');

        expect(actualText).toContain("StartEnglish");
        expect(actualText).toContain("שלום");

        // Check 3: Classes added but structure not mangled
        // The service adds classes to the CONTAINER (p), it shouldn't wrap inner text nodes unless specific logic (like PasteInterceptor) does.
        // processAllElements -> processElement just toggles classes/attributes on the target element.
        expect(p?.classList.contains('rtl-force') || p?.classList.contains('ltr-force') || p?.classList.contains('neutral')).toBe(true);

        // Ensure inner HTML structure is roughly similar (tags match)
        // We accept that class attributes might change on the P, but the inner children should be mostly untouched
        // unless the service is doing aggressive wrapping (which it shouldn't for basic detection).
        expect(p?.children.length).toBe(2); // span and strong
    });

    it("correctly identifies direction of mixed content primarily Hebrew", () => {
        const p = document.createElement('p');
        // Mostly Hebrew
        p.textContent = "שלום אני דניאל and this is minor english";
        document.body.appendChild(p);

        service.processAllElements();

        // Should be RTL
        expect(p.classList.contains('rtl-force')).toBe(true);
    });
});
