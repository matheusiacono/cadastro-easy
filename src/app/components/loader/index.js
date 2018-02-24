import { VirtualNode, createVNode } from '../../lib';
import './index.scss';

export default class Loader extends VirtualNode {
  render() {
    return (
      <div {...this.props} class="loader">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
