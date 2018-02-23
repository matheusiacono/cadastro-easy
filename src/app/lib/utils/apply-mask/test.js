/* globals describe it expect */
import applyMask from '.';

describe('test apply mask', () => {
  it('should return mask for string', () => {
    const value = '123';
    const mask = 'X';
    const maskedValue = applyMask(value, mask);

    expect(maskedValue).toEqual('1');
  });

  it('should return mask for function', () => {
    const value1 = '123';
    const value2 = '12345';
    const value3 = '1';

    const mask = val => (val.length === 3 ? 'X.X.X' : '-X-X-X-X-X-X-X');
    const maskedValue1 = applyMask(value1, mask);
    const maskedValue2 = applyMask(value2, mask);
    const maskedValue3 = applyMask(value3, mask);

    expect(maskedValue1).toEqual('1.2.3');
    expect(maskedValue2).toEqual('-1-2-3-4-5');
    expect(maskedValue3).toEqual('-1');
  });
});
