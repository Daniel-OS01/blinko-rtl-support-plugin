import { describe, it, expect, jest } from 'bun:test';
import { debounce } from '../../src/utils/debounce';

describe('debounce', () => {
  it('should execute the function after the specified wait time', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer on subsequent calls', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    await new Promise(resolve => setTimeout(resolve, 50));
    debouncedFn(); // Should reset timer

    expect(mockFn).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the debounced function', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2');

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
