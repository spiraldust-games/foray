/**
 * This is an example of an atom initialiser that will initialise the atom
 * during the runtime of the fn().
 * @param {function} uninitialisedAtomFn
 * @param {number} offset
 */
export default function makeWithArg(uninitialisedAtomFn, offset) {
  return function _makeWithArg(item) {
    const arg = this.getArg(offset);
    const atomFnLive = uninitialisedAtomFn.call(this, arg);

    return atomFnLive.call(this, item);
  };
}
