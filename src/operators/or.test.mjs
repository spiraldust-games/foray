import { jest } from '@jest/globals'; // eslint-disable-line import/no-extraneous-dependencies
import or from './or.mjs';

describe('operators > or', () => {
  it('should return true when at least one function returns true', () => {
    const trueFn = () => true;
    const falseFn = () => false;

    const orFn = or(trueFn, falseFn);

    expect(orFn()).toBe(true);
  });

  it('should return false when all functions return false', () => {
    const falseFn = () => false;

    const orFn = or(falseFn, falseFn);

    expect(orFn()).toBe(false);
  });

  it('should return first truthy value when at least one function returns truthy', () => {
    const truthyFn = () => 'truthy';
    const falseFn = () => false;

    const orFn = or(falseFn, truthyFn);

    expect(orFn()).toBe('truthy');
  });

  it('should return the result of the last function call when no functions return truthy', () => {
    const falsyFn1 = () => null;
    const falsyFn2 = () => 0;

    const orFn = or(falsyFn1, falsyFn2);

    expect(orFn()).toBe(0);
  });

  test('should short-circuit when a function returns truthy', () => {
    let sideEffect = 0;
    const sideEffectFn = jest.fn(() => {
      sideEffect++;
      return false;
    });

    const truthyFn = () => true;
    const andFn = or(truthyFn, sideEffectFn);

    expect(andFn()).toBe(true);
    expect(sideEffect).toBe(0);
    expect(sideEffectFn).not.toHaveBeenCalled();
  });
});
