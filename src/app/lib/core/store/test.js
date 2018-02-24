import Store from '.';

describe('test store object', () => {
  it('should create instance with empty object', () => {
    const store = new Store();

    expect(store.getStore()).toEqual({});
  });

  it('should create instance setting store', () => {
    const store = new Store({ test: 'test' });

    expect(store.getStore()).toEqual({ test: 'test' });
  });

  it('should set store', () => {
    const store = new Store();
    store.setStore({ test: 'test' });

    expect(store.getStore()).toEqual({ test: 'test' });
  });

  it('should append store', () => {
    const store = new Store({ foo: 'bar' });
    store.setStore({ test: 'test' });

    expect(store.getStore()).toEqual({ test: 'test', foo: 'bar' });
  });
});
