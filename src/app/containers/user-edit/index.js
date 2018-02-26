import '../form-header.scss';
import { VirtualNode, createVNode } from '../../lib';
import { Link } from '../../lib/components/router';
import UserForm from '../../components/user-form';

export default class UserEdit extends VirtualNode {
  static render({ id }) {
    const { editUser, navigate } = this.getActions();
    const { formState, submittingForm } = this.getState();

    if (!formState.id || !id || Number.isNaN(parseInt(id, 10))) {
      navigate('/');
    }

    return (
      <div>
        <h1 class="page-title">Edição de Usuário {id}</h1>
        <p>
          <Link class="go-back" to="/">
            <i class="icon icon-back" /> Voltar
          </Link>
        </p>
        <UserForm onsubmit={editUser} loading={submittingForm} />
      </div>
    );
  }
}
