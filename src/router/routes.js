import goods from 'views/products/goods/goods';
import ratings from 'views/ratings/ratings';
import seller from 'views/sellers/seller/seller';
import wxTest from 'views/test/wx-test';

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
    path: '/wx-test',
    name: 'wx-test',
    component: wxTest
  }
];
export default routes;
