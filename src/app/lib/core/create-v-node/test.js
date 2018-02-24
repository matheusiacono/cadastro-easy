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
  const component = props =>
    class extends VirtualNode {
      static render() {
        return <div {...props} />;
      }
    };

  it('should return create a node', () => {
    const vNode = createVNode('a', {}, []);

    expect(vNode).toEqual({ type: 'a', props: {}, children: [] });
  });

  it('should create vNode from component', () => {
    const vNode = component({ test: true }).render();

    expect(vNode.type).toEqual('div');
    expect(vNode.props).toEqual({ test: true });
  });

  it('should not read property of null', () => {
    class Component extends VirtualNode {
      static render({ test }) {
        const props = { test };
        return <div {...props} />;
      }
    }

    const vNode = <Component />;
    expect(vNode).toEqual({ type: 'div', props: {}, children: [] });
  });
});
