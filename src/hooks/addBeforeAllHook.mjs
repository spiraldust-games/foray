import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

export default function addBeforeHook(method, beforeAllHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.BEFORE_ALL].push(beforeAllHook);
}
