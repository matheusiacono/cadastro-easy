import './index.scss';
import { VirtualNode, createVNode } from '../../lib';
import UserRow from '../user-row';
import Loader from '../loader';

export default class UserTable extends VirtualNode {
  static render({
    users, loadingUsers, removeUser, requestUsers, editUser,
  }) {
    return (
      <div>
        <table>
          <thead>
            <th />
            <th>Nome Completo</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th />
          </thead>
          <tbody>
            {users.map(user => <UserRow user={user} removeUser={removeUser} editUser={editUser} />)}
          </tbody>
        </table>
        {!loadingUsers && users.length === 0 ? (
          <p class="empty-table-message">Neste momento não existem dados cadastrados =(</p>
        ) : (
          false
        )}
        <button class="btn-request-users" onclick={requestUsers} disabled={loadingUsers}>
          {loadingUsers ? <Loader /> : 'Carregar usuários da API novamente'}
        </button>
      </div>
    );
  }
}
