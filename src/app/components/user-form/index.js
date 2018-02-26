import './index.scss';
import { VirtualNode, createVNode } from '../../lib';

import CpfInput from '../cpf-input';
import PhoneInput from '../phone-input';
import Loader from '../loader';
import validateCpf from '../../utils/validate-cpf';

const validator = {
  name: value => !!(value && value.length > 2),
  cpf: value => !!(value && value.length === 11 && validateCpf(value)),
  phone: value => !!(value && (value.length === 11 || value.length === 10)),
  email: value => !!(value && value.length > 0) && /(.+)@(.+)/.test(value),
};

export default class UserForm extends VirtualNode {
  static render({ onsubmit, loading }) {
    const { formState, formValid } = this.getState();
    const { validateForm, setFormState } = this.getActions();

    const formIsValid = () =>
      validator.name(formState.name) &&
      validator.cpf(formState.cpf) &&
      validator.phone(formState.phone) &&
      validator.email(formState.email);

    const inputHandler = (value, field) => {
      formState[field] = value;
      setFormState(formState);
      if (validator[field](formState[field])) {
        formValid[field] = validator[field](formState[field]);
        validateForm(formValid);
      }
    };

    const blurHandler = (field) => {
      formValid[field] = validator[field](formState[field]);
      validateForm(formValid);
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (!loading && onsubmit && formIsValid()) {
        onsubmit(formState);
      }
    };

    return (
      <div class="user-form">
        <form onsubmit={submitHandler}>
          <label for="name">Nome completo (sem abreviações)</label>
          <input
            type="text"
            id="name"
            oninput={(e) => {
              inputHandler(e.target.value, 'name');
            }}
            value={formState.name}
            aria-required="true"
            onblur={() => blurHandler('name')}
            class={!formValid.name && 'invalid'}
          />
          <span class="user-form--error-mesage">
            {!formValid.name && 'Campo deve conter 3 caracteres ou mais'}
          </span>

          <label for="email">E-mail</label>
          <input
            type="text"
            id="email"
            oninput={(e) => {
              inputHandler(e.target.value, 'email');
            }}
            value={formState.email}
            aria-required="true"
            onblur={() => blurHandler('email')}
            class={!formValid.email && 'invalid'}
          />
          <span class="user-form--error-mesage">
            {!formValid.email && 'Campo deve conter E-mail válido'}
          </span>

          <label for="cpf">CPF</label>
          <CpfInput
            id="cpf"
            oninput={(value) => {
              inputHandler(value, 'cpf');
            }}
            value={formState.cpf}
            aria-required="true"
            onblur={() => blurHandler('cpf')}
            class={!formValid.cpf && 'invalid'}
          />
          <span class="user-form--error-mesage">
            {!formValid.cpf && 'Campo deve conter CPF válido'}
          </span>

          <label for="phone">Telefone</label>
          <PhoneInput
            id="phone"
            oninput={(value) => {
              inputHandler(value, 'phone');
            }}
            value={formState.phone}
            aria-required="true"
            onblur={() => blurHandler('phone')}
            class={!formValid.phone && 'invalid'}
          />
          <span class="user-form--error-mesage">
            {!formValid.phone && 'Campo deve conter telefone válido'}
          </span>

          <button disabled={!formIsValid()} class="btn-submit">
            {loading ? <Loader /> : 'Cadastrar'}
          </button>
        </form>
      </div>
    );
  }
}

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
