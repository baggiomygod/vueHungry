import Draggable from './drag';

/*
	bind: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化
	inserted: 被绑定元素插入父节点时调用（仅保证父节点存在，但不一定被插入文档中）
	update: 所在组件的VNode更新时调用，
	componentUpdated: 指令所在组件的VNode及VNode全部更新后调用
	unbind:只调用一次，指令与元素解绑时调用
*/
module.exports = (Vue) => {
	Vue.directive('drag', {
		bind: Draggable
	});
};
