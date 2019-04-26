class Multimap {

  constructor() {
    this.map = {};
  }

  add(element, ...keys) {
    // each key should be a string, should not have duplicates, should be sorted, at least 1 key
    const sortedKeys = keys.sort((a, b) => (a < b) ? -1 : 1);
    let currentMap = this.map;
    sortedKeys.forEach((sortedKey, depth) => {
      // if we haven't added a key yet add it now otherwise we will overwrite it
      // then we update the current map to the latest depth of the key index
      if (!currentMap[sortedKey]) currentMap[sortedKey] = (keys.length === depth + 1) ? element : new Object();
      currentMap = currentMap[sortedKey];
    });

    currentMap = element;
  };

  get(...keys) {
    const sortedKeys = keys.sort((a, b) => (a < b) ? -1 : 1);
    let currentMap = this.map;
    sortedKeys.forEach(sortedKey => currentMap = currentMap[sortedKey]);

    return currentMap;
  }
};

module.exports = Multimap;
