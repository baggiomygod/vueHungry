<template>
    <div class="food" v-show="showFlag" transition="flayfromright" v-el:food>
        <div class="food-content">
            <div class="img-header">
                <img v-bind:src="food.image">
                <div class="back">
                    <i class="icon-close" v-on:click="close"></i>
                </div>
            </div>
            <div class="brief-content">
                <h1 class="title">{{food.name}}</h1>
                <div class="brief-info">
                    <span class="sell-count">月销{{food.sellCount}}件</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥<span class="now-price">{{food.price}}</span></span>
                    <span class="old">￥<span class="old-price">{{food.oldPrice}}</span></span>
                </div>
                <div class="add-cart" v-show="!food.count" v-on:click="addCount($event)" transition="fade">
                    加入购物车
                </div>
                <div v-show="food.count>0" class="add">
                    <cartcontrol v-bind:food="food"></cartcontrol>
                </div>
            </div>
            <split></split>
            <div class="food-brief">
                <h1 class="title">商品简介</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <rating-select :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></rating-select>
            <div class="rating-content">
                <ul v-show="food.ratings && food.ratings.length" class="rating-list">
                    <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)" transition="fade">
                        <div class="user">
                            <span class="text time">{{rating.rateTime | formatDate}}</span>
                            <span class="text user-account">{{rating.username}}
                            <img class="user-avatar" width="12" height="12" :src="rating.avatar" />
                            </span>
                        </div>
                        <div class="rating-text">
                            <i class="icon" :class="[rating.rateType===0?'icon-thumb_up blue':'icon-thumb_down green']"></i>
                            <span v-if="rating.text" class="text">{{rating.text}}</span>
                            <span v-else class="text">暂无评价</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import {
    formatDate
} from 'common/js/date';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/splits/split';
import ratingSelect from 'components/ratingSelect/ratingSelect';
import Vue from 'vue';
const ALL = 2;
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    methods: {
        show() {
            this.showFlag = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$els.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        close() {
            this.showFlag = false;
        },
        addCount(e) {
            if (!e._constructed) {
                return;
            }
            this.$dispatch('cart.add', e.target);
            Vue.set(this.food, 'count', 1);
        },
        needShow(type, text) {
            // 如果选择现实有内容 text为空的隐藏
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        }
    },
    components: {
        cartcontrol,
        split,
        ratingSelect
    },
    events: {
        // 接收来自子组件的事件和数据，改变数据的值。并及时更新DOM
        'ratingType.select' (type) {
            console.log('ratingtype:' + type);
            this.selectType = type;
            // 在修改数据之后立即使用这个方法，获取更新后的 DOM。
            this.$nextTick(() => {
                this.scroll.refresh;
            });
        },
        'content.toggle' (onlyContent) {
            this.onlyContent = onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh;
            });
        }
    },
    filters: {
        formatDate(timeStr) {
            let date = new Date(timeStr);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../common/style/mixin";
.food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    &.flayfromright-transition {
        transition: all .3s linear;
        transform: translate3d(0, 0, 0);
    }
    &.flayfromright-enter,
    &.flayfromright-leave {
        transform: translate3d(100%, 0, 0)
    }
    .food-content {
        .img-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%; // padding-top为100%时，计算的高度和宽度一样
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 0;
                left: 0;
                .icon-close {
                    display: block;
                    height: 20px;
                    width: 20px;
                    padding: 10px;
                    color: #fff;
                    font-size: 20px;
                }
            }
        }
        .brief-content {
            position: relative;
            height: 110px;
            padding: 18px;
            box-sizing: border-box;
            .title {
                font-size: 14px;
                font-weight: 700;
                color: rgb(7, 17, 27);
                line-height: 14px;
                margin-bottom: 8px;
            }
            .brief-info {
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 10px;
                margin-bottom: 18px;
                .sell-count {
                    margin-right: 12px;
                }
                .rating {}
            }
            .price {
                display: inline-block;
                font-size: 0;
                .now {
                    font-size: 10px;
                    line-height: 24px;
                    color: rgb(240, 20, 20);
                    margin-right: 8px;
                    .now-price {
                        font-weight: 700;
                        font-size: 14px;
                    }
                }
                .old {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    line-height: 24px;
                    text-decoration: line-through;
                    .old-price {
                        font-weight: 700;
                    }
                }
            }
            .add-cart {
                display: inline-block;
                position: absolute;
                right: 18px;
                bottom: 18px;
                width: 74px;
                height: 24px;
                border-radius: 12px;
                background-color: rgb(0, 160, 220);
                font-size: 10px;
                color: #fff;
                text-align: center;
                line-height: 24px;
                &.fade-transition {
                    opacity: 1;
                    transition: all .2s;
                }
                &.fade-enter,
                &.fade-leave {
                    opacity: 0;
                }
            }
            .add {
                display: inline-block;
                position: absolute;
                right: 18px;
                bottom: 18px;
            }
        }
        .food-brief {
            width: 100%;
            padding: 18px 18px 0 18px;
            box-sizing: border-box;
            .title {
                font-size: 14px;
                color: rgb(7, 17, 27);
                line-height: 14px;
                margin-bottom: 8px;
            }
            .text {
                font-size: 12px;
                font-weight: 200px;
                color: rgb(77, 85, 93);
                line-height: 24px;
            }
        }
        .rating-select-wrapper {}
        .rating-content {
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            padding: 0 18px;
            .rating-list {
                .rating-item {
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    padding: 16px;
                    &.fade-transition {
                        opacity: 1;
                        transition: all .2s;
                    }
                    &.fade-enter,
                    &.fade-leave {
                        opacity: 0;
                    }
                    .user {
                        .text {
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                            line-height: 12px;
                        }
                        .time {}
                        .user-account {
                            float: right;
                            .user-avatar {
                                margin-left: 6px;
                                border-radius: 50%;
                            }
                        }
                    }
                    .rating-text {
                        margin-top: 6px;
                        .icon {
                            font-size: 12px;
                            line-height: 24px;
                            &.green {
                                color: rgb(147, 153, 159);
                            }
                            &.blue {
                                color: rgb(0, 160, 220);
                            }
                        }
                        .text {
                            margin-left: 4px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                            line-height: 16px;
                        }
                    }
                }
            }
        }
    }
}
</style>
