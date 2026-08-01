import { describe, it, expect } from "bun:test";
import { CharacterCodeStrategy } from "../src/utils/strategies/CharacterCodeStrategy";

describe("CharacterCodeStrategy Missing Ranges", () => {
    it("detects Arabic Supplement characters", () => {
        // \u0750 is ARABIC LETTER BEH WITH THREE DOTS HORIZONTALLY BELOW
        const strategy = new CharacterCodeStrategy({ sensitivity: "high", minRTLChars: 1, sampleSize: 100 });
        expect(strategy.detect("\u0750\u0750\u0750")).toBe(true);
    });

    it("detects Arabic Extended-A characters", () => {
        // \u08A0 is ARABIC LETTER BEH WITH V BELOW
        const strategy = new CharacterCodeStrategy({ sensitivity: "high", minRTLChars: 1, sampleSize: 100 });
        expect(strategy.detect("\u08A0\u08A0\u08A0")).toBe(true);
    });

    it("does not dilute the RTL ratio with astral characters (e.g. emoji)", () => {
        // Emoji are represented as UTF-16 surrogate pairs (2 code units each).
        // A naive per-code-unit scan counts each emoji as two significant
        // characters instead of one, which can push the RTL ratio below the
        // detection threshold even though the actual character count is small
        // relative to the RTL text.
        const strategy = new CharacterCodeStrategy({ sensitivity: "medium", minRTLChars: 1, sampleSize: 100 });
        const hebrew = "שלום עולם"; // 8 significant Hebrew letters
        const emojis = "\u{1F600}".repeat(30); // 30 astral characters (60 UTF-16 code units)
        expect(strategy.detect(`${hebrew} ${emojis}`)).toBe(true);
    });
});
