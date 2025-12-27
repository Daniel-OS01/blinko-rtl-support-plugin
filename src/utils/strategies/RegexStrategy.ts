import { DetectionStrategy } from './types';

export class RegexStrategy implements DetectionStrategy {
  readonly name = 'Regex';

  // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
  // Hebrew: \u0590-\u05FF
  private readonly hebrewPattern = '\\u0590-\\u05FF';

  // Arabic regex range
  private readonly arabicPattern = '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';

  private checkHebrew: boolean;
  private checkArabic: boolean;
  private threshold: number; // Ratio 0.0 - 1.0

  constructor(checkHebrew: boolean = true, checkArabic: boolean = true, threshold: number = 0.3) {
    this.checkHebrew = checkHebrew;
    this.checkArabic = checkArabic;
    this.threshold = threshold;
  }

  detect(text: string): boolean {
    if (!text || !text.trim()) return false;

    // Clean text: remove non-alphabetic chars (optional, but good for ratio)
    // Actually, we should count total words or characters that are "strong" (L or R).
    // Simplifying: Count total alphanumeric characters vs RTL characters.

    // Match all RTL chars
    let patterns: string[] = [];
    if (this.checkHebrew) patterns.push(this.hebrewPattern);
    if (this.checkArabic) patterns.push(this.arabicPattern);

    if (patterns.length === 0) return false;

    const rtlRegex = new RegExp(`[${patterns.join('')}]`, 'g');
    const matches = text.match(rtlRegex);

    if (!matches) return false;

    const rtlCount = matches.length;
    const totalCount = text.length; // Or stripped length?

    // If text is very short (e.g. 1-3 chars), and has ANY RTL, it should probably be RTL?
    // "שלום" -> 4 chars, 4 matches -> 100%.
    // "Hi שלום" -> 3+1+4 = 8 chars. 4 matches. 50%.
    // "Hello (שלום)" -> 12 chars. 4 matches. 33%.
    // Threshold 0.3 seems reasonable.

    if (totalCount === 0) return false;

    return (rtlCount / totalCount) > this.threshold;
  }
}
