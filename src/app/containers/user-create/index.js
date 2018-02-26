import '../form-header.scss';
import { VirtualNode, createVNode } from '../../lib';
import { Link } from '../../lib/components/router';
import UserForm from '../../components/user-form';

export default class UserCreate extends VirtualNode {
  static render() {
    const { addUser } = this.getActions();
    const { submittingForm, root } = this.getState();

    return (
      <div>
        <h1 class="page-title">Novo Usuário</h1>
        <p>
          <Link class="go-back" to={root}>
            <i class="icon icon-back" /> Voltar
          </Link>
        </p>
        <UserForm onsubmit={addUser} loading={submittingForm} />
      </div>
    );
  }
}
