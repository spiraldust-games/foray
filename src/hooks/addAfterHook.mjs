import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

/**
 * Adds the `afterHook` to trigger once `method` has processed through one
 * loop of the target array.
 *
 * @param {function} method
 * @param {function} afterHook
 */
export default function addAfterHook(method, afterHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.AFTER].push(afterHook);
}
