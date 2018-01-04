import clearEvent from './clearEvent';

export default (el) => {
  const instance = el._tipInstance;
  if (instance && instance.destory) {
    instance.destory();
  }
  clearEvent(el);
};
