import { describe, it, expect, beforeEach, mock, afterEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { PasteInterceptor } from "../../src/utils/pasteInterceptor";
import { RTLDetector } from "../../src/utils/rtlDetector";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe("PasteInterceptor", () => {
    let detector: RTLDetector;
    let interceptor: PasteInterceptor;
    let container: HTMLElement;

    beforeEach(() => {
        // Setup DOM environment
        container = document.createElement("div");
        document.body.appendChild(container);

        detector = new RTLDetector();
        interceptor = new PasteInterceptor(detector);
        interceptor.enable();
    });

    afterEach(() => {
        interceptor.disable();
        document.body.removeChild(container);
        document.body.innerHTML = '';
    });

    it("should process mixed content in input elements", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = "Initial";
        container.appendChild(input);

        // Mock mixed content: >3 Hebrew and >3 English chars
        const mixedText = "Hello שלום Hello שלום";

        // We can't easily trigger a real 'paste' event that carries clipboard data in this environment
        // without complex mocking of ClipboardEvent.
        // Instead, we can test the `insertText` logic if we can access it,
        // or mock the private method call?
        // Better: We expose a public method or trigger the event handler manually.

        // Let's rely on the fact that we are refactoring internal logic.
        // We will test the 'insertText' private method by casting to any.

        input.focus();
        input.setSelectionRange(7, 7); // End of "Initial"

        (interceptor as any).insertText(input, mixedText);

        expect(input.value).toBe("InitialHello שלום Hello שלום");
    });

    it("should process mixed content in contenteditable elements", () => {
        const div = document.createElement("div");
        div.contentEditable = "true";
        div.innerHTML = "Start ";
        container.appendChild(div);

        const mixedText = "End";

        // Mock Selection and Range
        const range = document.createRange();
        const textNode = div.firstChild as Text;
        range.setStart(textNode, 6); // After "Start "
        range.setEnd(textNode, 6);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);

        (interceptor as any).insertText(div, mixedText);

        expect(div.textContent).toBe("Start End");
    });
});
