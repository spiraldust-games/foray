import forno from '../utils/forno.mjs';

/**
 * `useChunk` will chunk an array as it steps through it.
 *
 * > NOTE: That on using other atoms after `useChunk`, they will receive chunks
 * of arrays as items; rather than items themselves.
 *
 * @param {number} chunkSize - the size each chunk will be, it is possible for
 *   the last chunk to be smaller than this size.
 */
export default function useChunk(chunkSize = 1) {
  if (forno(chunkSize).isLessThan(1)) {
    throw new Error('unexpected value for chunkSize in useChunk');
  }

  return function _useChunk(item) {
    const oi = Math.floor(this.i / chunkSize);

    let current = this.getOutput(oi);

    if (Array.isArray(current) && current.length < chunkSize) {
      current.push(item);
    } else {
      current = [item];
    }

    this.setOutput(current, oi);
    this.setOutputEnd(oi + 1);
    this.setReturnValue(this.outputs);

    return undefined;
  };
}
