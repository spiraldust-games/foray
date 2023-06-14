import getFromForay from '../utils/getFromForay.mjs';

export default function getHooks(method, hookCategoryName = undefined) {
  const methodExtension = getFromForay(method) || {};
  const { hooks } = methodExtension;

  if (!hooks) return undefined;
  if (typeof hookCategoryName === 'undefined') return hooks;

  return hooks[hookCategoryName] || undefined;
}
