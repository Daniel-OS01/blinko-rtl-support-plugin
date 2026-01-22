
import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { DEFAULT_TARGET_SELECTORS } from "../../src/services/constants";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("RTLService Integration Flow", () => {
  let service: RTLService;
  let detector: RTLDetector;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    detector = new RTLDetector();
    service = new RTLService(detector);
  });

  afterEach(() => {
    service.disable();
    jest.clearAllMocks();
  });

  it("should detect and process main layout (masonry grid) elements", () => {
    // Setup Mock DOM structure for Masonry Grid
    const grid = document.createElement('div');
    grid.className = 'card-masonry-grid';

    const card = document.createElement('div');
    card.className = 'markdown-body';
    card.textContent = 'שלום עולם'; // Hebrew

    grid.appendChild(card);
    document.body.appendChild(grid);

    // Enable Service
    service.enable();

    // Manual trigger for test
    service.processElement(card);

    // Verify RTL class is applied
    expect(card.classList.contains('rtl-force')).toBe(true);
    expect(card.classList.contains('ltr-force')).toBe(false);
  });

  it("should toggle service and re-process elements", async () => {
     // Create structure matching .markdown-body p
     const container = document.createElement('div');
     container.className = 'markdown-body';

     const p = document.createElement('p');
     p.textContent = 'שלום';

     container.appendChild(p);
     document.body.appendChild(container);

     // Initially disabled
     expect(service.isEnabled()).toBe(false);

     // Toggle ON
     service.toggle();
     expect(service.isEnabled()).toBe(true);

     // Manually trigger process to bypass debounce in test
     service.processAllElements();

     // Should process
     expect(p.classList.contains('rtl-force')).toBe(true);

     // Toggle OFF
     service.toggle();
     expect(service.isEnabled()).toBe(false);

     // Verify CSS injection is removed
     const style = document.getElementById('blinko-rtl-dynamic-css');
     expect(style).toBeNull();
  });

  it("should respect new target selectors in constants", () => {
      expect(DEFAULT_TARGET_SELECTORS).toContain('.card-masonry-grid .markdown-body');
  });
});
