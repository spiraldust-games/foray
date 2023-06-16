/**
 * Combine more than one atom together, similar to `pipe()`, but making sure to
 * manage outputs as we go.
 *
 * @param {...function} atoms
 */
export default function cohesive(...atoms) {
  return function _cohesive(item) {
    return atoms.reduce((result, atomFn) => {
      const output = atomFn.call(this, result);
      this && this.setOutput(output);

      return output;
    }, item);
  };
}
