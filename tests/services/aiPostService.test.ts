import { describe, it, expect, beforeEach } from 'bun:test';

try {
  const { GlobalRegistrator } = require('@happy-dom/global-registrator');
  GlobalRegistrator.register();
} catch (e) {
  // Ignore in case it's already registered or we're in an environment where it's not needed
}

import { AIPostService } from '../../src/services/aiPostService';

describe('AIPostService', () => {
  let service: AIPostService;

  beforeEach(() => {
    // Clear localStorage before each test to ensure default settings
    localStorage.clear();
    service = new AIPostService();
  });

  describe('buildPrompt', () => {
    it('should correctly build a prompt with simple content and tags', () => {
      const note = {
        content: 'This is a test note.',
        tags: [{ name: 'test' }, { name: 'ai' }],
      };

      service.save({ customPrompt: 'Note: {note}, Tags: {tags}' });
      const prompt = service.buildPrompt(note);

      expect(prompt).toContain('This is a test note.');
      expect(prompt).toContain('test, ai');
    });

    it('should safely build a prompt when content contains regex special characters like $&', () => {
      const note = {
        content: 'Dangerous user content with $& and $` and $\' and $1',
        tags: [{ name: 'secure$&' }],
      };

      // Set a custom prompt that uses the {note} and {tags} placeholders multiple times
      service.save({ customPrompt: 'Prompt: {note}. Tags: {tags}. End {note}' });

      const prompt = service.buildPrompt(note);

      // If the bug existed, $& would be replaced by '{note}' (the matched string)
      expect(prompt).toBe('Prompt: Dangerous user content with $& and $` and $\' and $1. Tags: secure$&. End Dangerous user content with $& and $` and $\' and $1');

      // Ensure the literal $& is preserved in the output
      expect(prompt).toContain('$&');
    });

    it('should handle undefined tags gracefully', () => {
       const note = {
         content: 'No tags here',
       };
       service.save({ customPrompt: 'Note: {note}, Tags: {tags}' });

       const prompt = service.buildPrompt(note);
       expect(prompt).toBe('Note: No tags here, Tags: ');
    });
  });
});
