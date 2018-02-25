import DomGenerator from '../dom-generator';
import VirtualNode from '../virtual-node';

export default class App {
  constructor(component, container) {
    this.component = component;
    this.container = container;
    this.element = null;
    this.oldNode = null;

    VirtualNode.reRender(() => this.run());
  }

  run() {
    const node = this.component.render();
    this.element = DomGenerator.generate(this.container, node, this.oldNode, this.element);
    this.oldNode = node;
  }
}
