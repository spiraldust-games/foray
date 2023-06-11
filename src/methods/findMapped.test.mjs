import foray from '../forayNode.mjs';
import './findMapped.mjs';

describe('foray', () => {
  describe('findMapped', () => {
    it('it correctly maps and finds', () => {
      const arr = ['one', 'two', 'three'];
      const lookup = { three: 'is the magic nu...' };
      const result = foray(arr).findMapped(key => lookup[key]);
      expect(result).toEqual(lookup.three);
    });
  });
});
