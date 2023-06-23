import { forayBase, getFromForay } from '../index.mjs';

/**
 * get - simple offset getter.
 * @param {number} [offset=0]
 */
function get(offset = 0) {
  const array = getFromForay(this);

  return array[offset];
}

export default get;

forayBase.get = get;
