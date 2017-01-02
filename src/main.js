import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/style/index.scss';
// 注册vueRouter
Vue.use(VueRouter);
Vue.use(VueResource);
// 路由的根组件
let app = Vue.extend(App);
// 实例化router
let router = new VueRouter({
	linkActiveClass: 'active'
});
// 定义路由
router.map({
    '/goods': {
        component: goods
    },
    '/ratings': {
        component: ratings
    },
    '/seller': {
        component: seller
    }
});
router.start(app, '#app');
// router.go('/goods');
