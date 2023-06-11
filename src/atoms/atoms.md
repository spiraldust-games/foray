# Atoms

These are higher-order functions that are designed to operate on one element of the array at a time. They return a function that is used to process the array items.

The returned function should follow these constraints:
- it should take one argument.
- it should return a singular value.
- it should be a normal function i.e. not an arrow function, if you want to access the extended methods on `this`.

## Accessing the cursor

All atom functions are executed using `atom.call(cursor, item)` this means you have access to foray's internal cursor methods.

These methods allow to control the overall foray process.

[Back to main README](../../../readme.md)
