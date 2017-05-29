'use strict';

var _benchmark = require('benchmark');

var _benchmark2 = _interopRequireDefault(_benchmark);

var _otDiff = require('./../ot-diff');

var _otDiff2 = _interopRequireDefault(_otDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var suite = new _benchmark2.default.Suite();

suite.add('Diff insert', function () {
  _otDiff2.default.diff('strin', 'string');
}).add('Diff delete', function () {
  _otDiff2.default.diff('string', 'strin');
}).add('Diff replace', function () {
  _otDiff2.default.diff('string', 'strong');
}).add('Diff noop', function () {
  _otDiff2.default.diff('string', 'strong');
}).on('cycle', function (event) {
  console.log(String(event.target));
}).run({ 'async': true });