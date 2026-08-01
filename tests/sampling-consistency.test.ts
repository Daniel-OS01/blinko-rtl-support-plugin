/**
 * The sampling windows are the contract shared by both detection strategies.
 *
 * Two ways they can be violated:
 *
 *  1. A caller counts matches over the *whole* string while dividing by a
 *     denominator taken from the sample. That describes two different pieces
 *     of text, and the ratio can exceed 1.0 — on a long, mostly-Latin note with
 *     a dense RTL section it reached 8.08, clearing any threshold.
 *
 *  2. A window boundary lands mid-surrogate-pair. Reading from there yields a
 *     lone surrogate, which matches no range, so astral characters adjacent to
 *     a boundary go uncounted.
 */

import { describe, it, expect } from 'bun:test';
import {
  countDirectional,
  getSampleWindows,
  sampledText,
} from '../src/utils/strategies/rtlRanges';
import { RegexStrategy } from '../src/utils/strategies/RegexStrategy';

describe('sample windows', () => {
  it('returns the whole string when it fits in the budget', () => {
    expect(getSampleWindows('שלום עולם', 100)).toEqual([[0, 9]]);
  });

  it('returns head, middle and tail when it does not', () => {
    const text = 'a'.repeat(900);
    const windows = getSampleWindows(text, 99);
    expect(windows).toHaveLength(3);
    expect(windows[0][0]).toBe(0);
    expect(windows[2][1]).toBe(900);
    // Each window carries roughly a third of the budget.
    for (const [start, end] of windows) {
      expect(end - start).toBeGreaterThan(0);
      expect(end - start).toBeLessThanOrEqual(40);
    }
  });

  it('never splits a surrogate pair at a boundary', () => {
    // Astral characters are two UTF-16 units each, so an arithmetic midpoint
    // lands on a trailing surrogate about half the time.
    for (const count of [301, 302, 303, 304, 500, 777]) {
      const text = '𞤀'.repeat(count); // Adlam, U+1E900
      for (const [start, end] of getSampleWindows(text, 100)) {
        // A window must never begin on the low half of a pair...
        const startCode = text.charCodeAt(start);
        expect(startCode >= 0xdc00 && startCode <= 0xdfff).toBe(false);
        // ...nor end between the two halves.
        if (end < text.length) {
          const prev = text.charCodeAt(end - 1);
          const next = text.charCodeAt(end);
          const splits = prev >= 0xd800 && prev <= 0xdbff && next >= 0xdc00 && next <= 0xdfff;
          expect(splits).toBe(false);
        }
      }
    }
  });

  it('counts every sampled astral character', () => {
    const text = '𞤀'.repeat(400);
    const counts = countDirectional(text, 99);
    // Every scanned code point is a strong RTL character; none may be lost to
    // a boundary landing inside a pair.
    expect(counts.rtl).toBe(counts.scanned);
    expect(counts.significant).toBe(counts.scanned);
    expect(counts.rtl).toBeGreaterThan(0);
  });

  it('sampledText yields exactly the windows countDirectional scans', () => {
    const text = 'a'.repeat(500) + 'שלום'.repeat(50) + 'b'.repeat(500);
    const joined = sampledText(text, 99);
    const expected = getSampleWindows(text, 99)
      .map(([s, e]) => text.slice(s, e))
      .join('');
    expect(joined).toBe(expected);

    // And the counts over that string match the sampled counts of the original.
    const direct = countDirectional(text, 99);
    const viaSample = countDirectional(joined, 0); // 0 = no further sampling
    expect(viaSample.rtl).toBe(direct.rtl);
    expect(viaSample.significant).toBe(direct.significant);
  });

  it('returns the original string when no sampling is needed', () => {
    expect(sampledText('שלום עולם', 100)).toBe('שלום עולם');
  });
});

describe('a narrowed RegexStrategy scores against the text it sampled', () => {
  // Long, mostly-Latin, with a dense Hebrew section in the middle only.
  const text = 'a'.repeat(2000) + 'שלום'.repeat(200) + 'b'.repeat(2000);

  it('cannot produce a ratio above 1.0', () => {
    const strategy = new RegexStrategy(true, false, 0.9, 1); // Hebrew only
    strategy.updateConfig({ sampleSize: 100 });

    // Counting over the full input gave rtlCount 800 against a sampled
    // denominator of 99 — a ratio of 8.08, which cleared a 0.9 threshold on
    // text that is a third Hebrew in the sample.
    expect(strategy.detect(text)).toBe(false);
  });

  it('still detects text that really is overwhelmingly RTL', () => {
    const strategy = new RegexStrategy(true, false, 0.9, 1);
    strategy.updateConfig({ sampleSize: 100 });
    expect(strategy.detect('שלום עולם ומה שלומך היום'.repeat(50))).toBe(true);
  });

  it('agrees with the unnarrowed strategy on Hebrew-only input', () => {
    const narrowed = new RegexStrategy(true, false, 0.15, 1);
    const both = new RegexStrategy(true, true, 0.15, 1);
    narrowed.updateConfig({ sampleSize: 100 });
    both.updateConfig({ sampleSize: 100 });

    for (const sample of ['שלום עולם', text, 'Hello world', 'a'.repeat(5000) + 'שלום']) {
      expect(narrowed.detect(sample)).toBe(both.detect(sample));
    }
  });
});
