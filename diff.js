class Diff {
  diff(oldString, newString) {
    let changeStart = this.getChangeStart(oldString, newString),
      changeEnd = this.getChangeEnd(oldString, newString, changeStart);

    let changeEndIndexNew = newString.length - changeEnd,
      changeEndIndexOld = oldString.length - changeEnd;

    let charsAdded = changeEndIndexNew - changeStart,
      charsRemoved = changeEndIndexOld - changeStart;

    let result;

    if(charsRemoved === 0 && charsAdded > 0) {
      result = {
        action: 'insert',
        start: changeStart,
        payload: newString.slice(changeStart, changeEndIndexNew)
      };
    } else if(charsRemoved > 0 && charsAdded === 0) {
      result = {
        action: 'delete',
        start: changeStart,
        remove: charsRemoved
      };
    } else if(charsRemoved > 0 && charsAdded > 0) {
      result = {
        action: 'replace',
        start: changeStart,
        remove: charsRemoved,
        payload: newString.substr(changeStart, charsAdded)
      };
    } else {
      result = {
        action: 'unchanged'
      };
    }

    return result;
  }

  getChangeStart(oldString, newString) {
    let start = 0;
    // You can use fancy es6 stuff.... or this which is 20+ times faster
    while(start < oldString.length && start < newString.length && oldString[start] == newString[start]) {
      start++;
    }

    return start;
  }

  getChangeEnd(oldString, newString, changeStart) {
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
}
