const location = {
  updateLocation: () => ({}),
  navigate: (url) => {
    window.history.pushState(null, '', url);
  },
  subscribeRouter: () => (state, { updateLocation }) => {
    function handleLocationChange() {
      updateLocation();
    }

    const fn = window.history.pushState;

    window.history.pushState = function pushStateHandler(data, title, url) {
      fn.call(this, data, title, url);
      window.dispatchEvent(new window.CustomEvent('pushstate', { detail: data }));
    };

    window.addEventListener('pushstate', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
  },
};

export default location;
