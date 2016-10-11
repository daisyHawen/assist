var layout = new Vue({
	el: '#layout-container',
	data: {
		url: './subform-zhuguan.html',
		li_class: 'active'
	},
	methods: {
		/*实现iframe跳转*/
		ijump: function(str) {
			var _self = this;
			_self.url = str;
		},
		/*实现class的绑定*/
	}
})