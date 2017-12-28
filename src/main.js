import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'; // $http
import router from './router';
import App from './App';
import directives from './directives';

import 'common/style/index.scss';
import './main.scss';
import 'static/icon_font/iconfont.css';// 引入图标库

// 注册vueRouter
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(directives);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

// 打开的默认路径
router.push('/icon');
// router.push('/goods');
