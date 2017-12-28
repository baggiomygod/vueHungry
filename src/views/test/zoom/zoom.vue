<template>
      <div class="zoom-warp">
        <div class="zoom-box" v-drag="greet" v-zoom>
          <div class="zoom-ctrl"></div>
        </div>
      </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    greet(val) {
      // console.log('val', val);
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.zoom-warp{
    position: relative;
    .zoom-box{
        width: 50px;
        height: 50px;
        background-color: rgb(146, 102, 102);
        cursor: move;
        position: absolute;
        top: 30px;
        left: 80px;
        .zoom-ctrl{
          width: 10px;
          height: 10px;
          background-color: #e0cdcdd8;
          cursor: se-resize;
          position: absolute;
          right: 0;
          bottom: 0;
        }
    }
}

</style>


