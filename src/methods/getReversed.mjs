import { forayBase, getFromForay } from '../index.mjs';

/**
 * getReversed - simple reversed offset getter.
 * @param {number} [offset=0]
 */
function getReversed(offset = 0) {
  const isKey = typeof offset === 'number' && offset >= 0;
  if (!isKey) {
    return undefined;
  }

  const array = getFromForay(this);

  if (!array || !array.length) return undefined;

  return array[array.length - 1 - offset];
}

export default getReversed;

forayBase.getReversed = getReversed;
