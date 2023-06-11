/**
 * `useReducer` applies a simple reduction function.
 * It assumes the initial value for the reduction is in the first argument slot.
 * @param {function} reduceFn
 */
export default function useReducer(reduceFn) {
  return function _useReducer(item) {
    // just return the first item, as we have no accumulator yet
    if (this.i === '0') {
      return item;
    }

    // we then accumulate on the subsequent items
    return reduceFn(this.getPreviousOutput(), item);
  };
}
