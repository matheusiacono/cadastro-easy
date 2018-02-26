import getCpfSum from '.';

describe('test getCpfSum method', () => {
  it('should return 204', () => {
    expect(getCpfSum(11, [1, 1, 1, 4, 4, 4, 7, 7, 7, 3])).toEqual(204);
  });

  it('should return 162', () => {
    expect(getCpfSum(10, [1, 1, 1, 4, 4, 4, 7, 7, 7])).toEqual(162);
  });
});
