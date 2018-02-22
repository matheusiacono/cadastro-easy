/* globals describe it expect */
import VirtualNode from '.';

describe('Virtual Node', () => {
  it('create instance', () => {
    const type = 'a';
    const props = { x: 1 };
    const children = [];
    const virtualNode = new VirtualNode(type, props, children);

    expect(virtualNode.type).toEqual(type);
    expect(virtualNode.props).toEqual(props);
    expect(virtualNode.children).toEqual(children);
  });
});
