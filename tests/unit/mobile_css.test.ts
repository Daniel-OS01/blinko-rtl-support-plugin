import { describe, it, expect } from "bun:test";
import { advancedRTLCSS } from "../../src/services/constants";

describe("Mobile CSS Configuration", () => {
    it("should include media query for FAB size", () => {
        // Check if the CSS string contains the media query block
        expect(advancedRTLCSS).toContain("@media (max-width: 768px)");

        // Check for specific rules within (loose check since whitespace matches can vary)
        expect(advancedRTLCSS).toContain(".rtl-toggle-btn");
        expect(advancedRTLCSS).toContain("width: 36px");
        expect(advancedRTLCSS).toContain("height: 36px");
    });
});
