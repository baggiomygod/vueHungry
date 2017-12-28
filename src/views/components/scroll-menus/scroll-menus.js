import tpl from './scroll-menus.html';
import './scroll-menus.scss';
export default {
  template: tpl,
  props: {
    config: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showAllMenus: false
    };
  },
  methods: {
    changeHeader(val) {
      this.$emit('change-title', val);
    },
    changeNav() {
      this.$emit('show-all-menus', true);
    }
  }
};
