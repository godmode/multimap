const multimap = require('./multimap');

describe('Test Suite', () => {
  it('sets and gets', () => {
    const myObject = {
      myString: 'string',
      myBool: true,
    };
    const myKeys = ['2', '3', '1', 4];

    multimap.add(myObject, ...myKeys);
    expect(multimap.get(...myKeys)).toBe(myObject);
  });
});
