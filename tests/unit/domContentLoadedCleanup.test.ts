/**
 * Regression tests for the DOMContentLoaded cleanup pattern used in src/index.tsx.
 *
 * The Plugin class lives inside System.register and cannot be instantiated
 * directly in a test environment. These tests verify the exact listener-tracking
 * pattern implemented there: a wrapper stored in a closure variable that destroy()
 * can remove before the event fires.
 *
 * A second suite covers the else-path: when document.readyState !== 'loading',
 * init() schedules a 100 ms setTimeout before calling initializeRTLPlugin.
 * destroy() must cancel that timer so teardown before the delay does not
 * create UI elements, listeners, or globals.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch {
  // Already registered
}

describe("DOMContentLoaded cleanup pattern", () => {
  // Mirrors the closure variables used in src/index.tsx's execute() block
  let initialized: boolean;
  let pendingHandler: (() => void) | null;
  const initializeRTLPlugin = () => { initialized = true; };

  beforeEach(() => {
    initialized = false;
    pendingHandler = null;
  });

  afterEach(() => {
    // Guard: remove any leftover listener to keep tests isolated
    if (pendingHandler) {
      document.removeEventListener("DOMContentLoaded", pendingHandler);
      pendingHandler = null;
    }
  });

  function registerListener() {
    pendingHandler = () => {
      pendingHandler = null;
      initializeRTLPlugin();
    };
    document.addEventListener("DOMContentLoaded", pendingHandler, { once: true });
  }

  function destroyPlugin() {
    if (pendingHandler) {
      document.removeEventListener("DOMContentLoaded", pendingHandler);
      pendingHandler = null;
    }
  }

  it("fires initializeRTLPlugin when DOMContentLoaded fires without destroy()", () => {
    registerListener();
    expect(initialized).toBe(false);

    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(initialized).toBe(true);
    expect(pendingHandler).toBeNull(); // wrapper cleared itself after firing
  });

  it("does not fire initializeRTLPlugin when destroy() is called before DOMContentLoaded", () => {
    registerListener();
    expect(pendingHandler).not.toBeNull();

    // Simulate destroy() running before the event
    destroyPlugin();
    expect(pendingHandler).toBeNull();

    document.dispatchEvent(new Event("DOMContentLoaded"));

    // Initialization must not have occurred
    expect(initialized).toBe(false);
  });

  it("destroy() is safe to call even when no listener was registered", () => {
    // pendingHandler is null — destroy should not throw
    expect(() => destroyPlugin()).not.toThrow();
    expect(initialized).toBe(false);
  });

  it("wrapper clears pendingHandler after firing so destroy() is a no-op afterwards", () => {
    registerListener();
    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(initialized).toBe(true);
    expect(pendingHandler).toBeNull();

    // Calling destroy after the event already fired must not throw
    expect(() => destroyPlugin()).not.toThrow();
  });
});

// ─── else-path: 100 ms initialization timeout ──────────────────────────────
//
// When document.readyState is not 'loading', init() schedules initialization
// via setTimeout(..., 100). destroy() stores the handle in pendingInitTimeoutId
// and calls clearTimeout so that teardown within the delay window suppresses
// the callback entirely.

describe("else-path initialization timeout cleanup", () => {
  // Mirrors the closure variables used in src/index.tsx's execute() block
  let initialized: boolean;
  let pendingInitTimeoutId: ReturnType<typeof setTimeout> | null;

  const initializeRTLPlugin = () => { initialized = true; };

  beforeEach(() => {
    initialized = false;
    pendingInitTimeoutId = null;
  });

  afterEach(() => {
    // Guard: cancel any leftover timer and restore real timers
    if (pendingInitTimeoutId !== null) {
      clearTimeout(pendingInitTimeoutId);
      pendingInitTimeoutId = null;
    }
    jest.useRealTimers();
  });

  function scheduleInit() {
    pendingInitTimeoutId = setTimeout(() => {
      pendingInitTimeoutId = null;
      initializeRTLPlugin();
    }, 100);
  }

  function destroyPlugin() {
    if (pendingInitTimeoutId !== null) {
      clearTimeout(pendingInitTimeoutId);
      pendingInitTimeoutId = null;
    }
  }

  it("fires initializeRTLPlugin after 100 ms when destroy() is not called", () => {
    jest.useFakeTimers();
    scheduleInit();

    jest.advanceTimersByTime(100);

    expect(initialized).toBe(true);
    expect(pendingInitTimeoutId).toBeNull(); // wrapper cleared itself
  });

  it("does not fire initializeRTLPlugin when destroy() is called within 100 ms", () => {
    jest.useFakeTimers();
    scheduleInit();

    // destroy() called before the 100 ms window elapses
    destroyPlugin();
    expect(pendingInitTimeoutId).toBeNull();

    jest.advanceTimersByTime(200);

    expect(initialized).toBe(false);
  });

  it("destroy() is safe to call when no timeout is pending", () => {
    expect(() => destroyPlugin()).not.toThrow();
    expect(initialized).toBe(false);
  });

  it("wrapper clears pendingInitTimeoutId after firing so destroy() is a no-op afterwards", () => {
    jest.useFakeTimers();
    scheduleInit();

    jest.advanceTimersByTime(100);
    expect(initialized).toBe(true);
    expect(pendingInitTimeoutId).toBeNull();

    // Calling destroy after the timer already fired must not throw
    expect(() => destroyPlugin()).not.toThrow();
  });
});
