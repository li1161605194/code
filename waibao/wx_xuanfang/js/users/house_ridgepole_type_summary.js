opt = {
	houseTotalCount: $("#houseTotalCount"),
	houseRemainCount: $("#houseRemainCount")
}
var houseListJs = {
	init: function() {
		houseListJs.getHouseSummary();
	},
	
	getHouseSummary: function() {
		r_post_jsons("ran/room/ridgepole_type_summary", {

		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null) {
					opt.houseTotalCount.html(res.objectData.totalCount);
					opt.houseRemainCount.html(res.objectData.remainCount);
					var data = res.objectData.typeSummary;
					var html = '';
					for(var a = 0; a < data.length; a++) {
						html += "<li class=\"tzpage\" rel=\"users/house_summary.html?h=1&t=" + data[a].type + "\"><span class=\"type_title\">" + data[a].typeName + "类</span><br>剩<em class='li_remain'>" + data[a].remainCount + "</em>套</li>"
					}
					$(".house_type_summary_container").html(html);
					
					html="";
					data =res.objectData.ridgeSummary;
					
					for(var a=0;a<data.length;a++){
						html += "<li class=\"tzpage\" rel=\"users/house_list.html?no=" + data[a].ridgepole + "\">" + data[a].ridgepole + "栋 剩<em class='li_remain'>" + data[a].remainCount + "</em>套</li>"
					}
					$(".house_ridge_summary_container").html(html);
					
					setTimeout(function() {
						houseListJs.updateSummary();
					}, 5000);
				} else {
					layer.open({
						content: "暂无房源",
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
	},

	updateSummary: function() {
		r_post_jsons("ran/room/ridgepole_type_summary", {

		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null) {

					opt.houseRemainCount.html(res.objectData.remainCount);
					var data = res.objectData.typeSummary;
					for(var a = 0; a < data.length; a++) {
						$($(".house_type_summary_container li em.li_remain")[0]).html(data[a].remainCount);
					}
					
					data = res.objectData.ridgeSummary;
					for(var a = 0; a < data.length; a++) {
						$($(".house_ridge_summary_container li em.li_remain")[0]).html(data[a].remainCount);
					}
					setTimeout(function() {
						houseListJs.updateSummary();
					}, 5000);
				} else {
					layer.open({
						content: "暂无房源",
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