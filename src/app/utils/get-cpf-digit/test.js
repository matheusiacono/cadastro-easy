import getCpfDigit from '.';

describe('test getCpfDigit method', () => {
  it('should return digit 3 to sum 162', () => {
    expect(getCpfDigit(162)).toEqual(3);
  });

  it('should return digit 5 to sum 204', () => {
    expect(getCpfDigit(204)).toEqual(5);
  });

  it('should return digit 0 to sum 12', () => {
    expect(getCpfDigit(12)).toEqual(0);
  });
});
