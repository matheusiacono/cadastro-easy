/* globals describe it expect */
import createVNode from '.';
import VirtualNode from '../virtual-node';

describe('jsx syntax', () => {
  it('should work', () => {
    const vNode = <div foo="bar" />;

    expect(vNode.type).toEqual('div');
    expect(vNode.props).toEqual({ foo: 'bar' });
    expect(vNode.children).toEqual([]);
  });
});

describe('createVNode', () => {
  it('should return VirtualNode', () => {
    const vNode = createVNode('a', {}, []);

    expect(vNode instanceof VirtualNode).toBeTruthy();
  });
});
