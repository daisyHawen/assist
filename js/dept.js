/*
 *------助管信息管理
 *增加助管：addZhuguan
 *删除助管：deleteZG
 *查询数据：queryData
 *向服务器获取所有数据：getAllData
 *向服务器查询数据（页）：getPage
 *获取学院信息列表，获取银行列表：getDept,getBanks，目前是写死的
 *-------说明
 *-------表中的Ajax请求均为本地json测试数据
 *-------后期联调更改
 */
var dept_info = new Vue({
	el: '#dept-data',
	data: {
		/*查询对象*/
		query: {
			"row": 10,
			"cur_page": 1
		},
		/*每页显示的列数*/
		rows: 5,
		/*pageNum 总页数*/
		pageNum: 1,
		/*当前页码*/
		curPage: 1,
		/*pages用于构造page*/
		pages: [],
		/*部门列表*/
		depts: [{
			"deptNo": "06",
			"deptName": "计算机学院"
		}, {
			"deptNo": "08",
			"deptName": "通信学院"
		}],
		/*列表中的项目*/
		items: [],
		/*选中删除的助管对象*/
		deleteItem: '',
		/*选中的要修改的学院信息*/
		editItem: '',
		/*要添加的助管对象*/
		addItem: ''
	},
	methods: {
		/*初始化*/
		init: function() {
			var _self = this;
			this.getDept();
		},
		/*查询数据*/
		queryData: function() {
			var _self = this;
			var query = JSON.stringify(_self.query);
			console.log(query);
			/*在查询之前先获取总页码*/
			_self.getPageNum();
			$.ajax({
				type: "POST",
				url: "http://localhost:8080/stu_assist_management/base/stu/list.do",
				data: query,
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				success: function(result) {
					$.each(result, function(i, vlaue) {
						_self.items.push(value);
					})
				}
			});
			/*更新分页*/
			_self.pagine(_self.page, _self.curPage)
		},
		/*根据row和page请求数据*/
		getDataPage: function(cur_page) {
			var _self = this;
			_self.query = {
				"row": 10,
				"cur_page": cur_page || 1
			}
			_self.queryData();
		},
		/*处理分页查询*/
		submitPage: function(p) {
			console.log(p);
			if (p === ">>") {
				_self.curPage++;
				_self.getDataPage(_self.curPage);
			} else if (p === "<<") {
				_self.curPage--;
				_self.getDataPage(_self.curPage);
			} else {
				_self.curPage = p;
				_self.getDataPage(_self.curPage);
			}
		},
		/*getPageNum:向服务器请求分页的数量*/
		getPageNum: function() {
			var _self = this;
			$.ajax({
				type: "GET",
				url: '#',
				dataType: "json",
				success: function(result) {
					_self.page = result.page;
				}
			});
		},
		/*获取学院名称以及列表*/
		getDept: function() {
			var _self = this;
			$.ajax({
				type: "GET",
				url: '#',
				dataType: "json",
				success: function(result) {
					$.each(result, function(i, value) {
						_self.depts.push(value);
					})
				}
			});
		},
		/*添加一条学院信息*/
		addZhuguan: function() {
			console.log('test');
			var _self = this;
			var additem = JSON.stringify(_self.addItem);
			console.log(additem);
			$.ajax({
				action: "POST",
				url: 'http://localhost:8080/stu_assist_management/base/stu/add.do',
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: additem,
				success: function(result) {
					alert(result.message);
				}
			});
		},
		/*提交删除一条助管信息到modal*/
		deleteInfo: function(i, name) {
			var _self = this;
			_self.deleteItem = {
				"deptID": i,
				"deptName": name
			};

		},
		/*提交删除一条助管信息到服务器*/
		deleteDept: function() {
			var _self = this;
			var deleteItem = JSON.stringify({
				"deptID": _self.deleteItem.deptID
			});
			console.log(deleteItem);
			$.ajax({
				type: "POST",
				url: "http://localhost:8080/stu_assist_management/base/stu/delete.do", //
				data: deleteItem,
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				success: function(result) {
					alert(result)
				}
			})
		},
		/*提交编辑一条助管信息到modal*/
		editInfo: function(i, name) {
			var _self = this;
			_self.editItem = {
				"deptID": i,
				"deptName": name
			};
		},
		editDept: function() {
			var _self = this;
			var editItem = JSON.stringify({
				"deptID": _self.deleteItem.deptID
			});
			console.log(editItem);
			$.ajax({
				type: "POST",
				url: "http://localhost:8080/stu_assist_management/base/stu/delete.do", //
				data: editItem,
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				success: function(result) {
					alert(result)
				}
			})
		},
		/*处理分页
		 *输入参数:t_p(总页数),cur_p(当前页数)
		 */
		pagine: function(t_p, cur_p) {
			console.log('test');
			var _self = this;
			//总页数,默认为1
			var total_page = t_p || 1;
			//当前页数，默认为1
			var cur_page = cur_p || 1;
			/*处理分页*/
			_self.pages = [];
			var prev = {
				"disabled": false,
				"active": false,
				"content": "<<"
			};
			var next = {
				"disabled": true,
				"active": false,
				"content": ">>"
			}
			if (total_page === 1) {
				console.log('total_page === 1');
				_self.pages.push(prev);
				_self.pages.push({
					"disabled": true,
					"active": false,
					"content": "1"
				});
				_self.pages.push(next);
			} else if (total_page === cur_page) {
				/*当前页数==尾页*/
				prev.disabled = false;
				_self.pages.push(prev);
				for (var i = 1; i < total_page; i++) {
					var item = {
						"disabled": false,
						"active": false,
						"content": i
					};
					if (i === cur_page) {
						item.active = true;
					};
					_self.pages.push(item);
				}
				_self.pages.push(next);

			} else {
				prev.disabled = false;
				next.disabled = false;
				_self.pages.push(prev);
				for (var i = 1; i <= total_page; i++) {
					var item = {
						"disabled": false,
						"active": false,
						"content": i
					};
					if (i === cur_page) {
						/*如果i==当前页，设置active为true*/
						item.active = true;
					};
					_self.pages.push(item);
				}
				_self.pages.push(next);
			}
			_self.curPage = cur_page;
		}
	}
});
zhuguan_info.pagine(4, 2);