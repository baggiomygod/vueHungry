<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
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
            this.$emit('add', e.target);
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
    height: 36px; // 减图标滚动出现和隐藏---
    .cart-decrease {
        display: inline-block;
        padding: 6px;
        opacity: 1;
        transform: translate3d(0, 0, 0);
        .inner {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
            transition: all .4s linear;
            transform: rotate(0);
        }
        &.move-enter-active, // 进入过渡 时间和曲线
        &.move-leave-active {
            // 离开过渡 时间和曲线
            transition: all .4s linear;
        }
        &.move-enter, // （进入时：opacity,位置在加号那 一瞬间）
        &.move-leave-active {
            // （离开时：有1变为0，向右偏移24）
            opacity: 0;
            transform: translate3d(24px, 0, 0);
            .inner {
                // 减号旋转180度
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
        line-height: 24px; // margin: 6px 0;
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
