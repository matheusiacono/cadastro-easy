import NumberInput from '.';
import { App, createVNode } from '../../';

describe('test NumberInput', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render the component', () => {
    const input = <NumberInput />;
    const container = document.getElementById('app');
    const app = new App(input, container);
    expect(document.getElementsByTagName('input')).toHaveLength(0);
    app.run();
    expect(document.getElementsByTagName('input')).toHaveLength(1);
  });

  it('should prevent char key', () => {
    const mockFn = jest.fn();
    const aKey = {
      key: 'a',
      charCode: 97,
      ctrlKey: false,
    };
    const inputVNode = <NumberInput id="numberInput" />;
    const container = document.getElementById('app');
    const app = new App(inputVNode, container);
    app.run();

    const numberInput = document.getElementById('numberInput');
    const event = new window.KeyboardEvent('keypress', aKey);
    event.preventDefault = mockFn;
    numberInput.dispatchEvent(event);
    expect(mockFn).toBeCalled();
  });

  it('should not prevent ctrl c and ctrl v', () => {
    const mockFn = jest.fn();
    const cKey = {
      key: 'c',
      charCode: 99,
      ctrlKey: true,
    };
    const vKey = {
      key: 'v',
      charCode: 118,
      ctrlKey: true,
    };
    const inputVNode = <NumberInput id="numberInput" />;
    const container = document.getElementById('app');
    const app = new App(inputVNode, container);
    app.run();

    const numberInput = document.getElementById('numberInput');
    const eventC = new window.KeyboardEvent('keypress', cKey);
    const eventV = new window.KeyboardEvent('keypress', vKey);
    eventC.preventDefault = mockFn;
    eventV.preventDefault = mockFn;
    numberInput.dispatchEvent(eventC);
    numberInput.dispatchEvent(eventV);
    expect(mockFn).not.toBeCalled();
  });

  it('should not prevent numbers', () => {
    const mockFn = jest.fn();
    const key1 = {
      key: '1',
      charCode: 49,
      ctrlKey: false,
    };
    const key2 = {
      key: '2',
      charCode: 50,
      ctrlKey: false,
    };
    const inputVNode = <NumberInput id="numberInput" />;
    const container = document.getElementById('app');
    const app = new App(inputVNode, container);
    app.run();

    const numberInput = document.getElementById('numberInput');
    const event1 = new window.KeyboardEvent('keypress', key1);
    const event2 = new window.KeyboardEvent('keypress', key2);
    event1.preventDefault = mockFn;
    event2.preventDefault = mockFn;
    numberInput.dispatchEvent(event1);
    numberInput.dispatchEvent(event2);
    expect(mockFn).not.toBeCalled();
  });
});
