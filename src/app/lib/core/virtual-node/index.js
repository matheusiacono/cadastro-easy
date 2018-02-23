import Store from '../store';
import flatten from '../../utils/flatten';

const state = new Store();
const actions = new Store();
export default class VirtualNode {
  constructor(type, props, ...children) {
    this.type = type;
    this.props = props || {};
    this.children = flatten(children);
    this.state = state;
    this.actions = actions;
  }

  getState() {
    return this.state.getStore();
  }

  setState(newState) {
    this.state.setStore(newState);
  }

  getActions() {
    return this.actions.getStore();
  }

  setActions(newActions) {
    this.actions.setStore(newActions);
  }

  render() {
    throw new Error(`render method not implemented for ${this.type}`);
  }
}
