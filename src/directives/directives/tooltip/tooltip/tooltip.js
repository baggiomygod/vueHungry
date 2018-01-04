import Tip from '../tip/tip';
// const allPlacements = ['top', 'right', 'bottom', 'left'];

export default (el, binding) => {
  el._tipOptions = binding.value;
  el._tipHandler = function tipHandler() {
    console.log('tipHandler', this._tipOptions);
    if (!this._tipOptions) return;
    const options = this._tipOptions;
    const tipInfo = {
      placements: 'top', // 方向
      theme: 'light', // 主体
      transition: 'transition' // transition
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
