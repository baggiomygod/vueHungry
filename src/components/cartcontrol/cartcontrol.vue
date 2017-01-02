。<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0" v-on:click="decreaseCart($event)" transition="move">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" v-on:click.stop.prevent="addCart($event)"></div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(e) {
            // 如果是浏览器点击事件，没有_constructed属性，return
            if (!e._constructed) {
                return;
            }
            // betterScroll派生的点击事件
            if (!this.food.count) { // 如果没有count,即还没有选过菜单，为其添加count属性
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
            // 向父层组件传递事件'cart.add',事件的元素，e.target
            this.$dispatch('cart.add', e.target); // (组件间传递事件，dispatch向上冒泡)派发事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止，除非它返回 true。
        },
        decreaseCart(e) {
            if (!e._constructed) {
                return;
            }
            this.food.count--;
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.cartcontrol {
    font-size: 0;
    height: 36px;
    .cart-decrease {
        display: inline-block;
        padding: 6px;
        transition: all 0.4s linear;
        &.move-transition {
            opacity: 1;
            transform: translate3D(0, 0, 0);
            .inner {
                display: inline-block;
                font-size: 24px;
                color: rgb(0, 160, 220);
                line-height: 24px;
                transition: all 0.4s linear;
                transform: rotate(0);
            }
        }
        &.move-enter,
        &.move-leave {
            opacity: 0;
            transform: translate3D(24px, 0, 0);
            .inner {
                transform: rotate(180deg);
            }
        }
    }
    .count {
        display: inline-block;
        font-size: 10px;
        color: rgb(147, 153, 159);
        height: 24px;
        width: 12px;
        padding: 6px 0 0 0;
        text-align: center;
        vertical-align: top; // 为什么是top
        line-height: 24px;
        // margin: 6px 0;
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        line-height: 24px;
    }
}
</style>
