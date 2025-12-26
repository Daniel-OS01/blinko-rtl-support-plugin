import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { PasteInterceptor } from "../../src/utils/pasteInterceptor";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

// Mock RTLDetector
class MockDetector extends RTLDetector {
  detectRTL = jest.fn();
}

describe("PasteInterceptor", () => {
  let interceptor: PasteInterceptor;
  let detector: MockDetector;
  let target: HTMLDivElement;

  beforeEach(() => {
    detector = new MockDetector();
    interceptor = new PasteInterceptor(detector);
    target = document.createElement("div");
    target.contentEditable = "true";
    document.body.appendChild(target);
  });

  afterEach(() => {
    interceptor.disable();
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("detects mixed content and prevents default paste", () => {
    interceptor.enable();

    // Mixed content: "Hello" (LTR) + "שלום" (RTL)
    // Needs > 3 chars of each
    const mixedText = "Hello World שלום עליכם";

    // We need to dispatch a paste event with clipboard data
    const event = new Event("paste", { bubbles: true, cancelable: true });
    // Mock clipboardData
    Object.defineProperty(event, 'clipboardData', {
      value: {
        getData: jest.fn().mockReturnValue(mixedText)
      }
    });

    let defaultPrevented = false;
    event.preventDefault = () => { defaultPrevented = true; };

    target.dispatchEvent(event);

    expect(defaultPrevented).toBe(true);
    // Check if toast was added
    expect(document.querySelector(".rtl-paste-toast")).not.toBeNull();
  });

  it("ignores purely LTR content", () => {
    interceptor.enable();
    const text = "Hello World This is English";

    const event = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', {
      value: { getData: jest.fn().mockReturnValue(text) }
    });

    let defaultPrevented = false;
    event.preventDefault = () => { defaultPrevented = true; };

    target.dispatchEvent(event);

    expect(defaultPrevented).toBe(false);
    expect(document.querySelector(".rtl-paste-toast")).toBeNull();
  });

  it("ignores purely RTL content", () => {
    interceptor.enable();
    const text = "שלום עולם זה עברית";

    const event = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', {
      value: { getData: jest.fn().mockReturnValue(text) }
    });

    let defaultPrevented = false;
    event.preventDefault = () => { defaultPrevented = true; };

    target.dispatchEvent(event);

    expect(defaultPrevented).toBe(false);
    expect(document.querySelector(".rtl-paste-toast")).toBeNull();
  });

  it("processes split correctly", () => {
      interceptor.enable();
      const mixedText = "English Text שלום עליכם More English";

      const event = new Event("paste", { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'clipboardData', {
        value: { getData: jest.fn().mockReturnValue(mixedText) }
      });
      target.dispatchEvent(event);

      const toast = document.querySelector(".rtl-paste-toast");
      const splitBtn = toast?.querySelector("#rtl-btn-split") as HTMLButtonElement;

      expect(splitBtn).not.toBeNull();

      // Mock insertText implementation: document.execCommand
      document.execCommand = jest.fn();

      splitBtn.click();

      // Check what was passed to execCommand.
      const lastCall = (document.execCommand as jest.Mock).mock.lastCall;
      const args = lastCall ? lastCall[2] : "";

      expect(args).toContain("שלום עליכם");
      expect(args).toContain("\n");
      // Verify English parts are preserved
      expect(args).toContain("English Text");
      expect(args).toContain("More English");
  });

  it("processes wrap correctly", () => {
      interceptor.enable();
      const mixedText = "English Text שלום עליכם More English";

      const event = new Event("paste", { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'clipboardData', {
        value: { getData: jest.fn().mockReturnValue(mixedText) }
      });
      target.dispatchEvent(event);

      const toast = document.querySelector(".rtl-paste-toast");
      const wrapBtn = toast?.querySelector("#rtl-btn-wrap") as HTMLButtonElement;

      document.execCommand = jest.fn();

      wrapBtn.click();

      const lastCall = (document.execCommand as jest.Mock).mock.lastCall;
      const args = lastCall ? lastCall[2] : "";

      // \u2067 is RLI, \u2069 is PDI
      expect(args).toContain("\u2067");
      expect(args).toContain("שלום עליכם");
      expect(args).toContain("\u2069");
  });
});
