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

  it('should return nested as children', () => {
    const vNode = (
      <div>
        <span />
      </div>
    );

    expect(vNode.children[0].type).toEqual('span');
  });
});

describe('createVNode', () => {
  it('should return VirtualNode', () => {
    const vNode = createVNode('a', {}, []);

    expect(vNode instanceof VirtualNode).toBeTruthy();
  });
});
