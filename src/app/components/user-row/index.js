import './index.scss';
import { VirtualNode, createVNode } from '../../lib';
import conformToMask from '../../lib/utils/conform-to-mask';
import cpfMask from '../../utils/cpf-mask';
import phoneMask from '../../utils/phone-mask';

export default class UserRow extends VirtualNode {
  static render({ user, editUser, removeUser }) {
    return (
      <tr>
        <td>
          <a class="btn-edit" title="Editar Usuário" onclick={() => editUser(user.id)}>
            <i class="icon-edit" />
          </a>
        </td>
        <td data-label="Nome Completo">{user.name}</td>
        <td data-label="E-Mail">{user.email}</td>
        <td data-label="CPF">{conformToMask(user.cpf, cpfMask)}</td>
        <td data-label="Telefone">{conformToMask(user.phone, phoneMask(user.phone))}</td>
        <td>
          <a class="btn-delete" title="Excluir Usuário" onclick={() => removeUser(user.id)}>
            <i class="icon-delete" />
          </a>
        </td>
      </tr>
    );
  }
}
