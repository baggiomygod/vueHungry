import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'; // $http
import router from './router';
import App from './App';
import lib from '../lib';

import 'common/style/index.scss';
// 注册vueRouter
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(lib);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

// 打开的默认路径
router.push('/icon');
// router.push('/goods');
