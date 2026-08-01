/**
 * Regression guard for the code-block RTL ratio.
 *
 * processElement() treats `pre`/`code` specially: it computes the share of RTL
 * characters among non-whitespace characters and only calls the block RTL above
 * 0.6. That whitespace test used to be `/\s/`, which is Unicode-aware. When it
 * was rewritten as a charCode loop for performance, a naive version counting
 * only space/tab/LF/CR would treat NBSP-indented code as significant content
 * and dilute the ratio — silently flipping RTL code blocks to LTR.
 */

import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { RTLService } from '../src/services/rtlService';
import { RTLDetector } from '../src/utils/rtlDetector';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

describe('code block direction is unaffected by the flavour of whitespace', () => {
  let service: RTLService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    service = new RTLService(new RTLDetector());
    service.enable();
    service.updateSettings({ method: 'css', minRTLChars: 1 });
  });

  afterEach(() => {
    service.disable();
  });

  function classify(text: string): string {
    const pre = document.createElement('pre');
    pre.textContent = text;
    document.body.appendChild(pre);
    service.processElement(pre);
    return pre.className;
  }

  // Single letters, so that the separators make up roughly half the string.
  // With Unicode-aware whitespace handling the ratio is 1.0 (RTL); counting the
  // separators as significant content drops it to ~0.53, below the 0.6 cutoff.
  // That gap is what makes these cases discriminating rather than decorative.
  const HEBREW_LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'];

  const separators: [string, string][] = [
    ['space (U+0020)', '\u0020'],
    ['no-break space (U+00A0)', '\u00A0'],
    ['tab (U+0009)', '\u0009'],
    ['newline (U+000A)', '\u000A'],
    ['en space (U+2002)', '\u2002'],
    ['narrow no-break space (U+202F)', '\u202F'],
    ['ideographic space (U+3000)', '\u3000'],
  ];

  for (const [label, sep] of separators) {
    it(`Hebrew separated by ${label} is RTL`, () => {
      expect(classify(HEBREW_LETTERS.join(sep))).toBe('rtl-force');
    });
  }

  it('NBSP-indented Hebrew stays RTL', () => {
    // Indentation pasted from a rich-text source often arrives as NBSP runs.
    const indented = ['שלום', 'עולם', 'טוב'].map((w) => '\u00A0'.repeat(8) + w).join('\n');
    expect(classify(indented)).toBe('rtl-force');
  });

  it('an all-whitespace code block does not divide by zero', () => {
    expect(() => classify('   ')).not.toThrow();
  });

  it('English code stays LTR regardless of separator', () => {
    expect(classify('const x = 1;  const y = 2;')).toBe('ltr-force');
  });

  it('a Hebrew comment in mostly-Latin code stays LTR (below the 0.6 ratio)', () => {
    expect(classify('const total = price * qty; // סכום כולל')).toBe('ltr-force');
  });
});
