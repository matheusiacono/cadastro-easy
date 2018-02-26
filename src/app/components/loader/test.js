import { App } from '../../lib';
import Loader from '.';

describe('test loader component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const app = new App(Loader, document.getElementById('app'));
    app.run();

    const expected = '<div class="loader"><div></div><div></div><div></div></div>';
    expect(document.getElementById('app').innerHTML).toEqual(expected);
  });
});
