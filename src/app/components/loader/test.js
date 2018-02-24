import { App, createVNode } from '../../lib';
import Loader from '.';

describe('test loader component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const loader = <Loader />;
    const container = document.getElementById('app');
    const app = new App(loader, container);
    app.run();

    expect(container.innerHTML).toEqual('<div class="loader"><div></div><div></div><div></div><div></div></div>');
  });
});
