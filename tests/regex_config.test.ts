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
        expect(detector.detectRTL("א")).toBe(false); // 1 char, min 2

        detector.updateConfig({ minRTLChars: 1 });
        expect(detector.detectRTL("א")).toBe(true); // 1 char, min 1
    });
});

describe("RegexStrategy Optimized", () => {
    it("counts matches correctly for minRTLChars > 1", () => {
        const strategy = new RegexStrategy(true, true, 0.0, 3);
        expect(strategy.detect("אא")).toBe(false);
        expect(strategy.detect("אאא")).toBe(true);
    });

    it("handles updates via updateConfig", () => {
        const strategy = new RegexStrategy(true, true, 0.0, 3);
        strategy.updateConfig({ minRTLChars: 1 });
        expect(strategy.detect("א")).toBe(true);
    });
});
