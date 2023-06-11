import foraySymbol from '../enums/foraySymbol.mjs';

export default function getHooks(method, hookCategoryName = undefined) {
  const methodExtension = method[foraySymbol] || {};
  const { hooks } = methodExtension;

  if (!hooks) return undefined;
  if (typeof hookCategoryName === 'undefined') return hooks;

  return hooks[hookCategoryName] || undefined;
}
