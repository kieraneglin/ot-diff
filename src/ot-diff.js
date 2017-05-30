import DiffHelpers from './diff-helpers';

class Diff {
  diff(oldString, newString, raw = false) {
    // Assign everything to this object, since I need to be able to return every variable in this
    let opts = DiffHelpers.assignOpts(oldString, newString, raw );

    return DiffHelpers.payload(opts);
  }
  transform(string, transform) {
    return this[transform.action](string, transform);
  }
  insert(string, transform) {
    return string.slice(0, transform.start) + transform.payload + string.slice(transform.start);
  }
  delete(string, transform) {
    return string.slice(0, transform.start) + string.slice(transform.start + transform.remove);
  }
  replace(string, transform) {
    return this.insert(this.delete(string, transform), transform);
  }
  noop(string) {
    return string;
  }
}

export default new Diff();
