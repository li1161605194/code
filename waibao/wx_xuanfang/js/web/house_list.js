var lxsj = 0;
var houseListJs = {
	init: function() {
		houseListJs.changeMenu();
		houseListJs.getHouseList();
		houseListJs.getHouseUserInfoList();
	},
	changeMenu: function() {
		$(document).on("click", "span.hl_ldnum", function(e) {
			$("span.hl_ldnum").removeClass("xuanz");
			$(this).addClass("xuanz");
			houseListJs.getHouseList();
		});
	},
	getHouseList: function() {
		r_post_jsons("ran/we_act/choosen_ridge", {
			"no": $(".hl_ldnum.xuanz").attr("num")
		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null && res.objectData.length > 0) {
					var leg = res.objectData.length;
					var html = '';
					for(var a = 0; a < leg; a++) {
						var _room = res.objectData[a];
						var fjh = _room.ridgepole + "-" + _room.unit + "-" + _room.roomNo;
						if(_room.choosen) {
							html += '<span class="hl_fgstatu xuanz">' + fjh + '</span>';
						} else {
							html += '<span class="hl_fgstatu">' + fjh + '</span>';
						}
					}
					$("#houseListzk").html(html);
				} else {
					$("#houseListzk").html('');
					layer.msg("该楼栋暂无房源");
				}
			} else {
				layer.msg(res.errorMsg);
				return false;
			}
		});
	},
	getHouseUserInfoList: function() {
		r_post_jsons("ran/we_act/choosen_data", {}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null && res.objectData.length > 0) {
					var zhtml = '',
						html = '<div class="swiper-slide"><ul class="hl_uxzu">',
						num = 1,
						type = "zh",
						leg = res.objectData.length;
					for(var a = 0; a < leg; a++) {
						var _t = res.objectData[a];
						if(num == 20) {
							type = "zh";
							num = 1;
							zhtml += html + '</ul></div>';
							html = '<div class="swiper-slide"><ul class="hl_uxzu">';
						} else {
							type = "bzh";
							num++;
							html += '<li class="hl_uxzl">' + _t.mobile + '选中' + _t.ridgepole + '号楼' + _t.unit + '单元' + _t.roomNo + '</li>';
						}
					}
					if(type == "bzh") {
						zhtml += html + '</ul></div>';
					}
					$("#houseUserListzk").html(html);
					lxsj = lxsj + 5000;
					setTimeout(function() {
						houseListJs.getHouseUserInfoList();
					}, lxsj);
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: 5000,
						direction: 'vertical',
						loop: true
					});
				} else {
					$("#houseUserListzk").html('');
					layer.msg("暂无选中房源信息");
				}
			} else {
				layer.msg(res.errorMsg);
				return false;
			}
		});
	}
}

$(document).ready(function() {
	houseListJs.init();
});

r_post_jsons = function(url, datas, callback) {
	var baseUrl = window.location.href;
	if(baseUrl.indexOf("http://localhost:86/") != -1) {
		baseUrl = "http://localhost:86/";
	} else if(baseUrl.indexOf("http://e.mapstar.com.cn:85/") != -1) {
		baseUrl = "http://e.mapstar.com.cn:85/";
	}
	var load = layer.load();
	$.ajax(baseUrl + url, {
		data: JSON.stringify(datas),
		cache: false,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 360000, //超时时间设置为5秒；
		contentType: "application/json",
		success: function(result) {
			//alert(JSON.stringify(result));
			layer.close(load);
			callback(result);
		},
		error: function(xhr, type, errorThrown) {
			layer.close(load);
			layer.msg('网络错误[in-error]');
			return false;
		}
	});
}