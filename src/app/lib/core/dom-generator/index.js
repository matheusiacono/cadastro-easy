import setProp from '../../utils/set-prop';

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

    if (node.props instanceof Object) {
      Object.keys(node.props).forEach((name) => {
        setProp(element, name, node.props[name]);
      });
    }
    return element;
  }
}
