import { App, VirtualNode, createVNode } from '../../lib/';
import UserForm from '.';

describe('test UserForm component', () => {
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <UserForm {...props} />;
      }
    };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', () => {
    const app = new App(component(), document.getElementById('app'));
    app.run();
    expect(document.getElementsByTagName('form')).toHaveLength(1);
  });

  it('should call onsubmit passing user', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: 'Sausage Master',
      cpf: '12345678909',
      phone: '0000000000',
      email: 'sau.ma@school.com',
      id: 1,
    };

    const app = new App(component({ onsubmit: mockSubmit, user }), document.getElementById('app'));
    app.run();
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #name oninput', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: 'Zordom',
      cpf: '',
      phone: '',
      email: '',
    };

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('name');
    input.value = 'Zordom';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #cpf oninput', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: '',
      cpf: '12345678909',
      phone: '',
      email: '',
    };

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('cpf');
    input.value = '12345678909';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #phone oninput', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: '',
      cpf: '',
      phone: '11111111111',
      email: '',
    };

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('phone');
    input.value = '111111111110';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #email oninput', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: '',
      cpf: '',
      phone: '',
      email: 'foo@bar',
    };

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('email');
    input.value = 'foo@bar';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should keep form state if onsubmit is not passed', () => {
    const user = {
      name: 'Sausage Master',
      cpf: '12345678909',
      phone: '0000000000',
      email: 'sau.ma@school.com',
      id: 1,
    };

    const app = new App(component({ user }), document.getElementById('app'));
    app.run();
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));

    expect(document.getElementById('name').value).toEqual(user.name);
    expect(document.getElementById('cpf').value).toEqual('123.456.789-09');
    expect(document.getElementById('phone').value).toEqual('(00) 0000-0000');
    expect(document.getElementById('email').value).toEqual(user.email);
  });

  it('should render Loader component when loading is true', () => {
    const app = new App(component({ loading: true }), document.getElementById('app'));
    app.run();

    expect(document.getElementsByClassName('loader')).toHaveLength(1);
  });
});
