import { VirtualNode, createVNode } from '../../../';

export default class Link extends VirtualNode {
  static render(props, children) {
    const { to } = props;
    const nodeProps = { ...props };
    const location = props.location || window.location;

    nodeProps.href = to;
    delete nodeProps.to;

    const clickHandler = (e) => {
      if (e.currentTarget.origin === location.origin) {
        e.preventDefault();

        if (to !== location.pathname) {
          window.history.pushState(location.pathname, '', to);
        }
      }
    };

    nodeProps.onclick = clickHandler;

    return <a {...nodeProps}>{children}</a>;
  }
}
