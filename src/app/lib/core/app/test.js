/* globals describe it expect */
import App from '.';
import createVNode from '../create-v-node';

describe('App', () => {
  it('should create instance of App', () => {
    const component = 'component';
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
});
