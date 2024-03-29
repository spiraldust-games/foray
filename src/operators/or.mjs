/**
 * Pass the input to multiple functions, in order, the output will be from the
 * first function to return a truthy value.
 *
 * @param {...function} fns
 */
export default function or(...fns) {
  const [first, ...others] = fns;
  const isTruthyFn = this && this.isTruthyFn || (v => !!v);

  return function _or(item) {
    let resp = first.call(this, item);

    for (const other of others) {
      resp = resp || other.call(this, item);

      if (isTruthyFn(resp)) return resp;
    }

    return resp;
  };
}

/**
 * Returns a configured version of `or`.
 * @param {object} params
 * @param {function} [params.isTruthyFn] - defaults to (v => !!v)
 */
or.configure = ({ isTruthyFn } = {}) => or.bind({ isTruthyFn });
