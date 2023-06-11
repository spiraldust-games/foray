import getHooks from './getHooks.mjs';

/**
 * Trigger hooks based on hook category name.
 * @param {function} method
 */
export default function triggerHooks(method, hookCategoryName, cursor) {
  const hooks = getHooks(method, hookCategoryName) || [];

  for (const hook of hooks) {
    hook(cursor);
  }
}
