import flatten from '../../utils/flatten';

export default class VirtualNode {
  constructor(type, props, ...children) {
    this.type = type;
    this.props = props;
    this.children = flatten(children);
  }
}
