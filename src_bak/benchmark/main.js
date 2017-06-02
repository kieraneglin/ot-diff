import Benchmark from 'benchmark';
import d from './../ot-diff';

const suite = new Benchmark.Suite();

suite.add('Diff insert', () => {
  d.diff('strin', 'string');
})
.add('Diff delete', () => {
  d.diff('string', 'strin');
})
.add('Diff replace', () => {
  d.diff('string', 'strong');
})
.add('Diff noop', () => {
  d.diff('string', 'strong');
})
.on('cycle', (event) => {
  console.log(String(event.target));
})
.run({ 'async': true });
