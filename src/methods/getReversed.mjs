import { forayBase, getFromForay } from '../index.mjs';

/**
 * getReversed - simple reversed offset getter.
 * @param {function} mapFn
 */
function getReversed(n = 0) {
  const isKey = typeof n === 'number' && n >= 0;
  if (!isKey) {
    return undefined;
  }

  const array = getFromForay(this);

  if (!array || !array.length) return undefined;

  return array[array.length - 1 - n];
}

export default getReversed;

forayBase.getReversed = getReversed;
