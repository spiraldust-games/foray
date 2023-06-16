import foray from '../forayNode.mjs';
import './set.mjs';

describe('foray', () => {
  describe('set', () => {
    it('it correctly sets expected offsets', () => {
      const arr = [];

      foray(arr).set(0, 1);
      foray(arr).set(1, 2);
      foray(arr).set(2, 3);

      expect(arr).toEqual([1, 2, 3]);
    });

    it('it correctly errors for unexpected offsets', () => {
      const arr = [];

      expect(() => foray(arr).set('test', 1)).toThrow();
      expect(() => foray(arr).set(undefined, 2)).toThrow();
      expect(() => foray(arr).set(-1, 3)).toThrow();
    });
  });
});
