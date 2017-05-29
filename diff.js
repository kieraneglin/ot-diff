class Diff {
  diff(oldString, newString) {
    let changeStart = this.getChangeStart(oldString, newString),
      changeEnd = this.getChangeEnd(oldString, newString, changeStart);

    let changeEndIndexNew = newString.length - changeEnd,
      changeEndIndexOld = oldString.length - changeEnd;

    let charsAdded = changeEndIndexNew - changeStart,
      charsRemoved = changeEndIndexOld - changeStart;

    // let fancyChar =

    console.log(`${oldString} -> ${newString}`);

    // console.log(`Change starts at: ${changeStart}`);
    // console.log(`Change ends at (from end): ${changeEnd}`);
    //
    // console.log(`Change ends at (old) ${changeEndIndexOld}`);
    // console.log(`Change ends at (new) ${changeEndIndexNew}`);
    //
    // console.log(`Number of chars added: ${charsAdded}`);
    // console.log(`Number of chars removed: ${charsRemoved}`);

    // Case statements are an anttipattern.  Look it up
    if(charsRemoved === 0 && charsAdded > 0) {
      console.log('Added');
      console.log(`Difference: ${newString.substr(changeStart, charsAdded)}`);
    } else if(charsRemoved > 0 && charsAdded === 0) {
      console.log('removed');
      console.log(`Difference: ${oldString.substr(changeStart, charsRemoved)}`);
    } else if(charsRemoved > 0 && charsAdded > 0) {
      console.log('replace');
      console.log(`Difference: ${oldString.substr(changeStart, charsAdded)} -> ${newString.substr(changeStart, charsAdded)}`);
    } else {
      console.log('no change');
    }
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

let d = new Diff();
d.diff('string', 'strig');
console.log('------------------------');
d.diff('s', 'd');
console.log('------------------------');
d.diff('st', 's');
console.log('------------------------');
d.diff('s', 'st');
console.log('------------------------');
d.diff('s', 's');
console.log('------------------------');
d.diff('this is long', 'this is l');
console.log('------------------------');
d.diff('string', 'strimg');
