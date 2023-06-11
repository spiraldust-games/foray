import { fn, forayBase } from '../index.mjs';
import cohesive from '../operators/cohesive.mjs';
import withOutput from '../decorators/withOutput.mjs';
import makeWithArg from '../initialisers/makeWithArg.mjs';
import useEscape from '../atoms/useEscape.mjs';
import useMapper from '../atoms/useMapper.mjs';

/**
 * findMapped - allows you to find() that also map()s, but will be more
 * efficient than running `[].map(x).find(x)` for finds that occur before the
 * end of the array, because it maps as it goes.
 * @param {function} mapFn - this will be the map function, on returning a
 *  truthy value, the processing will stop, and the result returned.
 */
const findMapped = fn(
  cohesive(
    makeWithArg(useMapper, 0),
    withOutput(useEscape(v => v)),
  ),
);

export default findMapped;

forayBase.findMapped = findMapped;
