import {
  useMapper, useEscape, makeWithArg, withOutput, cohesive,
} from './forayAtomsAndHelpers.mjs';

// used to attach the array to our returned API object
export const foraySymbol = Symbol('foray');

/**
 * The class just tracks the internal cursor used inside fn(). Atoms can use
 * this to alter the inputs and outputs, and to decide when we should return.
 */
class ForayCursor {
  constructor({ args = [], outputs = [] }) {
    this.i = 0;
    this.args = args;
    this.outputs = outputs;
    this.returnValue = undefined;
    this.stopped = false;
  }

  getArg(n = 0) {
    return this.args[n];
  }

  getOutput(n = this.i) {
    return this.outputs[n];
  }

  setOutput(v, n = this.i) {
    this.outputs[n] = v;
  }

  stopAndReturn(returnValue) {
    this.returnValue = returnValue;
    this.stopped = true;
  }
}

/**
 * Allows to create a function that is designed to manipulate an array using
 * atomic functions.
 * @param {...function} atoms
 */
export function fn(...atoms) {
  return function _fn(...args) {
    const array = this[foraySymbol];
    const outputs = [];
    const cursor = new ForayCursor({ args, outputs });
    for (const atom of atoms) {
      for (const [i, item] of Object.entries(array)) {
        cursor.i = i;
        outputs[i] = atom.call(cursor, item);
        if (cursor.stopped) {
          break;
        }
      }
      if (cursor.stopped) {
        break;
      }
    }

    return cursor.returnValue;
  };
}

/**
 * findMapped - allows you to find() that also map()s, but will be more
 * efficient than running `[].map(x).find(x)` for finds that occure before the
 * end of the array, because it maps as it goes.
 * @param {function} mapFn - this will be the map function, on returning a
 *  truthy value, the processing will stop, and the result returned.
 */
const findMapped = fn(
  cohesive(
    makeWithArg(useMapper, 0),
    withOutput(useEscape(v => v)),
  ),
);

// you can extend this base to add your own methods
export const forayBase = { findMapped };

// you can add items here that will be directly added to the foray instance
export const forayMixin = {
  toString() {
    const array = this[foraySymbol];

    return `Foray [${array}]`;
  },
};

/**
 * foray is an enhancement for arrays... ged'it? Call it around an array and
 * it will return an interface with enhanced methods for that array.
 * @param {array} array
 * @example
 *   const lookup = { c: 'you found me' };
 *   const result = foray(['a', 'b', 'c']).findMapped((key) => lookup[key]);
 *   console.log(result); // 'you found me';
 */
export default function foray(array) {
  const forayInstance = Object.create(forayBase);
  forayInstance[foraySymbol] = array;

  // support mixed in properties
  Object.assign(forayInstance, forayMixin);
  // support mixed in symbols
  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(forayMixin).forEach((sym) => {
      forayInstance[sym] = forayMixin[sym];
    });
  }

  return forayInstance;
}

/**
 * Wraps the passed array in a Proxy, returning an object that can be used just
 * like the original array, but with added methods provided by foray.
 *
 * @param {Array} array - The array to wrap in a foray proxy.
 * @returns {Object} A Proxy object that behaves like the array, but with
 *     added foray methods.
 *
 * @example
 *     const array = foray([1, 2, 3, 4]);
 *     array.push(5); // you can use standard array methods
 *     const output = array.findMapped((v) => { // ...and foray ones
 *         if (v * 2 === 8) return { found: true };
 *     });
 *     console.log(output); // { found: true }
 */
export function forayProxy(array) {
  const base10 = 10;
  const forayInstance = foray(array);
  const proxy = new Proxy(forayInstance, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }

      const isNumericKey = typeof prop === 'string' && !Number.isNaN(parseInt(prop, base10));
      if (isNumericKey) {
        return target[foraySymbol][prop];
      }

      const hasProp = prop in target[foraySymbol];
      const value = hasProp && target[foraySymbol][prop];
      const isFunction = value && value.bind;

      if (isFunction) {
        return target[foraySymbol][prop].bind(target[foraySymbol]);
      }

      if (value !== undefined) {
        return value;
      }

      return undefined;
    },
    ownKeys(target) {
      const array = target[foraySymbol];

      return Reflect.ownKeys(array);
    },
    getOwnPropertyDescriptor(target, prop) {
      const array = target[foraySymbol];

      if (prop in target || typeof prop === 'symbol') {
        return Reflect.getOwnPropertyDescriptor(target, prop);
      }

      const descriptor = Reflect.getOwnPropertyDescriptor(array, prop);

      // any property that exists on the array, but isn't configurable, will
      // throw an error if it doesn't also exist on the foray object. This is
      // because a not-yet-undefined property cannot be non-configurable. This
      // is a Javascript Invariant rule.
      descriptor.configurable = true;

      return descriptor;
    },
  });

  return proxy;
}

/**
 * Wraps the passed array in a foray object and stores it in a WeakMap. If the
 * same array is passed again, the function will return the stored foray
 * instance from the WeakMap, instead of creating a new one. This provides a
 * performance optimization for repeat calls with the same array.
 *
 * @param {Array} array - The array to wrap in a foray object.
 * @returns {Object} A foray object. If the same array has been passed before,
 *     the previous foray object will be returned.
 *
 * @example
 *     const array = [1, 2, 3, 4];
 *     // each time you want access to foray methods, just wrap the array
 *     const output1 = foray(array).findMapped((v) => {
 *         if (v * 2 === 8) return { found: 8 };
 *     });
 *     const output2 = foray(array).findMapped((v) => {
 *         if (v * 2 === 6) return { found: 6 };
 *     });
 *     console.log(output1); // { found: 8 }
 *     console.log(output2); // { found: 6 }
 */
export function forayWeakCache(array) {
  if (forayWeakCache.cache.has(array)) {
    return forayWeakCache.cache.get(array);
  }

  const forayInstance = foray(array);
  forayWeakCache.cache.set(array, forayInstance);

  return forayInstance;
}

forayWeakCache.cache = new WeakMap();
