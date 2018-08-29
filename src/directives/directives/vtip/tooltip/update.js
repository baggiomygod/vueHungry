export default (el, {value, oldValue}) => {
  if (value === oldValue) return;
  el._tipOptions = value;
};
