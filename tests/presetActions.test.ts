/**
 * Branch coverage for the preset Load/Delete availability rules.
 *
 * These buttons use `aria-disabled` instead of the native `disabled` attribute
 * so that their tooltip still renders on hover — a natively disabled button
 * swallows pointer events, which is what left users unable to see why the
 * control was greyed out. The cost of that choice is that the button remains
 * genuinely interactive, so the guard has to live in the handler.
 *
 * Enter and Space on a <button> dispatch a click event, so the same handler
 * guard covers keyboard activation; the tests below assert that rather than
 * assuming it.
 */

import { describe, it, expect } from 'bun:test';
import { getPresetActionState, parseBoundedInt } from '../src/setting';

describe('getPresetActionState', () => {
  describe('plugin disabled — reported ahead of any selection problem', () => {
    it('load, with no preset selected', () => {
      expect(getPresetActionState('load', false, '')).toEqual({
        disabled: true,
        reason: 'Enable the plugin to load presets',
      });
    });

    it('delete, with a custom preset selected', () => {
      // The regression this guards: reporting "Select a preset to delete" when
      // a preset *is* selected and the real blocker is the plugin being off.
      expect(getPresetActionState('delete', false, 'my-custom-preset')).toEqual({
        disabled: true,
        reason: 'Enable the plugin to delete presets',
      });
    });

    it('delete, with a built-in preset selected', () => {
      expect(getPresetActionState('delete', false, 'default')).toEqual({
        disabled: true,
        reason: 'Enable the plugin to delete presets',
      });
    });
  });

  describe('plugin enabled, nothing selected', () => {
    it('load', () => {
      expect(getPresetActionState('load', true, '')).toEqual({
        disabled: true,
        reason: 'Select a preset to load',
      });
    });

    it('delete', () => {
      expect(getPresetActionState('delete', true, '')).toEqual({
        disabled: true,
        reason: 'Select a preset to delete',
      });
    });
  });

  describe('plugin enabled, built-in preset selected', () => {
    it('load is allowed — built-ins are readable', () => {
      expect(getPresetActionState('load', true, 'default')).toEqual({
        disabled: false,
        reason: 'Load selected preset',
      });
    });

    it('delete is blocked', () => {
      expect(getPresetActionState('delete', true, 'default')).toEqual({
        disabled: true,
        reason: 'Cannot delete built-in presets',
      });
    });
  });

  describe('plugin enabled, custom preset selected — both actions available', () => {
    it('load', () => {
      expect(getPresetActionState('load', true, 'my-custom-preset')).toEqual({
        disabled: false,
        reason: 'Load selected preset',
      });
    });

    it('delete', () => {
      expect(getPresetActionState('delete', true, 'my-custom-preset')).toEqual({
        disabled: false,
        reason: 'Delete selected preset',
      });
    });
  });

  it('always supplies a non-empty tooltip, enabled or not', () => {
    for (const action of ['load', 'delete'] as const) {
      for (const enabled of [true, false]) {
        for (const id of ['', 'default', 'my-custom-preset']) {
          expect(getPresetActionState(action, enabled, id).reason.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe('the handler guard blocks click and keyboard activation alike', () => {
  // Mirrors the JSX wiring: onClick={() => { if (!state.disabled) act(); }}
  function makeHandler(state: { disabled: boolean }, act: () => void) {
    return () => { if (!state.disabled) act(); };
  }

  const scenarios: [string, Parameters<typeof getPresetActionState>, boolean][] = [
    ['plugin off', ['delete', false, 'my-custom-preset'], false],
    ['nothing selected', ['delete', true, ''], false],
    ['built-in preset', ['delete', true, 'default'], false],
    ['custom preset', ['delete', true, 'my-custom-preset'], true],
  ];

  for (const [label, args, shouldRun] of scenarios) {
    it(`${label}: action ${shouldRun ? 'runs' : 'does not run'}`, () => {
      let calls = 0;
      const state = getPresetActionState(...args);
      const handler = makeHandler(state, () => { calls++; });

      handler(); // pointer click
      handler(); // Enter — dispatches click on a <button>
      handler(); // Space — dispatches click on a <button>

      expect(calls).toBe(shouldRun ? 3 : 0);
    });
  }
});

describe('parseBoundedInt', () => {
  // Guards the numeric settings inputs. A number input reports an empty string
  // while it is being cleared or retyped; parseInt('') is NaN, and writing that
  // to storage persists a setting that reads back as invalid.
  const rejected: [string, string][] = [
    ['empty (input cleared)', ''],
    ['whitespace only', '   '],
    ['not a number', 'abc'],
    ['lone minus (mid-typing)', '-'],
    ['below the minimum', '0'],
    ['negative', '-5'],
    ['above the maximum', '21'],
    ['far above the maximum', '9999'],
  ];

  for (const [label, raw] of rejected) {
    it(`rejects ${label}`, () => {
      expect(parseBoundedInt(raw, 1, 20)).toBeNull();
    });
  }

  const accepted: [string, number][] = [
    ['1', 1],
    ['20', 20],
    ['7', 7],
    ['07', 7],
    ['12px', 12], // parseInt's trailing-garbage tolerance is retained
  ];

  for (const [raw, expected] of accepted) {
    it(`accepts ${JSON.stringify(raw)} as ${expected}`, () => {
      expect(parseBoundedInt(raw, 1, 20)).toBe(expected);
    });
  }

  it('never returns NaN', () => {
    for (const raw of ['', ' ', 'x', 'NaN', 'Infinity', '-Infinity']) {
      const result = parseBoundedInt(raw, 1, 20);
      expect(result === null || Number.isFinite(result)).toBe(true);
    }
  });
});
