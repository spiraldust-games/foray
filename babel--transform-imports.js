/**
 * Because we are using babel to compile other methods folder across into dist
 * we also need to convert internal imports across to common js. This is so
 * that once working from dist, via a common js route, it will import common js
 * files.
 */
module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path) {
        let source = path.node.source.value;
        if (source.endsWith('.mjs')) {
          source = source.replace(/\.mjs$/, '.cjs');
          path.node.source.value = source;
        }
      },
    },
  };
};
