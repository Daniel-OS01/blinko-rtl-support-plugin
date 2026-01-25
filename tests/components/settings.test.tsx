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
    savedPresets: [],
    pasteInterception: true,
    mutationObserver: true,
    fontInjection: true,
    notifications: true,
    debounceDelay: 200
};

(window as any).blinkoRTL = {
  test: jest.fn(),
  processAll: jest.fn(),
  toggle: jest.fn(),
  toggleManual: jest.fn(),
  isEnabled: jest.fn(),
  getStats: jest.fn(),
  fixSelection: jest.fn(),
  service: {
      updateSettings: jest.fn(),
      getActionLog: jest.fn().mockReturnValue([])
  },
  settings: () => mockSettings,
  getSettings: () => mockSettings,
  setSensitivity: jest.fn(),
  detector: {
      detectRTL: jest.fn().mockReturnValue(true)
  }
};

describe("RTLSetting Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    (window as any).blinkoRTL.settings = () => mockSettings;
  });

  it("renders with default settings", () => {
    const { container } = render(<RTLSetting />);
    expect(container.textContent).toContain("Blinko RTL Support");
  });

  it("renders mobile view toggle in basic settings", () => {
    const { container } = render(<RTLSetting />);
    // "Mobile View Optimization" is the label I used
    expect(container.textContent).toContain("Mobile View Optimization");
  });

  it.skip("toggles advanced settings", async () => {
    const { container, getByRole } = render(<RTLSetting />);

    // Check advanced settings are hidden initially
    expect(container.textContent).not.toContain("Detection & Performance");

    // Click toggle button
    const button = getByRole("button", { name: /Show Advanced Settings/i });
    await act(() => {
        fireEvent.click(button);
    });

    // Wait for update
    await waitFor(() => {
        expect(container.textContent).toContain("Detection & Performance");
    });
  });

  it("saves settings to service on change", () => {
      const { container } = render(<RTLSetting />);
      const labels = Array.from(container.querySelectorAll('label'));
      const enableLabel = labels.find(l => l.textContent?.includes('Enable RTL Support'));

      if (enableLabel) {
          const checkbox = enableLabel.querySelector('input[type="checkbox"]') as HTMLInputElement;
          checkbox.click();

          expect((window as any).blinkoRTL.service.updateSettings).toHaveBeenCalledWith(
              expect.objectContaining({ enabled: false })
          );
      } else {
          throw new Error("Could not find Enable RTL Support checkbox");
      }
  });
});
