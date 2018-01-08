import clearEvent from './clearEvent';
import Tip from '../tip/tip';
import * as config from './config';

export default (el, binding) => {
  clearEvent(el);
  // binding.modifiers 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }
  const { click, dark, transition } = binding.modifiers;
  const limitPlacementQueue = config.allPlacements.filter(plcaement => binding.modifiers[plcaement]);
  el._tipOptions = binding.value; // 指令的绑定值
  
  el._tipHandler = function tipHandler() {
    if (!this._tipOptions) {
      return;
    };
    const options = this._tipOptions;
    const placements = limitPlacementQueue.length
                      ? limitPlacementQueue : config.allPlacements;
    const mix = {
      placements,
      transition,
      theme: dark ? 'dark' : 'light'
    };

    const tipOptions = typeof options === 'object'
                          ? Object.assign(mix, options, {target: this})
                          : Object.assign(mix, {content: String(options), target: this});
    this._tipInstance = Tip(tipOptions);
  };

  el._tipMouseleaveHandler = function _tipMouseleaveHandler() {
    if (this._tipInstance) {
      this._tipInstance.hiddenTip();
    }
  };

  // 默认触发方式 hover
  if (click) {
    el.addEventListener('click', el._tipHandler);
  } else {
    el.addEventListener('mouseenter', el._tipHandler);
  }

  el.addEventListener('mouseleave', el._tipMouseleaveHandler);
};
