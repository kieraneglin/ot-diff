# ot-diff

A diffing tool for [operational-transformations](http://operational-transformation.github.io/what-is-ot.html) in JavaScript.

(note: this is not a diffing tool as you might expect.  For git-style diffs, check out [diff](https://github.com/kpdecker/jsdiff))

## Purpose

When working with operational-transformations (OT), you need to know when a block of text is inserted, deleted, or replaced.  You're only working with contiguous changes in strings (contiguous meaning that all changes are together.  There's never more than one group of changes).

Here's an example:

```bash
# contiguous changes (what OT handles)
string  -> strings # insertion
strings -> string # deletion
string  -> strong # replacement

# non-contiguous changes (what OT can't handle)
string  -> things
```

This library exists to give you OT-friendly diffs between two strings.

## Usage

Install with

```bash
npm install ot-diff --save
# Or
yarn add ot-diff
```

Include with

```javascript
import OtDiff from 'ot-diff';
// Or
const OtDiff = require('ot-diff');
```

Use with

```javascript
OtDiff.diff('old string', 'new string', raw);
// raw is an optional boolean that will give you more information about the diff.  Default: false
```

### Examples

For more examples, see `src/test/`.

#### Insertion

```javascript
OtDiff.diff('strin', 'string')

// returns:
// {
//   action: 'insert',
//   payload: 'g',
//   start: 5 <- character which to insert after (0-indexed)
// }
```

#### Deletion

```javascript
OtDiff.diff('string', 'strin')

// returns:
// {
//   action: 'delete',
//   start: 5, <- character at which deletion starts (0-indexed)
// Deletion includes this character.
//   remove: 1 <- number of characters removed
// }
```

#### Replacement

```javascript

OtDiff.diff('string', 'strong')

// returns:
// {
//   action: 'replace',
//   start: 3,
//   remove: 1,
//   payload: 'o'
// }
```

#### No changes

```javascript
OtDiff.diff('string', 'string')

// returns:
// {
//   action: 'noop'
// }
```

### Transform tools

There are four helper tools for applying transformations to a string.

They all take the string you're manipulating and the transform returned by `OtDiff.diff`.  They are:

```javascript
let transform = OtDiff.diff(...);

OtDiff.insert('string', transform);
OtDiff.delete('string', transform);
OtDiff.replace('string', transform);
OtDiff.noop('string', transform);
```
Or, if you want the transform to be applied based on the value of `diff.action`, you can use this:

```javascript
let transform = OtDiff.diff(...);

OtDiff.transform('string', transform); // Automatically applies the correct transformation based on transform
```

## Contributing

### Changing code
Edit what you need in `src/ot-diff.js` then run `npm run compile` before submittig a PR.

Ensure that all tests are passing and you add any appropriate new tests before submitting!

### Running tests

`npm run test` will compile and run the compiled tests.

### Benchmarking

Please benchmark before and after contributing with `npm run benchmark`.  If your additions cause poor performance, they may be rejected.

#### Other

Bug reports and pull requests are welcome on GitHub at https://github.com/kieraneglin/ot-diff/. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License

The package is available as open source under the terms of the MIT License.
