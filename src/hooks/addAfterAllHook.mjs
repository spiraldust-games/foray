import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

/**
 * Adds the `afterAllHook` to trigger once `method` has finished processing
 * the target array.
 *
 * @param {function} method
 * @param {function} afterAllHook
 *
 * @example
 * // Reduce our outputs to the final one and return a single value.
 * addAfterAllHook(reduceMapped, (cursor) => {
 *   cursor.outputs = cursor.outputs.slice(-1);
 *   ([cursor.returnValue] = cursor.outputs);
 * });
 */
export default function addAfterAllHook(method, afterAllHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.AFTER_ALL].push(afterAllHook);
}
