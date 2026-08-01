/**
 * Detection throughput guard.
 *
 * The repo accumulated dozens of PRs asserting performance wins in their
 * descriptions, benchmarked on a contributor's machine and never reproducible
 * here. This measures the hot path in-repo so a claim can be checked.
 *
 * The thresholds are deliberately loose — this is a guard against an order-of-
 * magnitude regression (an accidental O(n²), a regex rebuilt per character),
 * not a microbenchmark. CI machines are noisy; a test that fails on a busy
 * runner teaches people to ignore it.
 */

import { describe, it, expect } from 'bun:test';
import { RTLDetector } from '../src/utils/rtlDetector';
import { countDirectional } from '../src/utils/strategies/rtlRanges';

function measure(label: string, iterations: number, fn: () => void): number {
  fn(); // warm up
  const started = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  const elapsed = performance.now() - started;
  const perOp = elapsed / iterations;
  console.log(`  ${label}: ${elapsed.toFixed(1)}ms total, ${(perOp * 1000).toFixed(2)}µs/op`);
  return elapsed;
}

describe('detection throughput', () => {
  const detector = new RTLDetector({ sensitivity: 'medium', minRTLChars: 1 });

  const shortHebrew = 'שלום עולם';
  const paragraph = 'זהו משפט ארוך בעברית עם הרבה מילים ותוכן מעורב english words too. '.repeat(8);
  const huge = 'a'.repeat(200_000) + 'שלום עולם ומה שלומך היום';

  it('classifies a short string in well under 10µs', () => {
    const elapsed = measure('short', 20_000, () => detector.detectRTL(shortHebrew));
    expect(elapsed / 20_000).toBeLessThan(0.01); // 10µs
  });

  it('classifies a paragraph in well under 20µs', () => {
    const elapsed = measure('paragraph', 10_000, () => detector.detectRTL(paragraph));
    expect(elapsed / 10_000).toBeLessThan(0.02); // 20µs
  });

  it('is insensitive to input size, because sampling is bounded', () => {
    // The whole point of the sample budget: a 200k-character element must not
    // cost proportionally more than a paragraph.
    const paragraphPerOp = measure('paragraph', 2_000, () => detector.detectRTL(paragraph)) / 2_000;
    const hugePerOp = measure('200k chars', 2_000, () => detector.detectRTL(huge)) / 2_000;

    expect(hugePerOp).toBeLessThan(paragraphPerOp * 20);
    expect(hugePerOp).toBeLessThan(0.05); // 50µs regardless of size
  });

  it('scans without allocating per character', () => {
    // countDirectional is the shared inner loop. If it starts allocating —
    // substring, match arrays, per-character regexes — this is where it shows.
    const elapsed = measure('countDirectional', 50_000, () => countDirectional(paragraph, 100));
    expect(elapsed / 50_000).toBeLessThan(0.02);
  });

  it('a full-document sweep over many elements stays responsive', () => {
    const texts = [shortHebrew, 'Hello world', paragraph, '12345', 'مرحبا بالعالم'];
    const elapsed = measure('1000 mixed elements', 200, () => {
      for (let i = 0; i < 1000; i++) detector.detectRTL(texts[i % texts.length]);
    });
    // 1000 elements is a large note list; a sweep should stay well inside a
    // frame budget.
    expect(elapsed / 200).toBeLessThan(16);
  });
});
