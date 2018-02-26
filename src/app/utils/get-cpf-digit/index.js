const getCpfDigit = (sum) => {
  const module = sum % 11;
  return module < 2 ? 0 : 11 - module;
};

export default getCpfDigit;
