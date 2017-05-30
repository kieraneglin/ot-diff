'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _diffHelpers = require('./diff-helpers');

var _diffHelpers2 = _interopRequireDefault(_diffHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Diff = function () {
  function Diff() {
    _classCallCheck(this, Diff);
  }

  _createClass(Diff, [{
    key: 'diff',
    value: function diff(oldString, newString) {
      var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // Assign everything to this object, since I need to be able to return every variable in this
      var opts = _diffHelpers2.default.assignOpts(oldString, newString, raw);

      return _diffHelpers2.default.payload(opts);
    }
  }, {
    key: 'transform',
    value: function transform(string, _transform) {
      return this[_transform.action](string, _transform);
    }
  }, {
    key: 'insert',
    value: function insert(string, transform) {
      return string.slice(0, transform.start) + transform.payload + string.slice(transform.start);
    }
  }, {
    key: 'delete',
    value: function _delete(string, transform) {
      return string.slice(0, transform.start) + string.slice(transform.start + transform.remove);
    }
  }, {
    key: 'replace',
    value: function replace(string, transform) {
      return this.insert(this.delete(string, transform), transform);
    }
  }, {
    key: 'noop',
    value: function noop() {
      return;
    }
  }]);

  return Diff;
}();

module.exports = new Diff();