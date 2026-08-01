/**
 * Single source of truth for what counts as a right-to-left character, and for
 * how text is sampled and normalised before a ratio is taken.
 *
 * Both detection strategies previously carried their own copies of this — one
 * as numeric ranges, one as regex pattern strings — and they had already
 * drifted: Syriac and Thaana were detected by one and not the other. Anything
 * added below is picked up by both.
 *
 * Scope: the Unicode bidirectional character types **R** (right-to-left) and
 * **AL** (right-to-left Arabic). Deliberately excluded is type **AN** (Arabic
 * Number) — see ARABIC_NUMBER_RANGES.
 */

/** Inclusive [start, end] code point ranges of strong RTL characters. */
export const RTL_STRONG_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x0590, 0x05FF], // Hebrew
  [0x0600, 0x06FF], // Arabic
  [0x0700, 0x074F], // Syriac
  [0x0750, 0x077F], // Arabic Supplement
  [0x0780, 0x07BF], // Thaana
  [0x07C0, 0x07FF], // N'Ko
  [0x0800, 0x083F], // Samaritan
  [0x0840, 0x085F], // Mandaic
  [0x0860, 0x086F], // Syriac Supplement
  [0x0870, 0x089F], // Arabic Extended-B
  [0x08A0, 0x08FF], // Arabic Extended-A
  [0xFB1D, 0xFB4F], // Hebrew Presentation Forms
  [0xFB50, 0xFDFF], // Arabic Presentation Forms-A
  [0xFE70, 0xFEFF], // Arabic Presentation Forms-B
  // Astral planes. Reachable only via code point iteration, never charCodeAt.
  [0x10800, 0x10FFF], // Cypriot, Phoenician, Lydian, Meroitic, Kharoshthi, …
  [0x1E800, 0x1E8DF], // Mende Kikakui
  [0x1E900, 0x1E95F], // Adlam
  [0x1EC70, 0x1ECBF], // Indic Siyaq Numbers
  [0x1ED00, 0x1ED4F], // Ottoman Siyaq Numbers
  [0x1EE00, 0x1EEFF], // Arabic Mathematical Alphabetic Symbols
];

/**
 * Digits that sit inside the Arabic blocks but are bidi type **AN**, not AL.
 *
 * An AN character does not establish paragraph direction — "١٢٣" is no more
 * inherently RTL than "123". Counting them as strong RTL meant a bare number
 * was classified RTL while its Latin equivalent stayed neutral. They are
 * subtracted from the strong set below.
 */
export const ARABIC_NUMBER_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x0660, 0x0669], // Arabic-Indic digits
  [0x066B, 0x066C], // Arabic decimal / thousands separator
  [0x06F0, 0x06F9], // Extended Arabic-Indic digits
];

function inRanges(cp: number, ranges: ReadonlyArray<readonly [number, number]>): boolean {
  for (let i = 0; i < ranges.length; i++) {
    if (cp >= ranges[i][0] && cp <= ranges[i][1]) return true;
  }
  return false;
}

/** True for a strong RTL code point (bidi R or AL), excluding Arabic numbers. */
export function isRTLCodePoint(cp: number): boolean {
  if (inRanges(cp, ARABIC_NUMBER_RANGES)) return false;
  return inRanges(cp, RTL_STRONG_RANGES);
}

/** True for a strong LTR code point. Latin, Greek and Cyrillic letters. */
export function isLTRCodePoint(cp: number): boolean {
  return (
    (cp >= 0x0041 && cp <= 0x005A) || // A-Z
    (cp >= 0x0061 && cp <= 0x007A) || // a-z
    (cp >= 0x00C0 && cp <= 0x024F) || // Latin-1 Supplement / Extended-A / -B
    (cp >= 0x0370 && cp <= 0x03FF) || // Greek
    (cp >= 0x0400 && cp <= 0x04FF)    // Cyrillic
  );
}

/**
 * Characters excluded from the ratio denominator: whitespace, punctuation,
 * digits and symbols. They carry no directional signal, so including them
 * would make the same sentence score differently purely for being spaced or
 * punctuated differently.
 */
export function isNeutralCodePoint(cp: number): boolean {
  // Whitespace (matching the character set of /\s/).
  if (
    cp === 0x20 ||
    (cp >= 0x09 && cp <= 0x0D) ||
    cp === 0xA0 ||
    cp === 0x1680 ||
    (cp >= 0x2000 && cp <= 0x200A) ||
    cp === 0x2028 ||
    cp === 0x2029 ||
    cp === 0x202F ||
    cp === 0x205F ||
    cp === 0x3000 ||
    cp === 0xFEFF
  ) {
    return true;
  }
  // ASCII digits, punctuation and symbols.
  if (cp >= 0x21 && cp <= 0x40) return true;  // ! " # … 0-9 : ; < = > ? @
  if (cp >= 0x5B && cp <= 0x60) return true;  // [ \ ] ^ _ `
  if (cp >= 0x7B && cp <= 0x7E) return true;  // { | } ~
  // Arabic numbers and their separators: present in RTL text, but not a signal.
  if (inRanges(cp, ARABIC_NUMBER_RANGES)) return true;
  // General Punctuation and directional formatting marks.
  if (cp >= 0x2010 && cp <= 0x2027) return true;
  if (cp >= 0x202A && cp <= 0x206F) return true;
  return false;
}

