import addBeforeAllHook from '../hooks/addBeforeAllHook.mjs';
import makeWithArg from '../initialisers/makeWithArg.mjs';
import useChunk from '../atoms/useChunk.mjs';
import { fn, forayBase } from '../index.mjs';

/**
 * toChunked - maps your array to a chunked version.
 * @param {number} chunkSize - controls the maximum size of each chunk.
 * @example
 * const data = foray([1, 2, 3, 4]);
 * data.toChunked(2); // [[1, 2], [3, 4]]
 */
const toChunked = fn(
  makeWithArg(useChunk, 0),
);

// Make sure that empty arrays return []
addBeforeAllHook(toChunked, (cursor) => {
  cursor.setReturnValue([]);
});

export default toChunked;

forayBase.toChunked = toChunked;
