import Zoom from './zoom';

module.exports = (Vue) => {
  Vue.directive('zoom', {
    bind: Zoom
  });
};
