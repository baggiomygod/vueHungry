<template>
    <div class="icon-font-warp">
      <div v-for="item in classMap" :key="item.icon" v-drag="greet"  :class="{'can-drag':item.draggable}">
        <i class="icon" :class="item.icon"></i>
        <span class="icon-tip" v-if="item.draggable">可拖拽 x:{{dragVal.x}},y:{{dragVal.y}}</span>
      </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      isDraggable: true,
      dragVal: {x: 0, y: 0}
    };
  },
  created() {
    this.classMap = [
      { icon: 'icon-favorite', draggable: true },
      { icon: 'icon-add_circle', draggable: false },
      { icon: 'icon-arrow_lift', draggable: false },
      { icon: 'icon-check_circle', draggable: false },
      { icon: 'icon-close', draggable: false },
      { icon: 'icon-keyboard_arrow_right', draggable: false },
      { icon: 'icon-remove_circle_outline', draggable: false },
      { icon: 'icon-shopping_cart', draggable: false },
      { icon: 'icon-thumb_down', draggable: false },
      { icon: 'icon-thumb_up', draggable: false }
    ];
  },
  methods: {
    greet(val) { // val是通过指令注册时，binding.value({...}) 传出的值
      this.dragVal = val;
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.icon-font-warp {
  display: flex;
  .icon {
    font-size: 3rem;
  }
  .can-drag {
    // float: left;
    display: flex;
    flex-direction: column;
    text-align: center;
    position: absolute;
    color: #c39797;
    .icon-tip{
      font-size: .5rem;
    }
  }

}
</style>


