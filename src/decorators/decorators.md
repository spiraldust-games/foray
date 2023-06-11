# Decorator atoms

Whilst only a slight distinction, decorator atoms are similar to [atoms](../atoms/atoms.md), but their purpose is to modify the behaviour of existing atoms. They are still higher-order functions, that return the function that does the alteration.

An example is `withOutput`, this feeds a particular output as the input of the target atom. By default, if no `offset` is passed, then it feeds the output that is found at the `cursor.i` position.

```javascript
function withOutput(atomFn, offset) {
  return function _withOutput() {
    return atomFn.call(this, this.getOutput(offset));
  };
}
```

[Back to main README](../../readme.md)
