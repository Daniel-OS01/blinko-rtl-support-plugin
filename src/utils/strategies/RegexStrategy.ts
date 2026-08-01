import { DetectionStrategy } from './types';
import {
  countDirectional,
  sampledText,
  RTL_REGEX_CLASS,
  ARABIC_NUMBER_REGEX_CLASS,
} from './rtlRanges';

/**
 * Regex-based counterpart to CharacterCodeStrategy.
 *
 * The two differ only in *how* they find RTL characters — this one can be
 * narrowed to Hebrew or Arabic alone via its constructor flags. What counts as
 * RTL, what goes in the ratio denominator, and how text is sampled all come
 * from the shared rtlRanges module, so the two can no longer disagree about
 * the same text.
 *
 * Previously this strategy divided by the raw string length (whitespace
 * included) and scanned the whole string, while CharacterCodeStrategy divided
 * by significant characters within a 100-character window. The same
 * `sensitivity` threshold therefore meant two different things, and because
 * CombinedStrategy ORs the two, whichever was looser decided the outcome.
 */
export class RegexStrategy implements DetectionStrategy {
  readonly name = 'Regex';

  private static readonly HEBREW_CLASS = '\\u0590-\\u05FF\\uFB1D-\\uFB4F';
  private static readonly ARABIC_CLASS =
    '\\u0600-\\u06FF\\u0750-\\u077F\\u0870-\\u089F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';

  private checkHebrew: boolean;
  private checkArabic: boolean;
  private threshold: number; // Ratio 0.0 - 1.0
  private minRTLChars: number = 3;
  private sampleSize: number = 100;
  private rtlRegex: RegExp | null = null;
  private arabicNumberRegex = new RegExp(`[${ARABIC_NUMBER_REGEX_CLASS}]`);

  constructor(checkHebrew: boolean = true, checkArabic: boolean = true, threshold: number = 0.3, minRTLChars: number = 3) {
    this.checkHebrew = checkHebrew;
    this.checkArabic = checkArabic;
    this.threshold = threshold;
    this.minRTLChars = minRTLChars;
    this.updateRegex();
  }

  private updateRegex(): void {
    // With both scripts enabled — the default — use the shared range set so
    // this strategy sees every RTL script CharacterCodeStrategy sees. The
    // narrowed forms stay script-specific by design.
    if (this.checkHebrew && this.checkArabic) {
      this.rtlRegex = new RegExp(`[${RTL_REGEX_CLASS}]`, 'gu');
      return;
    }

    const patterns: string[] = [];
    if (this.checkHebrew) patterns.push(RegexStrategy.HEBREW_CLASS);
    if (this.checkArabic) patterns.push(RegexStrategy.ARABIC_CLASS);

    this.rtlRegex = patterns.length === 0 ? null : new RegExp(`[${patterns.join('')}]`, 'g');
  }

  updateConfig(config: { minRTLChars?: number, threshold?: number, sampleSize?: number }): void {
      if (config.minRTLChars !== undefined) {
          this.minRTLChars = config.minRTLChars;
      }
      if (config.threshold !== undefined) {
          this.threshold = config.threshold;
      }
      if (config.sampleSize !== undefined) {
          this.sampleSize = config.sampleSize;
      }
  }

  detect(text: string): boolean {
    if (!text || !text.trim()) return false;
    if (!this.rtlRegex) return false;

    // Shared sampling and denominator, so both strategies normalise alike.
    const counts = countDirectional(text, this.sampleSize);

    // When narrowed to a single script, re-count with this strategy's own
    // pattern; otherwise the shared scan already used the same range set.
    //
    // The re-count must run over the *sampled* text, not the whole string.
    // Counting matches across the full input while dividing by a denominator
    // taken from the sample describes two different pieces of text: on a long,
    // mostly-Latin note with a dense RTL section the ratio reached 8.08, which
    // clears any threshold.
    let rtlCount = counts.rtl;
    if (!(this.checkHebrew && this.checkArabic)) {
      this.rtlRegex.lastIndex = 0;
      const matches = sampledText(text, this.sampleSize).match(this.rtlRegex);
      rtlCount = matches ? matches.filter(ch => !this.arabicNumberRegex.test(ch)).length : 0;
    }

    if (rtlCount === 0) return false;
    if (counts.significant === 0) return false;

    // minRTLChars is a hard floor, with no exemption for wholly-RTL text.
    //
    // There used to be one: text was accepted regardless of minRTLChars if
    // every character was RTL. It only ever fired when the text contained no
    // spaces, because the comparison was against the *trimmed length* — so
    // "כן" was exempt but "שלום עולם" was not, purely because of the space.
    // That is an accident of whitespace rather than a policy, and it left
    // minRTLChars unable to filter the very text it was raised to filter.
    //
    // The setting now means one thing: the minimum count of strong RTL
    // characters. Short RTL words such as "כן" are still detected at the
    // default of 1; raising the value is an explicit request for more
    // evidence, and is now honoured.
    if (rtlCount < this.minRTLChars) return false;

    return rtlCount / counts.significant > this.threshold;
  }
}
