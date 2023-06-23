import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

/**
 * Adds the `beforeHook` to trigger before each loop of the array as `method`
 * processes.
 *
 * @param {function} method
 * @param {function} beforeHook
 */
export default function addBeforeHook(method, beforeHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.BEFORE].push(beforeHook);
}
