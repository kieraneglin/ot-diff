const main = require('./lib/index');

// console.log(new main.Transform());
let t = main.default.diff('str', 'stri');
t.start = '3';
console.log(t);
console.log(t.toInt());
