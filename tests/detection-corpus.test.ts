/**
 * Golden corpus for RTL detection and direction application.
 *
 * This file is the reference guard for the plugin's main feature. It has two
 * kinds of test:
 *
 *   INVARIANT       — behavior that is correct today and must never change.
 *                     A failure here is a regression.
 *
 *   CHARACTERIZATION — behavior that is *currently* wrong or ambiguous, pinned
 *                     so it cannot change silently. Each case names the finding
 *                     it documents (F-xx in .planning/…/findings.md) and what it
 *                     should become. When that finding is fixed, the assertion
 *                     is expected to flip — deliberately, in the same commit.
 *
 * Every assertion below was measured against the implementation, not assumed.
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { RTLDetector } from '../src/utils/rtlDetector';
import { CharacterCodeStrategy } from '../src/utils/strategies/CharacterCodeStrategy';
import { RegexStrategy } from '../src/utils/strategies/RegexStrategy';
import { RTLService } from '../src/services/rtlService';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

type Sensitivity = 'high' | 'medium' | 'low';
const SENSITIVITIES: Sensitivity[] = ['high', 'medium', 'low'];

/** Threshold mapping duplicated from RTLDetector.getThresholdFromSensitivity. */
const THRESHOLD: Record<Sensitivity, number> = { high: 0.1, medium: 0.15, low: 0.4 };

function detectWith(sensitivity: Sensitivity, text: string, minRTLChars = 1): boolean {
  return new RTLDetector({ sensitivity, minRTLChars }).detectRTL(text);
}

function charCode(sensitivity: Sensitivity, text: string, minRTLChars = 1): boolean {
  return new CharacterCodeStrategy({ sensitivity, minRTLChars, sampleSize: 100 }).detect(text);
}

function regex(sensitivity: Sensitivity, text: string, minRTLChars = 1): boolean {
  return new RegexStrategy(true, true, THRESHOLD[sensitivity], minRTLChars).detect(text);
}

// ─────────────────────────────────────────────────────────────────────────────
// INVARIANTS
// ─────────────────────────────────────────────────────────────────────────────

describe('corpus / INVARIANT: unambiguous RTL is detected at every sensitivity', () => {
  const cases: [string, string][] = [
    ['Hebrew, two words', 'שלום עולם'],
    ['Hebrew, full sentence', 'זהו משפט ארוך בעברית עם כמה מילים'],
    ['Arabic', 'مرحبا بالعالم'],
    ['Persian', 'سلام دنیا چطوری'],
    ['Urdu', 'ہیلو دنیا'],
    ['Hebrew presentation forms', 'ﬡﬢﬣﬤ'],
    ['Hebrew with Latin digits', 'שלום 123 עולם'],
    ['Hebrew separated by spaces', 'ש ל ו ם'],
  ];

  for (const [label, text] of cases) {
    for (const sensitivity of SENSITIVITIES) {
      it(`${label} @ ${sensitivity}`, () => {
        expect(detectWith(sensitivity, text)).toBe(true);
      });
    }
  }
});

describe('corpus / INVARIANT: unambiguous non-RTL is never detected', () => {
  const cases: [string, string][] = [
    ['English, short', 'Hello world'],
    ['English, long', 'This is a fairly long English sentence used as a control case.'],
    ['English with one Hebrew word', 'This is quite a long English sentence that happens to contain שלום inside it'],
    ['digits only', '12345'],
    ['punctuation only', '!!!...???'],
    ['empty string', ''],
    ['whitespace only', '   '],
  ];

  for (const [label, text] of cases) {
    for (const sensitivity of SENSITIVITIES) {
      it(`${label} @ ${sensitivity}`, () => {
        expect(detectWith(sensitivity, text)).toBe(false);
      });
    }
  }
});

