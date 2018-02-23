/* globals describe it expect */
import conformToMask from '.';

describe('test conform to mask', () => {
  it('should return one char', () => {
    const value = '123';
    const mask = 'X';
    const maskedValue = conformToMask(value, mask);

    expect(maskedValue).toEqual('1');
  });

  it('should return the mask', () => {
    const value = '123';
    const mask = 'X-X-X';
    const maskedValue = conformToMask(value, mask);

    expect(maskedValue).toEqual('1-2-3');
  });

  it('should return the parcial mask', () => {
    const value = '12';
    const mask = 'X-X-X';
    const maskedValue = conformToMask(value, mask);

    expect(maskedValue).toEqual('1-2');
  });
});
