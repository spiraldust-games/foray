import foray from '../forayNode.mjs';
import './reduceMapped.mjs';

describe('foray', () => {
  describe('reduceMapped', () => {
    it('it correctly maps and reduces', () => {
      const data = foray([1, 2, 3, 4]);
      const sumOfSquares = data.reduceMapped(
        x => x * x, // square each number
        (acc, x) => acc + x, // sum the squares
      );
      expect(sumOfSquares).toEqual(30);
    });
  });
});
