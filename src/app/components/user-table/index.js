import { VirtualNode, createVNode } from '../../lib';
import UserRow from '../user-row';
import Loader from '../loader';

export default class UserTable extends VirtualNode {
  static render({ users, loadingUsers, removeUser }) {
    return (
      <div>
        <table>
          <thead>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th />
            <th />
          </thead>
          <tbody>
            {users.map(user => <UserRow user={user} removeUser={id => removeUser(id)} />)}
          </tbody>
        </table>
        {!loadingUsers && users.length === 0 ? <div class="empty-table">tabela vazia</div> : false}
        {loadingUsers && (
          <div>
            <Loader />
          </div>
        )}
      </div>
    );
  }
}
