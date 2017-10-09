<template>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/test">test</router-link>
        </div>

    </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../common/style/mixin";
.tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
        flex: 1;
        text-align: center;
        a {
            display: block;
            font-size: 14px;
            color: rgb(77, 85, 93);
        }
        a.active {
            color: rgb(240, 20, 20);
        }
    }
}
</style>


