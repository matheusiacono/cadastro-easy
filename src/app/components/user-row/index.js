import { VirtualNode, createVNode } from '../../lib';
import conformToMask from '../../lib/utils/conform-to-mask';
import cpfMask from '../../utils/cpf-mask';
import phoneMask from '../../utils/phone-mask';
import { Link } from '../../lib/components/router';

export default class UserRow extends VirtualNode {
  static render({ user, removeUser }) {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{conformToMask(user.cpf, cpfMask)}</td>
        <td>{conformToMask(user.phone, phoneMask(user.phone))}</td>
        <td>{user.email}</td>
        <td>
          <Link to={`/edit/${user.id}`}>Editar</Link>
        </td>
        <td>
          <button onclick={() => removeUser(user.id)}>excluir</button>
        </td>
      </tr>
    );
  }
}
