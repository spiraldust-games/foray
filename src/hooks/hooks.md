# Hooks

Most of the time you can achieve what you need using atoms by themselves. But if your operation involves processes that occur for the whole array. Then you will need a way to trigger logic either before, or after, the array has been processed.

This is where hooks come in.

> **NOTE:** You can only use hooks out-of-the-box if you are using `fn()` to create your methods. You can still use the hook methods to implement hooks on your own manual functions however.

Here's the example of the `reduceMapped` method.

```javascript
const reduceMapped = fn(
  cohesive(
    makeWithArg(useMapper, 0),
    makeWithArg(useReducer, 1),
  ),
);

// Reduce our outputs to the final one and return a single value.
addAfterAllHook(reduceMapped, (cursor) => {
  cursor.outputs = cursor.outputs.slice(-1);
  cursor.returnValue = cursor.outputs[0];
});
```

In order to achieve the correct reduce behaviour, we need to return the last output that has been processed. Here we use an `afterAll` hook. This runs as soon as the reducedMap method has finished its atom processing.

Under the hood (ATOW) all this is doing is creating the following attached structure to the `reduceMapped` method. This structure is then checked and used by the `fn()` at runtime.

```javascript
reduceMapped[foraySymbol] = {
  hooks: {
    after: [],
    afterAll: [(cursor) => {...}]
    before: [],
    beforeAll: [],
  }
};
```

[Back to main README](../../../readme.md)
