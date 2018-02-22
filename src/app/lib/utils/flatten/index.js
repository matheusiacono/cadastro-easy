const flatten = list =>
  list.reduce((ac, cur) => ac.concat(Array.isArray(cur) ? flatten(cur) : cur), []);

export default flatten;
