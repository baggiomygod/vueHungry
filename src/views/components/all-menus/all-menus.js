import tpl from './all-menus.html';
import './all-menus.scss';
export default {
  template: tpl,
  props: {
    config: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods: {
    changeHeader(val) {
      this.$emit('change-title', val);
    },
    changeNav() {
      this.$emit('show-all-menus', false);
    }
  }
};
