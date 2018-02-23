import { VirtualNode, createVNode } from '../../';
import applyMask from '../../utils/apply-mask';
import NumberInput from '../number-input';

export default class NumberMask extends VirtualNode {
  render() {
    const nodeProps = { ...this.props };
    const { oninput } = nodeProps;

    delete nodeProps.oninput;

    const inputHandler = (e) => {
      const unMaskedValue = e.target.value.replace(/\D+/g, '');
      e.target.value = applyMask(unMaskedValue, nodeProps.mask);

      if (oninput) {
        const m =
          typeof nodeProps.mask === 'function' ? nodeProps.mask(unMaskedValue) : nodeProps.mask;
        const countRawSize = m.match(/X/g).length;
        oninput(unMaskedValue.substring(0, countRawSize));
      }
    };

    if (nodeProps.value) {
      nodeProps.value = applyMask(nodeProps.value.replace(/\D+/g, ''), nodeProps.mask);
    }
    nodeProps.oninput = e => inputHandler(e);
    return <NumberInput {...nodeProps} />;
  }
}
