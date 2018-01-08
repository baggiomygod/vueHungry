import tpl from './main.html';
import './main.scss';
import {
  getContainer
} from '../util';
export default {
  template: tpl,
  props: {
    // tip的容器 默认插入body中
    container: null,
    // tip绑定的目标元素
    target: null,
    // tip显示的内容
    content: {
      type: String,
      default: ''
    },
    // tip位置
    placements: {
      type: Array,
      default() {
        return ['top', 'right', 'bottom', 'left'];
      }
    },
    // 主题
    theme: {
      type: String,
      default: 'light'
    },
    // 是否有过渡效果
    transition: Boolean
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    // 箭头位置  根据指令中的参数v-simple-tip.top
    arrowClass() {
      const { placements, theme } = this;
      let direction = placements[0]; // 方向暂取第一个
      return [`${direction}-arrow`, theme];
    },
    tipClass() {
      const { theme, placements } = this;
      let direction = placements[0]; // 方向暂取第一个
      return [theme, `${direction}-tip`];
    },
    tipStyle() {}
  },
  methods: {
    showTip() {
      // debugger;
      this.visible = true;
    },
    hiddenTip() {
      this.visible = false;
    },
    // 更新tip
    updateTip() {
      this.setContainerNode();
      this.showTip();
      this.computedPosition();
    },
    // 设置tip容器
    setContainerNode() {
      const {
        $el,
        target, // bind中设置tipOptions时加入
        container,
        targetParentNode
        // containerNode: oldNode
      } = this;
      if (!target || target.parentNode === targetParentNode) return;

      this.targetParentNode = target.parentNode;

      const bodyNode = container || getContainer(target);
      if (bodyNode === $el.parentNode) return;
      if ($el.parentNode !== bodyNode) { // $el是tooltip元素
        bodyNode.appendChild($el);
      }
      this.containerNode = bodyNode;
    },
    // 计算tip展示位置
    computedPosition() {
      const {
        $el,
        target // bind中设置tipOptions时加入
      } = this;
      console.log('$el:', $el);
      let { left, top, width, height } = target.getBoundingClientRect();
      console.log(`left:${left}, top:${top}, width:${width}, height:${height}`);
      this.$el.style.transform = `translate3d(${left}px, ${top + height}px, 0)`;
    }
  }
};
