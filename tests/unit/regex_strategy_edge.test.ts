import { describe, it, expect } from "bun:test";
import { RegexStrategy } from "../../src/utils/strategies/RegexStrategy";

describe("RegexStrategy Edge Cases", () => {
    it("detects short pure RTL text even if below minRTLChars", () => {
        // minRTLChars is 3, but "כן" is 2 chars and purely RTL.
        const strategy = new RegexStrategy(true, true, 0.3, 3);
        expect(strategy.detect("כן")).toBe(true);
    });

    it("still rejects short mixed text below minRTLChars", () => {
        // "אa" is 2 chars, 1 is RTL. Ratio 0.5.
        // rtlCount (1) < minRTLChars (3). Not pure RTL.
        const strategy = new RegexStrategy(true, true, 0.3, 3);
        expect(strategy.detect("אa")).toBe(false);
    });
});
