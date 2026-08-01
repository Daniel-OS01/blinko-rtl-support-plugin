/**
 * Teardown guarantees for the plugin entry point.
 *
 * Initialization is deferred — to DOMContentLoaded while the document is still
 * loading, otherwise to a 100ms timer — so destroy() can land before it has
 * run. Nothing used to cancel either path, so a late callback would recreate
 * the toggle button, re-enable RTLService and republish window.blinkoRTL after
 * the plugin had been torn down.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

// The entry point is a SystemJS module. Capture the factory it registers.
let moduleFactory: any;
(globalThis as any).System = {
  register: (_deps: unknown[], factory: any) => {
    moduleFactory = factory;
  },
};

function installBlinkoStub() {
  (window as any).Blinko = {
    addToolBarIcon: jest.fn(),
    addRightClickMenu: jest.fn(),
    showDialog: jest.fn(),
    closeDialog: jest.fn(),
    toast: { success: jest.fn(), error: jest.fn() },
    i18n: { addResourceBundle: jest.fn(), t: (k: string) => k },
  };
}

installBlinkoStub();
await import('../src/index');

/** Run the module body, returning the exported Plugin class. */
function loadPlugin(): any {
  let PluginClass: any;
  const exportsFn = (name: string, value: any) => {
    if (name === 'default') PluginClass = value;
  };
  moduleFactory(exportsFn).execute();
  return PluginClass;
}

const settle = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('plugin teardown', () => {
  // Other test files install their own mocks on these globals at module scope,
  // and bun evaluates every module body before running any test. Exercising the
  // real entry point here overwrites them, so each is saved and restored.
  const GLOBALS = ['blinkoRTL', 'blinkoAIPost', 'Blinko'] as const;
  let saved: Record<string, unknown>;

  beforeEach(() => {
    saved = {};
    for (const key of GLOBALS) saved[key] = (window as any)[key];

    localStorage.clear();
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    delete (window as any).blinkoRTL;
    delete (window as any).blinkoAIPost;
    installBlinkoStub();
  });

  afterEach(() => {
    for (const key of GLOBALS) {
      if (saved[key] === undefined) delete (window as any)[key];
      else (window as any)[key] = saved[key];
    }
  });

  // Positive control. Without it the assertions below could all pass simply
  // because initialization never worked in this harness.
  it('initializes on the deferred timer when left alone', async () => {
    const plugin = new (loadPlugin())();
    await plugin.init();
    await settle(200);

    expect(document.querySelector('.rtl-toggle-btn')).not.toBeNull();
    expect((window as any).blinkoRTL).toBeDefined();
    expect((window as any).blinkoAIPost).toBeDefined();
  });

  it('a pending timer callback does nothing once destroyed', async () => {
    const plugin = new (loadPlugin())();
    await plugin.init();

    // Destroy inside the 100ms window, before initialization has run.
    plugin.destroy();
    await settle(200);

    expect(document.querySelector('.rtl-toggle-btn')).toBeNull();
    expect((window as any).blinkoRTL).toBeUndefined();
    expect((window as any).blinkoAIPost).toBeUndefined();
  });

  it('a late DOMContentLoaded does not resurrect the plugin', async () => {
    const plugin = new (loadPlugin())();
    await plugin.init();
    plugin.destroy();

    // Fire the event the loading-path listener would have been waiting on.
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await settle(200);

    expect(document.querySelector('.rtl-toggle-btn')).toBeNull();
    expect((window as any).blinkoRTL).toBeUndefined();
  });

  it('stops responding to rtl-settings-changed after destroy', async () => {
    const plugin = new (loadPlugin())();
    await plugin.init();
    await settle(200);
    expect(document.querySelector('.rtl-toggle-btn')).not.toBeNull();

    plugin.destroy();
    expect(document.querySelector('.rtl-toggle-btn')).toBeNull();

    // The handler would call createToggleButton() for this payload.
    window.dispatchEvent(
      new CustomEvent('rtl-settings-changed', {
        detail: { enableManualToggleBtn: true, darkMode: true },
      }),
    );
    await settle(20);

    expect(document.querySelector('.rtl-toggle-btn')).toBeNull();
  });

  it('removes the base stylesheet on destroy', async () => {
    const plugin = new (loadPlugin())();
    await plugin.init();
    await settle(200);

    // Injected during module execution, and deliberately kept across disable()
    // because it styles the toggle button.
    expect(document.getElementById('blinko-rtl-base-styles')).not.toBeNull();

    plugin.destroy();
    expect(document.getElementById('blinko-rtl-base-styles')).toBeNull();
  });

  it('leaves the service disabled after destroy', async () => {
    const plugin = new (loadPlugin())();
    await plugin.init();
    await settle(200);

    const service = (window as any).blinkoRTL?.service;
    expect(service).toBeDefined();

    service.enable();
    expect(service.isEnabled()).toBe(true);

    plugin.destroy();
    expect(service.isEnabled()).toBe(false);
  });
});
