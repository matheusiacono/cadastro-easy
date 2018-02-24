/* globals describe it expect beforeEach */
import { App, VirtualNode, createVNode } from '../../../';
import Route from '.';

describe('test Route Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should not render', () => {
    const route = <Route path="/" render="div" />;
    expect(route).toEqual(false);
  });

  it('should render', () => {
    const route = <Route location={{ pathname: '/' }} path="/" render="div" />;
    const app = new App(route, document.getElementById('app'));
    app.run();
    expect(document.getElementById('app').innerHTML).toEqual('<div></div>');
  });

  it('should render component', () => {
    class Component extends VirtualNode {
      render() {
        return <div {...this.props} />;
      }
    }

    const route = <Route location={{ pathname: '/' }} path="/" render={Component} />;
    const app = new App(route, document.getElementById('app'));
    app.run();
    expect(document.getElementById('app').innerHTML).toEqual('<div></div>');
  });
});
