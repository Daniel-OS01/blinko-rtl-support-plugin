import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("Audit: Mobile View Gap Analysis", () => {
    let service: RTLService;

    beforeEach(() => {
        document.body.innerHTML = '';
        document.head.innerHTML = '';
        service = new RTLService(new RTLDetector());
        service.enable();
    });

    afterEach(() => {
        service.disable();
    });

    it("verifies if enabling mobileView applies any DOM or CSS changes", () => {
        // Snapshot initial state
        const initialBodyClass = document.body.className;
        const initialHeadHTML = document.head.innerHTML;

        // Enable Mobile View
        service.updateSettings({ mobileView: true });

        // Check for changes
        const newBodyClass = document.body.className;
        const newHeadHTML = document.head.innerHTML;

        // We suspect this feature is a placeholder, so we expect NO changes regarding mobile view specifically.
        // The dynamic CSS might regenerate, but we look for specific "mobile" clues.

        const hasMobileClass = newBodyClass.includes('mobile') || newBodyClass.includes('responsive');
        const hasMobileCSS = newHeadHTML.includes('@media') && newHeadHTML.includes('max-width');

        // If these assertions PASS (expect(false).toBe(false)), it CONFIRMS the gap (feature is missing).
        expect(hasMobileClass).toBe(false);

        // Note: The default CSS *does* have a media query for the toggle button, so hasMobileCSS might be true if that's injected.
        // We need to check if *new* CSS specific to 'mobileView' setting is added.
        // The Service code does not seem to use 'mobileView' variable in injectDynamicCSS.

        const dynamicStyle = document.getElementById('blinko-rtl-dynamic-css');
        const cssContent = dynamicStyle?.textContent || '';

        // We check if the 'mobileView' setting actually alters the CSS content compared to default
        // Reset to false to get baseline
        service.updateSettings({ mobileView: false });
        const baselineCSS = dynamicStyle?.textContent || '';

        service.updateSettings({ mobileView: true });
        const mobileCSS = dynamicStyle?.textContent || '';

        expect(mobileCSS).toBe(baselineCSS); // Expect them to be identical, proving the setting does nothing.
    });
});
