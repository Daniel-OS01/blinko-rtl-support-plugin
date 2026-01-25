import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { StorageManager } from "../../src/services/storageManager";
import { DEFAULT_SETTINGS } from "../../src/services/constants";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe("StorageManager SSO & Robustness", () => {
    let storageManager: StorageManager;

    beforeEach(() => {
        localStorage.clear();
        (window as any).Blinko = undefined;
        storageManager = new StorageManager();
    });

    it("should store settings for different users separately (SSO scenario)", () => {
        // Simulating User A (e.g. Password Login)
        (window as any).Blinko = { user: { id: 'user-a' } };
        storageManager.save({ ...DEFAULT_SETTINGS, minRTLChars: 10 });

        // Simulating User B (e.g. SSO Login)
        (window as any).Blinko = { user: { id: 'user-b' } };
        storageManager.save({ ...DEFAULT_SETTINGS, minRTLChars: 20 });

        // Check Storage
        expect(localStorage.getItem('blinko-rtl-settings-user-a')).toContain('"minRTLChars":10');
        expect(localStorage.getItem('blinko-rtl-settings-user-b')).toContain('"minRTLChars":20');

        // Verify Load for User A
        (window as any).Blinko = { user: { id: 'user-a' } };
        const loadedA = storageManager.load();
        expect(loadedA?.minRTLChars).toBe(10);

        // Verify Load for User B
        (window as any).Blinko = { user: { id: 'user-b' } };
        const loadedB = storageManager.load();
        expect(loadedB?.minRTLChars).toBe(20);
    });

    it("should fallback to global settings if user setting missing but global exists", () => {
        // Save global setting
        (window as any).Blinko = undefined;
        storageManager.save({ ...DEFAULT_SETTINGS, sensitivity: 'low' });

        // User logs in
        (window as any).Blinko = { user: { id: 'new-user' } };

        // Should load global because user specific doesn't exist yet
        // (Implementation detail: load() checks global if user key is empty)
        const loaded = storageManager.load();

        // Wait, the implementation of load() checks global ONLY if key !== STORAGE_KEY
        // and if saved is null.
        // Let's verify that logic.
        expect(loaded?.sensitivity).toBe('low');
    });

    it("should sanitize new advanced fields", () => {
        const json = JSON.stringify({
            version: 1,
            source: 'blinko-rtl-support-plugin',
            data: {
                ...DEFAULT_SETTINGS,
                debounceDelay: "invalid" // Should be number
            }
        });

        // It shouldn't throw, but it should sanitize
        const imported = storageManager.import(json);
        expect(imported.debounceDelay).toBe(200); // Default
    });
});
