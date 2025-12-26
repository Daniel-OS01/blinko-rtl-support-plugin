import { describe, it, expect } from "bun:test";
import { CharacterCodeStrategy } from "../src/utils/strategies/CharacterCodeStrategy";
import { RegexStrategy } from "../src/utils/strategies/RegexStrategy";
import { CombinedStrategy } from "../src/utils/strategies/CombinedStrategy";

describe("RTL Detection Strategies", () => {
    describe("CharacterCodeStrategy", () => {
        it("detects Hebrew text", () => {
            const strategy = new CharacterCodeStrategy({ sensitivity: "medium", minRTLChars: 2, sampleSize: 100 });
            expect(strategy.detect("שלום עולם")).toBe(true);
        });

        it("detects Arabic text", () => {
            const strategy = new CharacterCodeStrategy({ sensitivity: "medium", minRTLChars: 2, sampleSize: 100 });
            expect(strategy.detect("مرحبا بالعالم")).toBe(true);
        });

        it("does not detect English text", () => {
            const strategy = new CharacterCodeStrategy({ sensitivity: "medium", minRTLChars: 2, sampleSize: 100 });
            expect(strategy.detect("Hello World")).toBe(false);
        });

        it("handles mixed text correctly based on sensitivity (Medium)", () => {
            const strategy = new CharacterCodeStrategy({ sensitivity: "medium", minRTLChars: 2, sampleSize: 100 });
            // Mostly English, some Hebrew. 4 Hebrew chars. 11 English chars. ~26% RTL.
            // Medium threshold is 15%.
            expect(strategy.detect("Hello World שלום")).toBe(true);
        });

         it("handles mixed text correctly based on sensitivity (Low)", () => {
            const strategy = new CharacterCodeStrategy({ sensitivity: "low", minRTLChars: 2, sampleSize: 100 });
            // Mostly English, some Hebrew. 4 Hebrew chars. 11 English chars. ~26% RTL.
            // Low threshold is 40%. Should fail.
            expect(strategy.detect("Hello World שלום")).toBe(false);
        });

        it("respects minRTLChars", () => {
            const strategy = new CharacterCodeStrategy({ sensitivity: "high", minRTLChars: 5, sampleSize: 100 });
            expect(strategy.detect("שלום")).toBe(false); // 4 chars
        });
    });

    describe("RegexStrategy", () => {
        it("detects Hebrew text", () => {
            const strategy = new RegexStrategy(true, false);
            expect(strategy.detect("שלום")).toBe(true);
        });

        it("detects Arabic text", () => {
            const strategy = new RegexStrategy(false, true);
            expect(strategy.detect("مرحبا")).toBe(true);
        });

         it("ignores Arabic if flag is off", () => {
            const strategy = new RegexStrategy(true, false);
            expect(strategy.detect("مرحبا")).toBe(false);
        });
    });

    describe("CombinedStrategy", () => {
         it("returns true if one strategy returns true", () => {
             const mockTrue = { name: 'mock', detect: () => true };
             const mockFalse = { name: 'mock', detect: () => false };
             const strategy = new CombinedStrategy([mockFalse, mockTrue]);
             expect(strategy.detect("foo")).toBe(true);
         });

         it("returns false if all strategies return false", () => {
             const mockFalse1 = { name: 'mock', detect: () => false };
             const mockFalse2 = { name: 'mock', detect: () => false };
             const strategy = new CombinedStrategy([mockFalse1, mockFalse2]);
             expect(strategy.detect("foo")).toBe(false);
         });
    });
});
