import { VirtualNode, createVNode } from '../../';
import applyMask from '../../utils/apply-mask';
import NumberInput from '../number-input';

export default class NumberMask extends VirtualNode {
  render() {
    const nodeProps = { ...this.props };
    const { oninput, mask } = nodeProps;

    delete nodeProps.oninput;
    delete nodeProps.mask;

    const inputHandler = (e) => {
      const unMaskedValue = e.target.value.replace(/\D+/g, '');
      e.target.value = applyMask(unMaskedValue, mask);

      if (oninput) {
        const m = typeof mask === 'function' ? mask(unMaskedValue) : mask;
        const countRawSize = m.match(/X/g).length;
        oninput(unMaskedValue.substring(0, countRawSize));
      }
    };

    if (nodeProps.value) {
      nodeProps.value = applyMask(nodeProps.value.replace(/\D+/g, ''), mask);
    }

    nodeProps.oninput = e => inputHandler(e);
    return <NumberInput {...nodeProps} />;
  }
}
