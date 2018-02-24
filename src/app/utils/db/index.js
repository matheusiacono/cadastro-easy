export default class Db {
  constructor(name, version, storeName) {
    this.name = name;
    this.version = version;
    this.storeName = storeName;
    this.indexedDB =
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  }

  exists() {
    return new Promise((resolve, reject) => {
      let newDb = false;
      const open = this.indexedDB.open(this.name, this.version);

      open.onupgradeneeded = (e) => {
        this.upgradeneededHandler(e);
        newDb = true;
      };

      open.onsuccess = (e) => {
        const closeDb = e.target.result;
        closeDb.close();
        resolve(!newDb);
      };

      open.onerror = (e) => {
        reject(e.value);
      };
    });
  }

  execute(cb, transaction = 'readonly') {
    const open = this.indexedDB.open(this.name, this.version);

    open.onupgradeneeded = (e) => {
      this.upgradeneededHandler(e);
    };

    open.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction(this.storeName, transaction);
      const store = tx.objectStore(this.storeName);

      cb(store);

      tx.oncomplete = () => {
        db.close();
      };
    };
  }

  insert(obj) {
    return this.promisifyReturn(store => store.add(obj), 'readwrite');
  }

  update(obj, key) {
    return this.promisifyReturn(store => store.put(obj, key), 'readwrite');
  }

  select(key) {
    return this.promisifyReturn(store => store.get(key));
  }

  selectAll() {
    return this.promisifyReturn(store => store.getAll());
  }

  remove(key) {
    return this.promisifyReturn(store => store.delete(key), 'readwrite');
  }

  promisifyReturn(f, transaction = 'readonly') {
    return new Promise((resolve, reject) => {
      this.execute((store) => {
        const req = f(store);

        req.onsuccess = (e) => {
          resolve(e.target.result);
        };

        req.onerror = (e) => {
          reject(e.value);
        };
      }, transaction);
    });
  }

  upgradeneededHandler(e) {
    const db = e.target.result;
    db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
  }
}
