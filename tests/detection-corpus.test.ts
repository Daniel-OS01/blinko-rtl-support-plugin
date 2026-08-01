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
// CHARACTERIZATION — detection engine
// ─────────────────────────────────────────────────────────────────────────────

describe('corpus / CHARACTERIZATION F-06: strategies disagree on script coverage', () => {
  // CharacterCodeStrategy.RTL_RANGES includes Syriac and Thaana.
  // RegexStrategy's hardcoded pattern strings do not. The two lists are
  // maintained separately and have already drifted.
  it('Syriac: CharacterCode detects it, Regex does not', () => {
    expect(charCode('medium', 'ܐܒܓܕ')).toBe(true);
    expect(regex('medium', 'ܐܒܓܕ')).toBe(false);
  });

  it('Thaana: CharacterCode detects it, Regex does not', () => {
    expect(charCode('medium', 'ހަލޯ ދުނިޔެ')).toBe(true);
    expect(regex('medium', 'ހަލޯ ދުނިޔެ')).toBe(false);
  });

  // FIX IN PHASE 4: these should all become true once RTL_RANGES and the regex
  // patterns are unified and extended.
  const undetected: [string, string, string][] = [
    ["N'Ko", 'ߒߞߏ ߞߊ߲', 'U+07C0–07FF'],
    ['Samaritan', 'ࠀࠁࠂࠃ', 'U+0800–083F'],
    ['Mandaic', 'ࡀࡁࡂࡃ', 'U+0840–085F'],
    ['Syriac Supplement', 'ࡠࡡࡢࡣ', 'U+0860–086F'],
    ['Arabic Extended-B', 'ࡰࡱࡲࡳ', 'U+0870–089F'],
    ['Adlam (astral)', '𞤀𞤁𞤂𞤃', 'U+1E900–1E95F'],
  ];

  for (const [script, text, range] of undetected) {
    it(`${script} (${range}) is currently NOT detected by either strategy`, () => {
      expect(charCode('high', text)).toBe(false);
      expect(regex('high', text)).toBe(false);
      expect(detectWith('high', text)).toBe(false);
    });
  }
});

describe('corpus / CHARACTERIZATION F-07: only the first 100 chars are sampled', () => {
  // A note that opens in English and turns to Hebrew after the sample window.
  const text = 'x'.repeat(120) + ' שלום עולם ומה שלומך היום';

  it('CharacterCodeStrategy misses RTL that starts past the sample window', () => {
    expect(charCode('high', text)).toBe(false);
    expect(charCode('medium', text)).toBe(false);
  });

  it('RegexStrategy sees it at high sensitivity because it scans the whole string', () => {
    expect(regex('high', text)).toBe(true);
    expect(regex('medium', text)).toBe(false);
  });

  it('so the combined result flips on sensitivity for the wrong reason', () => {
    // Detected at 'high' purely because one strategy has no sample window and
    // the other does — not because the text is more RTL at high sensitivity.
    expect(detectWith('high', text)).toBe(true);
    expect(detectWith('medium', text)).toBe(false);
  });
});

describe('corpus / CHARACTERIZATION F-04 + F-05: OR means the looser strategy wins', () => {
  it("'low' sensitivity is not conservative: CharacterCode still fires alone", () => {
    const text = 'שלום עולם this is a test';
    expect(charCode('low', text)).toBe(true);
    expect(regex('low', text)).toBe(false);
    // CombinedStrategy ORs them, so 'low' behaves like the looser strategy.
    expect(detectWith('low', text)).toBe(true);
  });

  it('a Hebrew code comment behaves the same way', () => {
    const text = 'const x = 1; // ערך התחלתי';
    expect(charCode('low', text)).toBe(true);
    expect(regex('low', text)).toBe(false);
    expect(detectWith('low', text)).toBe(true);
  });

  it('whitespace in the Regex denominator lowers its score', () => {
    // RegexStrategy divides by raw text.length (spaces included);
    // CharacterCodeStrategy divides by significant chars only.
    const spaced = 'ש ל ו ם';
    expect(charCode('low', spaced)).toBe(true);
    expect(regex('low', spaced)).toBe(true);
    // The gap widens as spacing grows relative to content.
    const sparse = 'ש' + ' '.repeat(20) + 'ל';
    expect(charCode('low', sparse)).toBe(true);
    expect(regex('low', sparse)).toBe(false);
  });
});

describe('corpus / CHARACTERIZATION F-03: minRTLChars is bypassed for pure-RTL text', () => {
  // RegexStrategy has an explicit escape hatch: if every non-space character is
  // RTL, minRTLChars is ignored entirely.
  it('a single Hebrew character is detected even at minRTLChars = 5', () => {
    expect(detectWith('medium', 'א', 5)).toBe(true);
    expect(regex('medium', 'א', 5)).toBe(true);
    expect(charCode('medium', 'א', 5)).toBe(false);
  });

  it('but mixed text does respect minRTLChars', () => {
    expect(detectWith('medium', 'https://example.com/עמוד', 3)).toBe(true);
    expect(detectWith('medium', 'https://example.com/עמוד', 5)).toBe(false);
  });
});

