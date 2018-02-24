import VirtualNode from '../virtual-node';

const createVNode = (type, props, ...children) =>
  (Object.prototype.isPrototypeOf.call(VirtualNode, type)
    ? type.render(props, children)
    : VirtualNode.create(type, props, children));

export default createVNode;
