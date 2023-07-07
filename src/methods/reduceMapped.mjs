import { fn, forayBase } from '../index.mjs';
import cohesive from '../operators/cohesive.mjs';
import makeWithArg from '../initialisers/makeWithArg.mjs';
import useMapper from '../atoms/useMapper.mjs';
import useReducer from '../atoms/useReducer.mjs';
import addAfterAllHook from '../hooks/addAfterAllHook.mjs';

/**
 * Map and reduce at the same time!!
 *     "Where we're going, roads aren't even a concept..."
 *
 * @param {function} mapFn
 * @param {function} reduceFn
 * @example
 * const data = foray([1, 2, 3, 4]);
 * const sumOfSquares = data.reduceMapped(
 *   x => x * x, // square each number
 *   (acc, x) => acc + x // sum the squares
 * );
 * console.log(sumOfSquares); // Outputs 30
 */
const reduceMapped = fn(
  cohesive(
    makeWithArg(useMapper, 0),
    makeWithArg(useReducer, 1),
  ),
);

// Reduce our outputs to the final one and return a single value.
addAfterAllHook(reduceMapped, (cursor) => {
  cursor.outputs = cursor.outputs.slice(-1);
  ([cursor.returnValue] = cursor.outputs);
});

forayBase.reduceMapped = reduceMapped;

export default reduceMapped;
