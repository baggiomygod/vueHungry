import tpl from './main.html';
import './main.scss';
import {
  debounce,
  checkScrollable,
  getScrollContainer,
  computeArrowPos,
  computePlacementInfo,
  computeCoordinateBaseMid,
  computeCoordinateBaseEdge
} from '../util';
let supportsPassive = false;

export default {
  name: 'Vtip',
  template: tpl,
  props: {
    // 组件的宽度
    width: {
      type: [String, Number],
      default: 'auto'
    },
    zIndex: {
      type: Number,
      default: 999
    },
    // 自定义 class 类名
    customClass: {
      type: String,
      default: ''
    },
    // 主体 light dark 默认 light
    theme: {
      type: String,
      default: 'light'
    },
    // 是否为 tip 添加 transfrom 过渡
    transition: Boolean,
    // 提示用的小箭头代销
    arrowsSize: {
      type: Number,
      default: 8
    },
    // tip 窗口多久后自动消失，为 <=0 不消失
    duration: {
      type: Number,
      default: 400
    },

    // 用于限制tip展示方向。优先级按顺序
    placements: {
      type: Array,
      default() {
        return ['top', 'right', 'bottom', 'left'];
      }
    },
    // tip的容器 默认插入body中
    container: null,
    // tip绑定的目标元素
    target: null,
    // 用于监听自定义组建的 emit事件
    customListeners: Object,
    // 对应<component>组件 is 属性
    customComponent: {
      type: [String, Function, Object],
      default: ''
    },
    // 工具函数时附加到自定义组件 props上
    customProps: {
      type: Object,
      default() {
        return {};
      }
    },
    // 显示内容
    content: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    this.visibleTimer = null;
    return {
      placement: '', // tip的展示方向
      visible: false, // tip是否显示
      arrowsPos: {}
    };
  },
  computed: {
    boxStyle() {
      const width = this.width;
      return {
        width: typeof width === 'string' ? width : `${width}px`,
        zIndex: this.zIndex
      };
    },
    boxClass() {
      const { customClass, theme, transition } = this;
      const tsClass = transition ? 'transition-transfrom' : '';
      return [customClass, theme, tsClass];
    },
    contentHeight () {
      const height = this.height;
      return {
        height: typeof height === 'string' ? height : `${height}px`
      };
    },
    arrowBox() {
      return Object.assign({
        borderWidth: `${this.arrowsSize}px` // 合并---borderWidth:'10px'合并到arrowPos 对象中
      }, this.arrowsPos);
    }
  },
  methods: {
    showTip() {
      clearTimeout(this.visibleTimer); // 清除定时器
      this.visible = true;
    },
    // 隐藏tip
    hiddenTip(immedia) {
      if (immedia) {
        this.visible = false;
      } else {
        this.setVisible(false); // 延迟隐藏
      }
    },
    // 更新 tip 位置
    updateTip () {
      this.setContainerNode();
      this.showTip();
      this.asynSetCoordinate();
    },
    // 设置tip 经过 xx ms 后的状态
    setVisible(v) {
      clearTimeout(this.visibleTimer);
      this.visibleTimer = setTimeout(() => {
        this.visible = v;
        this.visibleTimer = null; // 为什么这里要置一次null
      }, this.duration);
    },
    // 参考元素父级容器发生滚动时的处理
    scrollHandler: debounce(function () {
      this.setCoordinate();
    }, 200),

    // 设置 tip 的容器
    setContainerNode () {
      console.log(this.$el.parentNode);
      const {
        $el,
        target,
        container,
        targetParentNode,
        containerNode: oldNode
      } = this;
      // 目标元素的父级节点相同则不需要重新计算容器
      if (!target || target.parentNode === targetParentNode) return;
      this.targetParentNode = target.parentNode;
      const newNode = container || getScrollContainer(target);
      if (newNode === oldNode) return;
      if ($el.parentNode !== newNode) {
        newNode.appendChild($el);
      }
      const position = window.getComputedStyle(newNode, null).position;
      if (!position || position === 'static') {
        newNode.style.position = 'relative';
      }
      if (oldNode) {
        oldNode.removeEventListener('scroll', this.scrollHandler, supportsPassive);
      }
      if (checkScrollable(newNode)) {
        newNode.addEventListener('scroll', this.scrollHandler, supportsPassive);
      }
      this.containerNode = newNode;
    },

    setCoordinate () {
      const { $el, target, containerNode, placements, arrowsSize } = this;
      if (!$el || !target || !containerNode) return;
      const placementInfo = computePlacementInfo(target, containerNode, $el, placements, arrowsSize);
      const coordinate = placementInfo.mod === 'mid'
        ? computeCoordinateBaseMid(placementInfo, arrowsSize)
        : computeCoordinateBaseEdge(placementInfo, arrowsSize);
      this.setArrowsPos(coordinate);
      this.placement = coordinate.placement;
      const x = coordinate.x + containerNode.scrollLeft;
      const y = coordinate.y + containerNode.scrollTop;
      this.$el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },

    asynSetCoordinate () {
      this.$nextTick(this.setCoordinate);
    },
    // 设置小三角形的位置
    setArrowsPos ({ placement, arrowsOffset }) {
      this.arrowsPos = computeArrowPos(placement, arrowsOffset, this.arrowsSize);
    },

    clearScrollEvent () {
      if (this.containerNode) {
        this.containerNode.removeEventListener('scroll', this.scrollHandler, supportsPassive);
      }
    },

    removeParentNode () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },

    destroy () {
      this.clearScrollEvent();
      this.removeParentNode();
      this.$destroy();
    }
  }

};
