import { VirtualNode, createVNode } from '../../';

export default class NumberInput extends VirtualNode {
  static render(props) {
    const nodeProps = { ...props };
    const onlyNumbers = (e) => {
      if (
        e.charCode > 0 &&
        Number.isNaN(parseInt(e.key, 10)) &&
        !(e.ctrlKey && (e.key === 'v' || e.key === 'c'))
      ) {
        e.preventDefault();
      }
    };

    nodeProps.type = 'text';
    nodeProps.onkeypress = e => onlyNumbers(e);

    return <input {...nodeProps} />;
  }
}
