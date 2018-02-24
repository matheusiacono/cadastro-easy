import { VirtualNode, createVNode } from '../../../';

export default class Link extends VirtualNode {
  render() {
    const { to } = this.props;
    const newProps = { ...this.props };
    const location = this.props.location || window.location;

    newProps.href = to;
    delete newProps.to;

    const clickHandler = (e) => {
      if (e.currentTarget.origin === location.origin) {
        e.preventDefault();

        if (to !== location.pathname) {
          window.history.pushState(location.pathname, '', to);
        }
      }
    };

    newProps.onclick = clickHandler;

    return <a {...newProps}>{this.children}</a>;
  }
}
