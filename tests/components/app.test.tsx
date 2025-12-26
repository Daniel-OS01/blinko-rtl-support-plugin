import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLApp } from "../../src/app";
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
  setSensitivity: jest.fn(),
  getSettings: jest.fn().mockReturnValue({ threshold: 0.15 })
};

describe("RTLApp Component", () => {
  let mockDetector;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockDetector = { detectRTL: jest.fn() };
  });

  it("renders with stats", () => {
    (window.blinkoRTL.getStats as jest.Mock).mockReturnValue(5);
    const { container } = render(<RTLApp detector={mockDetector} />);

    // Check for header
    expect(container.textContent).toContain("RTL Control Center");
    // Check for stats
    expect(container.textContent).toContain("5");
    expect(container.textContent).toContain("Active RTL Blocks");
  });

  it("handles fix selection click", () => {
     const { container, getAllByText } = render(<RTLApp detector={mockDetector} />);
     // Using getAllByText since text might be split or duplicated in some SVG/icon scenarios or just to be safe
     const fixButton = getAllByText(/Fix Selected Text/i)[0];

     fixButton.click();

     expect(window.blinkoRTL.fixSelection).toHaveBeenCalled();
  });

  it("updates sensitivity", () => {
     const { container } = render(<RTLApp detector={mockDetector} />);
     const slider = container.querySelector('input[type="range"]') as HTMLInputElement;

     // default 15
     expect(slider.value).toBe("15");

     // change
     slider.value = "20";
     slider.dispatchEvent(new Event('change', { bubbles: true }));

     expect(window.blinkoRTL.setSensitivity).toHaveBeenCalledWith(0.2);
  });
});
