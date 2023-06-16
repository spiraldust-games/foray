import { jest } from '@jest/globals';
import cohesive from './cohesive.mjs';

describe('cohesive', () => {
  test('combines multiple functions', () => {
    const double = num => num * 2;
    const addThree = num => num + 3;
    const cohesiveFn = cohesive(double, addThree);

    expect(cohesiveFn(2)).toBe(7);
  });

  test('passes result of one function to the next', () => {
    const appendA = str => `${str}a`;
    const appendB = str => `${str}b`;
    const appendC = str => `${str}c`;
    const cohesiveFn = cohesive(appendA, appendB, appendC);

    expect(cohesiveFn('test')).toBe('testabc');
  });

  test('sets output after each function call', () => {
    const context = {
      setOutput: jest.fn(),
    };
    const addTwo = num => num + 2;
    const addThree = num => num + 3;
    const cohesiveFn = cohesive(addTwo, addThree);

    cohesiveFn.call(context, 1);

    expect(context.setOutput).toHaveBeenCalledTimes(2);
    expect(context.setOutput).toHaveBeenNthCalledWith(1, 3);  // 1 + 2
    expect(context.setOutput).toHaveBeenNthCalledWith(2, 6);  // 3 + 3
  });
});
