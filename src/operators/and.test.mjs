import and from './and.mjs';

describe('and', () => {
  it('should return true when all functions return true', () => {
    const trueFn = () => true;

    const andFn = and(trueFn, trueFn);

    expect(andFn()).toBe(true);
  });

  it('should return false when at least one function returns false', () => {
    const trueFn = () => true;
    const falseFn = () => false;

    const andFn = and(trueFn, falseFn);

    expect(andFn()).toBe(false);
  });

  it('should return the last truthy value when all functions return truthy', () => {
    const truthyFn = () => 'truthy';

    const andFn = and(truthyFn, truthyFn);

    expect(andFn()).toBe('truthy');
  });

  it('should return the result of the first falsy function call when a function does not return truthy', () => {
    const truthyFn = () => 1;
    const falsyFn = () => 0;

    const andFn = and(truthyFn, falsyFn);

    expect(andFn()).toBe(0);
  });

  it('should short-circuit when a function returns falsy', () => {
    const truthyFn = () => true;
    const falsyFn = () => false;
    let sideEffect = 0;
    const sideEffectFn = () => { sideEffect++; return true; };
    const andFn = and(truthyFn, falsyFn, sideEffectFn);

    andFn();

    expect(sideEffect).toBe(0); // sideEffectFn should not have been called
  });
});
