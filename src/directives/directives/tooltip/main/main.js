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
    target: null
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    tipStyle() {
      //
    }
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
    }
  }
};
