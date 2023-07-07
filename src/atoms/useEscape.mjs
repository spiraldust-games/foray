/**
 * `useEscape` will stop the `fn()` process and immediately return if the
 * checkFn returns truthy.
 * @param {function} checkFn
 */
export default function useEscape(checkFn) {
  return function _useEscape(item) {
    if (checkFn(item)) {
      this.stopAndReturn(item);
    }

    return false;
  };
}
