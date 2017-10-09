<template>
    <!-- <div>
        <cartcontrol @add="addFood" :food="food"></cartcontrol>
    </div> -->
    <div class="v-test">
        <button @click="getAccessTokenByCode" class="btn">getaccessToken</button>
        <button @click="getUserInfo" class="btn">getUserInfo</button>
    </div>
</template>
<script>
import cartcontrol from 'views/cartcontrol/cartcontrol';
// import WxServer from '../../service/wxserver';

export default {
    data() {
        return {
            food: {
                count: 1,
                price: 1
            },
            code: '123',
            accessToken: '',
            openId: '',
            mainUrl: 'http://wxfan.ngrok.cc'
        };
    },
    components: {
        cartcontrol
    },
    methods: {
        addFood(target) {
            // console.log(target);
            // alert('test2 add ...');
            window.alert(1);
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
                        } else {}
                    });
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
    .v-test{
        .btn{
            background-color: #e2e2e2;
        }
    }
</style>


