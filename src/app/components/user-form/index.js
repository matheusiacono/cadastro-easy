import { VirtualNode, createVNode } from '../../lib';

import CpfInput from '../cpf-input';
import PhoneInput from '../phone-input';
import Loader from '../loader';

export default class UserForm extends VirtualNode {
  static render({ onsubmit, loading, user }) {
    const formState = user || {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (onsubmit) {
        onsubmit(formState);
      }
    };

    return (
      <div>
        <form onsubmit={submitHandler}>
          <p>
            <label for="name">Nome completo (sem abreviações)</label>
          </p>
          <p>
            <input
              type="text"
              id="name"
              oninput={(e) => {
                formState.name = e.target.value;
              }}
              value={formState.name}
            />
          </p>

          <p>
            <label for="cpf">CPF</label>
          </p>
          <p>
            <CpfInput
              id="cpf"
              oninput={(value) => {
                formState.cpf = value;
              }}
              value={formState.cpf}
            />
          </p>

          <p>
            <label for="phone">Telefone</label>
          </p>
          <p>
            <PhoneInput
              id="phone"
              oninput={(value) => {
                formState.phone = value;
              }}
              value={formState.phone}
            />
          </p>

          <p>
            <label for="email">E-mail</label>
          </p>
          <p>
            <input
              type="text"
              id="email"
              oninput={(e) => {
                formState.email = e.target.value;
              }}
              value={formState.email}
            />
          </p>

          <p>
            <button>{loading ? <Loader /> : 'Cadastrar'}</button>
          </p>
        </form>
      </div>
    );
  }
}
