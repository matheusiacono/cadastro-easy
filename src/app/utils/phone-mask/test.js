import phoneMask from '.';

describe('test phone mask', () => {
  it('should return mask for 10 digits', () => {
    expect(phoneMask('123')).toEqual('(XX) XXXX-XXXX');
  });

  it('should return mask for 11 digits', () => {
    expect(phoneMask('12345678901')).toEqual('(XX) XXXXX-XXXX');
  });
});
