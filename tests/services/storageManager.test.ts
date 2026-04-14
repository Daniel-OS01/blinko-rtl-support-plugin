import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { StorageManager } from "../../src/services/storageManager";
import { RTLSettings } from "../../src/services/constants";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("StorageManager", () => {
    let manager: StorageManager;
    const mockSettings: any = {
        dynamicCSS: ".test { direction: rtl; }",
        autoDetect: true,
        targetSelectors: []
    };

    beforeEach(() => {
        manager = new StorageManager();
        localStorage.clear();
        // Reset Blinko user
        (window as any).Blinko = undefined;
    });

    it("should save and load to global key when user is anonymous", () => {
        manager.save(mockSettings);

        const loaded = manager.load();
        expect(loaded).toEqual(mockSettings);

        // Verify key
        expect(localStorage.getItem('blinko-rtl-settings')).toBeTruthy();
        expect(localStorage.getItem('blinko-rtl-settings-user123')).toBeNull();
    });

    it("should save and load to user-specific key when user is logged in", () => {
        // Mock User
        (window as any).Blinko = { user: { id: 'user123' } };

        manager.save(mockSettings);

        const loaded = manager.load();
        expect(loaded).toEqual(mockSettings);

        // Verify key
        expect(localStorage.getItem('blinko-rtl-settings-user123')).toBeTruthy();
        expect(localStorage.getItem('blinko-rtl-settings')).toBeNull();
    });

    it("should migrate anonymous settings to user settings if user settings are missing", () => {
        // 1. Save as anonymous
        manager.save(mockSettings);
        expect(localStorage.getItem('blinko-rtl-settings')).toBeTruthy();

        // 2. Log in
        (window as any).Blinko = { user: { id: 'user123' } };

        // 3. Load - should find nothing for user, but fall back to anonymous
        const loaded = manager.load();
        expect(loaded).toEqual(mockSettings);

        // 4. Save - should now write to user key
        const newSettings = { ...mockSettings, autoDetect: false };
        manager.save(newSettings);

        expect(localStorage.getItem('blinko-rtl-settings-user123')).toContain('"autoDetect":false');
        // Old settings remain untouched (or we could clear them, but safer to keep)
        expect(localStorage.getItem('blinko-rtl-settings')).toBeTruthy();
    });

    it("should prioritize user settings over anonymous settings", () => {
         // 1. Save anonymous
        const anonSettings = { ...mockSettings, autoDetect: true };
        localStorage.setItem('blinko-rtl-settings', JSON.stringify(anonSettings));

        // 2. Save user specific
        const userSettings = { ...mockSettings, autoDetect: false };
        localStorage.setItem('blinko-rtl-settings-user123', JSON.stringify(userSettings));

        // 3. Log in
        (window as any).Blinko = { user: { id: 'user123' } };

        // 4. Load - should get user settings
        const loaded = manager.load();
        expect(loaded).toEqual(userSettings);
        expect(loaded!.autoDetect).toBe(false);
    });

    describe("import", () => {
        let importManager;
        beforeEach(() => {
            importManager = new StorageManager();
        });

        it("should throw 'Invalid JSON format' on invalid json string", () => {
            expect(() => importManager.import("invalid json")).toThrow("Invalid JSON format");
        });

        it("should throw 'Invalid import data: Root must be an object' if root is not an object", () => {
            expect(() => importManager.import("true")).toThrow("Invalid import data: Root must be an object");
            expect(() => importManager.import("42")).toThrow("Invalid import data: Root must be an object");
            expect(() => importManager.import("null")).toThrow("Invalid import data: Root must be an object");
        });

        it("should throw 'Invalid import data: Missing settings data' if structure is valid but data is missing", () => {
            expect(() => importManager.import(JSON.stringify({ version: 1 }))).toThrow("Invalid import data: Missing settings data");
            expect(() => importManager.import(JSON.stringify({ source: "blinko-rtl-support-plugin" }))).toThrow("Invalid import data: Missing settings data");
        });

        it("should throw 'Invalid settings: targetSelectors must be an array' if targetSelectors is missing or not an array", () => {
            const invalidData = { data: { minRTLChars: 5 } };
            expect(() => importManager.import(JSON.stringify(invalidData))).toThrow("Invalid settings: targetSelectors must be an array");

            const invalidData2 = { data: { targetSelectors: "not an array" } };
            expect(() => importManager.import(JSON.stringify(invalidData2))).toThrow("Invalid settings: targetSelectors must be an array");
        });

        it("should throw 'Invalid settings: minRTLChars must be a number' if minRTLChars is not a number", () => {
            const invalidData = { data: { targetSelectors: [], minRTLChars: "5" } };
            expect(() => importManager.import(JSON.stringify(invalidData))).toThrow("Invalid settings: minRTLChars must be a number");
        });

        it("should sanitize dynamicCSS if not a string", () => {
            const dataWithInvalidCSS = { data: { targetSelectors: [], dynamicCSS: 123 } };
            const result = importManager.import(JSON.stringify(dataWithInvalidCSS));
            expect(result.dynamicCSS).toBe("");
        });

        it("should import standard schema successfully", () => {
            const validData = {
                version: 1,
                source: "blinko-rtl-support-plugin",
                data: {
                    targetSelectors: [".test"],
                    minRTLChars: 10,
                    dynamicCSS: "body { direction: rtl; }"
                }
            };
            const result = importManager.import(JSON.stringify(validData));
            expect(result).toEqual(validData.data);
        });

        it("should import legacy raw format successfully", () => {
            const legacyData = {
                targetSelectors: [".legacy"],
                minRTLChars: 3,
                dynamicCSS: ".rtl {}"
            };
            const result = importManager.import(JSON.stringify(legacyData));
            expect(result).toEqual(legacyData);
        });
    });

});
