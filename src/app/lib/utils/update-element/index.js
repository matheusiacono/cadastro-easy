import setProp from '../set-prop';

const updateElement = (element, oldProps, props) => {
  Object.keys({ ...oldProps, ...props }).forEach((propName) => {
    if (
      props[propName] !==
      (propName === 'value' || propName === 'checked' ? element[propName] : oldProps[propName])
    ) {
      setProp(element, propName, props[propName]);
    }
  });
};

export default updateElement;
