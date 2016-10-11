/*----------
 *ajax数据请求
 */

var table = new Vue({
	el: '#main-data',
	data: {
		items: [],
		new_item: '',
		message: 'message',
		query: '',
		temp: '',
	},
	methods: {
		/*显示数据*/
		showData: function() {
			var _self = this;
			$.getJSON("../json/data.json", function(result) {
				_self.items = result;
			});
			console.log(_self.message);
		},
		/*添加数据到下方的表中，不提交*/
		join: function() {
			var _self = this;
			_self.new_item.helpDate = _self.temp.helpDate;
			_self.new_item.money = _self.temp.money;
			_self.items.push(_self.new_item);
		},
		/*用户提交查询信息，查询学生信息*/
		queryData: function() {
			var _self = this;
			/*提交数据到服务器 query是要查询的数据对象*/
			console.log(_self.query);

			// $.ajax({
			// 	type: "POST",
			// 	url: "#",
			// 	contentType: "application/json; charset=utf-8",
			// 	data: JSON.stringify(query),
			// 	dataType: "json",
			// 	success: function(result) {
			// 		_self.new_item = result;
			// 	},
			// 	error: function(message) {
			// 		alert("提交数据失败！");
			// 	}
			// });
			/*test-data*/
			$.ajax({
				type: "GET",
				url: '../json/query_data.json',
				dataType: "json",
				success: function(result) {
					_self.new_item = result[0];
				}
			})
		},
		submitData: function() {
			var _self = this;
			// $.ajax({
			// 	type: "POST",
			// 	url: "#",
			// 	contentType: "application/json; charset=utf-8",
			// 	data: JSON.stringify(_self.items),
			// 	dataType: "json",
			// 	success: function(result) {
			// 		_self.new_item = result;
			// 	},
			// 	error: function(message) {
			// 		alert("提交数据失败！");
			// 	}
			// });
		}
	}
})