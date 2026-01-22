import { expect, test, describe } from "bun:test";
import { RegexStrategy } from "../../src/utils/strategies/RegexStrategy";
import { CharacterCodeStrategy } from "../../src/utils/strategies/CharacterCodeStrategy";
import { CombinedStrategy } from "../../src/utils/strategies/CombinedStrategy";
import { RTLDetector } from "../../src/utils/rtlDetector";

describe("RTL Detection", () => {
    describe("RegexStrategy", () => {
        test("should detect Hebrew text", () => {
            // (hebrew, arabic, threshold, minRTLChars)
            const strategy = new RegexStrategy(true, false, 0.3, 1);
            expect(strategy.detect("שלום")).toBe(true);
        });

        test("should detect Arabic text", () => {
            const strategy = new RegexStrategy(false, true, 0.3, 1);
            expect(strategy.detect("مرحبا")).toBe(true);
        });

        test("should respect minRTLChars", () => {
            // threshold 0.0 to focus on char count (or keep it low)
            const strategy = new RegexStrategy(true, true, 0.0, 3);
            expect(strategy.detect("hi")).toBe(false);
            expect(strategy.detect("hi ש")).toBe(false); // 1 hebrew char
            expect(strategy.detect("hi של")).toBe(false); // 2 hebrew chars
            expect(strategy.detect("hi שלום")).toBe(true); // 4 hebrew chars
        });

        test("should handle mixed content", () => {
            const strategy = new RegexStrategy(true, true, 0.0, 2);
            expect(strategy.detect("Version 1.0 (בטא)")).toBe(true); // 3 hebrew chars
        });
    });

    describe("CharacterCodeStrategy", () => {
        test("should detect based on percentage", () => {
            // sensitivity: 'high' -> 10%
            const strategy = new CharacterCodeStrategy({ sensitivity: 'high', minRTLChars: 1, sampleSize: 100 });
            // "abc ד" -> 5 chars total (space skipped in char count?), 1 RTL.
            // implementation: skips whitespace/punctuation.
            // "abc" (3 latin) + "ד" (1 hebrew) = 4 significant. 1/4 = 25% > 10% -> True
            expect(strategy.detect("abc ד")).toBe(true);

            // "abcde fghij ק" -> 11 significant. 1/11 = ~9% < 10% -> False
            expect(strategy.detect("abcde fghij ק")).toBe(false);
        });
    });

    describe("RTLDetector (Integration)", () => {
        test("should use CombinedStrategy by default", () => {
            const detector = new RTLDetector({ minRTLChars: 2 });
            // "ש" -> 1 char, min 2. Regex returns false. CharCode returns false (minRTLChars 3 default in CharCodeStrategy unless overridden).
            // Wait, RTLDetector sets minRTLChars in config passed to Strategies?
            // Yes, we updated RTLDetector to pass config.
            expect(detector.detectRTL("ש")).toBe(false);
            expect(detector.detectRTL("של")).toBe(true);
        });
    });
});
