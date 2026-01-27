import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { RTLService } from '../../src/services/rtlService';
import { RTLDetector } from '../../src/utils/rtlDetector';
import { DEFAULT_DYNAMIC_CSS } from '../../src/services/constants';

// Initialize happy-dom environment
try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered
}

describe('Blinko RTL Fixes Verification', () => {
  let service: RTLService;
  let detector: RTLDetector;

  beforeEach(() => {
    // Clear DOM and Mocks
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    // Reset localStorage
    localStorage.clear();

    detector = new RTLDetector();
    service = new RTLService(detector);

    // Mock window dispatchEvent
    window.dispatchEvent = mock(() => true);
  });

  afterEach(() => {
      mock.restore();
  });

  it('should suppress action logging when enableActionLog is false', () => {
    // Enable logging first to verify default
    service.updateSettings({ enableActionLog: true, enabled: true });

    const div = document.createElement('div');
    div.textContent = "Test";
    document.body.appendChild(div);

    // Manually trigger process to force a "log"
    service.processElement(div);

    // Check log length
    let logs = service.getActionLog();
    // It might be empty if "neutral" doesn't log or if processElement logic didn't trigger a change
    // Let's force a direction change
    service.updateSettings({ manualToggle: true });
    service.processElement(div);

    logs = service.getActionLog();
    expect(logs.length).toBeGreaterThan(0);
    const initialCount = logs.length;

    // Now DISABLE logging
    service.updateSettings({ enableActionLog: false });

    // Create another element
    const div2 = document.createElement('div');
    div2.textContent = "Test2";
    document.body.appendChild(div2);

    service.processElement(div2);

    logs = service.getActionLog();
    expect(logs.length).toBe(initialCount); // Should not have increased
  });

  it('should apply dynamic debug labels (RTL)', () => {
    service.updateSettings({ debugMode: true, showElementNames: false, enabled: true });

    const div = document.createElement('div');
    div.textContent = "Hebrew Text \u05D0"; // RTL text
    document.body.appendChild(div);

    // Force RTL detection via mock or just trust the detector
    // Let's just force manual toggle to be sure of direction 'rtl'
    service.updateSettings({ manualToggle: true });
    service.processElement(div);

    expect(div.classList.contains('rtl-debug-rtl')).toBe(true);
    expect(div.getAttribute('data-rtl-debug')).toBe('RTL');

    // Enable element names
    service.updateSettings({ showElementNames: true });
    service.processElement(div);

    expect(div.getAttribute('data-rtl-debug')).toBe('RTL (DIV)');
  });

  it('should apply dynamic debug labels (LTR)', () => {
    service.updateSettings({ debugMode: true, showElementNames: true, enabled: true, forceDirection: 'ltr' });

    const p = document.createElement('p');
    p.textContent = "English Text";
    document.body.appendChild(p);

    service.processElement(p);

    expect(p.classList.contains('rtl-debug-ltr')).toBe(true);
    expect(p.getAttribute('data-rtl-debug')).toBe('LTR (P)');
  });

  it('should use attr(data-rtl-debug) in DEFAULT_DYNAMIC_CSS', () => {
    expect(DEFAULT_DYNAMIC_CSS).toContain('content: attr(data-rtl-debug)');
    expect(DEFAULT_DYNAMIC_CSS).not.toContain('content: "RTL"');
    expect(DEFAULT_DYNAMIC_CSS).not.toContain('content: "LTR"');
  });
});
