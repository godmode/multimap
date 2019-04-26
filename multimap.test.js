const Multimap = require('./multimap');

describe('Test Suite', () => {
  const map = new Multimap();
  const myObject = {
    myString: 'string',
    myBool: true,
  };
  const myKeys = ['2', '3', '1', 4];

  it('sets and gets', () => {
    map.add(myObject, ...myKeys);
    expect(map.get(...myKeys)).toBe(myObject);
  });

  it('deletes', () => {
    expect(map.get(...myKeys)).toBe(myObject);
    map.del(...myKeys);
    expect(map.get(...myKeys)).toBe(undefined);
  });
});
