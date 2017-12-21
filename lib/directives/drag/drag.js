/**
 * 拖拽
 * 1. 按下鼠标时：拿到元素和鼠标的相对位置
 * 2. 移动鼠标时：计算移动的x,y，改变元素的style;
 * 3. binding.value将值传出去
 */
export default (el, binding, vnode) => {
  // console.log('binding:', binding);
  let oDiv = el; // 当前元素
  oDiv.onmousedown = function (e) {
    console.log('鼠标按下时的事件:', e);
    // 鼠标按下，计算当前元素距离可视区的距离
    let disX = e.clientX - oDiv.offsetLeft; // e.clientX鼠标按下时的位置 - 元素的坐标
    let disY = e.clientY - oDiv.offsetTop;

    document.onmousemove = function (e) {
      console.log('e:', e);
      // 通过事件委托，计算移动的距离
      let l = e.clientX - disX;
      let t = e.clientY - disY;
      // 移动当前元素
      oDiv.style.left = l + 'px';
      oDiv.style.top = t + 'px';
      // 将此时的位置传出去---v-drag="greet",greet(val)方法接收value传出的值
      binding.value({
        x: e.pageX,
        y: e.pageY
      });
    };
    document.onmouseup = function (e) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
};
