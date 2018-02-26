import './index.scss';
import { VirtualNode, createVNode } from '../../lib';
import UserTable from '../../components/user-table';

export default class UserList extends VirtualNode {
  static render() {
    const { users, loadingUsers } = this.getState();
    const {
      requestUsers, removeUser, getUser, redirectToCreate,
    } = this.getActions();
    return (
      <div>
        <h1 class="page-title">Listagem de Usuários</h1>
        <button class="btn-create" role="link" onclick={() => redirectToCreate()}>
          Cadastrar Novo Usuário
        </button>
        <UserTable
          users={users}
          loadingUsers={loadingUsers}
          removeUser={removeUser || (() => {})}
          requestUsers={requestUsers || (() => {})}
          editUser={getUser}
        />
      </div>
    );
  }
}

VirtualNode.setState({
  loadingUsers: false,
  users: [],
});
