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

describe('Test Recipe', () => {
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
  
  it('reverses objects to map to key', () => {
    map.reverse(recipes, recipe => recipe.map(ing => ing.ingredient))
    expect(map.get('cinnamon','egg','thyme',)).toBe('1');
    expect(map.get('cinnamon','egg',)).toBe('2');
    expect(map.get('thyme','egg')).toBe(undefined);
  });
});
