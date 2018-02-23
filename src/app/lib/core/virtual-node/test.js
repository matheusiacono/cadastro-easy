/* globals describe it expect jest */
import VirtualNode from '.';

describe('Virtual Node', () => {
  it('should create instance', () => {
    const type = 'a';
    const props = { x: 1 };
    const children = [];
    const virtualNode = new VirtualNode(type, props, children);

    expect(virtualNode.type).toEqual(type);
    expect(virtualNode.props).toEqual(props);
    expect(virtualNode.children).toEqual(children);
  });

  it('should throw error calling render()', () => {
    const virtualNode = new VirtualNode('h1');

    expect(virtualNode.render).toThrow();
  });

  describe('Virtual Node global state', () => {
    it('should share state between instances', () => {
      const testState = { foo: 'bar' };
      const nodeA = new VirtualNode();
      const nodeB = new VirtualNode();

      nodeA.setState(testState);

      expect(nodeB.getState()).toEqual(testState);
    });
  });

  describe('Virtual Node global actions', () => {
    it('should share state between instances', () => {
      const mockFn = jest.fn();
      const testAction = {
        foo() {
          mockFn();
        },
      };
      const nodeA = new VirtualNode();
      const nodeB = new VirtualNode();

      nodeA.setActions(testAction);

      const bActions = nodeB.getActions();
      bActions.foo();

      expect(bActions).toEqual(testAction);
      expect(mockFn).toBeCalled();
    });
  });
});
