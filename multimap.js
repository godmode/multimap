class Multimap {
  constructor() {
    this.map = {};
    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.del = this.del.bind(this);
    this.reverse = this.reverse.bind(this);
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
      if (!currentMap || !currentMap[sortedKey]) {
        currentMap = undefined;
      } else if (keys.length === depth + 1) {
        currentMap = currentMap[sortedKey].object;
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

  reverse(map, callback = (el) => [el]) {
    Object.entries(map).forEach(kvpair => {
      let values = callback(kvpair[1]);
      if (!Array.isArray(values)) values = [values];
      this.add(kvpair[0], ...values)
    });
  }
};

module.exports = Multimap;
