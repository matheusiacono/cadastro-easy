import { App, VirtualNode, createVNode } from '../../../';
import Link from '.';

describe('test Link component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <Link {...props} />;
      }
    };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const app = new App(component({ to: '/users' }), document.getElementById('app'));
    app.run();
    expect(document.getElementById('app').innerHTML).toEqual('<a href="/users"></a>');
  });

  it('should call pushstate because of same origin and different to', () => {
    const app = new App(
      component({ to: '/users', id: 'link', location: { origin: '', pathname: 'a' } }),
      document.getElementById('app'),
    );
    app.run();

    const elLink = document.getElementById('link');
    const mockFn = jest.fn();
    window.history.pushState = mockFn;

    elLink.click();

    expect(mockFn).toBeCalledWith('a', '', '/users');
  });

  it('should not call pushstate because of different origin', () => {
    const app = new App(
      component({ to: '/users', id: 'link', location: { origin: '/' } }),
      document.getElementById('app'),
    );
    app.run();

    const elLink = document.getElementById('link');
    const mockFn = jest.fn();
    window.history.pushState = mockFn;

    elLink.click();

    expect(mockFn).not.toBeCalled();
  });

  it('should not call pushstate because of same to property', () => {
    const app = new App(
      component({ to: '/home', id: 'link', location: { origin: '', pathname: '/home' } }),
      document.getElementById('app'),
    );
    app.run();

    const elLink = document.getElementById('link');
    const mockFn = jest.fn();
    window.history.pushState = mockFn;

    elLink.click();

    expect(mockFn).not.toBeCalled();
  });
});
