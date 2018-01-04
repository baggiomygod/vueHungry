export default (el) => {
  if (el._tipHandler) {
    el.removeEventListener('click', el._tipHandler);
    el.removeEventListener('mouseenter', el._tipHandler);
  }
  if (el._tipMouseleaveHandler) {
    el.removeEventListener('mouseleave', el._tipMouseleaveHandler);
  }
  delete el._tipHandler;
  delete el._tipMouseleaveHandler;
  delete el._tipOptions;
  delete el._tipInstance;
};
