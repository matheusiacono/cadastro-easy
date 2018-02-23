import conformToMask from '../conform-to-mask';

const applyMask = (value, mask) => {
  const m = typeof mask === 'function' ? mask(value) : mask;
  return conformToMask(value, m);
};

export default applyMask;
