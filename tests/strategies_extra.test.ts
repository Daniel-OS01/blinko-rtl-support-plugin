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
});
