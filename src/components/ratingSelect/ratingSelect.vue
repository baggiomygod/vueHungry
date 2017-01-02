<template>
    <div class="rating-select">
        <h1 class="title">商品评价</h1>
        <div class="checkbox">
            <div @click="select(2,$event)" class="tip all" :class="{'active':selectType===2}">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </div>
            <div @click="select(0,$event)" class="tip positive" :class="{'active':selectType===0}">
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </div>
            <div @click="select(1,$event)" class="tip negative" :class="{'active':selectType===1}">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </div>
        </div>
        <div @click="toggleContent" class="see-rating">
            <i :class="{'on':onlyContent}" class="icon icon-check_circle"></i><span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/javascript">
const POSITIVE = 0; //  推荐
const NEGATIVE = 1; // 吐槽
const ALL = 2; // 全部
export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                };
            }
        }
    },
    computed: {
        positives() { // filter--->Array数组的方法，创建一个匹配条件的数组
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
        }
    },
    methods: {
        select(type, e) {
            if (!e._constructed) {
                return;
            }
            this.selectType = type;
            this.$dispatch('ratingType.select', this.selectType); // 向父级传递事件
        },
        toggleContent(e) {
            if (!e._constructed) {
                return;
            }
            this.onlyContent = !this.onlyContent;
            this.$dispatch('content.toggle', this.onlyContent);
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.rating-select {
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
    .checkbox {
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding-bottom: 18px;
        .tip {
            display: inline-block;
            // width: 70px;
            height: 28px;
            font-size: 12px;
            line-height: 16px;
            color: rgb(77, 85, 93);
            background-color: rgba(77, 85, 93, 0.2);
            text-align: center;
            padding: 8px 12px;
            box-sizing: border-box;
            margin-right: 8px;
            border-radius: 1px;
            .count {
                font-size: 8px;
            }
            &.active {
                color: #fff;
                background-color: rgb(0, 160, 220);
            }
            &.positive {}
            &.negative {}
        }
    }
    .see-rating {
        margin: 12px 4px 12px 0;
        .icon,
        .text {
            font-size: 24px;
            color: rgb(147, 153, 159);
            line-height: 24px;
            vertical-align: top;
            &.on {
                color: #00c850
            }
        }
        .text {
            font-size: 12px;
        }
    }
}
</style>
