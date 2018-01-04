<template>
    <div>
        <v-header :seller="seller" :wx-code="code" :wx-state="state" :access-token="accessToken" :openid="openId" :user-info="userInfo"></v-header>
        <!-- <v-menus></v-menus> -->
        <scroll-menus :config="menusConfig" @change-title="changeTitle" @show-all-menus="changeMenus"></scroll-menus>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>
<script>
import header from './header/header.vue';
import goods from 'views/products/goods/goods.vue';
import wxUtil from '../../utils/wxUtil';
import ScrollMenus from 'views/components/scroll-menus/scroll-menus';
// import AllMenus from 'views/components/all-menus/all-menus';
// const OAUTH2API = 'https://api.weixin.qq.com/sns/oauth2/access_token?'; // appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code;
const ERR_OK = 0;

export default {
  mixins: [wxUtil],
  data() {
    return {
      seller: {},
      userInfo: {
        openid: '',
        nickname: '',
        sex: '',
        province: '',
        country: '',
        headimgurl: '',
        privilege: [],
        unionid: ''
      },
      menusConfig: [
        { menu_name: '商品', url: '/goods' },
        { menu_name: '评论', url: '/ratings' },
        { menu_name: '商家', url: '/seller' },
        { menu_name: '图标', url: '/icon' },
        { menu_name: '缩放', url: '/zoom' },
        { menu_name: 'tip', url: '/tip' },
        { menu_name: 'test', url: '/test' }
      ],
      showAllMenus: false,
      propsHeader: 'Vue',
      code: '',
      accessToken: '',
      openId: '',
      mainUrl: 'http://wxfan.ngrok.cc',
      state: '',
      resData: '', // test
      appID: 'wxc37f7db9c9c1198e', // 测试账号
      appSecret: '585e2f51c10c0434469c88d6a6102b1c' // 测试账号
    };
  },
  components: {
    'v-header': header,
    'v-goods': goods,
    ScrollMenus
    // AllMenus
  },
  methods: {
    // 获取seller数据
    getSellerData() {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
    },
    changeTitle(event) {
      this.propsHeader = event;
    },
    changeMenus(event) {
      this.showAllMenus = event;
    },
    // code换取accessToken;
    getAccessTokenByCode() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${this.mainUrl}/wx_oauth2?code=${this.code}`)
          .then(res => {
            if (res.errcode) {
              console.log(res.data.errcode);
              reject(res.errcode);
            } else {
              this.accessToken = res.data.access_token;
              this.openId = res.data.openid;
              resolve();
            }
          });
      });
    },
    // 获取用户信息
    getUserInfo() {
      this.$http
        .get(
          `${this.mainUrl}/user_info?access_token=${this
            .accessToken}&openid=${this.openId}`
        )
        .then(res => {
          if (res.data.errcode) {
            console.log('获取用户信息报错:', res.data);
          } else {
            this.userInfo = res.data;
          }
        });
    }
  },
  created() {
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;
    // 获取seller数据
    this.getSellerData();
    // code换取access_token
    this.getAccessTokenByCode().then(res => {
      this.getUserInfo(); // 获取用户信息
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
