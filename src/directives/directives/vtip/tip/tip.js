import Vue from 'vue';
import main from '../main/main';

// 创建一个子类
const VtipConstructor = Vue.extend(main);
const props = main.props;
const defaultOptions = {};
Object.keys(props).forEach(key => {
  const prop = props[key];
  const dv = prop.default;
  if (prop && prop.default != null) {
    defaultOptions[key] = typeof dv === 'function' ? dv() : dv;
  }
});

// tip实例
let vtipInstance = null;
export default function tip(options) {
  options = options || {};
  // 如果已经存在的tip 的实例，直接更新属性值
  if (vtipInstance && vtipInstance.$el.parentNode) {
    // 合并
    Object.assign(vtipInstance, defaultOptions, options);
    if (vtipInstance.target) {
      vtipInstance.updateTip();
    } else {
      vtipInstance.hiddenTip();
    }
    return vtipInstance;
  }

  // 否则 创建一个tip实例
  vtipInstance = new VtipConstructor({
    propsData: options
  }).$mount();
  vtipInstance.updateTip();
  return vtipInstance;
}
