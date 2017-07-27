import VueRouter from 'vue-router';
import routes from './routes';
/*
    https://router.vuejs.org/zh-cn/essentials/history-mode.html
    1. vue-router 默认 hash 模 式;
        ----使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载
    2. 如果不想要很丑的 hash，我们可以用路由的 history 模式，
       这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
        */
const router = new VueRouter({
  mode: 'history',
  routes
});

/*
    https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
    导航钩子
     导航钩子主要用来拦截导航，
     让它完成跳转或取消。
     有多种方式可以在路由导航发生时执行钩子：全局的、单个路由独享的、或者组件级的

    1. 全局钩子---router.beforeEach((to,from ,next)=>{})
        - to:Route 即将要进入的目标路由对象
        - from: Route 当前当好正要离开的路由
        - next: Function 一定要调用该方法来resolve这个钩子（执行效果依赖next方法的调用参数）

*/

router.beforeEach((to, from, next) => {
    console.log('目标路由to:', to);
    console.log('上一个路由from:', from);
    next();
});

export default router;