describe('corpus / CHARACTERIZATION F-18: Arabic-Indic digits count as RTL', () => {
  // U+0660–0669 sit inside the 0600–06FF Arabic range, so a pure number string
  // is classified RTL. Their Unicode bidi class is AN (Arabic Number), which
  // does not establish paragraph direction. Compare with Latin digits, which
  // are correctly neutral.
  it('Arabic-Indic digits are detected as RTL', () => {
    expect(detectWith('medium', '١٢٣٤٥')).toBe(true);
  });

  it('Latin digits are not', () => {
    expect(detectWith('medium', '12345')).toBe(false);
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
      ['all', { cls: 'rtl-force', dir: 'rtl' }, { cls: 'ltr-force', dir: 'ltr' }],
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

  it("CHARACTERIZATION F-08: method 'unicode' ignores the direction it computed", () => {
    const service = freshService({ method: 'unicode' });

    // Every input produces byte-identical markup — RTL, LTR and neutral alike.
    const results = ['שלום עולם', 'Hello world', '12345'].map((text) => {
      const el = makeEl(text);
      service.processElement(el);
      return snapshot(el);
    });

    expect(results[0]).toEqual(results[1]);
    expect(results[1]).toEqual(results[2]);
    expect(results[0].cls).toBe('rtl-auto');
    expect(results[0].unicodeBidi).toBe('isolate');

    // FIX IN PHASE 4/5: an LTR element should not carry rtl-auto.
    service.disable();
  });

  it("CHARACTERIZATION F-08: method 'unicode' never clears when text becomes LTR", () => {
    const service = freshService({ method: 'unicode' });
    const el = makeEl('שלום עולם');
    service.processElement(el);
    const before = snapshot(el);

    el.textContent = 'Hello world';
    service.processElement(el);

    expect(snapshot(el)).toEqual(before); // unchanged — nothing is cleaned up
    service.disable();
  });

  it("CHARACTERIZATION F-09: method 'all' omits the inline direct styles", () => {
    const service = freshService({ method: 'all' });
    const el = makeEl('שלום עולם');
    service.processElement(el);

    const s = snapshot(el);
    expect(s.cls).toBe('rtl-force');
    expect(s.dir).toBe('rtl');
    // Despite the name, applyDirectRTL is not called.
    expect(s.styleDir).toBe('');
    expect(s.textAlign).toBe('');

    service.disable();
  });

  it('CHARACTERIZATION F-10: the short-text path leaves stale styling behind', () => {
    // minRTLChars is a *text length* gate here (F-03). Shrinking the text below
    // it routes through applyCSSClassRTL(el, 'neutral'), which only knows about
    // rtl-force / ltr-force / rtl-auto.
    const directService = freshService({ method: 'direct', minRTLChars: 4 });
    const direct = makeEl('שלום עולם');
    directService.processElement(direct);
    direct.textContent = 'אב';
    directService.processElement(direct);
    expect(snapshot(direct).cls).toBe('blinko-detected-rtl'); // stale
    expect(snapshot(direct).styleDir).toBe('rtl'); // stale
    directService.disable();

    const attrService = freshService({ method: 'attributes', minRTLChars: 4 });
    const attrs = makeEl('שלום עולם');
    attrService.processElement(attrs);
    attrs.textContent = 'אב';
    attrService.processElement(attrs);
    expect(snapshot(attrs).dir).toBe('rtl'); // stale
    attrService.disable();

    // Only 'css' cleans up correctly, because neutral is expressed as a class.
    const cssService = freshService({ method: 'css', minRTLChars: 4 });
    const css = makeEl('שלום עולם');
    cssService.processElement(css);
    css.textContent = 'אב';
    cssService.processElement(css);
    expect(snapshot(css).cls).toBe('');
    cssService.disable();
  });

  it('CHARACTERIZATION F-03: minRTLChars gates on total text length, not RTL char count', () => {
    // Same setting, two meanings:
    //   RTLService.processElement → minimum *total text length*
    //   both detection strategies → minimum *count of RTL characters*
    // "כן" is 2 characters, both Hebrew. The detector accepts it at
    // minRTLChars = 5 (pure-RTL text bypasses the count gate); the service
    // rejects it before the detector is ever consulted, because 2 < 5.
    expect(detectWith('medium', 'כן', 5)).toBe(true);

    const service = freshService({ method: 'css', minRTLChars: 5 });
    const el = makeEl('כן');
    service.processElement(el);
    expect(snapshot(el).cls).toBe('');
    service.disable();

    // Lower the length gate and the same text is classified RTL.
    const permissive = freshService({ method: 'css', minRTLChars: 2 });
    const el2 = makeEl('כן');
    permissive.processElement(el2);
    expect(snapshot(el2).cls).toBe('rtl-force');
    permissive.disable();
  });

  it('CHARACTERIZATION F-13: a mixed container contradicts its own children', () => {
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

    expect(snapshot(wrap).cls).toBe('rtl-force'); // from blended textContent
    expect(snapshot(hebrew).cls).toBe('rtl-force');
    expect(snapshot(english).cls).toBe('ltr-force'); // contradicts its parent

    service.disable();
  });

  it('CHARACTERIZATION F-14: the action log stores the full element text', () => {
    const service = freshService({ enableActionLog: true });
    const text = 'שלום '.repeat(200);
    const el = makeEl(text);
    service.processElement(el);

    const log = service.getActionLog();
    expect(log).toHaveLength(1);
    // The field is named textPreview but is not truncated.
    expect(log[0].textPreview).toHaveLength(text.length);
    expect(text.length).toBe(1000);

    service.disable();
  });

  it('CHARACTERIZATION F-16: base CSS survives disable()', () => {
    const service = freshService();
    service.injectBaseCSS();
    service.disable();

    expect(document.getElementById('blinko-rtl-base-styles')).not.toBeNull();
  });
});
