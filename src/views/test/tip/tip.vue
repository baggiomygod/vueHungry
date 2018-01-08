<template>
      <div class="tip-warp">
        <p class="tip" v-tip.dark="tempTip">参考 tips</p>
        <div v-drag v-simple-tip.dark.bottom="contentTest">
          <i class="tip icon iconfont icon-xiangxia2"></i>
        </div>
        <div v-drag v-simple-tip.light.right="contentTest">
          <i class="tip icon iconfont icon-xiangyou1"></i>
        </div>
        <div v-drag v-simple-tip.light.left="contentTest">
          <i class="tip icon iconfont icon-xiangzuo1"></i>
        </div>
        <div v-drag v-simple-tip.light.top="contentTest">
          <i class="tip icon iconfont icon-xiangshang2"></i>
        </div>
      </div>
</template>
<script>
export default {
  data() {
    return {
      tempTip: {
        title: '标题',
        width: '200px',
        content: `
      platform_dw.platform_dw_shop_embedding_base_food
    `,
        theme: 'dark'
      },
      contentTest: {content: 'test'}
    };
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


