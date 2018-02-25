import setProp from '../../utils/set-prop';
import updateElement from '../../utils/update-element';

export default class DomGenerator {
  static generate(parent, node, oldNode, element) {
    let $el = element;
    if (oldNode == null) {
      $el = parent.insertBefore(this.createElement(node), $el);
    } else if (node.type && node.type === oldNode.type) {
      updateElement($el, oldNode.props, node.props);
      const oldElements = oldNode.children.map((oldChild, i) => $el.childNodes[i]);

      let oldChildCursor = 0;
      node.children.forEach((newChild) => {
        const oldChild = oldNode.children[oldChildCursor];
        this.generate($el, newChild, oldChild, oldElements[oldChildCursor]);
        oldChildCursor += 1;
      });

      oldElements.slice(oldChildCursor).forEach(oldElement => $el.removeChild(oldElement));
    } else {
      const nextSibling = $el;
      $el = parent.insertBefore(this.createElement(node), $el);
      parent.removeChild(nextSibling);
    }
    return $el;
  }

  static createElement(node) {
    const element =
      typeof node === 'string' || typeof node === 'number'
        ? document.createTextNode(node)
        : document.createElement(node.type);

    if (node.children) {
      node.children.map(child => this.createElement(child)).forEach((child) => {
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
