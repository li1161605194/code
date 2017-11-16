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
	tableInit();
	$(".date").each(function() {
		var start = $(this);
		var endTime = $(this).data('end');
		var picker = $(this).datetimepicker({
			format: 'yyyy-mm-dd',
			minView: 2,
			maxView: 4,
			autoClose: true,
			todayBtn: "linked",
			language: "zh-CN"
		});
		if(endTime != null && endTime != "") {
			$(picker).on('changeDate', function(ev) {
				var startTime = $(start).val();
				$("#" + endTime).datetimepicker('setStartDate', startTime);
			});
		}
	});
	$(".date").attr("readOnly", "readOnly").val((new Date().getFullYear()).toString() + "-" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString());
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
	$("input.date").change(function() {
		var s = $("#StartDate").val();
		var e = $("#EndDate").val();
		if(new Date(s).getTime() > new Date(e).getTime()) {
			layer.msg("开始时间不能大于结束时间");
		} else {
			$("#table").bootstrapTable('refresh', {});
		}

	});
	$("#DNumber").blur(function() {
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