var tbload;
tableInit = function() {
	$('#table').bootstrapTable({
		striped: true,
		sidePagination: 'server',
		pagination: true,
		queryParamsType: '',
		search: false,
		toolbar: "#toolbar",
		showColumns: false,
		showRefresh: true,
		showExport: false,
		exportDataType: "basic",
		exportTypes: ['doc', 'excel', 'pdf', 'png'],
		sortOrder: 'desc',
		pageNumber: 1,
		pageSize: 50,
		pageList: [50],
		cache: true,
		clickToSelect: true,
		singleSelect: true,
		sortable: true,
		uniqueId: "dID",
		//method: 'post',
		//url: "http://www.fengfei77.com/MyUTServe/SheBeiServlet",
		method: 'get',
		url: "../../json/shebeiyingshou.json",
		columns: [{
			field: 'dID',
			title: '设备ID',
			align: 'center'
		}, {
			field: 'dNumber',
			title: '设备编号',
			align: 'center',
		}, {
			field: 'dCateName',
			title: '设备类型',
			align: 'center',
		}, {
			field: 'dSchool',
			title: '所在学校',
			align: 'center',
		}, {
			field: 'dLocation',
			title: '所在设备点',
			align: 'center',
		}, {
			field: 'dName',
			title: '设备名字',
			align: 'center',
		}, {
			field: 'dOrderNumbers',
			title: '订单量',
			align: 'center',
		}, {
			field: 'dMoney',
			title: '收益(元)',
			align: 'center',
		}, {
			field: 'dState',
			title: '状态',
			align: 'center',
		}],
		responseHandler: responseHandler,
		queryParams: function(offetset) {
			tbload = layer.load();
			offetset.Mark = 1;
			var params = $("#toolbar").serializeDOMArray();
			return $.extend({}, offetset, params);
		},
		onLoadSuccess: function() { //加载成功时执行  
			layer.close(tbload);
			$(".fixed-table-toolbar").append('<div class="clearfix" style="clear: both;"></div>');
			$(".fixed-table-pagination").append('<div class="clearfix" style="clear: both;"></div>');
		},
		onLoadError: function() { //加载失败时执行  
			layer.close(tbload);
			layer.msg("加载数据失败", {
				time: 1500,
				icon: 2
			});
		}
	});
}

function responseHandler(res) {
	if(res.JsonArray) {
		return {
			"rows": res.JsonArray,
			"total": res.total
		};
	} else {
		return {
			"rows": [],
			"total": 0
		};
	}
}

$(function() {
	//mouseStop();
	dq_datetime = now_year + "-" + now_month + "-" + now_day;
	updown_datetime = dq_datetime;
	$("#StartDate").val(dq_datetime);
	$("#EndDate").val(dq_datetime);
	tableInit();
	//schoolSelectList();
	//shebeiTypeSelectList();
	$("#sx_school").change(function() {
		$("#sx_shebeid").html('<option value="-1">-设备点-</option>');
		if($("#sx_school").val() != "-1") {
			shebeiDzSelectList($("#sx_school").val());
		}
		$("#table").bootstrapTable('refresh', {});
	});
	$(".selchang_ck select").change(function() {
		$("#table").bootstrapTable('refresh', {});
	});
	$("#DNumber").blur(function() {
		$("#table").bootstrapTable('refresh', {});
	});
	$("#uptime").click(function() {
		var d = new Date(updown_datetime);
		d.setDate(d.getDate() - 1);
		var m = d.getMonth() + 1;
		var stime = d.getFullYear() + '-' + m + '-' + d.getDate();
		updown_datetime = stime;
		$("#StartDate").val(stime);
		$("#EndDate").val(stime);
		$("#table").bootstrapTable('refresh', {});
	});
	$("#downtime").click(function() {
		var d = new Date(updown_datetime);
		d.setDate(d.getDate() + 1);
		var m = d.getMonth() + 1;
		var stime = d.getFullYear() + '-' + m + '-' + d.getDate();
		updown_datetime = stime;
		$("#StartDate").val(stime);
		$("#EndDate").val(stime);
		$("#table").bootstrapTable('refresh', {});
	});
	$("#ontime").click(function() {
		$("#StartDate").val(dq_datetime);
		$("#EndDate").val(dq_datetime);
		$("#table").bootstrapTable('refresh', {});
	});
	$("#downfile").click(function() {
		var data = {};
		data.Mark = 1;
		var params = $("#toolbar").serializeDOMArray();
		DownLoad({
			url: "http://www.fengfei77.com/MyUTServe/DownServlet",
			data: $.extend({}, data, params)
		});
	});
})