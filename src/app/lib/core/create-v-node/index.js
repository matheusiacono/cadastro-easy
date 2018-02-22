import VirtualNode from '../virtual-node';

const createVNode = (type, props, ...children) => new VirtualNode(type, props, children);

export default createVNode;