describe('corpus / INVARIANT: sensitivity is monotonic', () => {
  // Anything detected at the strictest setting must also be detected at looser
  // ones. This is the one structural promise the sensitivity scale makes.
  const samples = [
    'שלום עולם',
    'مرحبا بالعالم',
    'Hello world',
    'שלום עולם this is a test',
    'https://example.com/עמוד',
    '12345',
  ];

  for (const text of samples) {
    it(`low ⊆ medium ⊆ high for ${JSON.stringify(text.slice(0, 28))}`, () => {
      const high = detectWith('high', text);
      const medium = detectWith('medium', text);
      const low = detectWith('low', text);
      if (low) expect(medium).toBe(true);
      if (medium) expect(high).toBe(true);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DETECTION ENGINE
//
// These began as CHARACTERIZATION cases pinning incorrect behaviour. Phase 4
// fixed the underlying findings, so each was flipped deliberately and is now an
// invariant. The comments record what the behaviour used to be, because that is
// what the assertions are guarding against returning to.
// ─────────────────────────────────────────────────────────────────────────────

describe('corpus / INVARIANT: both strategies cover the same RTL scripts', () => {
  // Both now draw their range set from rtlRanges.ts. They previously carried
  // separate copies — one numeric, one as regex pattern strings — which had
  // already drifted: Syriac and Thaana were detected by one and not the other.
  const scripts: [string, string, string][] = [
    ['Hebrew', 'שלום עולם', 'U+0590–05FF'],
    ['Arabic', 'مرحبا بالعالم', 'U+0600–06FF'],
    ['Syriac', 'ܐܒܓܕ', 'U+0700–074F'],
    ['Thaana', 'ހަލޯ ދުނިޔެ', 'U+0780–07BF'],
    ["N'Ko", 'ߒߞߏ ߞߊ߲', 'U+07C0–07FF'],
    ['Samaritan', 'ࠀࠁࠂࠃ', 'U+0800–083F'],
    ['Mandaic', 'ࡀࡁࡂࡃ', 'U+0840–085F'],
    ['Syriac Supplement', 'ࡠࡡࡢࡣ', 'U+0860–086F'],
    ['Arabic Extended-B', 'ࡰࡱࡲࡳ', 'U+0870–089F'],
    ['Hebrew Presentation Forms', 'ﬡﬢﬣﬤ', 'U+FB1D–FB4F'],
    ['Adlam (astral)', '𞤀𞤁𞤂𞤃', 'U+1E900–1E95F'],
  ];

  for (const [script, text, range] of scripts) {
    it(`${script} (${range}) is detected by both strategies`, () => {
      expect(charCode('medium', text)).toBe(true);
      expect(regex('medium', text)).toBe(true);
      expect(detectWith('medium', text)).toBe(true);
    });
  }

  it('astral scripts require code-point iteration, not charCodeAt', () => {
    // Adlam lives above the BMP. Reading UTF-16 code units yields a surrogate
    // half, which matches no range — the mechanical reason it was unreachable.
    const adlam = '𞤀𞤁𞤂𞤃';
    expect(adlam.charCodeAt(0)).toBeGreaterThanOrEqual(0xd800);
    expect(adlam.codePointAt(0)).toBeGreaterThan(0xffff);
    expect(detectWith('medium', adlam)).toBe(true);
  });
});

describe('corpus / INVARIANT: sampling covers the whole text, not just the head', () => {
  // A note that opens in English and turns to Hebrew well past the old
  // 100-character window. Both strategies now sample head, middle and tail
  // under a shared budget.
  const text = 'x'.repeat(120) + ' שלום עולם ומה שלומך היום';

  it('RTL beyond the head of the text is found', () => {
    expect(charCode('high', text)).toBe(true);
    expect(charCode('medium', text)).toBe(true);
  });

  it('both strategies agree about it', () => {
    expect(regex('high', text)).toBe(true);
    expect(regex('medium', text)).toBe(true);
  });

  it('the answer no longer flips on sensitivity for the wrong reason', () => {
    // This used to be true at 'high' and false at 'medium' — decided by one
    // strategy having a sample window and the other not, rather than by the
    // threshold.
    expect(detectWith('high', text)).toBe(true);
    expect(detectWith('medium', text)).toBe(true);
  });

  it('work stays bounded on very large inputs', () => {
    const huge = 'a'.repeat(200_000) + 'שלום עולם ומה שלומך';
    const started = performance.now();
    expect(detectWith('medium', huge)).toBe(true);
    expect(performance.now() - started).toBeLessThan(50);
  });
});

describe('corpus / INVARIANT: the two strategies agree', () => {
  // They previously normalised by different denominators over different
  // amounts of text, so CombinedStrategy's OR let whichever was looser decide
  // every outcome — and 'low' sensitivity was not actually conservative.
  const samples = [
    'שלום עולם this is a test',
    'const x = 1; // ערך התחלתי',
    'ש ל ו ם',
    'ש' + ' '.repeat(20) + 'ל',
    'https://example.com/עמוד',
    'This is quite a long English sentence that happens to contain שלום inside it',
    'مرحبا بالعالم',
    '12345',
  ];

  for (const text of samples) {
    for (const sensitivity of SENSITIVITIES) {
      it(`${JSON.stringify(text.slice(0, 30))} @ ${sensitivity}`, () => {
        expect(charCode(sensitivity, text)).toBe(regex(sensitivity, text));
      });
    }
  }

  it("'low' sensitivity is genuinely more conservative than 'high'", () => {
    const borderline = 'https://example.com/עמוד';
    expect(detectWith('high', borderline)).toBe(true);
    expect(detectWith('low', borderline)).toBe(false);
  });

  it('whitespace no longer changes the score', () => {
    // The Regex denominator used to include whitespace, so the same content
    // scored lower purely for being spaced out.
    const dense = 'שלום';
    const sparse = 'ש' + ' '.repeat(20) + 'לום';
    expect(regex('low', dense)).toBe(regex('low', sparse));
  });
});

describe('corpus / INVARIANT: minRTLChars is a hard floor on RTL evidence', () => {
  // One meaning, applied by both strategies, with no exemption for wholly-RTL
  // text. The old exemption compared against the trimmed length, so it fired
  // only for text without spaces — "כן" was exempt, "שלום עולם" was not.
  it('applies to wholly-RTL text', () => {
    expect(detectWith('medium', 'א', 5)).toBe(false);
    expect(regex('medium', 'א', 5)).toBe(false);
    expect(charCode('medium', 'א', 5)).toBe(false);
  });

  it('applies to mixed text', () => {
    expect(detectWith('medium', 'https://example.com/עמוד', 3)).toBe(true);
    expect(detectWith('medium', 'https://example.com/עמוד', 5)).toBe(false);
  });

  it('short RTL words still work at the default floor of 1', () => {
    expect(detectWith('medium', 'כן', 1)).toBe(true);
    expect(detectWith('medium', 'א', 1)).toBe(true);
  });

  it('is honoured identically by both strategies', () => {
    for (const floor of [1, 2, 3, 5, 8]) {
      expect(charCode('medium', 'שלום עולם', floor)).toBe(regex('medium', 'שלום עולם', floor));
    }
  });
});

describe('corpus / INVARIANT: Arabic-Indic digits do not establish direction', () => {
  // U+0660–0669 sit inside the Arabic block but are bidi type AN (Arabic
  // Number), not AL. "١٢٣" is no more inherently RTL than "123", and is now
  // excluded from the strong set.
  it('Arabic-Indic digits alone are neutral', () => {
    expect(detectWith('medium', '١٢٣٤٥')).toBe(false);
  });

  it('as are Latin digits', () => {
    expect(detectWith('medium', '12345')).toBe(false);
  });

  it('but Arabic letters alongside them still read RTL', () => {
    expect(detectWith('medium', 'مرحبا ١٢٣٤٥')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTERIZATION — application layer
// ─────────────────────────────────────────────────────────────────────────────

type Snapshot = { cls: string; dir: string; styleDir: string; textAlign: string; unicodeBidi: string };

function snapshot(el: HTMLElement): Snapshot {
  return {
    cls: el.className || '',
    dir: el.getAttribute('dir') || '',
    styleDir: el.style.direction || '',
    textAlign: el.style.textAlign || '',
    unicodeBidi: el.style.unicodeBidi || '',
  };
}

function freshService(overrides: Record<string, unknown> = {}): RTLService {
  localStorage.clear();
  const service = new RTLService(new RTLDetector());
  service.enable();
  service.updateSettings({ minRTLChars: 1, ...overrides } as any);
  return service;
}

function makeEl(text: string): HTMLElement {
  const el = document.createElement('div');
  el.textContent = text;
  document.body.appendChild(el);
  return el;
}

describe('corpus / application layer', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
  });

  describe('INVARIANT: direct / attributes / css / all apply a direction', () => {
    const expectations: [string, Partial<Snapshot>, Partial<Snapshot>][] = [
      // method, expected-for-Hebrew, expected-for-English
      ['direct', { cls: 'blinko-detected-rtl', styleDir: 'rtl', textAlign: 'right' }, { cls: '', styleDir: 'ltr', textAlign: 'left' }],
      ['attributes', { dir: 'rtl' }, { dir: 'ltr' }],
      ['css', { cls: 'rtl-force' }, { cls: 'ltr-force' }],
      ['all', { dir: 'rtl', styleDir: 'rtl', textAlign: 'right' }, { dir: 'ltr', styleDir: 'ltr', textAlign: 'left' }],
    ];

    for (const [method, rtlExpect, ltrExpect] of expectations) {
      it(`${method}: Hebrew → RTL, English → LTR`, () => {
        const service = freshService({ method });

        const heb = makeEl('שלום עולם');
        service.processElement(heb);
        expect(snapshot(heb)).toMatchObject(rtlExpect);

        const eng = makeEl('Hello world');
        service.processElement(eng);
        expect(snapshot(eng)).toMatchObject(ltrExpect);

        service.disable();
      });
    }
  });

  describe('INVARIANT: direction is re-evaluated when text changes RTL → LTR', () => {
    for (const method of ['direct', 'attributes', 'css', 'all']) {
      it(`${method} switches the element to LTR`, () => {
        const service = freshService({ method });
        const el = makeEl('שלום עולם');
        service.processElement(el);
        el.textContent = 'Hello world';
        service.processElement(el);

        const after = snapshot(el);
        if (method === 'direct') expect(after.styleDir).toBe('ltr');
        if (method === 'attributes' || method === 'all') expect(after.dir).toBe('ltr');
        if (method === 'css' || method === 'all') expect(after.cls).toContain('ltr-force');
        expect(after.cls).not.toContain('rtl-force');

        service.disable();
      });
    }
  });

  it("INVARIANT: method 'unicode' delegates direction to the browser", () => {
    const service = freshService({ method: 'unicode' });

    // dir="auto" plus unicode-bidi: plaintext hands the decision to the
    // browser, which resolves it per paragraph from the first strong
    // character. RTL and LTR text therefore share the same markup by design —
    // that is the point of the method, not a bug.
    for (const text of ['שלום עולם', 'Hello world']) {
      const el = makeEl(text);
      service.processElement(el);
      const s = snapshot(el);
      expect(s.dir).toBe('auto');
      expect(s.unicodeBidi).toBe('plaintext');
      expect(s.cls).toBe('rtl-auto');
    }

    service.disable();
  });

  it("INVARIANT: method 'unicode' clears when text becomes directionless", () => {
    // It used to take no direction argument at all, so it marked every element
    // it saw and never cleaned up.
    const service = freshService({ method: 'unicode' });
    const el = makeEl('שלום עולם');
    service.processElement(el);
    expect(snapshot(el).dir).toBe('auto');

    el.textContent = '12345';
    service.processElement(el);

    const after = snapshot(el);
    expect(after.dir).toBe('');
    expect(after.unicodeBidi).toBe('');
    expect(after.cls).toBe('');
    service.disable();
  });

  it("INVARIANT: method 'all' applies all three appliers", () => {
    const service = freshService({ method: 'all' });
    const el = makeEl('שלום עולם');
    service.processElement(el);

    // It previously ran the class and attribute appliers only, leaving the
    // inline styles it advertises unset.
    const s = snapshot(el);
    expect(s.cls).toContain('rtl-force');
    expect(s.cls).toContain('blinko-detected-rtl');
    expect(s.dir).toBe('rtl');
    expect(s.styleDir).toBe('rtl');
    expect(s.textAlign).toBe('right');

    service.disable();
  });

  it('INVARIANT: falling below the length gate clears whatever the method applied', () => {
    // The short-text path used to call applyCSSClassRTL(el, 'neutral'), which
    // only knows about rtl-force / ltr-force / rtl-auto. Under 'direct' that
    // left blinko-detected-rtl and an inline direction: rtl behind; under
    // 'attributes' it left dir="rtl". An element whose text became short kept
    // styling for text it no longer contained.
    for (const method of ['direct', 'attributes', 'css', 'unicode', 'all']) {
      const service = freshService({ method, minTextLength: 4 });
      const el = makeEl('שלום עולם');
      service.processElement(el);

      el.textContent = 'אב'; // now below the length gate
      service.processElement(el);

      expect(snapshot(el)).toEqual({
        cls: '',
        dir: '',
        styleDir: '',
        textAlign: '',
        unicodeBidi: '',
      });
      service.disable();
    }
  });

  it('INVARIANT: the length gate and the RTL-evidence gate are separate settings', () => {
    // minTextLength governs whether an element is examined at all;
    // minRTLChars governs how much RTL evidence the detector requires. They
    // used to be the same number, so raising one silently moved the other.

    // Long enough to examine, but not enough RTL evidence.
    const strictEvidence = freshService({ method: 'css', minTextLength: 1, minRTLChars: 5 });
    const a = makeEl('כן');
    strictEvidence.processElement(a);
    expect(snapshot(a).cls).toBe('');
    strictEvidence.disable();

    // Enough RTL evidence, but too short to be examined.
    const strictLength = freshService({ method: 'css', minTextLength: 5, minRTLChars: 1 });
    const b = makeEl('כן');
    strictLength.processElement(b);
    expect(snapshot(b).cls).toBe('');
    strictLength.disable();

    // Both satisfied.
    const permissive = freshService({ method: 'css', minTextLength: 1, minRTLChars: 1 });
    const c = makeEl('כן');
    permissive.processElement(c);
    expect(snapshot(c).cls).toBe('rtl-force');
    permissive.disable();

    // Moving one does not move the other: a long, mostly-Latin string passes
    // the length gate at any setting, and is governed purely by evidence.
    const longMixed = 'https://example.com/עמוד';
    const evidence3 = freshService({ method: 'css', minTextLength: 1, minRTLChars: 3 });
    const d = makeEl(longMixed);
    evidence3.processElement(d);
    expect(snapshot(d).cls).toBe('rtl-force');
    evidence3.disable();

    const evidence5 = freshService({ method: 'css', minTextLength: 1, minRTLChars: 5 });
    const e = makeEl(longMixed);
    evidence5.processElement(e);
    expect(snapshot(e).cls).toBe('ltr-force');
    evidence5.disable();
  });

  it('INVARIANT: a container does not contradict its own children', () => {
    const service = freshService({ method: 'css' });

    const wrap = document.createElement('div');
    const hebrew = document.createElement('p');
    hebrew.textContent = 'שלום עולם זהו טקסט בעברית';
    const english = document.createElement('p');
    english.textContent = 'And this paragraph is written in English.';
    wrap.appendChild(hebrew);
    wrap.appendChild(english);
    document.body.appendChild(wrap);

    // All three match the default target selectors, so all three get processed.
    service.processElement(wrap);
    service.processElement(hebrew);
    service.processElement(english);

    // The wrapper has no text of its own; its children disagree, so there is no
    // correct verdict for it to hold. It used to be given 'rtl-force' from the
    // concatenation of both paragraphs, contradicting its own English child.
    expect(snapshot(wrap).cls).toBe('');
    expect(snapshot(hebrew).cls).toBe('rtl-force');
    expect(snapshot(english).cls).toBe('ltr-force');

    service.disable();
  });

  it('INVARIANT: an element is classified on its own text, not its descendants', () => {
    const service = freshService({ method: 'css' });

    // A Hebrew paragraph with an inline English span. The paragraph's own text
    // decides its direction; the span is classified separately.
    const p = document.createElement('p');
    p.appendChild(document.createTextNode('שלום עולם זהו טקסט ארוך בעברית '));
    const span = document.createElement('span');
    span.textContent = 'inline english text here';
    p.appendChild(span);
    document.body.appendChild(p);

    service.processElement(p);
    service.processElement(span);

    expect(snapshot(p).cls).toBe('rtl-force');
    expect(snapshot(span).cls).toBe('ltr-force');

    service.disable();
  });

  it('INVARIANT: a leaf element with inline markup still gets a direction', () => {
    const service = freshService({ method: 'css' });

    // Own text plus a <strong> — a normal paragraph, not a container.
    const p = document.createElement('p');
    p.appendChild(document.createTextNode('שלום עולם '));
    const strong = document.createElement('strong');
    strong.textContent = 'ומה שלומך';
    p.appendChild(strong);
    document.body.appendChild(p);

    service.processElement(p);
    expect(snapshot(p).cls).toBe('rtl-force');

    service.disable();
  });

  it('INVARIANT: the action log stores a bounded text preview', () => {
    // The field is called textPreview but held the element's entire
    // textContent, with 50 entries retained and each broadcast in a
    // CustomEvent on every processed element.
    const service = freshService({ enableActionLog: true });
    const text = 'שלום '.repeat(200);
    const el = makeEl(text);
    service.processElement(el);

    const log = service.getActionLog();
    expect(log).toHaveLength(1);
    expect(text.length).toBe(1000);
    expect(log[0].textPreview.length).toBeLessThanOrEqual(121); // 120 + ellipsis
    expect(log[0].textPreview.startsWith('שלום')).toBe(true);

    service.disable();
  });

  it('INVARIANT: short text is stored without truncation or ellipsis', () => {
    const service = freshService({ enableActionLog: true });
    const el = makeEl('שלום עולם');
    service.processElement(el);

    expect(service.getActionLog()[0].textPreview).toBe('שלום עולם');
    service.disable();
  });

  it('INVARIANT: base CSS survives disable() but not teardown', () => {
    const service = freshService();
    service.injectBaseCSS();

    // disable() deliberately keeps it: the base stylesheet styles the toggle
    // button, which stays on screen while the plugin is switched off.
    service.disable();
    expect(document.getElementById('blinko-rtl-base-styles')).not.toBeNull();

    // Teardown must remove it. It previously had no removal path at all, so
    // the element was left in <head> after the plugin was destroyed.
    service.removeBaseCSS();
    expect(document.getElementById('blinko-rtl-base-styles')).toBeNull();
  });
});
