import { App, VirtualNode, createVNode } from '../../lib';
import CpfInput from '.';

describe('test PhoneInput component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <CpfInput {...props} />;
      }
    };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const app = new App(component(), document.getElementById('app'));
    app.run();

    expect(document.getElementById('app').innerHTML).toEqual('<input type="text">');
  });

  it('should set mask to value', () => {
    const app = new App(
      component({ id: 'cpf-input', value: '12345678909' }),
      document.getElementById('app'),
    );
    app.run();

    expect(document.getElementById('cpf-input').value).toEqual('123.456.789-09');
  });

  it('should pass unmasked value to oninput method', () => {
    const mockFn = jest.fn();
    const app = new App(
      component({ id: 'cpf-input', value: '12345678909', oninput: mockFn }),
      document.getElementById('app'),
    );
    app.run();

    document.getElementById('cpf-input').dispatchEvent(new window.Event('input'));
    expect(mockFn).toBeCalledWith('12345678909');
  });
});
