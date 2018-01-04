<template>
      <div class="tip-warp">
        <p class="tip" v-tip.dark="tempTip">tooltips</p>
        <p class="tip" v-simple-tip="contentTest">simple tips</p>
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


