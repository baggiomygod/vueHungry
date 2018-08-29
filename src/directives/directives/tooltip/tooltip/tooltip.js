import Tip from '../tip/tip';
const allPlacements = ['top', 'right', 'bottom', 'left'];

export default (el, binding) => {
  const { dark, transition } = binding.modifiers;
  const { expression } = binding;
  // 自定义位置---可以是多个，按顺序决定优先级
  const customizedPlacements = allPlacements.filter(placement => binding.modifiers[placement]);
  console.log(expression);
  el._tipOptions = binding.value;
  el._tipHandler = function tipHandler() {
    if (!this._tipOptions) return;
    const options = this._tipOptions;
    const placements = customizedPlacements.length ? customizedPlacements : allPlacements;

    // 解析指令中的参数
    const tipInfo = {
      placements,
      theme: dark ? 'dark' : 'light', // 主体
      transition // 是否添加过渡效果
    };
    const tipOptions = typeof options === 'object'
                    ? Object.assign(tipInfo, options, {target: this})
                    : Object.assign(tipInfo, {content: String(options), target: this});
    this._tipInstance = Tip(tipOptions); // options先不传
  };
  el._tipMouseleaveHandler = function tipMouseleaveHandler() {
    if (this._tipInstance) {
      this._tipInstance.hiddenTip();
    }
  };
  el.addEventListener('mouseenter', el._tipHandler);
  el.addEventListener('mouseleave', el._tipMouseleaveHandler);
};
