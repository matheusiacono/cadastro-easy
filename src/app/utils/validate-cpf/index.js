import getCpfDigit from '../get-cpf-digit';
import getCpfSum from '../get-cpf-sum';

function validateCpf(cpf) {
  if (cpf.length < 11) {
    return false;
  }

  const equalNumbers = cpf
    .split('')
    .reduce((ac, cur) => (ac === cur ? cur : false), cpf.slice(0, 1));
  if (equalNumbers !== '0' && !equalNumbers) {
    const digits = cpf.split('').slice(9);

    if (
      getCpfDigit(getCpfSum(
        10,
        cpf
          .split('')
          .slice(0, 9)
          .map(x => parseInt(x, 10)),
      )) !== parseInt(digits[0], 10)
    ) {
      return false;
    }
    if (
      getCpfDigit(getCpfSum(
        11,
        cpf
          .split('')
          .slice(0, 10)
          .map(x => parseInt(x, 10)),
      )) !== parseInt(digits[1], 10)
    ) {
      return false;
    }

    return true;
  }
  return false;
}

export default validateCpf;
