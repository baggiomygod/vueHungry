<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="headImgUrl" alt="图标">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{userInfo.nickname}}</span>
                </div>
                <div class="description">{{userInfo.province}},{{userInfo.country}},{{userInfo.sex}}</div>
                <!-- v-if判断:数据是异步加载的，当数据还未加载是，seller={},supports为undefined，此时v-if判断后显示空 -->
                <div class="support" v-if="seller.supports">
                    <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" v-on:click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" v-on:click="showDetail">
            <span class="bullectin-icon"></span><span class="bullection-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img v-bind:src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star v-bind:size="48" v-bind:score="seller.score"></star>
                    </div>
                    <div class="detail-title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="detail-info">
                        <li v-for="support in seller.supports" :key="support.type">
                            <span class="icon" v-bind:class="classMap[support.type]"></span>
                            <span class="text">{{support.description}}</span>
                        </li>
                    </ul>
                    <div class="detail-title">
                        <div class="line"></div>
                        <div class="text">关于我们</div>
                        <div class="line"></div>
                    </div>
                   <!--  <div class="detail-text">
                        <p class="text">code:{{wxCode}}</p>
                        <p class="text">state:{{wxState}}</p>
                        <p class="text">accessToken:{{accessToken}}</p>
                        <p class="text">openid:{{openid}}</p>
                    </div> -->
                </div>
            </div>
            <div class="detail-close" v-on:click="hidenDetail">
                <i class="icon-close" ></i>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import star from 'views/star/star.vue';
export default {
    props: {
        seller: {
            type: Object
        },
        wxCode: {
            type: String,
            defaule: ''
        },
        wxState: {
            type: String,
            defaule: ''
        },
        accessToken: {
            type: String,
            defaule: ''
        },
        openid: {
            type: String,
            defaule: ''
        },
        userInfo: {
            type: Object,
            default() {
                return {
                    openid: '',
                    nickname: '',
                    sex: '',
                    province: '',
                    country: '',
                    headimgurl: '',
                    privilege: [],
                    unionid: ''
                };
            }
        }
    },
    data() {
        return {
            detailShow: false
        };
    },
    computed: {
        headImgUrl() {
            let url = this.userInfo.headimgurl ? this.userInfo.headimgurl : this.seller.avatar;
            return url;
        }
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hidenDetail() {
            this.detailShow = false;
        }
    },
    // 生命周期 create?
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    // 注册
    components: {
        star
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../common/style/mixin";
.header {
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, 0.2);
    overflow: hidden;
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            font-size: 14px;
            display: inline-block;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    width: 30px;
                    height: 18px;
                    // 行内元素设置宽高无用，需要设为inline-block
                    display: inline-block;
                    @include bg-image("brand");
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                    vertical-align: top;
                }
                .name {
                    font-size: 16px;
                    margin-left: 6px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description {
                font-size: 12px;
                margin-bottom: 10px;
                line-height: 12px;
            }
            .support {
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                }
                .decrease {
                    @include bg-image("decrease_1");
                }
                .discount {
                    @include bg-image("discount_1");
                }
                .guarantee {
                    @include bg-image("guarantee_1");
                }
                .invoice {
                    @include bg-image("invoice_1");
                }
                .special {
                    @include bg-image("special_1");
                }
                .text {
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
                vertical-align: top;
                font-size: 10px;
                line-height: 24px;
            }
            .icon-keyboard_arrow_right {
                margin-left: 2px;
                font-size: 10px;
                line-height: 24px;
            }
        }
    }
    .bulletin-wrapper {
        display: relative;
        height: 28px;
        background-color: rgba(7, 17, 27, 0.2);
        line-height: 28px;
        padding: 0 22px 0 12px;
        span {
            display: inline-block;
        }
        .bullectin-icon {
            width: 22px;
            height: 12px;
            @include bg-image("bulletin");
            background-size: 22px 12px;
            background-repeat: no-repeat;
            // margin:0 2px 0 0;
            // line-height:14px;
            vertical-align: top;
            margin-top: 8px;
        }
        .bullection-text {
            // white-space: nowrap;
            vertical-align: top;
            // overflow: hidden;
            // text-overflow: ellipsis;
            width: 85%;
            // line-height:28px;
            margin: 0 4px;
            font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon-keyboard_arrow_right {
            display: absolute;
            // line-height:28px;
            font-size: 10px;
            right: 12px;
            top: 8px;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        z-index: 100;
        filter: blur(0px);
        transition: all 0.5s; // 过渡时间
        backdrop-filter: blur(10px);// IOS
        opacity: 1; // 元素展现时的样式
        background-color: rgba(7, 17, 27, 0.8);
        // 过渡进入和离开时的样式
        &.fade-enter-active,
        &.fade-leave-active{
            opacity:0;
            background-color: rgba(7, 17, 27, 0);
        }
        .detail-wrapper {
            //最小高度和窗口一样 100%
            min-height: 100%;
            width: 100%;
            .detail-main {
                margin-top: 64px;
                padding-bottom: 64px;
                .name {
                    line-height: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                }
                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .detail-title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line {
                        //1. flex:flex-grow(定义项目的方大比例。默认：0，不放大；1，等分，...),
                        //      flex-shrink(定义项目的缩小比例。默认：1 空间不足将缩小；0 其他为1，设为0的被缩小)，
                        //      flex-base(定义了在分配多余空间之前，项目占据的主轴空间)
                        //2. vue编译采用postcss，自动生成解决flex兼容性问题的代码
                        flex: 1; //等分
                        position: relative;
                        top: -6px; //为什么是-6？
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .text {
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .detail-info {
                    li {
                        width: 80%;
                        margin: 0 auto;
                        margin-bottom: 12px;
                        .icon {
                            display: inline-block;
                            background-repeat: no-repeat;
                            background-size: 16px 16px;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            vertical-align: middle;
                        }
                        .decrease {
                            @include bg-image("decrease_1");
                        }
                        .discount {
                            @include bg-image("discount_1");
                        }
                        .guarantee {
                            @include bg-image("guarantee_1");
                        }
                        .invoice {
                            @include bg-image("invoice_1");
                        }
                        .special {
                            @include bg-image("special_1");
                        }
                        .text{
                            font-size: 12px;
                            line-height: 12px;
                            font-weight: 200;
                        }
                    }
                }
            }
            .detail-text{
                width: 80%;
                margin: 24px auto 0 auto;
                .text{
                    font-size: 12px;
                    line-height: 24px;
                    padding: 0 12px;
                    font-weight: 200;
                }
            }
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
        }
    }
}
</style>
