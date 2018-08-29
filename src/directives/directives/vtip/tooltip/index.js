import Bind from './bind';
import Update from './update';
import Unbind from './unbind';

module.exports = (Vue) => {
  Vue.directive('tip', {
    bind: Bind,
    update: Update,
    unbind: Unbind
  });
};
