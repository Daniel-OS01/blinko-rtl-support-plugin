import { DEFAULT_SETTINGS } from './constants';
import { RTLSettings } from '../types';

export interface StorageSchema {
    version: number;
    source: string;
    timestamp: number;
    data: RTLSettings;
}

export class StorageManager {
    private readonly STORAGE_KEY = 'blinko-rtl-settings';
    private readonly CURRENT_VERSION = 1;

    /**
     * Attempts to retrieve a consistent User ID from the Blinko environment.
     * Checks multiple potential locations for user identity.
     */
    private getUserId(): string | null {
        try {
            // Check for common Blinko user patterns (hypothetical based on typical plugin architectures)
            const blinko = (window as any).Blinko;
            if (blinko) {
                if (blinko.user && blinko.user.id) return blinko.user.id;
                if (blinko.currentUser && blinko.currentUser.id) return blinko.currentUser.id;
                // Check if an auth token implies an ID (less reliable, but maybe useful for consistency)
                // if (blinko.auth && blinko.auth.userId) return blinko.auth.userId;
            }
        } catch (e) {
            // Ignore access errors
        }
        return null;
    }

    /**
     * specific key for the current user (or global if anonymous)
     */
    private getStorageKey(): string {
        const userId = this.getUserId();
        if (userId) {
            return `${this.STORAGE_KEY}-${userId}`;
        }
        return this.STORAGE_KEY;
    }

    public save(settings: RTLSettings): void {
        const key = this.getStorageKey();
        try {
            localStorage.setItem(key, JSON.stringify(settings));
        } catch (e) {
            console.error('Failed to save RTL settings:', e);
        }
    }

    public load(): Partial<RTLSettings> | null {
        const key = this.getStorageKey();
        const saved = localStorage.getItem(key);

        // Fallback: If no user-specific settings, try global/legacy settings
        if (!saved && key !== this.STORAGE_KEY) {
            const legacy = localStorage.getItem(this.STORAGE_KEY);
            if (legacy) {
                // Determine if we should migrate?
                // For now, just return it so we don't lose config on upgrade
                // Optionally save it to the new key immediately?
                // Let's return it, and let the Service decide to save (which will save to new key)
                try {
                    return JSON.parse(legacy);
                } catch (e) { return null; }
            }
        }

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse RTL settings:', e);
                return null;
            }
        }
        return null;
    }

    public export(settings: RTLSettings): string {
        const exportData: StorageSchema = {
            version: this.CURRENT_VERSION,
            source: 'blinko-rtl-support-plugin',
            timestamp: Date.now(),
            data: settings
        };
        return JSON.stringify(exportData, null, 2);
    }

    public import(jsonString: string): RTLSettings {
        let parsed: any;
        try {
            parsed = JSON.parse(jsonString);
        } catch (e) {
            throw new Error('Invalid JSON format');
        }

        // Validation
        if (typeof parsed !== 'object' || parsed === null) {
            throw new Error('Invalid import data: Root must be an object');
        }

        // Check compatibility
        // If it's a raw settings object (legacy export), try to accept it if it looks like settings
        if (!parsed.version && !parsed.data && parsed.targetSelectors) {
             // Legacy format support
             return this.validateAndSanitize(parsed);
        }

        if (parsed.source !== 'blinko-rtl-support-plugin') {
             // Be lenient if source is missing but structure looks ok, otherwise warn
             // throw new Error('Invalid source: Not a Blinko RTL plugin export');
        }

        if (!parsed.data) {
            throw new Error('Invalid import data: Missing settings data');
        }

        return this.validateAndSanitize(parsed.data);
    }

    private validateAndSanitize(data: any): RTLSettings {
        // Deep merge with defaults to ensure all fields exist
        // Note: we need to import DEFAULT_SETTINGS but avoiding circular deps if possible
        // Ideally pass defaults in or define them here.
        // For now, we do structural checks.

        if (!Array.isArray(data.targetSelectors)) {
            throw new Error('Invalid settings: targetSelectors must be an array');
        }

        // Basic Type Checks
        if (data.minRTLChars !== undefined && typeof data.minRTLChars !== 'number') {
             throw new Error('Invalid settings: minRTLChars must be a number');
        }

        // Sanitize CSS (basic)
        if (typeof data.dynamicCSS !== 'string') {
            data.dynamicCSS = '';
        }

        return data as RTLSettings;
    }
}
