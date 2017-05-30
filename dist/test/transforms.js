'use strict';

var _chai = require('chai');

var _otDiff = require('./../ot-diff');

var _otDiff2 = _interopRequireDefault(_otDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ot-transform', function () {
  it('Applies insert', function () {
    var diff = _otDiff2.default.diff('string', 'strings');

    _chai.assert.equal('strings', _otDiff2.default.insert('string', diff));
  });
  it('Applies delete', function () {
    var diff = _otDiff2.default.diff('strings', 'string');

    _chai.assert.equal('string', _otDiff2.default.delete('strings', diff));
  });
  it('Applies replace', function () {
    var diff = _otDiff2.default.diff('string', 'things');

    _chai.assert.equal('things', _otDiff2.default.replace('string', diff));
  });
  it('Applies noop', function () {
    var diff = _otDiff2.default.diff('string', 'string');

    _chai.assert.equal('string', _otDiff2.default.noop('string', diff));
  });
  it('Automatically transforms', function () {
    var diff = _otDiff2.default.diff('string', 'strings');
    _chai.assert.equal('strings', _otDiff2.default.transform('string', diff));

    diff = _otDiff2.default.diff('strings', 'string');
    _chai.assert.equal('string', _otDiff2.default.transform('strings', diff));

    diff = _otDiff2.default.diff('string', 'things');
    _chai.assert.equal('things', _otDiff2.default.transform('string', diff));

    diff = _otDiff2.default.diff('string', 'string');
    _chai.assert.equal('string', _otDiff2.default.transform('string', diff));
  });
});