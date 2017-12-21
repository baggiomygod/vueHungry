<template>
    <div class="tab border-1px">
        <div class="tab-item" v-for="item in menusConfig" :key="item.path">
            <router-link :to="item.path">{{item.name}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menusConfig: [
                {
                    path: '/goods',
                    name: '商品'
                },
                {
                    path: '/ratings',
                    name: '评论'
                },
                {
                    path: '/seller',
                    name: '商家'
                },
                {
                    path: '/icon',
                    name: '图标'
                },
                {
                    path: '/test',
                    name: 'test'
                }
            ]
        };
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../common/style/mixin";
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
            color: rgb(37, 40, 43);
        }
        a.router-link-active {
            color: #999;
        }
    }
}
</style>


