var month = new Vue({
	el: '#month-container',
	data: {
		years: [],
		months: [],
		dates: [{
			"helpMonth": 9,
			"helpYear": 2016
		}],
		selected: {
			"year": '',
			"month": ''
		},
		money: ''
	},
	methods: {
		/*初始化列表*/
		init: function() {
			var _self = this;
			// 获取当年的年月,设置select
			var myDate = new Date();
			var year = myDate.getFullYear();
			for (var i = -5; i < 5; i++) {
				_self.years.push(year + i);
			}
			for (var i = 1; i <= 12; i++) {
				_self.months.push(i);
			}
			/*获取所有年月，初始化已添加年月*/
			_self._getAllDates();
		},
		/*像服务器添加一条新的数据,并更新列表*/
		addMonth: function() {
			var _self = this;
			var selected = JSON.stringify(_self.selected);
			console.log(selected);
			// $.ajax({
			// 	type: "POST",
			// 	url: "#", //
			// 	data: selected,
			// 	contentType: "application/json; charset=utf-8",
			// 	dataType: 'json',
			// 	success: function(result) {
			// 		console.log(result);
			// 	}
			// })
			_self._getAllDates();
		},
		/*删除月份*/
		delete: function(el, id) {
			console.log(id);
			var id = {
				"id": id
			};
			// $.ajax({
			// 	type: "POST",
			// 	url: "#", //
			// 	data: id,
			// 	contentType: "application/json; charset=utf-8",
			// 	dataType: 'json',
			// 	success: function(result) {
			// 		console.log(result);
			// 	}
			// })
		},
		/*设置金额*/
		setMoney: function() {
			var _self = this;
			var money = JSON.stringify(_self.money);
			console.log(money);
			// $.ajax({
			// 	type: "POST",
			// 	url: "#", //
			// 	data: money,
			// 	contentType: "application/json; charset=utf-8",
			// 	dataType: 'json',
			// 	success: function(result) {
			// 		console.log(result);
			// 	}
			// })
		},
		/*请求服务器，获取所有年月*/
		_getAllDates: function() {
			var _self = this;
			_self.dates = [];
			$.ajax({
				type: "GET",
				url: '../json/allDates.json',
				dataType: "json",
				success: function(result) {
					$.each(result, function(i, value) {
						_self.dates.push(value);
					})
				}
			})
		}
	}
})
month.init();