import { assert } from 'chai';
import d from './../ot-diff';

describe('ot-diff', () => {
  it('Returns additions', () => {
    assert.deepEqual(d.diff('strin', 'string'), { action: 'insert', payload: 'g', start: 5 });
    assert.deepEqual(d.diff('a', 'ab'), { action: 'insert', payload: 'b', start: 1 });
    assert.deepEqual(d.diff('a', 'ba'), { action: 'insert', payload: 'b', start: 0 });
    assert.deepEqual(d.diff('stng', 'string'), { action: 'insert', payload: 'ri', start: 2 });
    assert.deepEqual(d.diff('', 'string'), { action: 'insert', payload: 'string', start: 0 });
  });
  it('Returns deletions', () => {
    assert.deepEqual(d.diff('string', 'strin'), { action: 'delete', start: 5, remove: 1 });
    assert.deepEqual(d.diff('string', 'stng'), { action: 'delete', start: 2, remove: 2 });
    assert.deepEqual(d.diff('ab', 'b'), { action: 'delete', start: 0, remove: 1 });
    assert.deepEqual(d.diff('a', ''), { action: 'delete', start: 0, remove: 1 });
  });
  it('Returns replacements', () => {
    assert.deepEqual(d.diff('string', 'strong'), { action: 'replace', start: 3, remove: 1, payload: 'o' });
    assert.deepEqual(d.diff('strings', 'stopped'), { action: 'replace', start: 2, remove: 5, payload: 'opped' });
    assert.deepEqual(d.diff('entire', 'string'), { action: 'replace', start: 0, remove: 6, payload: 'string' });
  });
  it('Returns noop', () => {
    assert.deepEqual(d.diff('string', 'string'), { action: 'noop' });
    assert.deepEqual(d.diff('', ''), { action: 'noop' });
  });
  it('Returns raw', () => {
    assert.deepEqual(d.diff('strin', 'string', true), {
      action: 'insert',
      payload: 'g',
      start: 5,
      raw: {
        changeEndIndexNew: 6,
        changeEndIndexOld: 5,
        changeFromEnd: 0,
        changeStart: 5,
        charsAdded: 1,
        charsRemoved: 0,
        newString: 'string',
        oldString: 'strin',
        raw: true
      }
    });
    assert.deepEqual(d.diff('string', 'strin', true), {
      action: 'delete',
      start: 5,
      remove: 1,
      raw: {
        changeEndIndexNew: 5,
        changeEndIndexOld: 6,
        changeFromEnd: 0,
        changeStart: 5,
        charsAdded: 0,
        charsRemoved: 1,
        newString: 'strin',
        oldString: 'string',
        raw: true
      }
    });
    assert.deepEqual(d.diff('string', 'strong', true), {
      action: 'replace',
      start: 3,
      remove: 1,
      payload: 'o',
      raw: {
        changeEndIndexNew: 4,
        changeEndIndexOld: 4,
        changeFromEnd: 2,
        changeStart: 3,
        charsAdded: 1,
        charsRemoved: 1,
        newString: 'strong',
        oldString: 'string',
        raw: true
      }
    });
    assert.deepEqual(d.diff('string', 'string', true), {
      action: 'noop',
      raw: {
        changeEndIndexNew: 6,
        changeEndIndexOld: 6,
        changeFromEnd: 0,
        changeStart: 6,
        charsAdded: 0,
        charsRemoved: 0,
        newString: 'string',
        oldString: 'string',
        raw: true
      }
    });
  });
  it('Works with unicode', () => {
    assert.deepEqual(d.diff('世', '世界'), { action: 'insert', payload: '界', start: 1 });
    assert.deepEqual(d.diff('世界', '世'), { action: 'delete', start: 1, remove: 1 });
    assert.deepEqual(d.diff('界', '世'), { action: 'replace', start: 0, remove: 1, payload: '世' });
    assert.deepEqual(d.diff('界', '界'), { action: 'noop' });
  });
});
