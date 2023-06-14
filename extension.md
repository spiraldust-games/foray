# Extension

Foray is designed with extensibility in mind. While the core library only houses a few methods, you can conveniently add your own custom methods to the `forayBase`. This can be achieved using plain JavaScript methods or by leveraging Foray's built-in `fn()` function.

Below is an example of how you can extend Foray using plain JavaScript methods.

```javascript
import { forayBase, getFromForay } from 'foray';

forayBase.filterMapped = function(filterFn) {
  const array = getFromForay(this);
  // ... do what you want with your array here and return.
}
```

Although the above approach works, you might want to create more complex methods. This is where Foray's `fn()` function becomes handy. This function allows you to create methods that consist of multiple atomic functions or "atoms", which are executed in sequence.

Below is an example of how to create the `findMapped` method using the `fn()` function.

```javascript
import { fn, forayBase } from 'foray';
import cohesive from 'foray/operators/cohesive.mjs';
import withOutput from 'foray/decorators/withOutput.mjs';
import makeWithArg from 'foray/initialisers/makeWithArg.mjs';
import useEscape from 'foray/atoms/useEscape.mjs';
import useMapper from 'foray/atoms/useMapper.mjs';

const findMapped = fn(
  cohesive(
    makeWithArg(useMapper, 0),
    withOutput(useEscape(v => v)),
  ),
);

forayBase.findMapped = findMapped;
```

In this example, we create a new method `findMapped` that first applies a mapping function to the array elements (using `useMapper` atom), then checks each of these mapped elements against a condition (using `useEscape` atom). The atoms are brought together using the `cohesive` function which runs them in sequence, passing the output of one as input to the next.

This style of building functions may seem familiar to those who have experience with functional programming. However, if this is new to you, let's break it down:

1. `fn()` is a function that accepts a series of atoms. It returns a new function that, when invoked, executes these atoms in sequence.

2. The `cohesive()` function is used to combine two or more atoms into a single unit. This is so that the atoms can be executed per array item together, rather than in-series with the first atom run against the entire array, and then the second atom against the entire array.

3. `makeWithArg()` and `withOutput()` are examples of atom initialisers and decorators, respectively. Initialisers are used to initialise atoms during the runtime, while decorators modify the behaviour of an already initialised atom.

This modular approach to building functions provides flexibility and promotes code reuse. With Foray, you can construct complex array methods by combining simple, single-purpose atoms.

Take a look at the code, you will see that it is easy to create your own atoms, initialisers or decorators. Foray follows the following convention in terms of naming, but you are not bound to it:

- `makeWith`: the prefix for an initialiser.
- `with` : the prefix for a decorator.
- `use` : the prefix for an atom.
