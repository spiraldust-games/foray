# Methods

These are what essentially power foray. Without them, the library would have no point in existing. These are the functions that get attached to `forayBase` which then means they are part of the API returned by `foray([])` call.

All the methods provided by default by `foray` have been constructed using `fn()`. And when you import the method file they automatically attach themselves to foray. This is the main point of foray as `fn()` allows you to build extensions from atomic building blocks — so it is the recommended route.

However, you can also create and attach your own standard js methods.

The key rule when doing that is that you must:

- create your method as a `function` not an () => arrow.
- you must access the array you are manipulating via `this[foraySymbol]` or `getFromForay(this)` or `setToForay(this, value)`.

Once created you just need to attach that method to `forayBase` for it to be callable by the foray API. E.g.

```javascript
const myArray = ['x', 'y', 'z'];
foray(myArray).myBespokeMethodAttachedToForayBase();
```

[Back to main README](./readme.md)
