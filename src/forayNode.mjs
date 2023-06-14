import util from 'util';
import * as forayBundle from './foray.mjs';

// extend foray for use in Node to get better logging
export const forayInspectSymbol = util.inspect.custom || Symbol('inspect');
forayBundle.forayMixin[forayInspectSymbol] = function inspect(_depth, opts) {
  const array = forayBundle.getFromForay(this);

  return `Foray ${util.inspect(array, opts)}`;
};

export default forayBundle.default;
export * from './foray.mjs';
