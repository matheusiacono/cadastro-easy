export default class Store {
  constructor(store) {
    this.store = { ...store };
  }

  getStore() {
    return { ...this.store };
  }

  setStore(newStore) {
    this.store = { ...this.store, ...newStore };
  }
}
