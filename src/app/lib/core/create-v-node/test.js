/* globals describe it expect */
import createVNode from '.';

describe('jsx syntax', () => {
  it('should work', () => {
    const tag = <div foo="bar" />;

    expect(tag.type).toEqual('div');
    expect(tag.props).toEqual({ foo: 'bar' });
    expect(tag.children).toEqual([]);
  });
});
