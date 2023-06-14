import getFromForay from '../utils/getFromForay.mjs';
import hookCategory from '../enums/hookCategory.mjs';
import setToForay from '../utils/setToForay.mjs';

/**
 * Extend a method created by `fn()` to have hooks.
 * @param {function} method
 */
export default function setupHooks(method) {
  if (!getFromForay(method)) {
    setToForay(method, {});
  }

  const methodExtension = getFromForay(method);

  if (!methodExtension.hooks) {
    methodExtension.hooks = {};
  }
  for (const hook of Object.values(hookCategory)) {
    methodExtension.hooks[hook] = [];
  }

  return methodExtension;
}
