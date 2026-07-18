
import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("RTLService", () => {
  let service: RTLService;
  let detector: RTLDetector;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    detector = new RTLDetector();
    service = new RTLService(detector);
    service.enable();
  });

  afterEach(() => {
    service.disable();
    jest.clearAllMocks();
  });

  it("toggles debug mode correctly", () => {
    expect(service.getSettings().debugMode).toBe(false);

    // Enable debug mode
    const newState = service.toggleDebugMode();
    expect(newState).toBe(true);
    expect(service.getSettings().debugMode).toBe(true);
    expect(document.body.classList.contains('rtl-debug-mode')).toBe(true);

    // Disable debug mode
    const finalState = service.toggleDebugMode();
    expect(finalState).toBe(false);
    expect(document.body.classList.contains('rtl-debug-mode')).toBe(false);
  });

  it("applies debug visual classes when processing elements in debug mode", () => {
    const el = document.createElement("div");
    el.id = 'debug-test';
    el.textContent = "שלום"; // Hebrew
    document.body.appendChild(el);

    // Enable debug mode and name display
    service.updateSettings({ debugMode: true, debugShowElementNames: true });
    // Manually add debug class to body as toggleDebugMode does, since we used updateSettings
    document.body.classList.add('rtl-debug-mode');

    // Process element
    service.processElement(el);

    expect(el.classList.contains('rtl-debug-rtl')).toBe(true);
    expect(el.getAttribute('data-rtl-debug')).toBe('RTL');
    expect(el.getAttribute('data-debug-name')).toBe('div#debug-test');
  });

  it("removes debug visual classes when debug mode is disabled", () => {
    // Setup: force RTL direction and enable debug mode via settings
    // (avoids calling toggleDebugMode which relies on querySelectorAll for batch cleanup)
    service.updateSettings({ manualToggle: true, debugMode: true });
    document.body.classList.add('rtl-debug-mode');

    const el = document.createElement("div");
    el.textContent = "שלום";
    document.body.appendChild(el);

    // Process with debug on — processElement should add rtl-debug-rtl via applyDebugVisuals
    service.processElement(el);
    expect(el.classList.contains('rtl-debug-rtl')).toBe(true);

    // Now disable debug mode and reprocess the same element.
    // applyDebugVisuals has an explicit else-branch that removes the classes
    // when debugMode is false — verify it runs correctly without querySelectorAll.
    service.updateSettings({ debugMode: false });
    document.body.classList.remove('rtl-debug-mode');
    service.processElement(el);

    expect(el.classList.contains('rtl-debug-rtl')).toBe(false);
    expect(el.getAttribute('data-rtl-debug')).toBeNull();
  });

  // ─── Teardown regression tests ──────────────────────────────────────────────

  describe("teardown: retry timer and debounced work", () => {
    it("disable() sets isEnabled to false immediately", () => {
      expect(service.isEnabled()).toBe(true);
      service.disable();
      expect(service.isEnabled()).toBe(false);
    });

    it("processAllElements is a no-op after disable()", () => {
      // An element that would receive direction classes if the service were active.
      // manualToggle forces every element to RTL, so if processAllElements ran it
      // would add rtl-force / set dir="rtl".
      service.updateSettings({ manualToggle: true });
      service.disable();

      const el = document.createElement("div");
      el.textContent = "שלום";
      document.body.appendChild(el);

      // Direct call — simulates what the retry timer or debouncers would invoke
      service.processAllElements();

      expect(el.classList.contains("rtl-force")).toBe(false);
      expect(el.classList.contains("ltr-force")).toBe(false);
      expect(el.getAttribute("dir")).toBeNull();

      el.remove();
    });

    it("retry timer does not classify elements after disable()", () => {
      jest.useFakeTimers();

      // Disable first to cancel the real timer registered in beforeEach
      service.disable();
      // Re-enable under fake timers so the retry setTimeout is tracked by jest
      service.enable();

      const el = document.createElement("div");
      el.textContent = "שלום";
      document.body.appendChild(el);

      // Disable immediately — retryTimeoutId is cleared by clearTimeout inside disable()
      service.disable();

      // Advance past the 500 ms retry window; the cancelled timer must not fire
      jest.advanceTimersByTime(600);

      expect(el.classList.contains("rtl-force")).toBe(false);
      expect(el.classList.contains("ltr-force")).toBe(false);

      jest.useRealTimers();
      el.remove();
    });

    it("debounced processQueue does not classify elements after disable()", () => {
      jest.useFakeTimers();

      service.disable();
      service.enable();

      const el = document.createElement("div");
      el.textContent = "שלום";
      document.body.appendChild(el);

      // Trigger the debounced queue (50 ms debounce) then immediately disable
      (service as any).pendingElements.add(el);
      (service as any).debouncedProcessQueue();
      service.disable(); // cancels debouncedProcessQueue via .cancel()

      // Advance past both debounce windows (50 ms queue, 200 ms processAll)
      jest.advanceTimersByTime(300);

      expect(el.classList.contains("rtl-force")).toBe(false);

      jest.useRealTimers();
      el.remove();
    });

    it("enable() after disable() re-enables the service cleanly", () => {
      service.disable();
      expect(service.isEnabled()).toBe(false);
      service.enable();
      expect(service.isEnabled()).toBe(true);
    });
  });
});
