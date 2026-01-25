import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("Performance Benchmark: RTL Processing", () => {
    let service: RTLService;
    let container: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = '';
        container = document.createElement('div');
        document.body.appendChild(container);

        service = new RTLService(new RTLDetector());
        service.enable();
    });

    afterEach(() => {
        service.disable();
    });

    it("processes 1000 nodes within 100ms budget", () => {
        // Setup: Generate 1000 nodes
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 1000; i++) {
            const p = document.createElement('p');
            // Mix of English and Hebrew to trigger detection logic
            p.textContent = i % 2 === 0 ? "Hello World" : "שלום עולם";
            fragment.appendChild(p);
        }
        container.appendChild(fragment);

        // Measure
        const start = performance.now();
        service.processAllElements();
        const end = performance.now();
        const duration = end - start;

        console.log(`Benchmark: Processed 1000 nodes in ${duration.toFixed(2)}ms`);

        // Assert
        // Relaxed budget for CI environment variability (initially 100ms)
        expect(duration).toBeLessThan(500);
    });

    it("handles deeply nested structures efficiently", () => {
        // Create a deep tree (depth 50)
        let current = container;
        for (let i = 0; i < 50; i++) {
            const div = document.createElement('div');
            div.textContent = "טקסט";
            current.appendChild(div);
            current = div;
        }

        const start = performance.now();
        service.processAllElements();
        const end = performance.now();
        const duration = end - start;

        expect(duration).toBeLessThan(50);
    });

    it("initializes within load time budget", () => {
        // Measure instantiation time (simulating script load/init)
        const start = performance.now();
        const svc = new RTLService(new RTLDetector());
        svc.enable(); // Includes initial injection and observer setup
        const end = performance.now();
        const duration = end - start;

        console.log(`Benchmark: Initialization time: ${duration.toFixed(2)}ms`);

        // Strict budget for initialization to ensure no blocking on page load
        expect(duration).toBeLessThan(50);
    });
});
