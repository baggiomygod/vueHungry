import isPc from '../../../utils/isPc';
const M_PC = isPc(); // pc:true  phone:false
const EVENT_START = M_PC ? 'onmousedown' : 'ontouchstart';
const EVENT_MOVE = M_PC ? 'onmousemove' : 'ontouchmove';
const EVENT_END = M_PC ? 'onmouseup' : 'ontouchend';

/**
 * 拖拽
 * 1. 按下鼠标时：拿到元素和鼠标的相对位置
 * 2. 移动鼠标时：计算移动的x,y，改变元素的style;
 * 3. binding.value将值传出去
 */
export default (el, binding, vnode) => {
  let oDiv = el; // 当前元素
  let event;
  oDiv[EVENT_START] = function (e) {
    event = touchEvent(e);
    // 鼠标按下，计算当前元素距离可视区的距离
    let disX = event.clientX - oDiv.offsetLeft; // e.clientX鼠标按下时的位置 - 元素的坐标
    let disY = event.clientY - oDiv.offsetTop;

    document[EVENT_MOVE] = function (e) {
      event = touchEvent(e);
      // 通过事件委托，计算移动的距离
      let l = event.clientX - disX;
      let t = event.clientY - disY;
      // 移动当前元素
      oDiv.style.left = l + 'px';
      oDiv.style.top = t + 'px';
      // 将此时的位置传出去---v-drag="greet",greet(val)方法接收value传出的值
      binding.value({
        x: e.pageX,
        y: e.pageY,
        type: M_PC ? 'PC' : '移动端'
      });
    };
    document[EVENT_END] = function (e) {
      document[EVENT_MOVE] = null;
      document[EVENT_END] = null;
    };
  };
};

/**
 * 返回事件对象
 * @param {*} e
 */
function touchEvent(e) {
  let touchs = M_PC ? e : e.changedTouches[0];
  return touchs;
}
