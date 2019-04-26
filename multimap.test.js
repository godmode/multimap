const Multimap = require('./multimap');

describe('Basics', () => {
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

describe('Special maps', () => {
  const map = new Multimap();
  const recipes = {
    1: [
      {
        ingredient: 'thyme',
        amount: '2 tsp',
      },
      {
        ingredient: 'cinnamon',
        amount: '1 cup',
      },
      {
        ingredient: 'egg',
        amount: '2 whole eggs',
      },
    ],
    2: [
      {
        ingredient: 'cinnamon',
        amount: '1 cup',
      },
      {
        ingredient: 'egg',
        amount: '2 whole eggs',
      },
    ],
  };

  const simpleMap = {
    1: '1',
    2: '2',
    3: '3',
  }

  const objectMap = {
    1: {
      id: '1',
    },
    2: {
      id: '2',
    },
    3: {
      id: '3',
    },
  }
  
  it('reverses objects with an array of values', () => {
    map.reverse(recipes, recipe => recipe.map(ing => ing.ingredient))
    expect(map.get('cinnamon','egg','thyme',)).toBe('1');
    expect(map.get('cinnamon','egg',)).toBe('2');
    expect(map.get('thyme','egg')).toBe(undefined);
  });

  it('reverses objects with single keys', () => {
    map.reverse(simpleMap)
    expect(map.get('1')).toBe('1');
    expect(map.get('2')).toBe('2');
    expect(map.get('3')).toBe('3');
  });

  it('reverses objects with a key inside an object', () => {
    map.reverse(objectMap, el => el.id)
    expect(map.get('1')).toBe('1');
    expect(map.get('2')).toBe('2');
    expect(map.get('3')).toBe('3');
  });
});
