import Tooltip from './tooltip';

module.exports = (Vue) => {
  Vue.directive('simple-tip', {
    bind: Tooltip
  });
};
