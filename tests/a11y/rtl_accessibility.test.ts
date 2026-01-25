import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import axe from 'axe-core';

// Note: axe-core usually runs in a real browser. In HappyDOM, it might be limited.
// We might need to mock or use a subset if full axe fails.
// Alternatively, we verify specific RTL ARIA attributes manually if axe struggles in this env.

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("Accessibility (A11y) Compliance", () => {
    let service: RTLService;

    beforeEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
        service = new RTLService(new RTLDetector());
        service.enable();
    });

    it("ensures RTL elements have correct dir attribute (WCAG 1.3.1)", () => {
        // "Information, structure, and relationships conveyed through presentation can be programmatically determined."
        // For RTL, this means strictly using dir="rtl" or direction: rtl, but attributes are better for A11y API.

        const p = document.createElement('p');
        p.textContent = "שלום";
        document.body.appendChild(p);

        // Configure service to use 'attributes' or 'all' method to ensure semantic HTML
        // Also ensure 'p' is targeted (default only targets .markdown-body p)
        service.updateSettings({
            method: 'all',
            targetSelectors: ['p']
        });
        service.processAllElements();

        expect(p.getAttribute('dir')).toBe('rtl');
    });

    it("validates input accessibility in RTL mode", () => {
        const input = document.createElement('input');
        input.type = "text";
        input.value = "שלום";
        input.id = "rtl-input";
        // Label is important for A11y
        const label = document.createElement('label');
        label.htmlFor = "rtl-input";
        label.textContent = "Hebrew Input";

        document.body.appendChild(label);
        document.body.appendChild(input);

        service.processAllElements();

        // Check that we haven't broken the relationship or hid it
        expect(input.getAttribute('dir')).toBe('rtl');
        // Ensure no `display: none` or visibility issues are injected (basic check)
        expect(input.style.display).not.toBe('none');
    });

    // Custom heuristic check for "Visual Order vs DOM Order"
    // (Simulating a check for logical reading order)
    it("preserves logical reading order in lists", () => {
        const ul = document.createElement('ul');
        const li1 = document.createElement('li'); li1.textContent = "1. First";
        const li2 = document.createElement('li'); li2.textContent = "2. Second";
        ul.appendChild(li1);
        ul.appendChild(li2);
        document.body.appendChild(ul);

        service.processAllElements();

        // Even in RTL, DOM order should remain 1, then 2.
        // CSS handles visual reordering.
        // We verify that the Plugin did NOT reorder DOM nodes (which would confuse screen readers).
        expect(ul.children[0].textContent).toBe("1. First");
        expect(ul.children[1].textContent).toBe("2. Second");
    });
});
