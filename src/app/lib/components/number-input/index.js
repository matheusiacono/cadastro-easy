import { VirtualNode, createVNode } from '../../';

export default class NumberInput extends VirtualNode {
  render() {
    const onlyNumbers = (e) => {
      if (
        e.charCode > 0 &&
        Number.isNaN(parseInt(e.key, 10)) &&
        !(e.ctrlKey && (e.key === 'v' || e.key === 'c'))
      ) {
        e.preventDefault();
      }
    };

    this.props.type = 'text';
    this.props.onkeypress = e => onlyNumbers(e);

    return <input {...this.props} />;
  }
}
