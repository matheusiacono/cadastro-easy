import DomGenerator from '../dom-generator';

export default class App {
  constructor(component, container) {
    this.component = component;
    this.container = container;

    this.generator = new DomGenerator();
    this.component.reRender(() => this.run());
  }

  run() {
    this.generator.generate(this.container, this.component);
  }
}
