import { VirtualNode, createVNode } from '../../lib';
import './index.scss';

export default class Loader extends VirtualNode {
  static render(props) {
    return (
      <div {...props} class="loader">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
