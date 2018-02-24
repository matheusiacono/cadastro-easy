import NumberMask from '.';
import { App, createVNode } from '../../';

describe('test NumberMask', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render the component', () => {
    const input = <NumberMask />;
    const container = document.getElementById('app');
    const app = new App(input, container);
    expect(document.getElementsByTagName('input')).toHaveLength(0);
    app.run();
    expect(document.getElementsByTagName('input')).toHaveLength(1);
  });

  it('should render the component with masked value', () => {
    const input = <NumberMask id="number-mask" mask="XXX-XXX" value="123456" />;
    const container = document.getElementById('app');
    const app = new App(input, container);
    app.run();

    const numberMask = document.getElementById('number-mask');
    expect(numberMask.value).toEqual('123-456');
  });

  it('should not render letters after input', () => {
    const input = <NumberMask id="number-mask" mask="XXXXX" value="ab23cd" />;
    const container = document.getElementById('app');
    const app = new App(input, container);
    app.run();
    const numberMask = document.getElementById('number-mask');

    expect(numberMask.value).toEqual('23');
    const event = new window.Event('input');
    numberMask.dispatchEvent(event);
    expect(numberMask.value).toEqual('23');
  });

  it('should call oninput passing unmasked value', () => {
    const mockFn = jest.fn();
    const input = <NumberMask id="number-mask" mask="X.X" value="a123" oninput={mockFn} />;
    const container = document.getElementById('app');
    const app = new App(input, container);
    app.run();
    const numberMask = document.getElementById('number-mask');

    const event = new window.Event('input');
    numberMask.dispatchEvent(event);
    expect(mockFn).toBeCalledWith('12');
  });

  it('should call oninput passing unmasked value from a function mask', () => {
    const mockFn = jest.fn();
    const mask = () => 'XXXX';
    const input = <NumberMask id="number-mask" mask={mask} value="a123" oninput={mockFn} />;
    const container = document.getElementById('app');
    const app = new App(input, container);
    app.run();
    const numberMask = document.getElementById('number-mask');

    const event = new window.Event('input');
    numberMask.dispatchEvent(event);
    expect(mockFn).toBeCalledWith('123');
  });
});
