// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  // Trailing commas are used to decide whether to add a trailing comma
  // after the last element in an array or object literal.

  // 'none': No trailing commas are added.
  // Example: const array = [1, 2, 3];
  // Example: const object = { a: 1, b: 2, c: 3 };

  // 'es5': Trailing commas are added where valid in ES5 (objects, arrays, etc.),
  // but not for function parameters.
  // Example: const array = [1, 2, 3,];
  // Example: const object = { a: 1, b: 2, c: 3, };

  // 'all': Trailing commas are added wherever possible, including function parameters.
  // Example: const array = [1, 2, 3,];
  // Example: const object = { a: 1, b: 2, c: 3, };
  // Example:
  // function example(
  //   arg1,
  //   arg2,
  // ) {
  //   // function body
  // }
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
}

module.exports = config
