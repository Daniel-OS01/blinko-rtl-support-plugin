import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLSetting } from "../../src/setting";
import { render } from "@testing-library/preact";
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
  getSettings: () => ({
    enabled: true,
    threshold: 0.15,
    sensitivity: 'medium',
    targetSelectors: ['.test-selector'],
    disabledSelectors: [],
    ignoreSelectors: ['.ignore-me'],
    customCSS: '',
    permanentCSS: false,
    dynamicCSS: '',
    savedPresets: []
  }),
=======
  service: {
      updateSettings: jest.fn()
  },
  settings: () => mockSettings,
  getSettings: () => mockSettings,
>>>>>>> origin/feature/dynamic-css-and-debugger-fixes-4504871108341601287
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

  it("renders mobile view toggle", () => {
    const { container } = render(<RTLSetting />);
    expect(container.textContent).toContain("Mobile View");
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
      } else {
          throw new Error("Could not find Enable RTL Support checkbox");
      }

      // Restore service
      (window as any).blinkoRTL.service = originalService;
  });
});
