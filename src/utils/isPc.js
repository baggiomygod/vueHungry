/**
 * 返回当前浏览器的用户代理字符串
 * 判断PC端 移动端
 */
export default () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ['Android', 'iPhone',
              'SymbianOS', 'Windows Phone',
              'iPad', 'iPod'];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  return flag;
};
