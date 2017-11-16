var date = new Date();
var now_year = date.getFullYear();
var now_month = date.getMonth() + 1;
var now_day = date.getDate();

var dateTimeType, dq_datetime, updown_datetime, paramInit;
dateTimeType = $("#dateTimeType").val();
r_post_jsons = function(url, datas, callback) {
	var load = layer.load();
	$.ajax(url, {
		data: JSON.stringify(datas),
		cache: false,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 360000, //超时时间设置为5秒；
		contentType: "application/json",
		success: function(result) {
			layer.close(load);
			if(result && (result.user_status == 300 || result.login_status == 300)) {
				layer.msg(result.message, function() {});
				window.top.location.href = baseUrl + "/u/login.shtml";
				return;
			} else {
				callback(result);
			}
		},
		error: function(xhr, type, errorThrown) {
			layer.close(load);
			//异常处理；
			layer.msg("网络错误", function() {});
			return 0;
		}
	});
}
tableSearchInit = function() {
	paramInit = dateTimeTypeInit();
	var options = {
		//查询事件
		"search": function(paramList) {
			barTjtInit();
		},
		//默认展开条件数
		"expandRow": 99,
		//查询条件
		"searchBoxs": [{
			"id": "updown",
			"title": "时间范围",
			"isShowAll": false,
			"isMultiple": false,
			"defaults": ["on"],
			"data": [{
				"value": "up",
				"text": "上一" + paramInit.timeWz
			}, {
				"value": "on",
				"text": "本" + paramInit.timeWz
			}, {
				"value": "down",
				"text": "下一" + paramInit.timeWz
			}],
			"event": function(e) {
				var selected = e.selected == null ? null : e.selected[0];
				if(selected == "on") {
					updown_datetime = dq_datetime;
				} else if(selected == "up") {
					updown_datetime = dateTimeUpDown("on");
				} else if(selected == "down") {
					updown_datetime = dateTimeUpDown("down");
				} else {
					updown_datetime = dq_datetime;
				}
			}
		}]
	};
	$("#table_searchbox").fiterMore(options);
	if(window.location.href.indexOf("/xiaofeitongji/") != -1) {
		addQueryHtml();
	}
}

addQueryHtml = function() {
	var html = '<div class="searchbox-item" style="border: 0" data-id="99" id="searchitem_aaa">' +
		'<div class="l" id="searchitem_aaa_l">筛选条件<i></i></div><div class="c" id="searchitem_aaa_c">' +
		'<div class="control-type">(单选)</div><div class="filter_option" style="padding-right:20px;">' +
		'<div class="xftj_sxk mt8"><select id="sx_school"><option value="-1">-学校列表-</option></select></div>' +
		'<div class="xftj_sxk mt8"><select id="sx_shebeid"><option value="-1">-设备点-</option></select></div>' +
		'<div class="xftj_sxk mt8"><select id="sx_shebeil"><option value="-1">-设备类型-</option></select></div>' +
		'</div></div></div>';
	$("#table_searchbox").append(html);
	//schoolSelectList();
	//shebeiTypeSelectList();
	$("#sx_school").change(function() {
		$("#sx_shebeid").html('<option value="-1">-设备点-</option>');
		if($("#sx_school").val() != "-1") {
			shebeiDzSelectList($("#sx_school").val());
		}
		barTjtInit();
	});
	$("#sx_shebeid").change(function() {
		barTjtInit();
	});
	$("#sx_shebeil").change(function() {
		barTjtInit();
	});
}

dateTimeUpDown = function(updwon) {
	var stime = dq_datetime;
	dateTimeType = $("#dateTimeType").val();
	switch(dateTimeType) {
		case "h":
			var days = updwon == "on" ? -1 : 1;
			var d = new Date(updown_datetime);
			d.setDate(d.getDate() + days);
			var m = d.getMonth() + 1;
			stime = d.getFullYear() + '-' + m + '-' + d.getDate();
			break;
		case "d":
			var mouths = updwon == "on" ? -1 : 1;
			var d = new Date(updown_datetime);
			d.setMonth(d.getMonth() + mouths);
			var m = d.getMonth() + 1;
			stime = d.getFullYear() + '-' + m;
			break;
		case "w":
			var days = updwon == "on" ? -7 : 7;
			var d = new Date(updown_datetime);
			d.setDate(d.getDate() + days);
			var m = d.getMonth() + 1;
			stime = d.getFullYear() + '-' + m + '-' + d.getDate();
			break;
		case "m":
			var years = updwon == "on" ? -1 : 1;
			var d = new Date(updown_datetime + "-" + now_month);
			d.setFullYear(d.getFullYear() + years);
			stime = d.getFullYear();
			break;
		case "y":
			var years = updwon == "on" ? -1 : 1;
			var d = new Date(updown_datetime + "-" + now_month);
			d.setFullYear(d.getFullYear() + years);
			stime = d.getFullYear();
			break;
		default:

			break;
	}
	return stime;
}
dateTimeTypeInit = function() {
	var s = {
		paramType: 0,
		timeWz: "页",
		paramTime: now_year + "-" + now_month + "-" + now_day
	};
	dateTimeType = $("#dateTimeType").val();
	switch(dateTimeType) {
		case "h":
			s.timeWz = "日";
			s.paramTime = now_year + "-" + now_month + "-" + now_day;
			s.paramType = 0;
			break;
		case "d":
			s.timeWz = "月";
			s.paramTime = now_year + "-" + now_month;
			s.paramType = 1;
			break;
		case "w":
			s.timeWz = "周";
			s.paramTime = now_year + "-" + now_month + "-" + now_day;
			s.paramType = 2;
			break;
		case "m":
			s.timeWz = "年";
			s.paramTime = now_year;
			s.paramType = 3;
			break;
		case "y":
			s.timeWz = "年";
			s.paramTime = now_year;
			s.paramType = 4;
			break;
		default:
			s.timeWz = "页";
			s.paramTime = now_year + "-" + now_month + "-" + now_day;
			s.paramType = 0;
			break;
	}
	dq_datetime = s.paramTime;
	updown_datetime = s.paramTime;
	return s;
}

t_queryParams = function(_params) {
	var params = {};
	if(_params && _params != undefined) {
		params = _params;
	}
	if($("#table_searchbox").length > 0) {
		var paramList = $("#table_searchbox").getParamList();
		for(var itemKey in paramList) {
			var item = paramList[itemKey];
			var val = null;
			if(item.CustomList != null && item.CustomList.length > 0 && (typeof(item.CustomList) == "object")) {
				if(item.CustomList.length > 1) {
					val = item.CustomList.join(",");
				} else {
					val = item.CustomList.join("");
				}
			} else if(item.ValueList != null && item.ValueList.length > 0 && (typeof(item.ValueList) == "object")) {
				if(item.isMultiple == true) {
					val = item.ValueList.join(",");
				} else {
					val = item.ValueList.join("");
				}
			}
			if(val != null) {
				params[item.id] = val;
			}
		}
	}
	if(_params && _params.pageNumber != undefined) {
		params.pageNumber = _params.pageNumber;
	}
	if(_params && _params.pageSize != undefined) {
		params.pageSize = _params.pageSize;
	}
	return params;
}
mouseStop = function() {}
$(function() {

})