import { VirtualNode, createVNode } from '../../lib';
import NumberMask from '../../lib/components/number-mask';
import cpfMask from '../../utils/cpf-mask';

export default class CpfInput extends VirtualNode {
  static render(props) {
    return <NumberMask mask={cpfMask} {...props} />;
  }
}
