import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { AIPostService } from "../../src/services/aiPostService";
import { DEFAULT_AI_POST_SETTINGS, AIPostSettings } from "../../src/types";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe("AIPostService", () => {
    let service: AIPostService;

    beforeEach(() => {
        localStorage.clear();
        service = new AIPostService();
    });

    describe("Persistence", () => {
        it("should load default settings initially", () => {
            const settings = service.getSettings();
            expect(settings).toEqual(DEFAULT_AI_POST_SETTINGS);
        });

        it("should save and load settings", () => {
            const patch: Partial<AIPostSettings> = { enabled: false, blinkoApiUrl: "https://test.com" };
            service.save(patch);

            const loadedSettings = service.getSettings();
            expect(loadedSettings.enabled).toBe(false);
            expect(loadedSettings.blinkoApiUrl).toBe("https://test.com");
            expect(loadedSettings.customPrompt).toBe(DEFAULT_AI_POST_SETTINGS.customPrompt);

            // test load directly via new instance
            const newService = new AIPostService();
            const newSettings = newService.getSettings();
            expect(newSettings.enabled).toBe(false);
            expect(newSettings.blinkoApiUrl).toBe("https://test.com");
        });

        it("should gracefully handle bad localstorage data", () => {
            localStorage.setItem('blinko-ai-post-settings', '{bad json');
            const newService = new AIPostService();
            const newSettings = newService.getSettings();
            expect(newSettings).toEqual(DEFAULT_AI_POST_SETTINGS);
        });
    });

    describe("Prompt building", () => {
        it("should replace {note} and {tags} in custom prompt", () => {
            service.save({ customPrompt: "Note: {note}, Tags: {tags}" });

            const noteRef = {
                content: "Hello world",
                tags: [{ name: "test1" }, { name: "test2" }]
            };

            const prompt = service.buildPrompt(noteRef);
            expect(prompt).toBe("Note: Hello world, Tags: test1, test2");
        });

        it("should handle empty note gracefully", () => {
            service.save({ customPrompt: "Note: {note}, Tags: {tags}" });

            const prompt = service.buildPrompt({});
            expect(prompt).toBe("Note: , Tags: ");
        });

        it("should handle missing tags gracefully", () => {
            service.save({ customPrompt: "Note: {note}, Tags: {tags}" });

            const noteRef = {
                content: "Hello world"
            };

            const prompt = service.buildPrompt(noteRef);
            expect(prompt).toBe("Note: Hello world, Tags: ");
        });

        it("should handle empty or null tag names gracefully", () => {
            service.save({ customPrompt: "Note: {note}, Tags: {tags}" });

            const noteRef = {
                content: "Hello world",
                tags: [{ name: "test1" }, { name: "" }, { name: null as any }]
            };

            const prompt = service.buildPrompt(noteRef);
            expect(prompt).toBe("Note: Hello world, Tags: test1");
        });
    });

    describe("Utility functions", () => {
        it("should export note as markdown", () => {
             // Mock DOM elements and methods
            const createElementSpy = jest.spyOn(document, 'createElement');
            const mockAnchor = {
                href: '',
                download: '',
                click: jest.fn(),
            } as unknown as HTMLAnchorElement;
            createElementSpy.mockReturnValue(mockAnchor);

            // Mock URL methods
            const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-url');
            const revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

            const noteRef = {
                id: 123,
                content: "# Test Note"
            };

            service.exportNoteAsMarkdown(noteRef);

            expect(createElementSpy).toHaveBeenCalledWith('a');
            expect(createObjectURLSpy).toHaveBeenCalled();
            expect(mockAnchor.href).toBe('blob:test-url');
            expect(mockAnchor.download).toMatch(/^blinko-note-123\.md$/);
            expect(mockAnchor.click).toHaveBeenCalled();
            expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:test-url');

            // Clean up
            createElementSpy.mockRestore();
            createObjectURLSpy.mockRestore();
            revokeObjectURLSpy.mockRestore();
        });
    });

    describe("AI operations", () => {
        let service: AIPostService;
        beforeEach(() => {
            localStorage.clear();
            service = new AIPostService();
        });
        let originalFetch: typeof fetch;

        beforeEach(() => {
            originalFetch = window.fetch;
        });

        afterEach(() => {
            window.fetch = originalFetch;
        });

        it("runAutoTag should return tags on success", async () => {
            // Mock tRPC response
            const mockResponse = { result: { data: { json: ["tag1", "tag2"] } } };
            window.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockResponse
            }) as any;

            const tags = await service.runAutoTag({ content: "Test content" });

            expect(tags).toEqual(["tag1", "tag2"]);
            expect(window.fetch).toHaveBeenCalledWith('/api/trpc/ai.autoTag', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'x-trpc-source': 'blinko-rtl-plugin'
                }),
                body: JSON.stringify({ json: { content: "Test content" } })
            }));
        });

        it("runAutoTag should return empty array if content is empty", async () => {
             window.fetch = jest.fn() as any;
             const tags = await service.runAutoTag({ content: "   " });
             expect(tags).toEqual([]);
             expect(window.fetch).not.toHaveBeenCalled();
        });

        it("runAutoTag should handle 401 error with helpful message", async () => {
            window.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 401,
                statusText: "Unauthorized"
            }) as any;

            await expect(service.runAutoTag({ content: "Test" })).rejects.toThrow(/AI auto-tag requires an API key/);
        });

        it("updateNoteContent should use REST API if token is configured", async () => {
            service.save({ blinkoApiUrl: "https://api.test.com", blinkoApiToken: "secret123" });

            window.fetch = jest.fn().mockResolvedValue({
                ok: true
            }) as any;

            await service.updateNoteContent(456, "Updated text");

            expect(window.fetch).toHaveBeenCalledWith('https://api.test.com/api/v1/note/upsert', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer secret123'
                }),
                body: JSON.stringify({ id: 456, content: "Updated text" })
            }));
        });

        it("updateNoteContent should fallback to tRPC if token is not configured", async () => {
            service.save({ blinkoApiUrl: "", blinkoApiToken: "" });

            window.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({})
            }) as any;

            await service.updateNoteContent(456, "Updated text");

            expect(window.fetch).toHaveBeenCalledWith('/api/trpc/note.upsert', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ json: { id: 456, content: "Updated text" } })
            }));
        });
    });

    describe("AI operations - Post Processing", () => {
        let service: AIPostService;
        let originalFetch: typeof fetch;

        beforeEach(() => {
            localStorage.clear();
            service = new AIPostService();
            originalFetch = window.fetch;
        });

        afterEach(() => {
            window.fetch = originalFetch;
        });

        it("runPostProcessing should handle standard text response", async () => {
            const mockResponse = { result: { data: { json: "New content" } } };
            window.fetch = jest.fn().mockResolvedValue({
                ok: true,
                headers: new Headers({ 'Content-Type': 'application/json' }),
                json: async () => mockResponse
            }) as any;

            const content = await service.runPostProcessing({ content: "Test" });

            expect(content).toBe("New content");
            expect(window.fetch).toHaveBeenCalledWith('/api/trpc/ai.writing', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
                body: expect.stringContaining("Test")
            }));
        });

        it("runPostProcessing should throw error on 401", async () => {
            window.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 401,
                statusText: "Unauthorized"
            }) as any;

            await expect(service.runPostProcessing({ content: "Test" })).rejects.toThrow(/AI feature requires an API key/);
        });
    });


    describe("Utility functions - copyNoteContent", () => {
        let service: AIPostService;

        beforeEach(() => {
            localStorage.clear();
            service = new AIPostService();
        });

        it("should copy via modern clipboard API if available", async () => {
            const originalClipboard = navigator.clipboard;

            // Mock clipboard API via Object.defineProperty
            Object.defineProperty(navigator, 'clipboard', {
                value: { writeText: jest.fn().mockResolvedValue(undefined) },
                configurable: true
            });

            await service.copyNoteContent({ content: "Test copy" });

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test copy");

            // Restore clipboard
            Object.defineProperty(navigator, 'clipboard', {
                value: originalClipboard,
                configurable: true
            });
        });

        it("should copy via fallback if clipboard API not available", async () => {
            const originalClipboard = navigator.clipboard;

            // Remove clipboard API
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                configurable: true
            });

            const createElementSpy = jest.spyOn(document, 'createElement');
            const appendChildSpy = jest.spyOn(document.body, 'appendChild');
            const removeChildSpy = jest.spyOn(document.body, 'removeChild');
            document.execCommand = jest.fn().mockReturnValue(true);
            const execCommandSpy = jest.spyOn(document, 'execCommand');

            const mockTextarea = document.createElement('textarea');
            mockTextarea.select = jest.fn();
            createElementSpy.mockReturnValue(mockTextarea);

            await service.copyNoteContent({ content: "Test fallback copy" });

            expect(createElementSpy).toHaveBeenCalledWith('textarea');
            expect(mockTextarea.value).toBe("Test fallback copy");
            expect(mockTextarea.style.position).toBe('fixed');
            expect(appendChildSpy).toHaveBeenCalledWith(mockTextarea);
            expect(mockTextarea.select).toHaveBeenCalled();
            expect(execCommandSpy).toHaveBeenCalledWith('copy');
            expect(removeChildSpy).toHaveBeenCalledWith(mockTextarea);

            createElementSpy.mockRestore();
            appendChildSpy.mockRestore();
            removeChildSpy.mockRestore();
            execCommandSpy.mockRestore();

            // Restore clipboard
            Object.defineProperty(navigator, 'clipboard', {
                value: originalClipboard,
                configurable: true
            });
        });
    });
});
