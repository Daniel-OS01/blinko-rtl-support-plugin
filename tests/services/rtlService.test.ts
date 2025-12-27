
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
    el.textContent = "שלום"; // Hebrew
    document.body.appendChild(el);

    // Enable debug mode
    service.toggleDebugMode();

    // Process element
    service.processElement(el);

    expect(el.classList.contains('rtl-debug-rtl')).toBe(true);
    expect(el.getAttribute('data-rtl-debug')).toBe('RTL Detected');
  });

  it("removes debug visual classes when debug mode is disabled", () => {
    const el = document.createElement("div");
    el.textContent = "שלום";
    el.classList.add('rtl-debug-rtl'); // Simulate existing debug class
    document.body.appendChild(el);

    // Enable then disable to trigger cleanup
    service.toggleDebugMode(); // Enable
    service.toggleDebugMode(); // Disable

    // The logic in toggleDebugMode removes classes from existing elements
    expect(el.classList.contains('rtl-debug-rtl')).toBe(false);
  });
});
