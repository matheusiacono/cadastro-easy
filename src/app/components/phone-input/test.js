import { App, VirtualNode, createVNode } from '../../lib';
import PhoneInput from '.';

describe('test PhoneInput component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <PhoneInput {...props} />;
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

  it('should set 10 digits mask to value', () => {
    const app = new App(
      component({ id: 'phone-input', value: '1234567890' }),
      document.getElementById('app'),
    );
    app.run();

    expect(document.getElementById('phone-input').value).toEqual('(12) 3456-7890');
  });

  it('should set 11 digits mask to value', () => {
    const app = new App(
      component({ id: 'phone-input', value: '12345678901' }),
      document.getElementById('app'),
    );
    app.run();

    expect(document.getElementById('phone-input').value).toEqual('(12) 34567-8901');
  });

  it('should pass unmasked value to oninput method', () => {
    const mockFn = jest.fn();
    const app = new App(
      component({ id: 'phone-input', value: '1234567890', oninput: mockFn }),
      document.getElementById('app'),
    );
    app.run();

    document.getElementById('phone-input').dispatchEvent(new window.Event('input'));
    expect(mockFn).toBeCalledWith('1234567890');
  });
});
