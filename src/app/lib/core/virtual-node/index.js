import Store from '../store';
import flatten from '../../utils/flatten';

const globalState = new Store();
const globalActions = new Store();
export default class VirtualNode {
  constructor(type, props, ...children) {
    this.type = type;
    this.props = props || {};
    this.children = flatten(children);
    this.globalState = globalState;
    this.globalActions = globalActions;
  }

  getState() {
    return this.globalState.getStore();
  }

  setState(newState) {
    this.globalState.setStore(newState);
  }

  getActions() {
    return this.globalActions.getStore();
  }

  setActions(newActions) {
    this.globalActions.setStore(this.giveStateToActions(newActions));
  }

  giveStateToActions(actions) {
    const wiredActions = {};
    Object.keys(actions).forEach((key) => {
      const action = actions[key];
      const actualHandler = (payload) => {
        let actionResult = action(payload);

        if (typeof actionResult === 'function') {
          actionResult = actionResult(this.getState(), this.getActions());
        }

        if (actionResult && !actionResult.then) {
          const newState = actionResult;
          this.setState(newState);
          this.applyState();
        }

        return actionResult;
      };
      wiredActions[key] = actualHandler;
    });
    return wiredActions;
  }

  applyState() {
    if (this.globalActions.getStore().reRender) {
      this.globalActions.getStore().reRender();
    }
  }

  reRender(fn) {
    this.globalActions.setStore({ reRender: fn });
  }

  render() {
    throw new Error(`render method not implemented for ${this.type}`);
  }

  static clearState() {
    globalState.clearStore();
  }

  static clearActions() {
    globalActions.clearStore();
  }
}
