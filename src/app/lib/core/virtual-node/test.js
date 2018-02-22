/* globals describe test expect */
import VirtualNode from '.';

describe('Virtual Node', () => {
  test('create instance', () => {
    const type = 'a';
    const props = { x: 1 };
    const children = [];
    const virtualNode = new VirtualNode(type, props, children);

    expect(virtualNode.type).toBe(type);
    expect(virtualNode.props).toBe(props);
    expect(virtualNode.children).toBe(children);
  });
});
