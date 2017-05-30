import { assert } from 'chai';
import d from './../ot-diff';

describe('ot-transform', () => {
  it('Applies insert', () => {
    let diff = d.diff('string', 'strings');

    assert.equal('strings', d.insert('string', diff));
  });
  it('Applies delete', () => {
    let diff = d.diff('strings', 'string');

    assert.equal('string', d.delete('strings', diff));
  });
  it('Applies replace', () => {
    let diff = d.diff('string', 'things');

    assert.equal('things', d.replace('string', diff));
  });
  it('Applies noop', () => {
    let diff = d.diff('string', 'string');

    assert.equal('string', d.noop('string', diff));
  });
  it('Automatically transforms', () => {
    let diff = d.diff('string', 'strings');
    assert.equal('strings', d.transform('string', diff));

    diff = d.diff('strings', 'string');
    assert.equal('string', d.transform('strings', diff));

    diff = d.diff('string', 'things');
    assert.equal('things', d.transform('string', diff));

    diff = d.diff('string', 'string');
    assert.equal('string', d.transform('string', diff));
  });
});
