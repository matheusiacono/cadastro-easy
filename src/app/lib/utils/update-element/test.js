import updateElement from '.';
import setProp from '../set-prop';

jest.mock('../set-prop');

describe('test updateElement method', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should set onclick value', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const div = document.createElement('div');
    const oldProps = {
      onclick: mock1,
    };
    const props = {
      onclick: mock2,
    };
    updateElement(div, oldProps, props);

    expect(setProp).toBeCalledWith(div, 'onclick', mock2);
  });

  it('should call setProp to set value', () => {
    const input = document.createElement('input');
    input.value = '123';
    const oldProps = {};
    const props = { value: '45' };
    updateElement(input, oldProps, props);

    expect(setProp).toBeCalledWith(input, 'value', '45');
  });

  it('should not call setProp to set value', () => {
    const input = document.createElement('input');
    input.value = '123';
    const oldProps = {};
    const props = { value: '123' };
    updateElement(input, oldProps, props);

    expect(setProp).not.toBeCalled();
  });
});
