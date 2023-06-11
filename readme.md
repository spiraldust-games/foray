# Foray

Foray is "for arrays", obviously.

It is a JavaScript library that enhances arrays with custom methods, allowing for flexible and efficient operations.

It's a lean, functional programming influenced tool, built with efficiency and expressiveness in mind. Foray works by encapsulating arrays and furnishing them with new capabilities, without compromising their original characteristics or performance.

It is specifically designed NOT to be a class extension of arrays, and NOT to muddy the prototype chain. It is just a method that you call to wrap an array, and it returns an extended API.

## Installation

```bash
npm install foray
```

## Getting Started

If you are using ES6...

```javascript
import foray from 'foray';
```

If you are using older js...

```javascript
const foray = require('foray').default;
```

By default Foray just imports the code it needs to get set-up. This means running foray() against an array initially will actually return nothing but an empty object. If you want useful methods, you need to import them.

```javascript
import foray from 'foray';
import 'foray/methods/findMapped';
```

or...

```javascript
const foray = require('foray').default;
require('foray/methods/findMapped');
```

Foray automatically attaches these methods to its returned API. Operating this way means you can be specific about what exactly you are including into your logic.

> **Please note:** due to Javascript's singleton nature — with regard to importing/requiring files. This means that every imported method will attach itself to foray(), even if you've imported these methods in separate files or contexts. Put simply, there is only one instance of foray().

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

The returned object for any array currently only contains a few methods:

- `.findMapped`: Essentially a performant replacement for `.map().find()`.
- `.reduceMapped`: A combined handler that `map()s` as it `reduce()s`.

## Extension

Foray is designed with extensibility in mind. While the core library only houses a few methods, you can conveniently add your own custom methods to the `forayBase`. This can be achieved using plain JavaScript methods or by leveraging Foray's built-in `fn()` function.

For more information, please see (here)[./extension.md].

### Further detail

There are readmes that cover each of the specific folders in this repo.

- [Methods](./src/methods/methods.md)
- [Atoms](./src/atoms/atoms.md)
- [Decorators](./src/hooks/decorators.md)
- [Initialisers](./src/initialisers/initialisers.md)
- [Operators](./src/operators/operators.md)
- [Hooks](./src/hooks/hooks.md)
- [Cursors](./src/cursors/cursors.md)

## Running Tests

Foray uses Jest for testing.

```bash
npm test
```

## Running Build

Foray is built using Parcel and Babel:

```bash
npm run build
```

This will run the lint and the tests. There is more detail about the build process to be found [here](./build.md).

## Contributing

We welcome contributions to Foray! If you have an idea for an improvement, a bugfix, or a new feature, please open an issue to discuss it. We're grateful for your help in making Foray better.

## With thanks to

Foray would not be possible, built as it is, without all the hard work from:

- Parcel
- Babel
- ESLint
- Git and Github
- Jest
- renamer
- rimraf
- cpy-cli

Thank you 🙇‍♀️

## License

Foray is licensed under the MIT License - see the LICENSE file for more details.
