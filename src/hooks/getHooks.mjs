import getFromForay from '../utils/getFromForay.mjs';

/**
 * Grab out the list of hooks attached to `method` based on `hookCategoryName`.
 * If no `hookCategoryName` provided, then the entire hooks object is returned.
 *
 * @param {function} method
 * @param {string} [hookCategoryName=undefined]
 */
export default function getHooks(method, hookCategoryName = undefined) {
  const methodExtension = getFromForay(method) || {};
  const { hooks } = methodExtension;

  if (!hooks) return undefined;
  if (typeof hookCategoryName === 'undefined') return hooks;

  return hooks[hookCategoryName] || undefined;
}
