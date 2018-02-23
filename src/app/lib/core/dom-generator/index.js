export default class DomGenerator {
  createElement(node) {
    const element =
      typeof node === 'string' || typeof node === 'number'
        ? document.createTextNode(node)
        : document.createElement(node.type);

    if (node.children) {
      node.children
        .filter(c => c)
        .map(child => this.createElement(child))
        .forEach((child) => {
          element.appendChild(child);
        });
    }
    return element;
  }
}
