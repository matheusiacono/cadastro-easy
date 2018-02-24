import { App, createVNode } from '../../../';
import Link from '.';

describe('test Link component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const link = <Link to="/users" />;
    const app = new App(link, document.getElementById('app'));
    app.run();
    expect(document.getElementById('app').innerHTML).toEqual('<a href="/users"></a>');
  });

  it('should call pushstate because of same origin and different to', () => {
    const link = <Link to="/users" id="link" location={{ origin: '', pathname: 'a' }} />;
    const app = new App(link, document.getElementById('app'));
    app.run();

    const elLink = document.getElementById('link');
    const mockFn = jest.fn();
    window.history.pushState = mockFn;

    elLink.click();

    expect(mockFn).toBeCalledWith('a', '', '/users');
  });

  it('should not call pushstate because of different origin', () => {
    const link = <Link to="/users" id="link" location={{ origin: '/' }} />;
    const app = new App(link, document.getElementById('app'));
    app.run();

    const elLink = document.getElementById('link');
    const mockFn = jest.fn();
    window.history.pushState = mockFn;

    elLink.click();

    expect(mockFn).not.toBeCalled();
  });

  it('should not call pushstate because of same to', () => {
    const link = <Link to="/home" id="link" location={{ origin: '', pathname: '/home' }} />;
    const app = new App(link, document.getElementById('app'));
    app.run();

    const elLink = document.getElementById('link');
    const mockFn = jest.fn();
    window.history.pushState = mockFn;

    elLink.click();

    expect(mockFn).not.toBeCalled();
  });
});
