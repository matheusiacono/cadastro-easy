import App from '.';
import createVNode from '../create-v-node';
import VirtualNode from '../virtual-node';

describe('test App class', () => {
  const component = () =>
    class extends VirtualNode {
      static render() {
        return <div />;
      }
    };

  it('should create instance of App', () => {
    const vNode = createVNode('component');
    const container = 'container';
    const app = new App(vNode, container);

    expect(app.component).toEqual(vNode);
    expect(app.container).toEqual(container);
  });

  it('should generate component', () => {
    document.body.innerHTML = '<div id="app"></div>';

    const app = new App(component(), document.getElementById('app'));

    app.run();

    expect(document.getElementById('app').innerHTML).toEqual('<div></div>');
  });

  it('should call run method after reRender on the component been called', () => {
    const mockFn = jest.fn();
    const app = new App(component(), 'container');
    app.run = mockFn;
    VirtualNode.applyState();
    expect(mockFn).toBeCalled();
  });
});
