import { App, VirtualNode, createVNode } from '../../lib';
import UserTable from '.';

describe('test UserRow component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <UserTable {...props} />;
      }
    };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const app = new App(
      component({
        users: [
          {
            name: '',
            cpf: '12345678909',
            phone: '12345678900',
            email: '',
            id: 0,
          },
        ],
      }),
      document.getElementById('app'),
    );

    expect(document.getElementsByTagName('table')).toHaveLength(0);
    app.run();
    expect(document.getElementsByTagName('table')).toHaveLength(1);
  });

  it('should render UserRow', () => {
    const app = new App(
      component({
        users: [
          {
            name: 'Test',
            cpf: '12345678909',
            phone: '12345678900',
            email: 'test@foo',
            id: 0,
          },
        ],
      }),
      document.getElementById('app'),
    );

    expect(document.getElementsByTagName('tr')).toHaveLength(0);
    app.run();
    expect(document.getElementsByTagName('tr')).toHaveLength(1);
  });

  it('should not render UserRow', () => {
    const app = new App(
      component({
        users: [],
      }),
      document.getElementById('app'),
    );

    expect(document.getElementsByTagName('tr')).toHaveLength(0);
    app.run();
    expect(document.getElementsByTagName('tr')).toHaveLength(0);
  });

  it('should render empty table message', () => {
    const app = new App(
      component({
        users: [],
      }),
      document.getElementById('app'),
    );

    expect(document.getElementsByClassName('empty-table')).toHaveLength(0);
    app.run();
    expect(document.getElementsByClassName('empty-table')).toHaveLength(1);
  });

  it('should render the Loader component', () => {
    const app = new App(
      component({
        users: [],
        loadingUsers: true,
      }),
      document.getElementById('app'),
    );

    expect(document.getElementsByClassName('loader')).toHaveLength(0);
    app.run();
    expect(document.getElementsByClassName('loader')).toHaveLength(1);
  });

  it('should pass the id to removeUser when the button is clicked', () => {
    const mockFn = jest.fn();
    const app = new App(
      component({
        users: [
          {
            name: 'Test',
            cpf: '12345678909',
            phone: '12345678900',
            email: 'test@foo',
            id: 3,
          },
        ],
        removeUser: mockFn,
      }),
      document.getElementById('app'),
    );

    app.run();
    document.getElementsByTagName('button')[0].dispatchEvent(new window.Event('click'));

    expect(mockFn).toBeCalledWith(3);
  });
});
