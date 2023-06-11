import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

export default function addAfterHook(method, afterHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.AFTER].push(afterHook);
}
