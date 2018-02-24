import flatten from '.';

describe('test flatten', () => {
  it('should return the simple array', () => {
    const arrayTest = [1, 2, 3];

    expect(flatten(arrayTest)).toEqual([1, 2, 3]);
  });

  it('should flat the 1st depth of the array', () => {
    const arrayTest = [[]];

    expect(flatten(arrayTest)).toEqual([]);
  });

  it('should flat the 2nd depth of the array', () => {
    const arrayTest = [[[]]];

    expect(flatten(arrayTest)).toEqual([]);
  });

  it('should flat the 10th depth of the array', () => {
    const arrayTest = [[[[[[[[[[[]]]]]]]]]]];

    expect(flatten(arrayTest)).toEqual([]);
  });

  it('should flat the values of the array with different depths', () => {
    const arrayTest = [1, [2], [[3]], [[[4]]]];

    expect(flatten(arrayTest)).toEqual([1, 2, 3, 4]);
  });
});
