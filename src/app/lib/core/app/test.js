import App from '.';
import createVNode from '../create-v-node';

describe('test App class', () => {
  it('should create instance of App', () => {
    const component = createVNode('component');
    const container = 'container';
    const app = new App(component, container);

    expect(app.component).toEqual(component);
    expect(app.container).toEqual(container);
  });

  it('should generate component', () => {
    document.body.innerHTML = '<div id="app"></div>';

    const div = <div />;
    const container = document.getElementById('app');
    const app = new App(div, container);

    app.run();

    expect(container.innerHTML).toEqual('<div></div>');
  });

  it('should call run method after reRender on the component been called', () => {
    const mockFn = jest.fn();
    const vNode = <div />;
    const app = new App(vNode, 'container');
    app.run = mockFn;
    vNode.applyState();
    expect(mockFn).toBeCalled();
  });
});
