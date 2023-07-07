import foray from '../forayNode.mjs';
import './toChunked.mjs';

describe('foray', () => {
  describe('toChunked', () => {
    it('correctly chunks the array by two', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      const result = foray(arr).toChunked(2);

      expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    it('correctly chunks the array by three', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      const result = foray(arr).toChunked(3);

      expect(result).toEqual([[1, 2, 3], [4, 5, 6]]);
    });

    it('correctly chunks the array by more than the array itself', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      const result = foray(arr).toChunked(30);

      expect(result).toEqual([[1, 2, 3, 4, 5, 6]]);
    });

    it('correctly chunks the array if it is empty', () => {
      const arr = [];
      const result = foray(arr).toChunked(6);

      expect(result).toEqual([]);
    });

    it('throws an error if given an illegal chunk value (negative number)', () => {
      const arr = [1, 2, 3, 4, 5, 6];

      expect(() => foray(arr).toChunked(-1)).toThrow('unexpected value for chunkSize in useChunk');
    });

    it('throws an error if given an illegal chunk value (null)', () => {
      const arr = [1, 2, 3, 4, 5, 6];

      expect(() => foray(arr).toChunked(null)).toThrow('unexpected value for chunkSize in useChunk');
    });
  });
});
