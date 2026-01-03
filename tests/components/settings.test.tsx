import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLSetting } from "../../src/setting";
import { render } from "@testing-library/preact";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { h } from "preact";

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

window.Blinko = {
  toast: mockToast,
  i18n: { t: (key) => key }
};

window.blinkoRTL = {
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
<<<<<<< HEAD
    // ignoreSelectors: ['.ignore-me'], // Removed invalid field
    disabledSelectors: [] // Added missing field to prevent test crash
=======
    disabledSelectors: [],
    ignoreSelectors: ['.ignore-me'],
    customCSS: '',
    permanentCSS: false,
    dynamicCSS: '',
    savedPresets: []
>>>>>>> origin/feature/rtl-fixes-and-debugger-11920993813796489735
  }),
  getSettings: () => ({
    enabled: true,
    threshold: 0.15,
    sensitivity: 'medium',
    targetSelectors: ['.test-selector'],
<<<<<<< HEAD
    // ignoreSelectors: ['.ignore-me'], // Removed invalid field
    disabledSelectors: [] // Added missing field
=======
    disabledSelectors: [],
    ignoreSelectors: ['.ignore-me'],
    customCSS: '',
    permanentCSS: false,
    dynamicCSS: '',
    savedPresets: []
>>>>>>> origin/feature/rtl-fixes-and-debugger-11920993813796489735
  }),
  setSensitivity: jest.fn()
};

describe("RTLSetting Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders with default settings", () => {
    const { container } = render(<RTLSetting />);

    // Check for main header
    expect(container.textContent).toContain("Fixed RTL Language Support Settings");

    // Check if enabled checkbox is checked by default
    const enableCheckbox = container.querySelector('input[type="checkbox"]');
    expect(enableCheckbox).not.toBeNull();
    expect((enableCheckbox as HTMLInputElement).checked).toBe(true);
  });

  it("renders mobile view toggle", () => {
    const { container } = render(<RTLSetting />);
    expect(container.textContent).toContain("Mobile View");

    // Check if it toggles
    // We can't easily find the specific checkbox by label text without more advanced queries or aria-label,
    // but we can look for the "Mobile View" text parent
  });

  it("saves settings to localStorage on change", () => {
      const { container } = render(<RTLSetting />);
      const enableCheckbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

      // Toggle it
      enableCheckbox.click();

      // Check localStorage
      const saved = JSON.parse(localStorage.getItem('blinko-rtl-settings') || '{}');
      expect(saved.enabled).toBe(false);
      // Toast has been removed for implicit saves in recent changes
      // expect(mockToast.success).toHaveBeenCalledWith("Settings saved!");
  });
});
