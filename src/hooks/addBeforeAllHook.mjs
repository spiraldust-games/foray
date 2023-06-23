import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

/**
 * Adds the `beforeAllHook` to trigger once before any array processing
 * by `method`
 *
 * @param {function} method
 * @param {function} beforeAllHook
 */
export default function addBeforeAllHook(method, beforeAllHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.BEFORE_ALL].push(beforeAllHook);
}
