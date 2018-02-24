import { App, VirtualNode, createVNode } from '../../../';
import Route from '.';

describe('test Route Component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <Route {...props} />;
      }
    };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should not render', () => {
    const route = <Route path="/" render="div" />;
    expect(route).toEqual(false);
  });

  it('should render', () => {
    const app = new App(
      component({ location: { pathname: '/' }, path: '/', render: 'div' }),
      document.getElementById('app'),
    );
    app.run();
    expect(document.getElementById('app').innerHTML).toEqual('<div></div>');
  });

  it('should render component', () => {
    class MyComponent extends VirtualNode {
      static render(props) {
        return <div {...props} />;
      }
    }

    const app = new App(
      component({ location: { pathname: '/' }, path: '/', render: MyComponent }),
      document.getElementById('app'),
    );
    app.run();
    expect(document.getElementById('app').innerHTML).toEqual('<div></div>');
  });
});
