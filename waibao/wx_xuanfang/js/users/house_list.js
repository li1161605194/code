opt = {
	houseListzk: $("#houseListzk")
}
var houseListJs = {
	init: function() {
//		houseListJs.changeMenu();
		houseListJs.getHouseList();
	},
	changeMenu: function() {
		$(document).on("click", "span.hl_menuwz", function(e) {
			$("span.hl_menuwz").removeClass("xuanz");
			$(this).addClass("xuanz");
			houseListJs.getHouseList();
		});
	},
	getHouseList: function() {
		r_post_jsons("ran/we_act/choosen_ridge", {
			"no":urlJson.no
		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null && res.objectData.length > 0) {
					var leg = res.objectData.length;
					var html = '';
					for(var a = 0; a < leg; a++) {
						var _room = res.objectData[a];
						var fjh = _room.ridgepole + "-" + _room.unit + "-" + _room.roomNo;
						if(_room.choosen) {
							html += '<span class="hl_show_zt xuanz">' + fjh + '</span>';
						} else {
							html += '<span class="hl_show_zt">' + fjh + '</span>';
						}
					}
					opt.houseListzk.html(html);
				} else {
					opt.houseListzk.html('');
					layer.open({
						content: "该楼栋暂无房源",
						skin: 'msg',
						time: 2
					});
				}
			} else {
				layer.open({
					content: res.errorMsg,
					skin: 'msg',
					time: 2
				});
				return false;
			}
		});
	}
}

$(function() {
	common.initCommonHeardHtml();
	houseListJs.init();
	common.bodyShow();
});