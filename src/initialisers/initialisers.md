# Initialisers

These are somewhat different from other atoms and decorators, in that they expect to work on uninitialised atoms or decorators. By this it is meant that the atom function hasn't yet been run. This is because the initialiser is the one that runs it during runtime.

Initialisers allow you to pass in inputs to atoms and decorators that can only be accessed during runtime.

An example of this is `makeWithArg`.

```javascript
function makeWithArg(uninitialisedAtomFn, offset) {
  return function _makeWithArg(item) {
    const arg = this.getArg(offset);
    const atomFnLive = uninitialisedAtomFn.call(this, arg);

    return atomFnLive.call(this, item);
  };
}
```

Here we pass an atom that is then initialised during runtime, accepting a particular offset of argument that was passed into the original foray method.

Say we have a foray method called `doThisThing`, and we have an atom inside that method wrapped with `makeWithArg(someAtom, 0)`. When `doThisThing(123)` is run, the `someAtom` function will be initialised with `123` as its argument. `someAtom` will then return its function for dealing with array items. Then that function is used to process the array item.

[Back to main README](../../readme.md)
