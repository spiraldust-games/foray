import { jest } from '@jest/globals';
import pipeWhile from './pipeWhile.mjs';

describe('pipeWhile', () => {
  it('pipes values through provided functions until a falsey value is returned', () => {
    const fn1 = jest.fn((s) => s.replaceAll('a', 'b'));  // transform 'a' to 'b'
    const fn2 = jest.fn((s) => s.replaceAll('b', 'c'));  // transform 'b' to 'c'
    const fn3 = jest.fn((s) => '');  // remove all characters
    const fn4 = jest.fn((s) => s.replaceAll('c', 'd'));  // transform 'c' to 'd'
    const pipe = pipeWhile(fn1, fn2, fn3, fn4);
    const result = pipe('abc');
    expect(result).toBe('');
    expect(fn1).toHaveBeenCalledWith('abc');
    expect(fn2).toHaveBeenCalledWith('bbc');
    expect(fn3).toHaveBeenCalledWith('ccc');
    expect(fn4).not.toHaveBeenCalled();
  });

  it('returns the final function\'s output if no falsey values are encountered', () => {
    const fn1 = jest.fn((s) => s.replaceAll('a', 'b'));  // transform 'a' to 'b'
    const fn2 = jest.fn((s) => s.replaceAll('b', 'c'));  // transform 'b' to 'c'
    const fn3 = jest.fn((s) => s.replaceAll('c', 'd'));  // transform 'c' to 'd'
    const pipe = pipeWhile(fn1, fn2, fn3);
    const result = pipe('abc');
    expect(result).toBe('ddd');
    expect(fn1).toHaveBeenCalledWith('abc');
    expect(fn2).toHaveBeenCalledWith('bbc');
    expect(fn3).toHaveBeenCalledWith('ccc');
  });

  it('allows custom configuration of what is considered a truthy value', () => {
    const fn1 = jest.fn((s) => s.replaceAll('a', 'b'));  // transform 'a' to 'b'
    const fn2 = jest.fn((s) => s.replaceAll('b', 'c'));  // transform 'b' to 'c'
    const fn3 = jest.fn((s) => '0');  // return '0'
    const fn4 = jest.fn((s) => s.replaceAll('c', 'd'));  // transform 'c' to 'd'
    const pipe = pipeWhile.configure({ isTruthyFn: v => v !== '0' })(fn1, fn2, fn3, fn4);
    const result = pipe('abc');
    expect(result).toBe('0');
    expect(fn1).toHaveBeenCalledWith('abc');
    expect(fn2).toHaveBeenCalledWith('bbc');
    expect(fn3).toHaveBeenCalledWith('ccc');
    expect(fn4).not.toHaveBeenCalled();
  });
});
