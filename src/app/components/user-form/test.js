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
    VirtualNode.setState({
      formValid: {
        name: true,
        cpf: true,
        phone: true,
        email: true,
      },

      formState: {
        name: '',
        cpf: '',
        phone: '',
        email: '',
      },
    });
    VirtualNode.setActions({
      validateForm: formValid => ({ formValid }),
      setFormState: formState => ({ formState }),
    });
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

    VirtualNode.setState({ formState: user });

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #name oninput', () => {
    const mockSubmit = jest.fn();

    const user = {
      name: 'Sausage Master',
      cpf: '12345678909',
      phone: '0000000000',
      email: 'sau.ma@school.com',
      id: 1,
    };

    VirtualNode.setState({ formState: user });

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('name');
    input.value = 'Zordom';
    user.name = 'Zordom';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #cpf oninput', () => {
    const mockSubmit = jest.fn();

    const user = {
      name: 'Sausage Master',
      cpf: '61625386648',
      phone: '0000000000',
      email: 'sau.ma@school.com',
      id: 1,
    };

    VirtualNode.setState({ formState: user });

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('cpf');
    input.value = '12345678909';
    user.cpf = '12345678909';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #phone oninput', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: 'Sausage Master',
      cpf: '61625386648',
      phone: '0000000000',
      email: 'sau.ma@school.com',
      id: 1,
    };

    VirtualNode.setState({ formState: user });

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('phone');
    input.value = '111111111110';
    user.phone = '11111111111';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should call #email oninput', () => {
    const mockSubmit = jest.fn();
    const user = {
      name: 'Sausage Master',
      cpf: '61625386648',
      phone: '0000000000',
      email: 'sau.ma@school.com',
      id: 1,
    };

    VirtualNode.setState({ formState: user });

    const app = new App(component({ onsubmit: mockSubmit }), document.getElementById('app'));
    app.run();
    const input = document.getElementById('email');
    input.value = 'foo@bar';
    user.email = 'foo@bar';
    input.dispatchEvent(new window.Event('input'));
    const btn = document.getElementsByTagName('button')[0];
    btn.dispatchEvent(new window.MouseEvent('click'));
    expect(mockSubmit).toBeCalledWith(user);
  });

  it('should set formValid to false in all fields', () => {
    const user = {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    };

    VirtualNode.setState({ formState: user });

    const app = new App(component(), document.getElementById('app'));
    app.run();

    const state = VirtualNode.getState();
    expect(state.formValid.name).toBeTruthy();
    expect(state.formValid.cpf).toBeTruthy();
    expect(state.formValid.email).toBeTruthy();
    expect(state.formValid.phone).toBeTruthy();

    document.getElementById('name').dispatchEvent(new window.Event('blur'));
    document.getElementById('email').dispatchEvent(new window.Event('blur'));
    document.getElementById('cpf').dispatchEvent(new window.Event('blur'));
    document.getElementById('phone').dispatchEvent(new window.Event('blur'));

    const { formValid } = VirtualNode.getState();
    expect(formValid.name).not.toBeTruthy();
    expect(formValid.cpf).not.toBeTruthy();
    expect(formValid.email).not.toBeTruthy();
    expect(formValid.phone).not.toBeTruthy();
  });

  it('should render Loader component when loading is true', () => {
    const app = new App(component({ loading: true }), document.getElementById('app'));
    app.run();

    expect(document.getElementsByClassName('loader')).toHaveLength(1);
  });

  it('should call validate form after validation been resolved', () => {
    const mockFn = jest.fn();
    const user = {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    };

    VirtualNode.setState({ formState: user });
    VirtualNode.setActions({ validateForm: mockFn });

    const app = new App(component(), document.getElementById('app'));
    app.run();
    const name = document.getElementById('name');
    name.dispatchEvent(new window.Event('input'));
    expect(mockFn).not.toBeCalled();
    name.dispatchEvent(new window.Event('blur'));
    name.value = 'abc';
    name.dispatchEvent(new window.Event('input'));
    expect(mockFn).toBeCalled();
  });
});
