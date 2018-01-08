<template>
      <div class="zoom-warp">
        <div class="icon-tip">
            <span>终端:{{dragVal.type}}</span>
            <span>x:{{dragVal.x}},y:{{dragVal.y}}</span>
        </div>
        <div class="zoom-box" v-drag="greet" v-zoom>
          <div class="zoom-ctrl"></div>
        </div>
        <div v-for="item in classMap" :key="item.icon" v-drag="greet"  :class="{'can-drag':item.draggable}">
          <i class="icon" :class="item.icon"></i>
        </div>
      </div>
</template>
<script>
export default {
  data() {
    return {
      isDraggable: true,
      dragVal: { x: 0, y: 0, type: '' }
    };
  },
  created() {
    this.classMap = [
      // { icon: 'icon-thumb_up', draggable: false },
      { icon: 'icon-check_circle', draggable: true }
    ];
  },
  methods: {
    greet(val) {
      // val是通过指令注册时，binding.value({...}) 传出的值
      this.dragVal = val;
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
    .icon {
      font-size: 36px;
      color: #c39797;
    }
    .can-drag {
    // float: left;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    top: 260px;
    left: 60px;
    font-size: 16px;
    text-align: center;
    position: absolute;
    // .icon {
    //   font-size: 36px;
    //   color: #c39797;
    // }
    .icon-tip {
      display: flex;
      flex-direction: column;
      color: #c39797;
    }
  }
}

</style>


