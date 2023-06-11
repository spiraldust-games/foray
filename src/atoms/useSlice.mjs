const calculateEndPos = (end, endOfArray) => {
  if (end === undefined) {
    return endOfArray;
  }

  if (end < 0) {
    return endOfArray + end;
  }

  return end;
};

/**
 * `useSlice` acts like the Array.prototype.slice method for the output array.
 * It sets the start and end positions of the output array as it iterates
 * through the input items. If an item's position falls outside the specified
 * slice range, the function returns `undefined` and adjusts the output
 * array accordingly. It can take one or two arguments, and handles both
 * positive and negative indices.
 *
 * > **Note:** if you are looking to just handle slicing at the end of your atom
 * you should probably use a hook instead.
 *
 * @param {number} start - The start index. supports negative values that
 *     operate backwards from the end of the string.
 * @param {number} [end] - The end index. supports negative values that
 *     operate backwards from the end of the string.
 * @returns {function} - A function to be used as an atom with `fn()`.
 */
export default function useSlice(start, end = undefined) {
  return function _useSlice(item) {
    const endOfArray = this.entries.length;
    const startPos = start < 0 ? endOfArray + start : start;
    const endPos = calculateEndPos(end, endOfArray);

    if (this.i < startPos) {
      this.setOutputStart(this.i);
      return undefined;
    }

    // eslint-disable-next-line eqeqeq
    if (this.i == startPos) {
      this.setOutputStart(this.i);
      return item;
    }

    if (this.i >= endPos) {
      this.setOutputEnd(this.i);
      return undefined;
    }

    return item;
  };
}
