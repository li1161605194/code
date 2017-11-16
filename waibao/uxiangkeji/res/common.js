var zW = $(window).width();
var zH = $(window).height();
DownLoad = function(options) {
    var config = $.extend(true, {
        method: 'post'
    }, options);
    var $iframe = $('<iframe id="down-file-iframe" />');
    var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
    $form.attr('action', config.url);
    for (var key in config.data) {
        $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
    }
    $iframe.append($form);
    $(document.body).append($iframe);
    $form[0].submit();
    $iframe.remove();
}
schoolSelectList = function() {
	r_post_jsons("http://www.fengfei77.com/MyUTServe/SheBeiInforServlet", {
		"Mark": 0
	}, function(res) {
		if(res.JsonArray != undefined && res.JsonArray.length != undefined) {
			var leg = res.JsonArray.length;
			var html = '<option value="-1">-学校列表-</option>';
			for(var i = 0; i < leg; i++) {
				html += '<option value="' + res.JsonArray[i].SchoolID + '">' + res.JsonArray[i].SchoolName + '</option>';
			}
			$("#sx_school").html(html);
		}
	});
}
shebeiDzSelectList = function(SchoolID) {
	r_post_jsons("http://www.fengfei77.com/MyUTServe/SheBeiInforServlet", {
		"Mark": 1,
		"SchoolID": SchoolID
	}, function(res) {
		if(res.JsonArray != undefined && res.JsonArray.length != undefined) {
			var leg = res.JsonArray.length;
			var html = '<option value="-1">-设备点-</option>';
			for(var i = 0; i < leg; i++) {
				html += '<option value="' + res.JsonArray[i].LocationID + '">' + res.JsonArray[i].LocationName + '</option>';
			}
			$("#sx_shebeid").html(html);
		}
	});
}
shebeiTypeSelectList = function() {
	r_post_jsons("http://www.fengfei77.com/MyUTServe/SheBeiInforServlet", {
		"Mark": 2
	}, function(res) {
		if(res.JsonArray != undefined && res.JsonArray.length != undefined) {
			var leg = res.JsonArray.length;
			var html = '<option value="-1">-设备类型-</option>';
			for(var i = 0; i < leg; i++) {
				html += '<option value="' + res.JsonArray[i].DKindID + '">' + res.JsonArray[i].DKindName + '</option>';
			}
			$("#sx_shebeil").html(html);
		}
	});
}
$.fn.serializeDOMArray = function() {
	var params = [];
	var s = {};
	if(this.get(0).tagName == "FORM") {
		params = this.serializeArray();
	} else {
		this.wrap('<form id="NotRepeatId"></form>');
		params = $("#NotRepeatId").serializeArray();
		this.insertAfter($("#NotRepeatId"));
		$("#NotRepeatId").remove();
	}
	$.each(params, function(i, v) {
		s[v.name] = decodeURIComponent(v.value);
	});
	return s;
}
$.fn.selectTextInputVal = function() {
	var params = [];
	var s = {};
	this.find("input").each(function(a, b) {
		_thisInput = $(b);
		if(_thisInput.attr("name") != undefined && _thisInput.attr("name").length > 1 && _thisInput.attr("type") != undefined) {
			var _thisInputName = _thisInput.attr("name");
			var _thisInputType = _thisInput.attr("type");
			if(_thisInputType == "text") {
				s[_thisInputName] = _thisInput.val();
			} else if(_thisInputType == "radio") {
				s[_thisInputName] = $("input[name=" + _thisInputName + "]:checked").val();
			} else if(_thisInputType == "checkbox") {
				var chk_value = [];
				$('input[name=' + _thisInputName + ']:checked').each(function() {
					chk_value.push($(this).val());
				});
				s[_thisInputName] = chk_value;
			}
		}
	});
	this.find("select").each(function(a, b) {
		_thisSelect = $(b);
		if(_thisSelect.attr("name") != undefined && _thisSelect.attr("name").length > 1) {
			s[_thisSelect.attr("name")] = _thisSelect.find("option:selected").val();
		}
	});
	return s;
}

getJsonLength = function(jsonData) {
	var jsonLength = 0;
	for(var item in jsonData) {
		jsonLength++;
	}
	return jsonLength;
}

getTableLineParamCheckIndex = function(id, index) {
	id.bootstrapTable('uncheckAll');
	if(index == undefined) {} else {
		id.bootstrapTable('check', index);
	}
	var data = '';
	data = id.bootstrapTable('getAllSelections');
	return data;
}

getTableLineParamCheckAll = function(id) {
	return id.bootstrapTable('getAllSelections');
}

getTableLineParamUniqueId = function(id, uniqueId) {
	return id.bootstrapTable('getRowByUniqueId', uniqueId);
}
$(function() {

});