opt = {

}
var resultJs = {
	init: function() {
		resultJs.getHouseDetailInfoList();
	},
	getHouseDetailInfoList: function() {
		r_post_jsons("ran/room/info", {
			"id": urlJson.id
		}, function(res) {
			if(res) {
				if(res.resultCode == 1) {
					var _r = res.objectData;
					$(".result_houseimg").attr("src", '/ran'+_r.houseImg);
					var louhao = _r.ridgepole + "号楼" + _r.unit + "单元" + _r.roomNo + "-" + _r.houseTypeInfo;
					$("#roomLH").html(louhao);
					$(".result_num").html(louhao);
					$("#roomMJ").html(_r.area);
					$("#roomDJ").html(_r.price);
					$("#roomZJ").html(_r.totalAmount);
				}
			}
		});
	}
}

$(function() {
	common.initCommonHeardHtml();
	resultJs.init();
	common.bodyShow();
});