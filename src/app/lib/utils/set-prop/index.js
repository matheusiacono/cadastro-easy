const setProp = (element, name, value) => {
  if (typeof value === 'function') {
    element.addEventListener(name.slice(2).toLowerCase(), value);
  } else if (value) {
    element.setAttribute(name, value);
  }
};

export default setProp;
