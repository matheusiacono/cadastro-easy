import VirtualNode from '../virtual-node';

const createVNode = (Type, props, ...children) =>
  (Object.prototype.isPrototypeOf.call(VirtualNode, Type)
    ? new Type(Type.name, props, children).render()
    : new VirtualNode(Type, props, children));

export default createVNode;
