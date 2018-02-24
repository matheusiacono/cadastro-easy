import DomGenerator from '../dom-generator';
import VirtualNode from '../virtual-node';

export default class App {
  constructor(component, container) {
    this.component = component;
    this.container = container;

    this.generator = new DomGenerator();
    VirtualNode.reRender(() => this.run());
  }

  run() {
    this.container = this.generator.generate(this.container, this.component.render());
  }
}
