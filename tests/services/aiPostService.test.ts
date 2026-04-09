import { describe, it, expect, beforeEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { AIPostService } from "../../src/services/aiPostService";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe("AIPostService", () => {
  let service: AIPostService;

  beforeEach(() => {
    // We can clear localStorage before each test so we have a clean slate
    localStorage.clear();
    service = new AIPostService();
  });

  describe("buildPrompt", () => {
    it("should safely replace {note} and {tags} containing regex special replacement characters", () => {
      // Set up a custom prompt to test replacement
      service.save({ customPrompt: "System: rewrite {note} with tags {tags}" });

      // $', $&, $1 are special replacement patterns in String.prototype.replace
      const noteContent = "Hello $'";
      const noteTags = [{ name: "tag $&" }];

      const prompt = service.buildPrompt({
        content: noteContent,
        tags: noteTags,
      });

      // If it used a string instead of replacer function, the output would be:
      // "System: rewrite Hello with tags tag $& with tags tag $&" (because $' replaces with the text following the match)
      expect(prompt).toBe("System: rewrite Hello $' with tags tag $&");
    });
  });
});
