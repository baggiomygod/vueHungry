<template>
    <div class="shopcar">
        <div class="content"  v-on:click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" v-bind:class="{'high-light':totalCount>0}"><i class="icon-shopping_cart" v-bind:class="{'high-light':totalCount>0}"></i></div>
                    <div class="total-count" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" v-bind:class="{'high-light':totalPrice>0}">{{totalPrice}}元</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <!-- v-on:click.stop.prevent：阻止冒泡，组织默认时间 -->
            <div class="content-right" v-on:click.stop.prevent="payForFoods" v-bind:class="[totalPrice>minPrice?'enough':'not-enough']">{{payDesc}}</div>
        </div>
        <div class="ball-container">
            <div class="ball" v-for="ball in balls" v-show="ball.show" transition="drop">
                <div class="inner inner-hook"></div>
            </div>
        </div>
        <div class="shopcar-list" v-show="listShow" transition="fold">
            <div class="list-header">
                <div class="title">购物车</div>
                <div class="empty clearfix" v-on:click="clearCar">清空</div>
            </div>
            <div class="list-content" v-el:list-content>
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">￥<span class="text">{{food.price*food.count}}</span>
                            <div class="control-wrapper">
                                <cartcontrol v-bind:food="food"></cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="list-mask" v-show="listShow" transition="fade" v-on:click="this.fold = !fold"></div>
</template>
<script type="text/javascript">
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
export default {
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectFoods: {
            type: Array,
            default () { // type为数组或对象，default为函数
                return [];
            }
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: [],
            fold: true
        };
    },
    // 计算属性
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                // console.log(food.count);
                total += food.price * food.count; // 累计单价
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });

            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold; // 折叠时 show=false,flod---折叠的意思
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$els.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        // 遍历小球，如果为隐藏，显示，并赋值给dropballs
        drop(el) {
            console.log(this.balls);
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        clearCar() {
            this.selectFoods.forEach((food) => {
                if (food.count > 0) {
                    food.count = 0;
                }
            });
        },
        payForFoods() {
            if (this.totalCount * this.totalPrice < this.minPrice) {
                return;
            }
            window.alert('支付：' + this.totalCount);
        }
    },
    transitions: {
        drop: {
            beforeEnter(el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect(); // 获取el的位置
                        let x = rect.left - 32; // 加号相对购物车logo的X轴偏移
                        let y = -(window.innerHeight - rect.top - 30); // 加号相对购物车logo的Y轴偏移
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`; // 外层元素做纵向动画
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight; // 重绘
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3D(0,0,0)'; // 外层元素做纵向动画
                    el.style.transform = 'translate3D(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3D(0,0,0)';
                    inner.style.transform = 'translate3D(0,0,0)';
                });
            },
            afterEnter(el) {
                let ball = this.dropBalls.shift(); // 把数组中第一个元素删除，并返回第一个元素的值
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            }
        }
    },
    components: {
        cartcontrol
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.shopcar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    // background-color: #000;
    .content {
        display: flex;
        background-color: #141d27;
        font-size: 0; // inline-block 会产生间隙。
        .content-left {
            flex: 1; // 自适应
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box; // content+padding+border
                vertical-align: top;
                border-radius: 50%;
                background-color: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.2);
                    text-align: center;
                    &.high-light {
                        background-color: rgb(0, 160, 220);
                    }
                    .icon-shopping_cart {
                        font-size: 24px;
                        color: rgba(255, 255, 255, 0.4);
                        line-height: 44px;
                        &.high-light {
                            color: #fff;
                        }
                    }
                }
                .total-count {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    padding: 0 6px;
                    background-color: rgb(240, 20, 20);
                    border-radius: 16px;
                    text-align: center;
                    line-height: 16px;
                    font-size: 9px;
                    color: #fff;
                    box-sizing: border-box;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price {
                display: inline-block;
                color: rgba(255, 255, 255, 0.4);
                font-size: 16px;
                line-height: 24px;
                margin: 12px 0px 12px 0px;
                font-weight: 700;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                padding-right: 12px;
                &.high-light {
                    color: #fff
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                font-size: 10px;
                font-weight: 200;
                color: rgba(255, 255, 255, 0.4);
                line-height: 24px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            text-align: center;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
            margin-left: 12px;
            padding-top: 12px;
            line-height: 24px;
            font-weight: 700;
            &.enough {
                background-color: #00b43c;
                color: #fff;
            }
            &.not-enough {
                background-color: #2b333b;
                color: rgba(255, 255, 255, 0.4);
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            &.drop-transition {
                transition: all .4s cubic-bezier(.47, -0.05, .84, .41);
            }
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: rgb(0, 160, 220);
                transition: all .4s linear;
            }
        }
    }
    .shopcar-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        background-color: #fff;
        &.fold-transition {
            transition: all .4s linear;
            transform: translate3d(0, -100%, 0);
        }
        &.fold-enter,
        &.fold-leave {
            transform: translate3d(0, 0, 0);
        }
        .list-header {
            height: 40px;
            background-color: #f3f5f7;
            padding: 0 18px;
            .title {
                display: inline-block;
                font-size: 14px;
                font-weight: 200;
                color: rgb(7, 17, 27);
                line-height: 40px;
            }
            .empty {
                display: inline-block;
                font-size: 14px;
                font-weight: 200;
                color: rgb(7, 17, 27);
                line-height: 40px;
                float: right;
            }
        }
        .list-content {
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background: #fff;
            .food {
                position: relative;
                height: 48px;
                font-size: 0px;
                box-sizing: border-box;
                .name {
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    line-height: 36px;
                }
                .price {
                    display: inline-block;
                    font-size: 10px;
                    color: rgb(240, 20, 20);
                    line-height: 36px;
                    margin-left: 16px;
                    float: right;
                    .text {
                        font-size: 14px;
                        line-height: 24px;
                        font-weight: 700;
                    }
                    .control-wrapper {
                        margin-left: 12px;
                        display: inline-block;
                        float: right;
                    }
                }
            }
        }
    }
}

.list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    &.fade-transition {
        opacity: 1;
        background-color: rgba(7, 17, 27, 0.6);
        transition: all .4s;
    }
    &.fade-enter,
    &.fade-leave {
        opacity: 0;
        background-color: rgba(7, 17, 27, 0);
    }
}
</style>
