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

    // ─── Toast button action tests ─────────────────────────────────────────────

    describe("toast button actions", () => {
        const mixedText = "Hello שלום Hello שלום";
        // Use textarea: processSplit returns multiline text, and input[type="text"]
        // strips newlines per the HTML spec, making split-result assertions incorrect.
        let target: HTMLTextAreaElement;

        beforeEach(() => {
            target = document.createElement("textarea");
            target.value = "";
            container.appendChild(target);
        });

        function getToastButton(selector: string): HTMLElement {
            const toast = document.querySelector(".rtl-paste-toast");
            expect(toast).not.toBeNull();
            const btn = toast!.querySelector<HTMLElement>(selector);
            expect(btn).not.toBeNull();
            return btn!;
        }

        it("Split button inserts split text and removes toast", () => {
            (interceptor as any).showSuggestionToast(mixedText, target);
            expect(document.querySelector(".rtl-paste-toast")).not.toBeNull();

            const expected = (interceptor as any).processSplit(mixedText);
            getToastButton("#rtl-btn-split").click();

            expect(target.value).toBe(expected);
            expect(document.querySelector(".rtl-paste-toast")).toBeNull();
        });

        it("Wrap button inserts text with Unicode isolation and removes toast", () => {
            (interceptor as any).showSuggestionToast(mixedText, target);

            const expected = (interceptor as any).processWrap(mixedText);
            expect(expected).toContain("⁧"); // RLI
            expect(expected).toContain("⁩"); // PDI

            getToastButton("#rtl-btn-wrap").click();

            expect(target.value).toBe(expected);
            expect(document.querySelector(".rtl-paste-toast")).toBeNull();
        });

        it("Original button inserts text literally and removes toast", () => {
            (interceptor as any).showSuggestionToast(mixedText, target);

            getToastButton("#rtl-btn-original").click();

            expect(target.value).toBe(mixedText);
            expect(document.querySelector(".rtl-paste-toast")).toBeNull();
        });

        it("Original button treats markup-like clipboard text as plain text", () => {
            // The text contains HTML-looking content; it must land verbatim
            // and must not produce any injected elements in the document.
            // A unique ID on the script tag lets us assert specifically that
            // this exact element was never created, ruling out false negatives
            // from unrelated <script> tags that may already exist in the DOM.
            const markupText = '<script id="rtl-test-injection">alert(1)</script> שלום Hello שלום';
            (interceptor as any).showSuggestionToast(markupText, target);

            getToastButton("#rtl-btn-original").click();

            expect(target.value).toBe(markupText);
            expect(document.querySelector("#rtl-test-injection")).toBeNull();
            expect(document.querySelector(".rtl-paste-toast")).toBeNull();
        });

        it("Close button removes toast without inserting content", () => {
            (interceptor as any).showSuggestionToast(mixedText, target);
            expect(document.querySelector(".rtl-paste-toast")).not.toBeNull();

            getToastButton(".rtl-toast-close").click();

            expect(target.value).toBe("");
            expect(document.querySelector(".rtl-paste-toast")).toBeNull();
        });

        it("repeated paste while toast is visible replaces the existing toast", () => {
            (interceptor as any).showSuggestionToast(mixedText, target);
            const first = document.querySelector(".rtl-paste-toast");
            expect(first).not.toBeNull();

            (interceptor as any).showSuggestionToast(mixedText, target);

            const all = document.querySelectorAll(".rtl-paste-toast");
            expect(all.length).toBe(1);
            expect(all[0]).not.toBe(first); // a new node, not the old one
        });
    });
});
