import foray, { forayWeakCache, forayProxy } from './forayNode.mjs';

describe('foray', () => {
  describe('findMapped', () => {
    it('finds an element based on a provided mapping function', () => {
      const arr = ['one', 'two', 'three'];
      const lookup = { three: 'is the magic nu...' };
      const result = foray(arr).findMapped(key => lookup[key]);
      expect(result).toEqual(lookup.three);
    });

    it('returns undefined if no element is found', () => {
      const result = foray([0, 0, 0, 0]).findMapped(v => v);
      expect(result).toBeUndefined();
    });
  });

  describe('forayWeakCache', () => {
    it('correctly returns the same instance for the same array', () => {
      const arr = ['one', 'two', 'three'];

      const a = forayWeakCache(arr);
      const b = forayWeakCache(arr);

      const lookup = { three: 'is the magic nu...' };
      const result = foray(arr).findMapped(key => lookup[key]);

      expect(a).toBe(b);
      expect(result).toEqual(lookup.three);
    });
  });

  describe('forayProxy', () => {
    it('correctly proxies expected methods of the array', () => {
      const arr = forayProxy(['one', 'two', 'three']);

      expect(arr[0]).toEqual('one');
      expect(arr.length).toEqual(3);
      expect(arr.slice(0, 2)).toEqual(['one', 'two']);

      arr.push('four');

      expect(arr.length).toEqual(4);
      expect(arr.map((v) => `${v}${v}`)).toEqual([
        'oneone',
        'twotwo',
        'threethree',
        'fourfour',
      ]);
    });

    it('supports foray methods', () => {
      const arr = forayProxy(['one', 'two', 'three']);
      const result = foray(arr).findMapped(key => key);
      expect(result).toEqual('one');
    });

    it('supports iterator behaviour', () => {
      const arr = forayProxy(['one', 'two', 'three']);
      const result = Object.values(arr);
      expect(result).toEqual(['one', 'two', 'three']);
    });
  });
});
