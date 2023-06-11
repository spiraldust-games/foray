import setupHooks from './setupHooks.mjs';
import getHooks from './getHooks.mjs';
import hookCategory from '../enums/hookCategory.mjs';

export default function addBeforeHook(method, beforeHook) {
  setupHooks(method);

  const hooks = getHooks(method);

  hooks[hookCategory.BEFORE].push(beforeHook);
}
