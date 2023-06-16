/**
 * Pass the input to multiple functions, in left-to-right order, the output of
 * the first function is passed to the next. If a falsey value is encountered
 * the processing stops and returns. The final output will be the returned
 * value from the last processed function.
 *
 * A good use-case for this atom would be passing your input through a list of
 * functions that replace tokens. It will continue on replacing, returning the
 * modified input. If you encounter something that doesn't validate you can
 * return a falsey value to halt processing.
 *
 * It might also be that falsey isn't good enough for your use-case. If so, you
 * can create a configured version using `pipeWhile.configure({ isTruthyFn })`.
 * This allows you to control what is seen as truthy, anything outside of this
 * will halt the processing.
 *
 * @param {...function} fns
 */
export default function pipeWhile(...fns) {
  const [first, ...others] = fns;
  const isTruthyFn = this && this.isTruthyFn || (v => !!v);

  return function _and(item) {
    let resp = first.call(this, item);

    if (!isTruthyFn(resp)) return resp;

    for (const other of others) {
      resp = other.call(this, resp);

      if (!isTruthyFn(resp)) return resp;
    }

    return resp;
  };
}

/**
 * Returns a configured version of `pipeWhile`.
 * @param {object} params
 * @param {function} [params.isTruthyFn] - defaults to (v => !!v)
 */
pipeWhile.configure = ({ isTruthyFn } = {}) => pipeWhile.bind({ isTruthyFn });
