# Foray

Foray is "for arrays", obviously.

It is a JavaScript library that enhances arrays with custom methods, allowing for flexible and efficient operations.

It's a lean, functional programming influenced tool, built with efficiency and expressiveness in mind. Foray works by encapsulating arrays and furnishing them with new capabilities, without compromising their original characteristics or performance.

It is specifically designed NOT to be a class extension of arrays, and NOT to muddy the prototype chain. It is just a method that you call to wrap an array, and it returns an extended API.

## Installation

```javascript
npm install foray
```

## Getting Started

If you are using ES6...

```javascript
import foray from '@spiraldust-games/foray';
```

This library is bundled using parcel however, so it also supports old methods:

```javascript
const foray = require('@spiraldust-games/foray').default;
```

## Core Concepts

Foray operates through encapsulation. In its basic form it just accepts the array you want to work on and returns an API object that contains only foray's extended array methods. This is the prefered way of working, for a few reasons:

1. It is more performant — _than utilising proxy methods._
2. It is more explicit — _by calling foray() whereever you are using it._

You can however opt to use `forayProxy`, which returns a proxied version of your array, enhanced by the additional Foray methods. It should be noted that if you plan to access properties of the array either very quickly or very frequently, you would be best to avoid the proxy, and perhaps use `forayWeakCache` instead.

The power of Foray lies in its atomic functions, or "atoms", which form the building blocks of the methods that are applied to the arrays. An atom is a function that processes an array item. Multiple atoms can be combined together into cohesive units to form complex operations. Foray also includes mechanisms to escape from operations early for efficiency, and to pass output from one atom to another for flexibility.

## Usage

Here is an example using Foray:

```javascript
// some random lookup object
const lookup = { b: 'you found me' };

// our array we want to work with
const array = ['a', 'b', 'c'];

// use foray to find the value in the lookup object by key
const result = foray(array).findMapped((item) => lookup[item]);

console.log(result); // 'you found me';
```

In this example, we wrap the array `['a', 'b', 'c']` with the `foray()` function. We then use the `findMapped()` method, a custom method provided by Foray, to find the first key in the array that exists in our lookup object and return the corresponding value.

You might ask, why not do this?

```javascript
array.map((item) => lookup[item]).find((v) => v);
```

And whilst the above is quite readable, and is standard javascript, it is not optimal. This is because you have already gone through the entire array for the mapping before you action your find. There are obviously many ways you could write the same thing:

```javascript
for (const item of array) {
    if (lookup[item]) return lookup[item];
}
```

But... the aim of Foray was to make a standardised way of extending arrays with performant methods, using atomic functional building blocks. Whilst there are other libraries that do a similar thing, many of them try to completely co-opt you into their world. Foray is only a light layering of functional methods hidden away behind a simple array API. You can use what you want from it without having to change your paradigm.

Foray is the starting point. You can extend this interface however you like.

## API - Wrappers

Foray's API contains the following wrapper functions:

- `foray(array)`: The main function, it accepts an array and returns an interface with enhanced methods for that array.
- `forayProxy(array)`: Returns a Proxy object that behaves like the array, but with added Foray methods.
- `forayWeakCache(array)`: Wraps the passed array in a foray object and stores it in a WeakMap. If the same array is passed again, the function will return the stored foray instance from the WeakMap.

## API - Array Interface

The returned object for any array currently only contains one method:

- `.findMapped`: Essentially a performant replacement for `.map().find()`.

## Extension

Foray is designed with extensibility in mind. While the core library only houses one method, you can conveniently add your own custom methods to the `forayBase`. This can be achieved using plain JavaScript methods or by leveraging Foray's built-in `fn()` function.

Below is an example of how you can extend Foray using plain JavaScript methods.

```javascript
import { forayBase, foraySymbol } from '@spiraldust-games/foray';

// Manual function extension
forayBase.filterMapped = function(filterFn) {
  const array = this[foraySymbol];
  // ... do what you want with your array here and return.
}
```

Although the above approach works, you might want to create more complex methods. This is where Foray's `fn()` function becomes handy. This function allows you to create methods that consist of multiple atomic functions or "atoms", which are executed in sequence.

Below is an example of how to create the `findMapped` method using the `fn()` function.

```javascript
import {
  fn,
  forayBase,
  useMapper,
  useEscape,
  cohesive,
  makeWithArg,
  withOutput
} from '@spiraldust-games/foray';

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

## Running Tests

Foray uses Jest for testing.

```bash
npm test
```

## Running Build

Foray is built using Parcel:

```bash
npm run build
```

This will run the lint and the tests.

## Contributing

We welcome contributions to Foray! If you have an idea for an improvement, a bugfix, or a new feature, please open an issue to discuss it. We're grateful for your help in making Foray better.

## License

Foray is licensed under the MIT License - see the LICENSE file for more details.
