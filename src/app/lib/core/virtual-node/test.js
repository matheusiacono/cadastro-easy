import VirtualNode from '.';

describe('test VirtualNode class', () => {
  beforeEach(() => {
    VirtualNode.clearState();
    VirtualNode.clearActions();
  });

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

  describe('test Virtual Node global state', () => {
    it('should share state between instances', () => {
      const testState = { foo: 'bar' };
      const nodeA = new VirtualNode();
      const nodeB = new VirtualNode();

      nodeA.setState(testState);

      expect(nodeB.getState()).toEqual(testState);
    });
  });

  describe('test Virtual Node global actions', () => {
    it('should share actions between instances', () => {
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

      expect(mockFn).toBeCalled();
    });

    it('should call action passing state', () => {
      const testAction = {
        foo: () => (state) => {
          expect(state).toEqual({});
        },
      };
      const nodeA = new VirtualNode();
      nodeA.setActions(testAction);
      const aActions = nodeA.getActions();
      aActions.foo();
    });

    it('should change state when returned', () => {
      const testState = { foo: 'bar' };

      const testAction = {
        foo: () => testState,
      };
      const nodeA = new VirtualNode();
      nodeA.setActions(testAction);
      const aActions = nodeA.getActions();
      aActions.foo();
      const aState = nodeA.getState();
      expect(aState).toEqual(testState);
    });

    it('should call reRender cb when return state', () => {
      const testAction = {
        foo: () => ({}),
      };
      const mockFn = jest.fn();

      const nodeA = new VirtualNode();
      nodeA.reRender(mockFn);
      nodeA.setActions(testAction);
      const aActions = nodeA.getActions();
      aActions.foo();

      expect(mockFn).toBeCalled();
    });
  });
});
