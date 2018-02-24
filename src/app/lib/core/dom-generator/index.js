import setProp from '../../utils/set-prop';

export default class DomGenerator {
  generate(parent, node) {
    const newParent = parent.cloneNode();
    const frag = document.createDocumentFragment();
    frag.appendChild(this.createElement(node));
    newParent.innerHTML = '';
    newParent.appendChild(frag);

    parent.parentNode.replaceChild(newParent, parent);
    return newParent;
  }

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
