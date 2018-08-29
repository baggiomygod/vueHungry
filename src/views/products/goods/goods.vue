<template>
    <div class="goods-wrap">
        <div class="goods view-page">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul class="menu-ul">
                    <li v-for="(item,$index) in goods" :key="item.type" v-on:click="selectMenu($index,$event)" class="menu-item" :class="{'current':currentLeftIndex===$index}">
                        <span class="text border-1px">
                            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item in goods" class="food-list food-list-hook" :key="item.name">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li v-for="food in item.foods" :key="food.name" v-on:click="openFoodPage(food,$event)" class="food-item border-1px">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span>月售{{food.sellCount}}件</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥
                                            <span class="now-price">{{food.price}}</span>
                                        </span>
                                        <span class="old" v-show="food.oldPrice">￥
                                            <span class="old-price">{{food.oldPrice}}</span>
                                        </span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol @add="addFood" :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcar ref="shopcart"
                    :delivery-price="seller.deliveryPrice"
                    :min-price="seller.minPrice"
                    :select-foods="selectFoods"></shopcar>
        </div>
        <food :food="selectFood" @add="addFood" ref="food"></food>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcar from 'views/components/shopcar/shopcar'; // 引入组件
import cartcontrol from 'views/components/cartcontrol/cartcontrol';
import food from 'views/products/food/food';
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectFood: {}
        };
    },
    computed: {
        currentLeftIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0; // 如果this.listHeight.length 没有 返回0
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get('/api/goods').then((response) => {
            response = response.body; // 这里response为什么不声明？
            if (response.errno === ERR_OK) {
                this.goods = response.data;
                // 当要操作DOM或计算和DOM 相关的东西时时，要保证DOM已经渲染
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            }
        });
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true // betterScroll默认阻止了more时间，需要设置打开
            }); // 获取到$refs DOM
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            // 监听scroll事件,滚动时，实时拿到scrollY
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodsList.length; i++) {
                let item = foodsList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu(index, e) {
            // betterScroll派生的点击时间有_constructed属性（浏览器默认没有该时间，用于区分手机端和PC浏览器点击事件）
            // true为手机端，再PC端没有这个属性：!e._constructed !flase=true   return
            if (!e._constructed) {
                return;
            }
            let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); // 拿到列表数组 List
            let targetList = foodsList[index]; // 要滚动到的哪个元素
            this.foodsScroll.scrollToElement(targetList, 300); // 调用betterScroll的接口scrollToElement（目标元素，动画时间）
        },
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 优化体验，异步执行动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target); // 调用子组件drop方法，子组件标签上ref="shopcart"
            });
        },
        openFoodPage(food, e) {
            if (!e._constructed) {
                return;
            }
            this.selectFood = food;
            this.$refs.food.show(); // 调用子组件方法，<child ref="childname" ></child>
        }
    },
    // 注册组件w
    components: {
        shopcar,
        cartcontrol,
        food
    },
    events: { // 接收到子组件传递过来的cart.add事件，调用_drop函数--->_drop调用shopcar子组件的drop函数
        'cart.add'(target) {
            this._drop(target);
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../common/style/mixin";
.goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 180px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
        .menu-ul {
            .menu-item {
                box-sizing: border-box;
                display: table;
                height: 54px;
                width: 56px;
                line-height: 14px;
                padding: 0 12px;
                width: 100%;
                &.current {
                    position: relative;
                    z-index: 10;
                    margin: -1px;
                    background-color: #fff;
                    font-weight: 700;
                    .text {
                        border: none;
                    }
                }
                .text {
                    font-size: 12px;
                    display: table-cell;
                    vertical-align: middle;
                    width: 56px;
                    text-align: center;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    .icon {
                        display: inline-block;
                        height: 12px;
                        width: 12px;
                        margin-right: 2px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                    }
                    .decrease {
                        @include bg-image("decrease_3");
                    }
                    .discount {
                        @include bg-image("discount_3");
                    }
                    .guarantee {
                        @include bg-image("guarantee_3");
                    }
                    .invoice {
                        @include bg-image("invoice_3");
                    }
                    .special {
                        @include bg-image("special_3");
                    }
                }
            }
        }
    }
    .foods-wrapper {
        flex: 1; // flex-grow:1 填充剩余空间
        .food-list {
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                background-color: #f3f5f7;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
            .food-item {
                display: flex;
                margin: 16px;
                padding-bottom: 16px;
                @include border-1px(rgba(7, 17, 27, 0.1));
                 :last-child {
                    @include border-none();
                    margin-bottom: 0;
                }
                .icon {
                    flex: 0 0 57px; //flex-grow放大比例，flex-shrink缩小比例 默认宽度（flex-base分配多余空间之前，项目占据的主轴空间）
                    margin-right: 10px;
                }
                .content {
                    flex: 1; //前者flex-grow:0 这里1，占用剩余空间
                    .name {
                        margin-top: 2px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                        line-height: 14px;
                    }
                    .desc {
                        margin-top: 8px;
                        color: rgb(147, 153, 159);
                        font-size: 10px;
                        line-height: 10px;
                    }
                    .extra {
                        color: rgb(147, 153, 159);
                        font-size: 10px;
                        line-height: 10px;
                        margin-top: 8px;
                         :first-child {
                            margin-right: 12px;
                        }
                    }
                    .price {
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
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
        }
    }
}
</style>
