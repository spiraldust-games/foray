/**
 * This is an example of an atom initialiser that will initialise the atom
 * during the runtime of the `fn()`. Once the atom function has been initialised
 * it will not be re-initialised, unless the argument passed during
 * initialisation changes value.
 * @param {function} uninitialisedAtomFn
 * @param {number} offset
 */
export default function makeWithArg(uninitialisedAtomFn, offset) {
  let lastArg;
  let lastFn;

  return function _makeWithArg(item) {
    const arg = this.getArg(offset);

    if (arg === lastArg && lastFn) {
      return lastFn.call(this, item);
    }

    const atomFnLive = uninitialisedAtomFn.call(this, arg);

    lastArg = arg;
    lastFn = atomFnLive;

    return atomFnLive.call(this, item);
  };
}
