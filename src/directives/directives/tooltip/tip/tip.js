import Vue from 'vue';
import main from '../main/main';

// 创建一个子类
const VtipConstructor = Vue.extend(main);
const defaultOptions = {};
// tip实例
let vtipInstance = null;

/**
 *
 * @param {*} options
 * {
 *  content: ''   指令绑定的值
 *  placements: ['top', 'bottom']  展示位置
 *  target: div   目标元素
 *  theme: 'dark' 主题
 * }
 */
export default function tip(options) {
  options = options || {};
  // console.log('options:', options);
  // 判断是否已创建tooltip---实例已存在 && 挂载的元素有父节点
  if (vtipInstance && vtipInstance.$el.parentNode) {
    Object.assign(vtipInstance, defaultOptions, options);
    vtipInstance.updateTip();
    return vtipInstance;
  }
  // 否则 创建一个tip实例
  vtipInstance = new VtipConstructor({
    propsData: options
  }).$mount(); // vm.$mount() 手动地挂载一个未挂载的实例
  vtipInstance.updateTip();
  return vtipInstance;
};
