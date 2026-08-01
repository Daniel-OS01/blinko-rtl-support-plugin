/**
 * Locks install-time DEFAULT_SETTINGS to the curated export in
 * .planning/blinko-rtl-settings-v1-*.json so fresh installs match the
 * settings the live instance actually runs.
 */
import { describe, it, expect } from 'bun:test';
import { DEFAULT_SETTINGS } from '../../src/services/constants';

describe('DEFAULT_SETTINGS (install defaults)', () => {
  it('matches the curated export flags that differ from the old defaults', () => {
    expect(DEFAULT_SETTINGS.enablePasteInterceptor).toBe(false);
    expect(DEFAULT_SETTINGS.showManualToggle).toBe(false);
    expect(DEFAULT_SETTINGS.enableActionLog).toBe(false);
  });

  it('keeps the shared detection defaults from the export', () => {
    expect(DEFAULT_SETTINGS.enabled).toBe(true);
    expect(DEFAULT_SETTINGS.sensitivity).toBe('medium');
    expect(DEFAULT_SETTINGS.threshold).toBe(0.15);
    expect(DEFAULT_SETTINGS.minRTLChars).toBe(1);
    expect(DEFAULT_SETTINGS.minTextLength).toBe(1);
    expect(DEFAULT_SETTINGS.disabledSelectors).toEqual([
      '.vditor-sv',
      '.vditor-sv textarea',
    ]);
  });
});
