import validateCpf from '.';

describe('test validateCpf method', () => {
  it('should return true', () => {
    expect(validateCpf('11144477735')).toBeTruthy();
    expect(validateCpf('34537419350')).toBeTruthy();
    expect(validateCpf('54350347607')).toBeTruthy();
    expect(validateCpf('51417095822')).toBeTruthy();
  });

  it('should return false', () => {
    expect(validateCpf('00000000000')).not.toBeTruthy();
    expect(validateCpf('11111111111')).not.toBeTruthy();
    expect(validateCpf('22222222222')).not.toBeTruthy();
    expect(validateCpf('33333333333')).not.toBeTruthy();
    expect(validateCpf('99999999999')).not.toBeTruthy();
    expect(validateCpf('11144477745')).not.toBeTruthy();
    expect(validateCpf('11144477737')).not.toBeTruthy();
    expect(validateCpf('1114447773')).not.toBeTruthy();
    expect(validateCpf('111444777300')).not.toBeTruthy();
  });
});
