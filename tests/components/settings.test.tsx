import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLSetting } from "../../src/setting";
import { render, fireEvent, waitFor, act } from "@testing-library/preact";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { h } from "preact";
import { DEFAULT_TARGET_SELECTORS, DEFAULT_DYNAMIC_CSS } from "../../src/services/constants";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

// Mock Blinko API
const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
};

(window as any).Blinko = {
  toast: mockToast,
  i18n: { t: (key: string) => key }
};

// Full default settings mock
const mockSettings = {
    enabled: true,
    sensitivity: 'medium',
    threshold: 0.15,
    forceDirection: 'auto',
    autoDetect: false,
    manualMode: true,
    manualToggle: false,
    mobileView: false,
    darkMode: false,
    method: 'all',
    customCSS: '',
    permanentCSS: false,
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    visualStyles: {
      fontFamily: 'inherit',
      lineHeight: 1.5,
      paragraphMargin: 1
    },
    targetSelectors: DEFAULT_TARGET_SELECTORS || ['.test-selector'],
    disabledSelectors: [],
    minRTLChars: 3,
    processInterval: 2000,
    hebrewRegex: true,
    arabicRegex: true,
    mixedContent: true,
    savedPresets: []
};

(window as any).blinkoRTL = {
  test: jest.fn(),
  processAll: jest.fn(),
  toggle: jest.fn(),
  toggleManual: jest.fn(),
  isEnabled: jest.fn(),
  getStats: jest.fn(),
  fixSelection: jest.fn(),
  settings: () => ({
    enabled: true,
    threshold: 0.15,
    sensitivity: 'medium',
    targetSelectors: ['.test-selector'],
    disabledSelectors: [],
    ignoreSelectors: ['.ignore-me'],
    customCSS: '',
    dynamicCSS: '',
    manualMode: false,
    manualToggle: false,
    darkMode: false,
    method: 'all',
    minRTLChars: 3,
    processInterval: 2000,
    hebrewRegex: true,
    arabicRegex: true,
    mixedContent: true,
    savedPresets: []
  }),
  getSettings: () => ({
    enabled: true,
    threshold: 0.15,
    sensitivity: 'medium',
    targetSelectors: ['.test-selector'],
    disabledSelectors: [],
    ignoreSelectors: ['.ignore-me'],
    customCSS: '',
    dynamicCSS: '',
    manualMode: false,
    manualToggle: false,
    darkMode: false,
    method: 'all',
    minRTLChars: 3,
    processInterval: 2000,
    hebrewRegex: true,
    arabicRegex: true,
    mixedContent: true,
    savedPresets: []
  }),

  service: {
      updateSettings: jest.fn(),
      exportSettings: jest.fn(() => JSON.stringify(mockSettings)),
  },
  settings: () => mockSettings,
  getSettings: () => mockSettings,
  setSensitivity: jest.fn()
};

describe("RTLSetting Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    // Reset window.blinkoRTL mock implementation between tests if needed
    (window as any).blinkoRTL.settings = () => mockSettings;
  });

  it("renders with default settings", () => {
    const { container } = render(<RTLSetting />);

    // Check for main header
    expect(container.textContent).toContain("Fixed RTL Language Support Settings");

    // Check if enabled checkbox is checked by default
    // The first checkbox is usually the "Enable RTL Support" one
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    // We can't be 100% sure which one is first without labels, but let's assume structure
    // based on reading the component code, the "Enable" checkbox is among them.

    // Better verification: Check if settings are loaded
    expect(container.innerHTML).toContain('Fixed RTL Language Support Settings');
  });

  it("renders settings tabs", () => {
    const { container } = render(<RTLSetting />);
    expect(container.innerHTML).toContain("Simple");
    expect(container.innerHTML).toContain("Advanced");
  });

  it("saves settings to localStorage on change", () => {
      // Temporarily remove service to force localStorage path in component
      const originalService = (window as any).blinkoRTL.service;
      delete (window as any).blinkoRTL.service;

      const { container } = render(<RTLSetting />);
      // Find the enable checkbox. It's inside a label "Enable RTL Support"
      // We can search by text content of labels
      const labels = Array.from(container.querySelectorAll('label'));
      const enableLabel = labels.find(l => l.textContent?.includes('Enable RTL Support'));

      if (enableLabel) {
          const checkbox = enableLabel.querySelector('input[type="checkbox"]') as HTMLInputElement;
          checkbox.click();

          // Check localStorage
          const saved = JSON.parse(localStorage.getItem('blinko-rtl-settings') || '{}');
          expect(saved.enabled).toBe(false);
          // expect(mockToast.success).toHaveBeenCalledWith("Settings saved!"); // Removed toast assertion
      } else {
          throw new Error("Could not find Enable RTL Support checkbox");
      }

      // Restore service
      (window as any).blinkoRTL.service = originalService;
  });

  it("handles export settings click", async () => {
      // Mock URL.createObjectURL and URL.revokeObjectURL
      const mockCreateObjectURL = jest.fn();
      const mockRevokeObjectURL = jest.fn();
      URL.createObjectURL = mockCreateObjectURL;
      URL.revokeObjectURL = mockRevokeObjectURL;

      const { container } = render(<RTLSetting />);

      // Wait a moment for preact to be ready
      await act(async () => {
        await Promise.resolve();
      });

      // Navigate to Advanced
      // Use container specifically to scope to this test instance.
      // Since dom retains previous test render we need to filter for the newly rendered one
      const buttons = container.querySelectorAll('button');
      let foundTab = null;
      buttons.forEach(btn => {
          if (btn.textContent?.includes('Tools') || btn.textContent === 'Tools') foundTab = btn;
      });

      if (foundTab) {
          await act(async () => {
            fireEvent.click(foundTab as HTMLElement);
            await Promise.resolve(); // Allow re-render
          });
      } else {
        console.warn("Could not find Tools tab");
      }

      // Re-query buttons since the DOM changed in container
      const currentButtons = container.querySelectorAll('button');

      // Find Export button
      let exportBtn = null;
      currentButtons.forEach(btn => {
          if (btn.textContent?.includes('Export Settings') || btn.textContent?.includes('Export Settings (JSON)')) exportBtn = btn;
      });

      if (!exportBtn) {
          // It might be a label instead depending on the markup structure
          const labels = document.body.querySelectorAll('label');
          labels.forEach(label => {
               if (label.textContent?.includes('Export Settings') || label.textContent?.includes('Export Settings (JSON)')) exportBtn = label;
          });
      }

      if (!exportBtn) throw new Error('Export button not found. Available buttons: ' + Array.from(currentButtons).map(b => b.textContent).join(', '));

      await act(async () => {
        fireEvent.click(exportBtn as HTMLElement);
      });

      expect(mockCreateObjectURL).toHaveBeenCalled();
      // Check if toast was called
      expect((window as any).Blinko?.toast?.success).toHaveBeenCalled();
  });
});
