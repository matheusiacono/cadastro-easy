import { App, VirtualNode, createVNode } from '../../lib';
import UserRow from '.';

describe('test UserRow component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <UserRow {...props} />;
      }
    };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const app = new App(
      component({
        user: {
          name: '',
          cpf: '12345678909',
          phone: '12345678900',
          email: '',
          id: 0,
        },
      }),
      document.getElementById('app'),
    );

    expect(document.getElementsByTagName('tr')).toHaveLength(0);
    app.run();
    expect(document.getElementsByTagName('tr')).toHaveLength(1);
  });

  it('should set correct values to tds', () => {
    const app = new App(
      component({
        user: {
          name: 'Test',
          cpf: '12345678909',
          phone: '12345678900',
          email: 'test@foo',
          id: 0,
        },
      }),
      document.getElementById('app'),
    );

    app.run();

    expect(document.getElementsByTagName('td')[1].textContent).toEqual('Test');
    expect(document.getElementsByTagName('td')[2].textContent).toEqual('test@foo');
    expect(document.getElementsByTagName('td')[3].textContent).toEqual('123.456.789-09');
    expect(document.getElementsByTagName('td')[4].textContent).toEqual('(12) 34567-8900');
  });

  it('should pass the id to removeUser when the button is clicked', () => {
    const mockFn = jest.fn();
    const app = new App(
      component({
        user: {
          name: 'Test',
          cpf: '12345678909',
          phone: '12345678900',
          email: 'test@foo',
          id: 3,
        },
        removeUser: mockFn,
        editUser: () => {},
      }),
      document.getElementById('app'),
    );

    app.run();
    document.getElementsByTagName('a')[1].dispatchEvent(new window.Event('click'));

    expect(mockFn).toBeCalledWith(3);
  });

  it('should pass the id to removeUser when the button is clicked', () => {
    const mockFn = jest.fn();
    const app = new App(
      component({
        user: {
          name: 'Test',
          cpf: '12345678909',
          phone: '12345678900',
          email: 'test@foo',
          id: 8,
        },
        removeUser: () => {},
        editUser: mockFn,
      }),
      document.getElementById('app'),
    );

    app.run();
    document.getElementsByTagName('a')[0].dispatchEvent(new window.Event('click'));

    expect(mockFn).toBeCalledWith(8);
  });
});
