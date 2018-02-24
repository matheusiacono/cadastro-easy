import verifyRoute from '../../../utils/verify-route';
import { VirtualNode, createVNode } from '../../../';

class Route extends VirtualNode {
  render() {
    const location = this.props.location || window.location;
    const canRender = verifyRoute(this.props.path, location.pathname);
    const Component = this.props.render;

    return canRender && <Component {...this.canRender} />;
  }
}

export default Route;
