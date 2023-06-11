/**
 * `useMapper` just applies a simple mapping function.
 * @param {function} mapFn
 */
export default function useMapper(mapFn) {
  return function _useMapper(item) {
    return mapFn(item);
  };
}
