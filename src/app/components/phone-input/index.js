import { VirtualNode, createVNode } from '../../lib';
import NumberMask from '../../lib/components/number-mask';
import phoneMask from '../../utils/phone-mask';

export default class PhoneInput extends VirtualNode {
  static render(props) {
    return <NumberMask mask={phoneMask} {...props} />;
  }
}
