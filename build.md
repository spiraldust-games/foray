# Build

Just some notes about the build process.

## Why both Parcel and Babel?

Babel is used in order to handle transpiling .mjs files across to .cjs for the methods directory. This is because Parcel does not seem to have a good way of preserving file structure. It is designed, after all, to bundle everything it can into grouped entrypoint files; rather than honouring the original source structure.

But... honouring the original file structure was needed to allow the import of each individual method to be optional. E.g. the ability to import like so:

```javascript
import 'foray/methods/reduceMapped';
```

## `babel--transform-imports`

This is just a quick bespoke plugin that helps rename .mjs extensions in the source code across to .cjs. This is used when building the files via Babel when creating the cjs build.
