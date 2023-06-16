import { forayBase, getFromForay } from '../index.mjs';

/**
 * set - simple offset setter.
 * @param {function} mapFn
 */
function set(key, value) {
  const isKey = typeof key === 'number' && key >= 0;
  const array = getFromForay(this);

  if (!isKey) {
    throw new Error(`'${key}' is not an array key`);
  }

  array[key] = value;

  return this;
}

export default set;

forayBase.set = set;
