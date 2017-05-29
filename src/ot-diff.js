class Diff {
  diff(oldString, newString, raw = false) {
    // Assign everything to this object, since I need to be able to return every variable in this
    let opts = {};

    opts.newString = newString;
    opts.oldString = oldString;
    opts.raw = raw;

    opts.changeStart = this.getChangeStart(opts.oldString, opts.newString);
    opts.changeFromEnd = this.getChangeFromEnd(opts.oldString, opts.newString, opts.changeStart);

    opts.changeEndIndexNew = opts.newString.length - opts.changeFromEnd;
    opts.changeEndIndexOld = opts.oldString.length - opts.changeFromEnd;

    opts.charsAdded = opts.changeEndIndexNew - opts.changeStart;
    opts.charsRemoved = opts.changeEndIndexOld - opts.changeStart;

    return this.payload(opts);
  }

  getChangeFromEnd(oldString, newString, changeStart) {
    var end = 0;
    while(end < oldString.length &&
          end < newString.length &&
          oldString.length - end > changeStart &&
          newString.length - end > changeStart &&
          oldString[oldString.length - 1 - end] == newString[newString.length - 1 - end]) {
      end++;
    }

    return end;
  }

  getChangeStart(oldString, newString) {
    let start = 0;
    // You can use fancy es6 stuff.... or this which is 20+ times faster
    while(start < oldString.length && start < newString.length && oldString[start] == newString[start]) {
      start++;
    }

    return start;
  }

  payload(opts) {
    let result;

    if(opts.charsRemoved === 0 && opts.charsAdded > 0) {
      result = {
        action: 'insert',
        start: opts.changeStart,
        payload: opts.newString.slice(opts.changeStart, opts.changeEndIndexNew)
      };
    } else if(opts.charsRemoved > 0 && opts.charsAdded === 0) {
      result = {
        action: 'delete',
        start: opts.changeStart,
        remove: opts.charsRemoved
      };
    } else if(opts.charsRemoved > 0 && opts.charsAdded > 0) {
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

    if(opts.raw) {
      result.raw = opts;
    }

    return result;
  }
}

export default new Diff();
