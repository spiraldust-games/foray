# Methods

These are what essentially power Foray. Without them, the library would have no point in existing. These are the functions that get attached to `forayBase` which then means they are part of the API returned by the `foray([])` call.

All default methods provided by Foray are constructed using `fn()`. Upon importing, these methods automatically attach themselves to the Foray interface. This key feature encourages building extensions from atomic components, thus it is the recommended route.

However, you can also create and attach your own standard js methods.

The key rule when doing that is that you must:

- create your method as a `function` not an () => arrow. So we can use `this`.
- you must access the array you are manipulating via `this[foraySymbol]` or `getFromForay(this)` or `setToForay(this, value)`.

E.g.

```javascript
import { forayBase, getFromForay } from 'foray';

forayBase.getReversed = function(n) {
    const array = getFromForay(this);

    if (!array || !array.length) return;

    return array[array.length - 1 - n];
};
```

Once created you just need to attach that method to `forayBase` for it to be callable by the foray API.

E.g.

```javascript
const myArray = ['x', 'y', 'z'];
foray(myArray).getReversed(0); // 'z'
foray(myArray).getReversed(1); // 'y'
```

The example above is too trivial for building via `fn()` but suits creating as a simple extension method. To learn about how to use `fn()` however, please see the [Extension](./extension.md) section.


[Back to main README](./readme.md)
