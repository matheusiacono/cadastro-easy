export default class Location {
  static actions() {
    return {
      updateLocation() {
        return {};
      },
    };
  }

  static navigate(url) {
    window.history.pushState(null, '', url);
  }

  static subscribe(actions) {
    function handleLocationChange() {
      actions.updateLocation();
    }

    const fn = window.history.pushState;

    window.history.pushState = function pushStateHandler(data, title, url) {
      fn.call(this, data, title, url);
      window.dispatchEvent(new window.CustomEvent('pushstate', { detail: data }));
    };

    window.addEventListener('pushstate', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
  }
}
