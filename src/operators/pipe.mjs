/**
 * Typical implementation of `pipe`. This is more basic than cohesive.
 *
 * Passes the input to multiple functions, in left-to-right order, the output
 * of the first function is passed to the next. The final output will be the
 * returned value from the last processed function.
 *
 * @param {...function} fns
 */
export default function pipe(...fns) {
  return function _pipe(item) {
    return fns.reduce((value, fn) => fn.call(this, value), item);
  };
}
