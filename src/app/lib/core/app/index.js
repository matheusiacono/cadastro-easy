import DomGenerator from '../dom-generator';

export default class App {
  constructor(component, container) {
    this.component = component;
    this.container = container;

    this.generator = new DomGenerator();
  }

  run() {
    this.generator.generate(this.container, this.component);
  }
}
