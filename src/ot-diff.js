import DiffHelpers from './diff-helpers';

class Diff {
  diff(oldString, newString, raw = false) {
    // Assign everything to this object, since I need to be able to return every variable in this
    let opts = DiffHelpers.assignOpts(oldString, newString, raw );

    return DiffHelpers.payload(opts);
  }
}

module.exports = new Diff();
