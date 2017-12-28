<template>
    <div class="ratings view-page" ref="ratings">
        <div class="ratings-view-wrapper">
            <div class="rating-view">
                <div class="mark-wrapper">
                    <div class="mark">{{seller.score}}</div>
                    <h1 class="title">综合评分</h1>
                    <div class="other-mark">高于同行{{seller.rankRate}}%</div>
                </div>
                <div class="stars">
                    <div class="stars-item">
                        <span class="star-title">服务态度</span>
                        <div class="star-wrapper">
                            <star v-bind:size="36" v-bind:score="seller.serviceScore"></star>
                        </div>
                        <span class="mark-star">{{seller.serviceScore}}</span>
                    </div>
                    <div class="stars-item">
                        <span class="star-title">商品评分</span>
                        <div class="star-wrapper">
                            <star v-bind:size="36" v-bind:score="seller.foodScore"></star>
                        </div>
                        <span class="mark-star">{{seller.foodScore}}</span>
                    </div>
                    <div class="stars-item">
                        <span class="star-title">送达时间</span>
                        <span class="arrive-time">24小时</span>
                    </div>
                </div>
            </div>
            <split></split>
            <rating-select :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @toggle="showOnlyContent" @select="showRatingList"></rating-select>
            <div class="rating-content">
                    <ul v-show="ratings && ratings.length" class="rating-list">
                        <li v-for="rating in ratings" :key="rating.username" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
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
<script>
import star from 'views/components/star/star';
import split from 'views/components/splits/split';
import ratingSelect from './ratingSelect/ratingSelect';
import BScroll from 'better-scroll';
import {
    formatDate
} from 'common/js/date';
const ALL = 2;
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    created() {
        this.$http.get('/api/ratings').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.ratings = response.data;
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    });
                });
            }
        });
    },
    components: {
        star,
        split,
        ratingSelect
    },
    methods: {
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        showRatingList(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh;
            });
        },
        showOnlyContent(onlyContent) {
            this.onlyContent = onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh;
            });
        }
    },
    filters: {
        formatDate(dateStr) {
            let date = new Date(dateStr);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.ratings {
    position: absolute;
    // top: 174px;
    top: 146px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .ratings-view-wrapper {
        .rating-view {
            display: flex;
            flex-flow: row nowrap;
            padding: 18px 0;
            .mark-wrapper {
                display: inline-block;
                font-size: 0;
                width: 120px;
                text-align: center;
                box-sizing: border-box;
                vertical-align: top;
                .mark {
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                    line-height: 28px;
                    margin-bottom: 6px;
                }
                .title {
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    line-height: 12px;
                    margin-bottom: 8px;
                }
                .other-mark {
                    font-size: 10px;
                    color: rgba(7, 17, 27, 0.4);
                    line-height: 10px;
                    margin-bottom: 6px;
                }
            }
            .stars {
                display: inline-block;
                width: 237px;
                padding: 0 24px 0 23px;
                font-size: 0;
                box-sizing: border-box;
                border-left: 1px solid rgba(7, 17, 27, 0.1);
                .stars-item {
                    margin-bottom: 8px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .star-title {
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        line-height: 12px;
                        vertical-align: top;
                    }
                    .star-wrapper {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .mark-star {
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(255, 153, 0);
                    }
                    .arrive-time {
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                        line-height: 12px;
                        margin-left: 12px;
                        vertical-align: top;
                    }
                }
            }
        }
        .rating-content {
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            padding: 0 18px;
            .rating-list {
                .rating-item {
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    padding: 16px;
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
