import setToForno from './setToForay.mjs';
import getFromForno from './getFromForay.mjs';

export const fornoMixin = {
  toString() {
    const number = getFromForno(this);

    return `Forno ${number}`;
  },
};

const fornoBase = {
  isGreaterThan(v) {
    return getFromForno(this) > v;
  },
  isGreaterThanOrEqualTo(v) {
    return getFromForno(this) >= v;
  },
  isLessThan(v) {
    return getFromForno(this) < v;
  },
  isLessThanOrEqualTo(v) {
    return getFromForno(this) <= v;
  },
};

/**
 * A simpler version of foray, but for numbers. Pass this a number and it will
 * return an interface with enhanced methods for that number. I may build this
 * out into a similar system to `foray()`, but then, I also... may not.
 * @param {number} number
 * @example
 * const result = forno(123).isGreaterThan(100);
 * console.log(result); // true;
 */
export default function forno(number) {
  const fornoInstance = Object.create(fornoBase);
  setToForno(fornoInstance, number);

  // support mixed in properties
  Object.assign(fornoInstance, fornoMixin);
  // support mixed in symbols
  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(fornoMixin).forEach((sym) => {
      fornoInstance[sym] = fornoMixin[sym];
    });
  }

  return fornoInstance;
}
