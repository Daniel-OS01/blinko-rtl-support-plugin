import { DetectionStrategy } from './types';

export class RegexStrategy implements DetectionStrategy {
  readonly name = 'Regex';

  // Hebrew regex from userscript
  private readonly hebrewRegex = /\p{Script=Hebrew}/u;
  // Arabic regex
  private readonly arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  private checkHebrew: boolean;
  private checkArabic: boolean;
  private minRTLChars: number;
  private combinedRegex: RegExp | null = null;

  constructor(checkHebrew: boolean = true, checkArabic: boolean = true, minRTLChars: number = 3) {
    this.checkHebrew = checkHebrew;
    this.checkArabic = checkArabic;
    this.minRTLChars = minRTLChars;
    this.updateCombinedRegex();
  }

  private updateCombinedRegex() {
    const sources: string[] = [];
    if (this.checkHebrew) {
      sources.push(this.hebrewRegex.source);
    }
    if (this.checkArabic) {
      sources.push(this.arabicRegex.source);
    }

    if (sources.length > 0) {
      this.combinedRegex = new RegExp(sources.join('|'), 'gu');
    } else {
      this.combinedRegex = null;
    }
  }

  detect(text: string): boolean {
    if (!text) return false;

    // Use combined regex to count matches
    if (!this.combinedRegex) return false;

    // Reset lastIndex because we use 'g' flag and reuse the regex instance
    this.combinedRegex.lastIndex = 0;

    let count = 0;
    while (this.combinedRegex.exec(text) !== null) {
      count++;
      if (count >= this.minRTLChars) return true;
    }

    return false;
  }

  public updateConfig(config: { minRTLChars?: number }): void {
    if (config.minRTLChars !== undefined) {
      this.minRTLChars = config.minRTLChars;
    }
  }
}
