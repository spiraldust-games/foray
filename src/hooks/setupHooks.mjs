import foraySymbol from '../enums/foraySymbol.mjs';
import hookCategory from '../enums/hookCategory.mjs';

/**
 * Extend a method created by `fn()` to have hooks.
 * @param {function} method
 */
export default function setupHooks(method) {
  if (!method[foraySymbol]) {
    method[foraySymbol] = {};
  }

  const methodExtension = method[foraySymbol];

  if (!methodExtension.hooks) {
    methodExtension.hooks = {};
  }
  for (const hook of Object.values(hookCategory)) {
    methodExtension.hooks[hook] = [];
  }

  return methodExtension;
}
