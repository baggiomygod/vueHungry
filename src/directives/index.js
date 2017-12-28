import Draggable from './directives/drag';
import Zoom from './directives/zoom';

const install = (Vue) => {
  Draggable(Vue);
  Zoom(Vue);
};

module.exports = {
  install
};
