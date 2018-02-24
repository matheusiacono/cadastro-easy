/* globals jest describe it expect */
import Location from '.';

describe('test location', () => {
  it('should return empty object', () => {
    expect(Location.actions().updateLocation()).toEqual({});
  });

  it('should call pushstate passing url', () => {
    const url = '/';
    const mockFn = jest.fn();
    window.history.pushState = mockFn;
    Location.navigate(url);
    expect(mockFn).toBeCalledWith(null, '', url);
  });

  it('should subscribe function to pushstate and popstate', () => {
    const mockFn = jest.fn();
    Location.subscribe({ updateLocation: () => mockFn() });

    window.dispatchEvent(new window.CustomEvent('pushstate'));
    window.dispatchEvent(new window.CustomEvent('popstate'));

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should be called by pushstate handler', () => {
    const mockFn = jest.fn();
    window.history.pushState = mockFn;
    Location.subscribe({ updateLocation: () => ({}) });
    window.history.pushState('a', 'b', 'c');
    expect(mockFn).toBeCalledWith('a', 'b', 'c');
  });
});
