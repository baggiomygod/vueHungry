<template>
      <div class="tip-warp">
        <p class="tip">tooltips</p>
        <i class="icon iconfont icon-biaoxing tip"></i>
        <i class="icon iconfont icon-chexiao tip"></i>
        <i class="icon iconfont tip">&#xe772;</i>
      </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" rel="stylesheet/scss">
.tip-warp{
    // position: relative;
    display: flex;
    flex-flow: row wrap;
    .tip{
      margin: 15px;
      font-size: 24px;
      color: #333;
    }
}

</style>


