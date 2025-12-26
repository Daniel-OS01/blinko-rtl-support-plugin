/**
 * Debounce function to limit the rate at which a function can fire.
 * @param func The function to debounce
 * @param wait The delay in milliseconds
 * @param immediate Whether to trigger the function on the leading edge
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
