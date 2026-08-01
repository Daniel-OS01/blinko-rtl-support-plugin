import { describe, it, expect } from "bun:test";
import { RegexStrategy } from "../../src/utils/strategies/RegexStrategy";

describe("RegexStrategy Edge Cases", () => {
    it("applies minRTLChars to pure RTL text as well as mixed text", () => {
        // "כן" is 2 characters and wholly RTL, but the floor is 3.
        //
        // This used to be exempt: text was accepted regardless of minRTLChars
        // when every character was RTL. The exemption compared the RTL count
        // against the *trimmed length*, so it fired only for text without
        // spaces — "כן" was exempt but "שלום עולם" was not, purely because of
        // the space. minRTLChars is now a hard floor with one meaning.
        const strategy = new RegexStrategy(true, true, 0.3, 3);
        expect(strategy.detect("כן")).toBe(false);
        expect(strategy.detect("כן!")).toBe(false);   // punctuation is not evidence
        expect(strategy.detect("כנים")).toBe(true);   // 4 RTL chars, floor met
    });

    it("detects short pure RTL text at the default floor of 1", () => {
        const strategy = new RegexStrategy(true, true, 0.3, 1);
        expect(strategy.detect("כן")).toBe(true);
    });

    it("still rejects short mixed text below minRTLChars", () => {
        // "אa" is 2 chars, 1 is RTL. Ratio 0.5.
        // rtlCount (1) < minRTLChars (3). Not pure RTL.
        const strategy = new RegexStrategy(true, true, 0.3, 3);
        expect(strategy.detect("אa")).toBe(false);
    });
});
