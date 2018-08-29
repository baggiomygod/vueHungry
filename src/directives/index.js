import Draggable from './directives/drag';
import Zoom from './directives/zoom';
import VTip from './directives/vtip';
import ToolTip from './directives/tooltip';
const install = (Vue) => {
  Draggable(Vue);
  Zoom(Vue);
  VTip.tooltip(Vue);
  ToolTip.tooltip(Vue);
};

module.exports = {
  install
};
