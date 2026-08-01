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

  // Regression guard: this path used to test characters against its own
  // hardcoded Hebrew/Arabic-only range table instead of the shared one in
  // src/utils/strategies/rtlRanges.ts, so it disagreed with how the same text
  // is classified outside a code block.
  it('Thaana code content is RTL (script parity with prose detection)', () => {
    const thaana = [0x0780, 0x0781, 0x0782, 0x0783, 0x0784, 0x0785, 0x0786, 0x0787, 0x0788, 0x0789]
      .map((cp) => String.fromCodePoint(cp))
      .join(' ');
    expect(classify(thaana)).toBe('rtl-force');
  });

  // Regression guard: scanning by charCodeAt() (UTF-16 code unit) instead of
  // by code point means a surrogate pair is only ever seen as two lone
  // halves, neither of which falls in any RTL range — astral RTL scripts
  // such as Adlam (U+1E900-1E95F) could never be detected in code blocks.
  it('astral RTL (Adlam) code content is RTL', () => {
    const adlam = [0x1E900, 0x1E901, 0x1E902, 0x1E903, 0x1E904, 0x1E905, 0x1E906, 0x1E907, 0x1E908, 0x1E909]
      .map((cp) => String.fromCodePoint(cp))
      .join(' ');
    expect(classify(adlam)).toBe('rtl-force');
  });
});
