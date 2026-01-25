import { describe, it, expect, beforeEach } from "bun:test";
import { StorageManager } from "../../src/services/storageManager";
import { DEFAULT_SETTINGS } from "../../src/services/constants";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("Audit: Import/Export Robustness", () => {
    let storageManager: StorageManager;

    beforeEach(() => {
        storageManager = new StorageManager();
    });

    it("handles malformed JSON gracefull", () => {
        const malformed = "{ this is not json }";
        expect(() => storageManager.import(malformed)).toThrow("Invalid JSON format");
    });

    it("handles valid JSON but invalid schema (missing data)", () => {
        const invalidSchema = JSON.stringify({ version: 1, source: 'blinko-rtl-support-plugin' });
        // Should throw "Invalid import data: Missing settings data"
        expect(() => storageManager.import(invalidSchema)).toThrow("Invalid import data: Missing settings data");
    });

    it("sanitizes partial data", () => {
        // Missing targetSelectors
        const partialData = JSON.stringify({
            version: 1,
            source: 'blinko-rtl-support-plugin',
            data: {
                enabled: true
                // targetSelectors missing
            }
        });

        // The current implementation throws if targetSelectors is not an array
        // We want to verify this behavior or see if it merges defaults.
        // Reading code: validateAndSanitize checks !Array.isArray(data.targetSelectors) -> Throw.
        expect(() => storageManager.import(partialData)).toThrow('Invalid settings: targetSelectors must be an array');
    });

    it("successfully imports legacy format (if supported)", () => {
        // Code has a check for legacy format
        const legacy = JSON.stringify({
            targetSelectors: ['.test'],
            enabled: true
        });

        const result = storageManager.import(legacy);
        expect(result.targetSelectors).toContain('.test');
        expect(result.enabled).toBe(true);
    });
});
