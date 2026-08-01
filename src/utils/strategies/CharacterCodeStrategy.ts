import { DetectionStrategy } from './types';
import {
  countDirectional,
  isRTLCodePoint,
  SENSITIVITY_THRESHOLDS,
} from './rtlRanges';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  /**
   * Minimum number of **strong RTL characters** required before text can be
   * classified RTL.
   *
   * This is the only meaning of the setting. `RTLService` used to apply the
   * same number as a minimum *total text length* before consulting the
   * detector at all, so one value silently governed two unrelated gates; that
   * role now belongs to `minTextLength`.
   */
  minRTLChars: number;
  /** Upper bound on code points examined per detection. See countDirectional. */
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;

  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    this.config = config;
  }

  /** Retained for callers that test a single code point. */
  private isRTLChar(code: number): boolean {
    return isRTLCodePoint(code);
  }

  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    const counts = countDirectional(text, this.config.sampleSize);

    if (counts.rtl < this.config.minRTLChars) return false;
    if (counts.significant === 0) return false;

    const rtlRatio = counts.rtl / counts.significant;
    return rtlRatio >= SENSITIVITY_THRESHOLDS[this.config.sensitivity];
  }

  public updateConfig(config: Partial<RTLDetectionConfig>): void {
      this.config = { ...this.config, ...config };
  }
}
