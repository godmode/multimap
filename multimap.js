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
      if (!currentMap[sortedKey]) currentMap[sortedKey] = { keys: {} };
      if (keys.length === depth + 1) {
        currentMap[sortedKey].object = element;
      } else {
        currentMap = currentMap[sortedKey].keys;
      }
    });
  };

  get(...keys) {
    const sortedKeys = keys.sort((a, b) => (a < b) ? -1 : 1);
    let currentMap = this.map;
    sortedKeys.forEach((sortedKey, depth) => {
      if (keys.length === depth + 1) {
        currentMap = currentMap[sortedKey].object;
      } else if (!currentMap[sortedKey]) {
        return undefined;
      } else {
        currentMap = currentMap[sortedKey].keys;
      }
    });

    return currentMap;
  }

  del(...keys) {
    const sortedKeys = keys.sort((a, b) => (a < b) ? -1 : 1);
    let currentMap = this.map;
    sortedKeys.forEach((sortedKey, depth) => {
      if (keys.length === depth + 1) {
        delete currentMap[sortedKey].object;
      } else if (!currentMap[sortedKey]) {
        return false;
      } else {
        currentMap = currentMap[sortedKey].keys;
      }
    });
  }
};

module.exports = Multimap;
