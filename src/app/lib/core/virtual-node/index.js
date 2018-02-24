import Store from '../store';
import flatten from '../../utils/flatten';

const globalState = new Store();
const globalActions = new Store();
export default class VirtualNode {
  static create(type, props, ...children) {
    return {
      type,
      props: props || {},
      children: flatten(children),
    };
  }

  static render() {
    throw new Error(`render method not implemented for ${this.name}`);
  }

  static getState() {
    return globalState.getStore();
  }

  static setState(newState) {
    globalState.setStore(newState);
  }

  static getActions() {
    return globalActions.getStore();
  }

  static setActions(newActions) {
    globalActions.setStore(this.giveStateToActions(newActions));
  }

  static giveStateToActions(actions) {
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
          VirtualNode.applyState();
        }

        return actionResult;
      };
      wiredActions[key] = actualHandler;
    });
    return wiredActions;
  }

  static applyState() {
    if (globalActions.getStore().reRender) {
      globalActions.getStore().reRender();
    }
  }

  static reRender(fn) {
    globalActions.setStore({ reRender: fn });
  }

  static clearState() {
    globalState.clearStore();
  }

  static clearActions() {
    globalActions.clearStore();
  }
}
