import createVNode from '.';
import VirtualNode from '../virtual-node';

describe('test jsx syntax', () => {
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

describe('test createVNode method', () => {
  it('should return VirtualNode', () => {
    const vNode = createVNode('a', {}, []);

    expect(vNode).toEqual({ type: 'a', props: {}, children: [] });
  });

  it('should create vNode from component', () => {
    class MyDiv extends VirtualNode {
      static render(props) {
        return <div {...props} />;
      }
    }

    const vNode = <MyDiv test />;

    expect(vNode.type).toEqual('div');
    expect(vNode.props).toEqual({ test: true });
  });
});
