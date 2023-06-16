import foray from '../forayNode.mjs';
import './get.mjs';

describe('foray', () => {
  describe('get', () => {
    it('it correctly gets expected offsets', () => {
      const arr = [1, 2, 3, 4];

      expect(foray(arr).get(0)).toEqual(1);
      expect(foray(arr).get(1)).toEqual(2);
      expect(foray(arr).get(2)).toEqual(3);
      expect(foray(arr).get(3)).toEqual(4);
    });

    it('it correctly handles a default offset', () => {
      const arr = [1, 2, 3, 4];

      expect(foray(arr).get()).toEqual(1);
    });

    it('it correctly doesn\'t get unexpected offsets', () => {
      const arr = [1, 2, 3, 4];

      expect(foray(arr).get(-1)).toEqual(undefined);
      expect(foray(arr).get(10)).toEqual(undefined);
      expect(foray(arr).get('test')).toEqual(undefined);
    });
  });
});
