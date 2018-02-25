import location from '.';

describe('test location', () => {
  it('should return empty object', () => {
    expect(location.updateLocation()).toEqual({});
  });

  it('should call pushstate passing url', () => {
    const url = '/';
    const mockFn = jest.fn();
    window.history.pushState = mockFn;
    location.navigate(url);
    expect(mockFn).toBeCalledWith(null, '', url);
  });

  it('should subscribe function to pushstate and popstate', () => {
    const mockFn = jest.fn();
    location.subscribeRouter()({}, { updateLocation: () => mockFn() });

    window.dispatchEvent(new window.CustomEvent('pushstate'));
    window.dispatchEvent(new window.CustomEvent('popstate'));

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should be called by pushstate handler', () => {
    const mockFn = jest.fn();
    window.history.pushState = mockFn;
    location.subscribeRouter()({}, { updateLocation: () => ({}) });
    window.history.pushState('a', 'b', 'c');
    expect(mockFn).toBeCalledWith('a', 'b', 'c');
  });
});
