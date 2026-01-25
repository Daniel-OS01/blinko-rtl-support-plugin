import { describe, it, expect, beforeEach } from "bun:test";
import { StorageManager } from "../../src/services/storageManager";
import { DEFAULT_SETTINGS } from "../../src/services/constants";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("Audit: SSO & Data Persistence", () => {
    let storageManager: StorageManager;

    beforeEach(() => {
        localStorage.clear();
        (window as any).Blinko = undefined;
        storageManager = new StorageManager();
    });

    it("isolates settings between different User IDs (Simulation of SSO ID mismatch)", () => {
        // User A (e.g., Email Login)
        (window as any).Blinko = { user: { id: 'user-email-123' } };
        storageManager.save({ ...DEFAULT_SETTINGS, sensitivity: 'high' });

        // User A logs out, logs in via SSO (Simulating a DIFFERENT ID scenario)
        // If the App guarantees consistent IDs, this test just proves that *if* they were different, data is lost.
        // This confirms the "Risk" if the assumption fails.
        (window as any).Blinko = { user: { id: 'user-github-456' } };
        const loadedSettings = storageManager.load();

        // Should NOT load User A's settings
        expect(loadedSettings).toBeNull(); // Or default

        // User A logs back in via Email
        (window as any).Blinko = { user: { id: 'user-email-123' } };
        const restoredSettings = storageManager.load();
        expect(restoredSettings?.sensitivity).toBe('high');
    });

    it("verifies consistent ID access (Simulation of proper SSO integration)", () => {
        // If the app provides the SAME ID, settings persist.
        const consistentID = 'u-unified-789';

        (window as any).Blinko = { user: { id: consistentID } };
        storageManager.save({ ...DEFAULT_SETTINGS, manualMode: true });

        // Simulate page reload / re-auth
        (window as any).Blinko = undefined;
        // ...
        (window as any).Blinko = { user: { id: consistentID } };

        const loaded = storageManager.load();
        expect(loaded?.manualMode).toBe(true);
    });
});
