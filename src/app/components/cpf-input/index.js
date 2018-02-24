import { VirtualNode, createVNode } from '../../lib';
import NumberMask from '../../lib/components/number-mask';
import cpfMask from '../../utils/cpf-mask';

export default class CpfInput extends VirtualNode {
  render() {
    return <NumberMask mask={cpfMask} {...this.props} />;
  }
}
