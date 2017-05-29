'use strict';

var _chai = require('chai');

var _otDiff = require('./../ot-diff');

var _otDiff2 = _interopRequireDefault(_otDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ot-diff', function () {
  it('Returns additions', function () {
    _chai.assert.deepEqual(_otDiff2.default.diff('strin', 'string'), { action: 'insert', payload: 'g', start: 5 });
    _chai.assert.deepEqual(_otDiff2.default.diff('a', 'ab'), { action: 'insert', payload: 'b', start: 1 });
    _chai.assert.deepEqual(_otDiff2.default.diff('a', 'ba'), { action: 'insert', payload: 'b', start: 0 });
    _chai.assert.deepEqual(_otDiff2.default.diff('stng', 'string'), { action: 'insert', payload: 'ri', start: 2 });
    _chai.assert.deepEqual(_otDiff2.default.diff('', 'string'), { action: 'insert', payload: 'string', start: 0 });
  });
  it('Returns deletions', function () {
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'strin'), { action: 'delete', start: 5, remove: 1 });
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'stng'), { action: 'delete', start: 2, remove: 2 });
    _chai.assert.deepEqual(_otDiff2.default.diff('ab', 'b'), { action: 'delete', start: 0, remove: 1 });
    _chai.assert.deepEqual(_otDiff2.default.diff('a', ''), { action: 'delete', start: 0, remove: 1 });
  });
  it('Returns replacements', function () {
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'strong'), { action: 'replace', start: 3, remove: 1, payload: 'o' });
    _chai.assert.deepEqual(_otDiff2.default.diff('strings', 'stopped'), { action: 'replace', start: 2, remove: 5, payload: 'opped' });
    _chai.assert.deepEqual(_otDiff2.default.diff('entire', 'string'), { action: 'replace', start: 0, remove: 6, payload: 'string' });
  });
  it('Returns noop', function () {
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'string'), { action: 'noop' });
    _chai.assert.deepEqual(_otDiff2.default.diff('', ''), { action: 'noop' });
  });
  it('Returns raw', function () {
    _chai.assert.deepEqual(_otDiff2.default.diff('strin', 'string', true), {
      action: 'insert',
      payload: 'g',
      start: 5,
      raw: {
        changeEndIndexNew: 6,
        changeEndIndexOld: 5,
        changeFromEnd: 0,
        changeStart: 5,
        charsAdded: 1,
        charsRemoved: 0,
        newString: 'string',
        oldString: 'strin',
        raw: true
      }
    });
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'strin', true), {
      action: 'delete',
      start: 5,
      remove: 1,
      raw: {
        changeEndIndexNew: 5,
        changeEndIndexOld: 6,
        changeFromEnd: 0,
        changeStart: 5,
        charsAdded: 0,
        charsRemoved: 1,
        newString: 'strin',
        oldString: 'string',
        raw: true
      }
    });
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'strong', true), {
      action: 'replace',
      start: 3,
      remove: 1,
      payload: 'o',
      raw: {
        changeEndIndexNew: 4,
        changeEndIndexOld: 4,
        changeFromEnd: 2,
        changeStart: 3,
        charsAdded: 1,
        charsRemoved: 1,
        newString: 'strong',
        oldString: 'string',
        raw: true
      }
    });
    _chai.assert.deepEqual(_otDiff2.default.diff('string', 'string', true), {
      action: 'noop',
      raw: {
        changeEndIndexNew: 6,
        changeEndIndexOld: 6,
        changeFromEnd: 0,
        changeStart: 6,
        charsAdded: 0,
        charsRemoved: 0,
        newString: 'string',
        oldString: 'string',
        raw: true
      }
    });
  });
  it('Works with unicode', function () {
    _chai.assert.deepEqual(_otDiff2.default.diff('世', '世界'), { action: 'insert', payload: '界', start: 1 });
    _chai.assert.deepEqual(_otDiff2.default.diff('世界', '世'), { action: 'delete', start: 1, remove: 1 });
    _chai.assert.deepEqual(_otDiff2.default.diff('界', '世'), { action: 'replace', start: 0, remove: 1, payload: '世' });
    _chai.assert.deepEqual(_otDiff2.default.diff('界', '界'), { action: 'noop' });
  });
});