/** Character-class string for building a strong-RTL regex. */
export const RTL_REGEX_CLASS: string = RTL_STRONG_RANGES
  .map(([lo, hi]) => {
    const esc = (cp: number) =>
      cp > 0xffff
        ? `\\u{${cp.toString(16).toUpperCase()}}`
        : `\\u${cp.toString(16).toUpperCase().padStart(4, '0')}`;
    return `${esc(lo)}-${esc(hi)}`;
  })
  .join('');

/** Character-class string for the Arabic-number code points to subtract. */
export const ARABIC_NUMBER_REGEX_CLASS: string = ARABIC_NUMBER_RANGES
  .map(([lo, hi]) => `\\u${lo.toString(16).toUpperCase().padStart(4, '0')}-\\u${hi.toString(16).toUpperCase().padStart(4, '0')}`)
  .join('');

export interface DirectionalCounts {
  /** Strong RTL characters seen. */
  rtl: number;
  /** Strong LTR characters seen. */
  ltr: number;
  /** Non-neutral characters seen — the ratio denominator. */
  significant: number;
  /** Code points actually examined, after sampling. */
  scanned: number;
}

/**
 * Count directional characters in `text`, examining at most `sampleSize` code
 * points.
 *
 * Sampling used to take the first `sampleSize` characters and stop, so a note
 * that opened in English and turned to Hebrew further down was misread — and
 * because only one of the two strategies sampled, the sensitivity setting
 * appeared to change the answer when it was really the sample window doing it.
 *
 * The budget is now spread over three windows — head, middle and tail — so the
 * work stays bounded while a shift anywhere in the text is still visible.
 * Iteration is by code point, so astral RTL scripts are reachable.
 */
const isHighSurrogate = (code: number) => code >= 0xd800 && code <= 0xdbff;
const isLowSurrogate = (code: number) => code >= 0xdc00 && code <= 0xdfff;

/** Step an index back off the trailing half of a surrogate pair. */
function alignStart(text: string, index: number): number {
  if (index <= 0 || index >= text.length) return index;
  return isLowSurrogate(text.charCodeAt(index)) ? index - 1 : index;
}

/** Extend an index forward so it never cuts a surrogate pair in half. */
function alignEnd(text: string, index: number): number {
  if (index <= 0 || index >= text.length) return index;
  return isHighSurrogate(text.charCodeAt(index - 1)) && isLowSurrogate(text.charCodeAt(index))
    ? index + 1
    : index;
}

/**
 * The [start, end) slices of `text` that detection looks at.
 *
 * Exported so that every consumer samples identically. A caller that counts
 * over the whole string while comparing against a denominator derived from
 * these windows produces a ratio for two different pieces of text — which can
 * exceed 1.0 and trip any threshold.
 *
 * Boundaries are aligned to code-point boundaries, so a window never begins or
 * ends in the middle of a surrogate pair. Arithmetic midpoints otherwise land
 * on a trailing surrogate roughly half the time in astral text, and reading
 * from there yields a lone surrogate that matches no range.
 */
export function getSampleWindows(text: string, sampleSize: number): Array<[number, number]> {
  if (!text) return [];

  const budget = sampleSize > 0 ? sampleSize : text.length;
  if (text.length <= budget) return [[0, text.length]];

  const per = Math.max(1, Math.floor(budget / 3));
  const midStart = alignStart(text, Math.floor((text.length - per) / 2));
  const tailStart = alignStart(text, text.length - per);

  return [
    [0, alignEnd(text, per)],
    [midStart, alignEnd(text, midStart + per)],
    [tailStart, text.length],
  ];
}

/**
 * The sampled text as a single string, for consumers that must run a regex
 * rather than a code-point scan. Same windows as countDirectional sees.
 */
export function sampledText(text: string, sampleSize: number): string {
  const windows = getSampleWindows(text, sampleSize);
  if (windows.length === 0) return '';
  if (windows.length === 1 && windows[0][0] === 0 && windows[0][1] === text.length) return text;

  let out = '';
  for (const [start, end] of windows) out += text.slice(start, end);
  return out;
}

export function countDirectional(text: string, sampleSize: number): DirectionalCounts {
  const counts: DirectionalCounts = { rtl: 0, ltr: 0, significant: 0, scanned: 0 };
  if (!text) return counts;

  const windows = getSampleWindows(text, sampleSize);

  for (const [start, end] of windows) {
    let i = start;
    while (i < end) {
      const cp = text.codePointAt(i)!;
      i += cp > 0xffff ? 2 : 1;
      counts.scanned++;
      if (isNeutralCodePoint(cp)) continue;
      counts.significant++;
      if (isRTLCodePoint(cp)) counts.rtl++;
      else if (isLTRCodePoint(cp)) counts.ltr++;
    }
  }

  return counts;
}

/** Ratio thresholds for each sensitivity setting. Shared by both strategies. */
export const SENSITIVITY_THRESHOLDS: Readonly<Record<'high' | 'medium' | 'low', number>> = {
  high: 0.1,
  medium: 0.15,
  low: 0.4,
};
