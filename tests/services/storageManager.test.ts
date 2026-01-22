import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { StorageManager } from "../../src/services/storageManager";
import { DEFAULT_SETTINGS } from "../../src/services/constants";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe("StorageManager", () => {
    let storageManager: StorageManager;

    beforeEach(() => {
        localStorage.clear();
        (window as any).Blinko = undefined;
        storageManager = new StorageManager();
    });

    it("should save and load settings for global user (no ID)", () => {
        const settings = { ...DEFAULT_SETTINGS, enabled: false };
        storageManager.save(settings);

        const loaded = storageManager.load();
        expect(loaded).toBeTruthy();
        expect(loaded?.enabled).toBe(false);
        expect(localStorage.getItem('blinko-rtl-settings')).toBeTruthy();
    });

    it("should use user-specific key if User ID is present", () => {
        // Mock User ID
        (window as any).Blinko = { user: { id: 'user-123' } };

        const settings = { ...DEFAULT_SETTINGS, minRTLChars: 10 };
        storageManager.save(settings);

        expect(localStorage.getItem('blinko-rtl-settings-user-123')).toBeTruthy();
        expect(localStorage.getItem('blinko-rtl-settings')).toBeNull(); // Shouldn't use global

        const loaded = storageManager.load();
        expect(loaded?.minRTLChars).toBe(10);
    });

    it("should fallback to legacy global settings if user specific not found", () => {
        (window as any).Blinko = { user: { id: 'user-456' } };

        // Save to global manually (simulating legacy data)
        const legacySettings = { ...DEFAULT_SETTINGS, sensitivity: 'high' };
        localStorage.setItem('blinko-rtl-settings', JSON.stringify(legacySettings));

        const loaded = storageManager.load();
        expect(loaded).toBeTruthy();
        expect(loaded?.sensitivity).toBe('high');
    });

    it("should export settings in standard format", () => {
        const settings = { ...DEFAULT_SETTINGS };
        const json = storageManager.export(settings);
        const parsed = JSON.parse(json);

        expect(parsed.version).toBe(1);
        expect(parsed.source).toBe('blinko-rtl-support-plugin');
        expect(parsed.data).toBeTruthy();
        expect(parsed.data.enabled).toBe(true);
    });

    it("should import valid settings", () => {
        const exportData = {
            version: 1,
            source: 'blinko-rtl-support-plugin',
            timestamp: 12345,
            data: { ...DEFAULT_SETTINGS, minRTLChars: 5 }
        };
        const json = JSON.stringify(exportData);

        const imported = storageManager.import(json);
        expect(imported.minRTLChars).toBe(5);
    });

    it("should throw error on invalid JSON", () => {
        expect(() => storageManager.import("invalid json")).toThrow("Invalid JSON format");
    });

    it("should throw error on missing data", () => {
        const invalid = JSON.stringify({ version: 1, source: 'blinko' });
        expect(() => storageManager.import(invalid)).toThrow("Invalid import data");
    });

    it("should validate and sanitize input", () => {
        const badData = {
            version: 1,
            source: 'blinko-rtl-support-plugin',
            data: {
                ...DEFAULT_SETTINGS,
                targetSelectors: "not an array", // Invalid type
                minRTLChars: "3" // Invalid type
            }
        };

        expect(() => storageManager.import(JSON.stringify(badData))).toThrow();
    });
});
