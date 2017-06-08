const main = require('./lib/index');

// console.log(new main.Transform());
let t = main.default.diff('fir', 'first');
let t2 = main.default.diff('sec', 'second');
let t3 = main.default.diff('thir', 'third');
let b = new main.Buffer();
b.push(t);
b.push(t2);
b.push(t3);
b.merge();
// console.log(t);
// console.log(t.toInt());
