<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="seller-brief">
                <h1 class="title">{{seller.name}}</h1>
                <div class="star-sell-count">
                    <div class="star-wrapper">
                        <star :size="36" :score="seller.score"></star>
                    </div>
                    <div class="count count1">({{seller.sellCount}})</div>
                    <div class="count">月售{{seller.sellCount}}单</div>
                </div>
                <div class="price-time">
                    <div class="price min-price">
                        <div class="top-text">满</div>
                        <div class="bottom-text">
                            {{seller.freePostage}}
                            <span class="min-text">包邮</span>
                        </div>
                    </div>
                    <div class="price delivery-price">
                        <div class="top-text">送</div>
                        <div class="bottom-text">
                            {{seller.telephoneCharge}}
                            <span class="min-text">话费</span>
                        </div>
                    </div>
                    <div class="price delivery-time">
                        <div class="top-text">送达</div>
                        <div class="bottom-text">
                            {{seller.deliveryTime}}
                            <span class="min-text">小时</span>
                        </div>
                    </div>
                </div>
                <div @click="toggleFavorite($event)" class="collect">
                    <i class="icon icon-favorite" :class="{'active':favorite}"></i>
                    <div class="text">{{toFavorite}}</div>
                </div>
            </div>
            <split></split>
            <div class="bulletin-supports">
                <div class="bulletion">
                    <h1 class="title">公告与活动</h1>
                    <p class="text">{{seller.bulletin}}</p>
                </div>
                <div class="supports">
                    <ul class="supports-list">
                        <li v-for="support in seller.supports" :key="support.type" class="suppout-item">
                            <span class="icon" :class="classMap[support.type]"></span>
                            <span class="text">{{support.description}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="seller-pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,$index) in seller.pics" :key="$index" track-by="$index">
                            <img width="120" height="90" :src="pic">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="seller-info">
                <h1 class="title">商家信息</h1>
                <ul class="infos">
                    <li class="info-item" v-for="info in seller.infos" :key="info">
                        {{info}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import star from 'components/star/star.vue';
import split from 'components/splits/split';
import BScroll from 'better-scroll';

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            favorite: false,
            toFavorite: '收藏'
        };
    },
    components: {
        star,
        split
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
        'seller'() {
            this._initScroll();
            this._initPics();
        }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
        toggleFavorite(e) {
            if (!e._constructed) {
                return;
            }
            this.favorite = !this.favorite;
            if (this.favorite === false) {
                this.toFavorite = '收藏';
            } else {
                this.toFavorite = '已收藏';
            }
        },
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        _initPics() {
            if (this.seller.pics) {
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$refs.picList.style.width = width + 'px';
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.picScroll.refresh;
                    }
                });
            }
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../common/style/mixin";
.seller {
    position: absolute;
    width: 100%;
    top: 180px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
    }
    .seller-brief {
        position: relative;
        padding: 18px;
        .star-sell-count {
            margin: 8px 0 18px 0;
            .star-wrapper {
                display: inline-block;
                font-size: 0;
                margin-right: 8px;
            }
            .count {
                display: inline-block;
                font-size: 10px;
                color: rgb(7, 17, 27);
                line-height: 18px;
                &.count1 {
                    margin-right: 12px;
                }
            }
        }
        .price-time {
            display: flex;
            padding-top: 18px;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            .price {
                flex: 1;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                &:last-child {
                    border: 0;
                }
                .top-text {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    line-height: 10px;
                }
                .bottom-text {
                    font-size: 24px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    line-height: 24px;
                    margin-top: 4px;
                    .min-text {
                        font-size: 10px;
                    }
                }
            }
        }
        .collect {
            position: absolute;
            right: 18px;
            top: 18px;
            text-align: center;
            width: 50px;
            .icon {
                font-size: 24px;
                color: #d4d6d9;
                line-height: 24px;
                margin-bottom: 4px;
                &.active {
                    color: rgb(240, 20, 20);
                }
            }
            .text {
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
    }
    .bulletin-supports {
        padding: 18px 18px 0 18px;
        .bulletion {
            padding-bottom: 16px;
            .text {
                padding: 8px 6px 16px 6px;
                font-size: 12px;
                color: rgb(240, 20, 20);
                line-height: 24px;
                font-weight: 200;
            }
        }
        .supports {
            .suppout-item {
                padding: 16px 0;
                border-top: 1px solid rgba(7, 17, 27, 0.1);
                .icon {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    margin-left: 6px;
                    background-repeat: no-repeat;
                    background-size: 16px 16px;
                    vertical-align: middle;
                    &.decrease {
                        @include bg-image("decrease_4");
                    }
                    &.discount {
                        @include bg-image("discount_4");
                    }
                    &.guarantee {
                        @include bg-image("guarantee_4");
                    }
                    &.invoice {
                        @include bg-image("invoice_4");
                    }
                    &.special {
                        @include bg-image("special_4");
                    }
                }
                .text {
                    font-size: 12px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    line-height: 32px;
                }
            }
        }
    }
    .seller-pics {
        padding: 18px;
        height: 152px;
        box-sizing: border-box;
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap; // 不换行
            .pic-list {
                font-size: 0;
                .pic-item {
                    display: inline-block;
                    float: left;
                    margin: 12px 6px 0 0;
                    height: 90px;
                    width: 120px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .seller-info {
        padding: 18px;
        .infos {
            margin-top: 12px;
            .info-item {
                font-size: 12px;
                font-weight: 200;
                color: rgb(7, 17, 27);
                line-height: 16px;
                padding: 16px 12px;
                border-top: 1px solid rgba(7, 17, 27, 0.1);
            }
        }
    }
}
</style>
