<template>
  <div class="img-wrap">
    <div class="img-view">
      <img class="img-item" :src="srcData" ref="itemImg" @click.stop="initViewImg">
    </div>
    <div class="img-window" :class="{'window-show':isView}">
      <div class="close-tag" @click.stop="resetVireImg"></div>
      <img class="img-show" :src="viewSrc">
    </div>
  </div>
</template>
<script>
export default {
    props: {
        srcData: {
            type: String,
            default : ''
        }
    },
    data() {
        return {
            viewSrc: '',
            isView: false
        };
    },
    methods: {
        initViewImg() {
            this.isView = true;
            this.viewSrc = this.srcData;
        },
        resetVireImg() {
            this.isView = false;
            this.viewSrc = '';
        }
    }
};
</script>
<style lang="scss" type="stylesheet/scss">
.img-wrap {
  .img-view {
    .img-item {
      width: 60%; // 修改 由外部定义尺寸
      height: auto;
      cursor: pointer;
    }
  }
  .img-window {
    position: fixed;
    z-index:1000;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    visibility: hidden;
    opacity: 0;
    background-color: rgba(51, 51, 51, 0.8);
    -webkit-transition: all .6s;
    -moz-transition: all .6s;
    -webkit-transform: translateX(-50%) translateY(-50%) scale(0.6);
    -moz-transform: translateX(-50%) translateY(-50%) scale(0.6);
    .close-tag {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 20px;
      height: 20px;
      border: none;
      cursor: pointer;
      -webkit-transition: all 1s;
      -moz-transition: all 1s;
      &:before,
      &:after {
        content: '';
        position: absolute;
        background-color: #e2e2e2;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
      }
      &:before {
        left: 45%;
        top: -10%;
        width: 10%;
        height: 120%;
      }
      &:after {
        top: 45%;
        left: -10%;
        width: 120%;
        height: 10%;
      }
    }
    .img-show {
      display: block;
      margin: 0 auto;
      position: relative;
      /*相对于屏幕上下居中*/
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      transform: translateY(-50%);
      max-width: 100%;
    }
  }
  .window-show {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(1);
    -webkit-transform: translateX(-50%) translateY(-50%) scale(1);
    -moz-transform: translateX(-50%) translateY(-50%) scale(1);
  }
}
</style>
