const setProp = (element, name, value) => {
  const $el = element;
  if (typeof value === 'function') {
    $el[name] = value;
  } else if (value) {
    $el.setAttribute(name, value);
  }

  if (value == null || value === false) {
    $el.removeAttribute(name);
  }
};

export default setProp;
