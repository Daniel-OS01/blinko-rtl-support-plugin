1. **Identify the Bottleneck**:
   In `src/services/rtlService.ts`, the `MutationObserver` iterates over `safeSelectors` using a `for...of` loop to check if `element.matches(s)` for each added node and target node of `characterData` mutations.
   Given that mutations can fire hundreds or thousands of times during typing or page load, this array iteration inside the high-frequency observer callback is a significant performance bottleneck.

2. **The Optimization**:
   As indicated by the Bolt memory and the previous optimization in `processAllElements`, we can leverage the comma-separated `joinedSelectors` (which is already pre-computed as `safeSelectors.join(', ')`) to do a single `element.matches(joinedSelectors)` check instead of iterating over the array.

   If `joinedSelectors` is truthy, we simply evaluate `element.matches(joinedSelectors)` instead of the `for...of` loop.
   To be safe, we can wrap the single `matches` call in a `try...catch`. If it fails (which shouldn't happen because `safeSelectors` are pre-validated via `dummyElement`), we fall back to the `for...of` loop.

3. **Modifications**:
   In `src/services/rtlService.ts` within `setupObserver()`:
   - For `childList` added nodes (`mutation.addedNodes`): Replace the `for...of` loop that checks individual matches with an optimized single `element.matches(joinedSelectors)` check.
   - For `characterData` targets: Replace the `for...of` loop with the optimized single check.
   - Add comments explaining the optimization.

4. **Verify**:
   Run `bun run test` and `bun run build` to ensure tests pass and the build succeeds.

5. **Pre-commit**: Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
