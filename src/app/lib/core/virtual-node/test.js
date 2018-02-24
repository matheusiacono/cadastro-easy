import VirtualNode from '.';

describe('test VirtualNode class', () => {
  beforeEach(() => {
    VirtualNode.clearState();
    VirtualNode.clearActions();
  });

  it('should create node', () => {
    const type = 'a';
    const virtualNode = VirtualNode.create(type);

    expect(virtualNode.type).toEqual(type);
    expect(virtualNode.props).toEqual({});
    expect(virtualNode.children).toEqual([]);
  });

  it('should throw error calling render()', () => {
    expect(VirtualNode.render).toThrow();
  });

  describe('test Virtual Node global state', () => {
    it('should share state with child classes', () => {
      const testState = { foo: 'bar' };
      class MyNode extends VirtualNode {}

      VirtualNode.setState(testState);

      expect(MyNode.getState()).toEqual(testState);
    });
  });

  describe('test Virtual Node global actions', () => {
    it('should share actions with child classes', () => {
      const mockFn = jest.fn();
      const testAction = {
        foo() {
          mockFn();
        },
      };
      class MyNode extends VirtualNode {}

      VirtualNode.setActions(testAction);

      const actions = MyNode.getActions();
      actions.foo();

      expect(mockFn).toBeCalled();
    });

    it('should call action passing state', () => {
      const testAction = {
        foo: () => (state) => {
          expect(state).toEqual({});
        },
      };
      class MyNode extends VirtualNode {}
      MyNode.setActions(testAction);
      const actions = MyNode.getActions();
      actions.foo();
    });

    it('should change state when returned', () => {
      const testState = { foo: 'bar' };

      const testAction = {
        foo: () => testState,
      };
      class MyNode extends VirtualNode {}
      MyNode.setActions(testAction);
      const actions = MyNode.getActions();

      expect(MyNode.getState()).toEqual({});
      actions.foo();
      expect(MyNode.getState()).toEqual(testState);
    });

    it('should call reRender cb when return state', () => {
      const testAction = {
        foo: () => ({}),
      };
      const mockFn = jest.fn();

      class MyNode extends VirtualNode {}
      MyNode.reRender(mockFn);
      MyNode.setActions(testAction);
      const actions = MyNode.getActions();
      actions.foo();

      expect(mockFn).toBeCalled();
    });
  });
});
