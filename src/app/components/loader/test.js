import { App, createVNode } from '../../lib';
import Loader from '.';

describe('test loader component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const loader = <Loader />;
    const app = new App(loader, document.getElementById('app'));
    app.run();

    const expected = '<div class="loader"><div></div><div></div><div></div><div></div></div>';
    expect(document.getElementById('app').innerHTML).toEqual(expected);
  });
});
