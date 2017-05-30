'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DiffHelpers = function () {
  function DiffHelpers() {
    _classCallCheck(this, DiffHelpers);
  }

  _createClass(DiffHelpers, [{
    key: 'assignOpts',
    value: function assignOpts(oldString, newString, raw) {
      var opts = {};

      opts.newString = newString;
      opts.oldString = oldString;
      opts.raw = raw;

      opts.changeStart = this.getChangeStart(opts.oldString, opts.newString);
      opts.changeFromEnd = this.getChangeFromEnd(opts.oldString, opts.newString, opts.changeStart);

      opts.changeEndIndexNew = opts.newString.length - opts.changeFromEnd;
      opts.changeEndIndexOld = opts.oldString.length - opts.changeFromEnd;

      opts.charsAdded = opts.changeEndIndexNew - opts.changeStart;
      opts.charsRemoved = opts.changeEndIndexOld - opts.changeStart;

      return opts;
    }
  }, {
    key: 'getChangeFromEnd',
    value: function getChangeFromEnd(oldString, newString, changeStart) {
      var end = 0;
      while (end < oldString.length && end < newString.length && oldString.length - end > changeStart && newString.length - end > changeStart && oldString[oldString.length - 1 - end] == newString[newString.length - 1 - end]) {
        end++;
      }

      return end;
    }
  }, {
    key: 'getChangeStart',
    value: function getChangeStart(oldString, newString) {
      var start = 0;
      // You can use fancy es6 stuff.... or this which is 20+ times faster
      while (start < oldString.length && start < newString.length && oldString[start] == newString[start]) {
        start++;
      }

      return start;
    }
  }, {
    key: 'payload',
    value: function payload(opts) {
      var result = void 0;

      if (opts.charsRemoved === 0 && opts.charsAdded > 0) {
        result = {
          action: 'insert',
          start: opts.changeStart,
          payload: opts.newString.slice(opts.changeStart, opts.changeEndIndexNew)
        };
      } else if (opts.charsRemoved > 0 && opts.charsAdded === 0) {
        result = {
          action: 'delete',
          start: opts.changeStart,
          remove: opts.charsRemoved
        };
      } else if (opts.charsRemoved > 0 && opts.charsAdded > 0) {
        result = {
          action: 'replace',
          start: opts.changeStart,
          remove: opts.charsRemoved,
          payload: opts.newString.substr(opts.changeStart, opts.charsAdded)
        };
      } else {
        result = {
          action: 'noop'
        };
      }

      if (opts.raw) {
        result.raw = opts;
      }

      return result;
    }
  }]);

  return DiffHelpers;
}();

exports.default = new DiffHelpers();