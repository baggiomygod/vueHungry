<template>
    <div>
        <v-header :seller="seller" :wx-code="code" :wx-state="state"></v-header>
        <v-menus></v-menus>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>
<script>
import header from 'components/header/header.vue';
import goods from 'components/goods/goods.vue';
import menus from 'components/menus/menus.vue';
import wxUtil from './utils/wxUtil';
// const OAUTH2API = 'https://api.weixin.qq.com/sns/oauth2/access_token?'; // appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code;
const ERR_OK = 0;
export default {
    mixins: [wxUtil],
    data() {
        return {
            seller: {},
            code: '',
            state: '',
            accessToken: '',
            openid: '',
            appID: 'wxc37f7db9c9c1198e', // 测试账号
            appSecret: '585e2f51c10c0434469c88d6a6102b1c' // 测试账号
        };
    },
    created() {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
        this.getAccessToken(this.code).then(res => {
                this.accessToken = res.access_token;
                this.openid = res.openid;
                // if (access_token && openid) {
                    // wechat.getUsrInfo(access_token, openid).then(data => {
                    //     console.log('*********user indo:', data);
                    // });
                // }
        }).catch(err => {
            console.log(err);
        });
        // this.getAccesstoken(this.code, this.state);
        // 获取seller数据
        this.$http.get('/api/seller').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.seller = response.data;
            }
        });
    },
    components: {
        'v-header': header,
        'v-goods': goods,
        'v-menus': menus
    },
    methods: {
        getAccesstoken(code, state) {
            console.log('code:', code);
            this.$http.jsonp(
                'https://wxfan.localtunnel.me/wx_oauth2',
                {
                    params:
                    { code: this.code },
                    jsonp: 'callback'
                }
            ).then(res => {
                console.log(res);
            });
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
