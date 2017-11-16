opt = {
	houseTotalCount: $("#houseTotalCount"),
	houseRemainCount: $("#houseRemainCount")
}
var houseListJs = {
	init: function() {
//		$(".go_to_chose_house").click(function(){
//			window.location.href=rootDirectory+"pages/views/chose_house.html?mo"+urlJson.mo;
//		});
		houseListJs.getHouseSummary();
	},
	
	getHouseSummary: function() {
		r_post_jsons("ran/room/type_summary", {

		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null) {
					opt.houseTotalCount.html(res.objectData.totalCount);
					opt.houseRemainCount.html(res.objectData.remainCount);
					var data = res.objectData.typeSummary;
					var html = '';
					for(var a = 0; a < data.length; a++) {
						html += "<li class=\"tzpage\" rel=\"users/house_summary.html?t=" + data[a].type + "\"><span class=\"big_type\">" + data[a].typeName + "类</span><br>共<em class=\"li_total\">" + data[a].totalCount + "</em>套,剩<em class='li_remain'>" + data[a].remainCount + "</em>套</li>"
					}
					$(".type_summary_container").html(html);
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
		r_post_jsons("ran/room/type_summary", {

		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null) {

					opt.houseRemainCount.html(res.objectData.remainCount);
					var data = res.objectData.typeSummary;
					var html = '';
					for(var a = 0; a < data.length; a++) {
						$($(".type_summary_container li em.li_total")[0]).html(data[a].totalCount);
						$($(".type_summary_container li em.li_total")[1]).html(data[a].remainCount);
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