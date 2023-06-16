/**
 * Pass the input to multiple functions, in order, the output will be from the
 * last function to return a truthy value.
 *
 * @param {...function} fns
 */
export default function and(...fns) {
  const [first, ...others] = fns;
  const isTruthyFn = this && this.isTruthyFn || (v => !!v);

  return function _and(item) {
    let resp = first.call(this, item);

    for (const other of others) {
      resp = resp && other.call(this, item);

      if (!isTruthyFn(resp)) return resp;
    }

    return resp;
  };
}

/**
 * Returns a configured version of `and`.
 * @param {object} params
 * @param {function} [params.isTruthyFn] - defaults to (v => !!v)
 */
and.configure = ({ isTruthyFn } = {}) => and.bind({ isTruthyFn });
