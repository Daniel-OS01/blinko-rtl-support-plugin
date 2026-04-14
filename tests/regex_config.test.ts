import { describe, it, expect } from "bun:test";
import { RTLDetector } from "../src/utils/rtlDetector";
import { RegexStrategy } from "../src/utils/strategies/RegexStrategy";

describe("RTLDetector Configuration Respect", () => {
    it("respects minRTLChars configuration", () => {
        // minRTLChars is 10. The text has 5 Hebrew characters.
        // It SHOULD return false.
        const detector = new RTLDetector({ minRTLChars: 10 });
        const text = "שלום עולם"; // "Shalom Olam", 9 chars total (4+1+4), but 8 Hebrew letters.

        expect(detector.detectRTL(text)).toBe(false);
    });

    it("respects minRTLChars updateConfig", () => {
        const detector = new RTLDetector({ minRTLChars: 2 });
        // Pure RTL is accepted regardless of minRTLChars
        expect(detector.detectRTL("א")).toBe(true);

        // Mixed text below minRTLChars is rejected
        expect(detector.detectRTL("אa")).toBe(false);

        detector.updateConfig({ minRTLChars: 1 });
        expect(detector.detectRTL("אa")).toBe(true);
    });
});

describe("RegexStrategy Optimized", () => {
    it("counts matches correctly for minRTLChars > 1", () => {
        const strategy = new RegexStrategy(true, true, 0.0, 3);
        // Pure RTL is accepted regardless of minRTLChars
        expect(strategy.detect("אא")).toBe(true);
        expect(strategy.detect("אאא")).toBe(true);

        // Mixed text respects minRTLChars
        expect(strategy.detect("אאa")).toBe(false);
    });

    it("handles updates via updateConfig", () => {
        const strategy = new RegexStrategy(true, true, 0.0, 3);
        strategy.updateConfig({ minRTLChars: 1 });
        expect(strategy.detect("א")).toBe(true);
    });
});
