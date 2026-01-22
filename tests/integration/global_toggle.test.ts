import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { RTLService } from "../../src/services/rtlService";
import { RTLDetector } from "../../src/utils/rtlDetector";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe("Global Toggle Integration", () => {
    let service: RTLService;
    let detector: RTLDetector;

    beforeEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        localStorage.clear();
        (window as any).Blinko = undefined;

        detector = new RTLDetector();
        service = new RTLService(detector);
        service.enable();
    });

    afterEach(() => {
        service.disable();
    });

    it("should toggle direction for main layout and editor elements", () => {
        // Setup DOM with main layout and editor elements
        document.body.innerHTML = `
            <div class="card-masonry-grid" id="main-layout">
                <div class="markdown-body">
                    <p id="card-text">שלום</p>
                </div>
            </div>
            <div class="vditor-reset" id="editor">
                <p id="editor-text">שלום</p>
            </div>
        `;

        // Initially detection might be auto
        // Manually toggle to force RTL
        service.toggleManual(); // Sets manualToggle = true, effectively forcing RTL on everything matching selectors

        // We need to wait for debounce or force process
        service.processAllElements();

        const mainLayout = document.getElementById('main-layout') as HTMLElement;
        const cardText = document.getElementById('card-text') as HTMLElement;
        const editorText = document.getElementById('editor-text') as HTMLElement;

        // Verify Main Layout Container (added in previous step)
        expect(mainLayout.classList.contains('rtl-force')).toBe(true);

        // Verify Card Text
        expect(cardText.classList.contains('rtl-force')).toBe(true);

        // Verify Editor Text
        expect(editorText.classList.contains('rtl-force')).toBe(true);
    });

    it("should apply to newly added layout elements when manual toggle is on", () => {
        service.updateSettings({ manualToggle: true });

        const newCard = document.createElement('div');
        newCard.className = 'card-masonry-grid';
        newCard.id = 'new-card';
        document.body.appendChild(newCard);

        // The issue is likely that adding to body doesn't trigger the observer immediately or processElement logic is skipped
        // because newCard is empty or doesn't have text.
        // Let's add text to make sure it's valid for processing if text check is involved
        // Although layout containers should be processed regardless of text if they match selectors?
        // processElement checks: if (!text.trim() || text.length < this.settings.minRTLChars) -> return
        // BUT we want layout containers to be forced RTL if manual toggle is on?
        // Actually, if it's empty, processElement returns early.
        // So let's add content.
        newCard.textContent = "Test Content";

        service.processElement(newCard);

        expect(newCard.classList.contains('rtl-force')).toBe(true);
    });
});
