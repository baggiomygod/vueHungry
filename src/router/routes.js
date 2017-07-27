import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import test from 'components/test/test2';

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
