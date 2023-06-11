/* eslint-disable no-console */
/**
 * `useLog` simply logs the current item and then returns it.
 * This can be useful for debugging.
 * @param {string} [params.prefix = '']
 * @param {string} [params.suffix = '']
 */
export default function useLog({ prefix = '', suffix = '', logFn = (v) => console.log(v) }) {
  return function _useLog(item) {
    logFn(`${prefix}${item}${suffix}`);

    return item;
  };
}
