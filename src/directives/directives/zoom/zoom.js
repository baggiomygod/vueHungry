/**
 * 缩放
 */
export default (el, binding, vnode) => {
  let zoomTarget = el;
  let ctrlDiv = zoomTarget.querySelector('.zoom-ctrl');
  ctrlDiv.onmousedown = function(e) {
    // 阻止时间冒泡
    e.stopPropagation();
    let width = zoomTarget.clientWidth;
    let height = zoomTarget.clientHeight;
    let disX = e.clientX;
    let disY = e.clientY;
    document.onmousemove = function(e) {
      // 阻止时间冒泡
      e.stopPropagation();
      let changeWidth = e.clientX - disX + width;
      let changeHeight = e.clientY - disY + height;

      zoomTarget.style.width = changeWidth + 'px';
      zoomTarget.style.height = changeHeight + 'px';
    };
    document.onmouseup = function (e) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
};
