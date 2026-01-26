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
});
