<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,$index) in itemClasses" :key="$index" :class="itemClass" class="star-item" track-by="$index"></span>
    </div>
</template>
<script type="text/javascript">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
// export default 默认导出的意思
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    // 计算属性
    computed: {
        // 返回图片大小类型的字符串，作为class改变样式
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            let resoult = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0; // true:有小数； false：没小数
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
                resoult.push(CLS_ON);
            }
            // 小数部分不为0时
            if (hasDecimal) {
                resoult.push(CLS_HALF);
            }
            while (resoult.length < LENGTH) {
                resoult.push(CLS_OFF);
            }
            return resoult;
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../../common/style/mixin";
.star {
    font-size: 0;
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
    &.star-48 {
        .star-item {
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
            &:last-child {
                margin-right: 0; // 这个什么作用
            }
            &.on {
                @include bg-image("star48_on");
            }
            &.half {
                @include bg-image("star48_half");
            }
            &.off {
                @include bg_image("star48_off");
            }
        }
    }
    &.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background-size: 15px 15px;
            &:last-child {
                margin-right: 0; // 这个什么作用
            }
            &.on {
                @include bg-image("star36_on");
            }
            &.half {
                @include bg-image("star36_half");
            }
            &.off {
                @include bg_image("star36_off");
            }
        }
    }
    &.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
            &:last-child {
                margin-right: 0; // 这个什么作用
            }
            &.on {
                @include bg-image("star24_on");
            }
            &.half {
                @include bg-image("star24_half");
            }
            &.off {
                @include bg_image("star24_off");
            }
        }
    }
}
</style>
