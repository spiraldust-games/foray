import foray from '../forayNode.mjs';
import './getReversed.mjs';

describe('foray', () => {
  describe('getReversed', () => {
    it('it correctly gets expected offsets', () => {
      const arr = [1, 2, 3, 4];

      expect(foray(arr).getReversed(0)).toEqual(4);
      expect(foray(arr).getReversed(1)).toEqual(3);
      expect(foray(arr).getReversed(2)).toEqual(2);
      expect(foray(arr).getReversed(3)).toEqual(1);
    });

    it('it correctly handles a default offset', () => {
      const arr = [1, 2, 3, 4];

      expect(foray(arr).getReversed()).toEqual(4);
    });

    it('it correctly doesn\'t get unexpected offsets', () => {
      const arr = [1, 2, 3, 4];

      expect(foray(arr).getReversed(-1)).toEqual(undefined);
      expect(foray(arr).getReversed(10)).toEqual(undefined);
      expect(foray(arr).getReversed('test')).toEqual(undefined);
    });
  });
});
