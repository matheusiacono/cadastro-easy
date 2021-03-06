import setProp from '.';

describe('test set props method', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should set class attribute', () => {
    const el = document.createElement('div');
    setProp(el, 'class', 'teste');

    expect(el.className).toEqual('teste');
  });

  it('should set name attribute', () => {
    const el = document.createElement('div');
    setProp(el, 'name', 'my-div');

    expect(el.getAttribute('name')).toEqual('my-div');
  });

  it('should add event listener to click', () => {
    const el = document.createElement('button');
    const mockClick = jest.fn();
    setProp(el, 'id', 'btnTest');
    setProp(el, 'onclick', mockClick);

    document.body.appendChild(el);
    const elToClick = document.getElementById('btnTest');
    elToClick.click();

    expect(mockClick).toBeCalled();
  });

  it('should not set empty value', () => {
    const el = document.createElement('div');
    setProp(el, 'class', null);
    setProp(el, 'class', '');
    setProp(el, 'class');

    expect(el.className).toEqual('');
  });

  it('should not append event listeners to element', () => {
    const el = document.createElement('button');
    const mockClick = jest.fn();
    setProp(el, 'id', 'btnTest');
    setProp(el, 'onclick', mockClick);
    setProp(el, 'onclick', mockClick);

    document.body.appendChild(el);
    const elToClick = document.getElementById('btnTest');
    elToClick.click();

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
