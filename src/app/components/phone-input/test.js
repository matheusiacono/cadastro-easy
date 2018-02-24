import { App, createVNode } from '../../lib';
import PhoneInput from '.';

describe('test PhoneInput component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const phoneInput = <PhoneInput />;
    const container = document.getElementById('app');
    const app = new App(phoneInput, container);
    app.run();

    expect(document.getElementById('app').innerHTML).toEqual('<input type="text">');
  });

  it('should set 10 digits mask to value', () => {
    const phoneInput = <PhoneInput id="phone-input" value="1234567890" />;
    const container = document.getElementById('app');
    const app = new App(phoneInput, container);
    app.run();

    expect(document.getElementById('phone-input').value).toEqual('(12) 3456-7890');
  });

  it('should set 11 digits mask to value', () => {
    const phoneInput = <PhoneInput id="phone-input" value="12345678901" />;
    const container = document.getElementById('app');
    const app = new App(phoneInput, container);
    app.run();

    expect(document.getElementById('phone-input').value).toEqual('(12) 34567-8901');
  });

  it('should pass unmasked value to oninput method', () => {
    const mockFn = jest.fn();
    const phoneInput = <PhoneInput id="phone-input" value="1234567890" oninput={mockFn} />;
    const container = document.getElementById('app');
    const app = new App(phoneInput, container);
    app.run();

    document.getElementById('phone-input').dispatchEvent(new window.Event('input'));
    expect(mockFn).toBeCalledWith('1234567890');
  });
});
