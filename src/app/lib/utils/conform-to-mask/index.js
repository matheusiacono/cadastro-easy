const conformToMask = (val, maskToConform) => {
  const value = `${val}`;
  let i = 0;
  let size = value.length;
  return maskToConform
    .split('')
    .map((x) => {
      if (value.length > i) {
        if (x !== 'X') {
          size += 1;
          return x;
        }
        const char = value[i];
        i += 1;
        return char;
      }
      return x;
    })
    .slice(0, size)
    .join('');
};

export default conformToMask;
