import verifyRoute from '../../../utils/verify-route';
import { VirtualNode, createVNode } from '../../../';

class Route extends VirtualNode {
  static render(props) {
    const location = props.location || window.location;
    const canRender = verifyRoute(props.path, location.pathname);
    const Component = props.render;

    return canRender && <Component {...canRender} />;
  }
}

export default Route;
