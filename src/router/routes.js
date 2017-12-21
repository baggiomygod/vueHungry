import goods from 'views/products/goods/goods';
import ratings from 'views/ratings/ratings';
import seller from 'views/sellers/seller/seller';
import test from 'views/test/test2';
import icon from 'views/test/icon_font/icon_font';

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
  },
  {
    path: '/icon',
    name: '图标',
    component: icon
  }
];
export default routes;
