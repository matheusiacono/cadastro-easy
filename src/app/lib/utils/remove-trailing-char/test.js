/* globals describe it expect */
import removeTrailingChar from '.';

describe('test verify route', () => {
  it('should returns true to equal routes', () => {
    expect(removeTrailingChar('123/', '/')).toEqual('123');
    expect(removeTrailingChar('abc/a', '/')).toEqual('abc/a');
    expect(removeTrailingChar('xyz/a/', '/')).toEqual('xyz/a');
  });
});
