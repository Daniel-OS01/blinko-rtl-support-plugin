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
            // "ש" is 1 char, purely RTL. Now accepted by RegexStrategy regardless of minRTLChars.
            expect(detector.detectRTL("ש")).toBe(true);

            // "שa" -> 2 chars total, 1 RTL. minRTLChars 2 not met. Ratio 0.5.
            // RegexStrategy: rtlCount (1) < minRTLChars (2), not pure RTL -> False
            // CharCodeStrategy: sensitivity 'medium' -> 15% threshold. 1/2 = 50% > 15% BUT minRTLChars 2 not met -> False
            expect(detector.detectRTL("שa")).toBe(false);
            expect(detector.detectRTL("של")).toBe(true);
        });
    });
});
