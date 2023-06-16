import { forayBase, getFromForay } from '../index.mjs';

/**
 * get - simple offset getter.
 * @param {function} mapFn
 */
function get(n = 0) {
  const array = getFromForay(this);

  return array[n];
}

export default get;

forayBase.get = get;
