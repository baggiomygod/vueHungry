<template>
    <div>
        <v-header :seller="seller" 
                  :wx-code="code" 
                  :wx-state="state" 
                  :access-token="accessToken" 
                  :openid="openId"
                  :user-info="userInfo"></v-header>
        <v-menus></v-menus>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>
<script>
import header from 'views/header/header.vue';
import goods from 'views/goods/goods.vue';
import menus from 'views/menus/menus.vue';
import wxUtil from './utils/wxUtil';
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
    created() {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
        // 获取seller数据
        this.getSellerData();
    },
    components: {
        'v-header': header,
        'v-goods': goods,
        'v-menus': menus
    },
    methods: {
        // 获取seller数据
        getSellerData() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = response.data;
                }
            });
        },
        getAccessTokenByCode() {
            this.$http.get(`${this.mainUrl}/wx_oauth2?code=${this.code}`)
                    .then(res => {
                        if (res.errcode) {
                            console.log(res.data.errcode);
                        } else {
                            console.log(res.data);
                            this.accessToken = res.data.access_token;
                            this.openId = res.data.openid;
                        }
                    });
            },
        getUserInfo() { // 获取用户信息 https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
            this.$http
                    .get(`${this.mainUrl}/user_info?access_token=${this.accessToken}&openid=${this.openId}`)
                    .then(res => {
                        if (res.data.errcode) {
                            console.log(res.data);
                        } else {
                            this.userInfo = res.data;
                        }
                    });
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
