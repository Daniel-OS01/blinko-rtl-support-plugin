import { describe, it, expect } from "bun:test";
import { RTLDetector } from "../src/utils/rtlDetector";
import { RegexStrategy } from "../src/utils/strategies/RegexStrategy";

/**
 * `minRTLChars` means one thing: the minimum number of strong RTL characters
 * required before text may be classified RTL. It is a hard floor.
 *
 * It previously carried an exemption for wholly-RTL text, but that exemption
 * compared the RTL count against the *trimmed length*, so it fired only when
 * the text contained no spaces — "כן" was exempt, "שלום עולם" was not. Short
 * RTL words are still detected at the default of 1; raising the setting is an
 * explicit request for more evidence and is now honoured.
 */
describe("RTLDetector Configuration Respect", () => {
    it("respects minRTLChars configuration", () => {
        // 8 Hebrew letters, threshold of 10 — not enough evidence.
        const detector = new RTLDetector({ minRTLChars: 10 });
        expect(detector.detectRTL("שלום עולם")).toBe(false);
    });

    it("applies the floor to wholly-RTL text as well as mixed text", () => {
        const detector = new RTLDetector({ minRTLChars: 3 });
        expect(detector.detectRTL("א")).toBe(false);   // 1 RTL char
        expect(detector.detectRTL("אב")).toBe(false);  // 2
        expect(detector.detectRTL("אבג")).toBe(true);  // 3 — floor met
    });

    it("detects short RTL words at the default floor of 1", () => {
        const detector = new RTLDetector({ minRTLChars: 1 });
        expect(detector.detectRTL("כן")).toBe(true);
        expect(detector.detectRTL("א")).toBe(true);
    });

    it("respects minRTLChars updateConfig", () => {
        const detector = new RTLDetector({ minRTLChars: 2 });
        expect(detector.detectRTL("אa")).toBe(false); // 1 RTL char, floor is 2

        detector.updateConfig({ minRTLChars: 1 });
        expect(detector.detectRTL("אa")).toBe(true);
    });
});

describe("RegexStrategy Optimized", () => {
    it("counts matches correctly for minRTLChars > 1", () => {
        const strategy = new RegexStrategy(true, true, 0.0, 3);
        expect(strategy.detect("אא")).toBe(false);  // 2 RTL chars, floor is 3
        expect(strategy.detect("אאא")).toBe(true);  // 3 — floor met
        expect(strategy.detect("אאa")).toBe(false); // 2 RTL chars
    });

    it("handles updates via updateConfig", () => {
        const strategy = new RegexStrategy(true, true, 0.0, 3);
        strategy.updateConfig({ minRTLChars: 1 });
        expect(strategy.detect("א")).toBe(true);
    });
});
