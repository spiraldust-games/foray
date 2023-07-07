/* eslint-disable no-console */
/**
 * `withLog` is a decorator that logs the output of a passed-in atom function.
 * @param {function} atomFn
 * @param {function} [logFn=(v)=>console.log(v)]
 *
 * @example
 * fn(
 *   cohesive(
 *     withLog(makeWithArg(useMapper, 0)),
 *     useEscape(v => v),
 *   )
 * );
 */
export default function withLog(atomFn, logFn = (v) => console.log(v)) {
  return function _withLog(item) {
    const output = atomFn.call(this, item);

    logFn(output);

    return output;
  };
}
