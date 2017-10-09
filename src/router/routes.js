import goods from 'views/goods/goods';
import ratings from 'views/ratings/ratings';
import seller from 'views/seller/seller';
import test from 'views/test/test2';

let routes = [{
    path: '/goods',
    name: 'goods',
    component: goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller
  },
  { // 测试组件
    path: '/test',
    name: 'test',
    component: test
  }
];
export default routes;
