import { App, createVNode } from '../../lib';
import CpfInput from '.';

describe('test PhoneInput component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const cpfInput = <CpfInput />;
    const container = document.getElementById('app');
    const app = new App(cpfInput, container);
    app.run();

    expect(document.getElementById('app').innerHTML).toEqual('<input type="text">');
  });

  it('should set mask to value', () => {
    const cpfInput = <CpfInput id="cpf-input" value="12345678909" />;
    const container = document.getElementById('app');
    const app = new App(cpfInput, container);
    app.run();

    expect(document.getElementById('cpf-input').value).toEqual('123.456.789-09');
  });

  it('should pass unmasked value to oninput method', () => {
    const mockFn = jest.fn();
    const cpfInput = <CpfInput id="cpf-input" value="12345678909" oninput={mockFn} />;
    const container = document.getElementById('app');
    const app = new App(cpfInput, container);
    app.run();

    document.getElementById('cpf-input').dispatchEvent(new window.Event('input'));
    expect(mockFn).toBeCalledWith('12345678909');
  });
});
