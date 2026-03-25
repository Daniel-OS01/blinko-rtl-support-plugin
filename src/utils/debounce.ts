type DebouncedFn<T extends (...args: any[]) => void> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate: boolean = false
): DebouncedFn<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = function(this: any, ...args: Parameters<T>) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  } as DebouncedFn<T>;

  debounced.cancel = () => {
    if (!timeout) return;
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
