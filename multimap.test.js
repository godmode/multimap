const Multimap = require('./multimap');

describe('Test Suite', () => {
  it('sets and gets', () => {
    const map = new Multimap();
    const myObject = {
      myString: 'string',
      myBool: true,
    };
    const myKeys = ['2', '3', '1', 4];

    map.add(myObject, ...myKeys);
    expect(map.get(...myKeys)).toBe(myObject);
  });
});
