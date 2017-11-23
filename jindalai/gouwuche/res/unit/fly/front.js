shopxx = {
	base: "",
	currencySign: "￥",
	currencyUnit: "元",
	priceScale: "2",
	priceRoundType: "roundHalfUp"
};

// 货币格式化
function currencyFormat(price) {
	price = setScale(price, shopxx.priceScale, shopxx.priceRoundType);
	return shopxx.currencySign + price + shopxx.currencyUnit;
}

$().ready( function() {
	var carTipNumber = 0;
	var deleteTipNumber = 0;
	var $body = $("body");
	
	$.ownerVerify = function () {
		if(getCookie("OWNER_MOBILE") != null) {
			var isOwnerLogin = false;
			$.ajax({
				url: "/front/owner!ajaxOwnerVerify.action",
				type: "POST",
				dataType: "json",
				async: false,
				cache: false,
				success: function(data) {
					if (data.status) {
						isOwnerLogin = true;
					}
				}
			});
			return isOwnerLogin;
		} else {
			return false;
		}
	}
	
	$.ownerAutoLogin = function () {
		var isOwnerLogin = false;
		var ecbfive_username = getCookie("ECB_OWNER_AUTH_U");
		var ecbfive_password = getCookie("ECB_OWNER_AUTH_P");
		if(ecbfive_username != null && ecbfive_username != "" && ecbfive_password != null && ecbfive_password != "" ) {
			$.ajax({
				url: "/front/owner!ajaxLogin.action",
				data: {"phone": ecbfive_username, "pwd": ecbfive_password},
				type: "POST",
				dataType: "json",
				async: false,
				cache: false,
				success: function(data) {
					if (data.status) {
						isOwnerLogin = true;
					}
				}
			});
			return isOwnerLogin;
		} else {
			return false;
		}
	}
	
	//加入购物车动画
    $.cartFly = function(beginLeft, beginTop, endLeft, endTop, imgId){
        var img = $("#"+imgId).attr('src'); 
        var flyer = $('<img class="u-flyer" src="'+img+'">'); 
        flyer.fly({ 
            start: { 
                left: beginLeft -20, //开始位置（必填）#fly元素会被设置成position: fixed 
                top: beginTop - 10 //开始位置（必填） 
            }, 
            end: { 
                left: endLeft - 20, //结束位置（必填） 
                top: endTop -20, //结束位置（必填） 
                width: 0, //结束时宽度 
                height: 0 //结束时高度 
            }, 
            onEnd: function(){ //结束回调 
                flyer.remove(); //移除dom 
            } 
        }); 
    }
	
	$.addCartItem = function(id, quantity, type) {
		if ($.trim(id) == "") {
			$.message({type: "warn", content: "请选择购买商品!"});
			return false;
		}
		if (!/^[0-9]*[1-9][0-9]*$/.test($.trim(quantity))) {
			alert($.trim(quantity));
			$.message({type: "warn", content: "商品品数量必须为正整数!"});
			return false;
		}

		$.ajax({
			url: "/front/shopping!ajaxAdd.action",
			data: {"id": id, "quantity": quantity},
			type: "POST",
			dataType: "json",
			cache: false,
			success: function(data) {
				if (data.status == "success") {
					var shoppingTotalQuantity = getCookie("shoppingTotalQuantity");
					$("#totalProductQuantity").text(shoppingTotalQuantity);
					if(type == 0){
						$.carTip();
					}else{
						window.location.href="/front/shopping!list.action";
					}
				} else {
					$.message({type: "warn", content: data.message});
				}
			}
		});
	}
	
	$.deleteCartItem = function(pids) {
		if ($.trim(pids) == "") {
			$.message({type: "warn", content: "请选择要删除的商品!"});
			return false;
		}
		$.ajax({
			url: "/front/shopping!ajaxDelete.action",
			data: {"pids": pids},
			type: "POST",
			dataType: "json",
			cache: false,
			success: function(data) {
				if (data.status == "success") {
					$.deleteTip("删除成功!","商品已从购物车删除");
				} else {
					$.message({type: "warn", content: data.message});
				}
			}
		});
	}
	
	$.deleteTip = function (title,content) {
		if ($body == null) {
			$body = $("body");
		}
		var deleteTipHtml = '<div id="mask"></div><div id="LoginBox"><div class="LoginBox-w"><h3 class="LoginBox-title">菜碑网提示</h3><div class="LoginBox-content"><p>'+content+'</p></div><div class="LoginBox-button"><p class="button02" onclick="javascript:window.location.reload();"><input type="button" value="好"/></p></div></div></div>';
		$body.append(deleteTipHtml);
		var $deleteTip = $("#LoginBox");
		$deleteTip.center();
		$deleteTip.fadeIn();
		$('#mask').show();
	}

	$.loginTip = function () {
		if ($body == null) {
			$body = $("body");
		}
		var loginTipHtml = '<div id="mask"></div><div id="LoginBox"><div class="LoginBox-w"><h3 class="LoginBox-title">菜碑网提示</h3><div class="LoginBox-content"><p>您尚未登陆，立即前往登录页面?</p></div><div class="LoginBox-button"><p class="button01" onclick="javascript:$(\'#LoginBox\').hide();$(\'#mask\').hide();$(\'#LoginBox\').remove();$(\'#mask\').remove();"><input type="button" value="取消"/></p><p class="button02" onclick="javascript:window.location.href=\'/html/login.htm\';"><input type="button" value="好"/></p></div></div></div>';
		$body.append(loginTipHtml);
		var $loginTip = $("#LoginBox");
		$loginTip.center();
		$loginTip.fadeIn();
		$('#mask').show();
	}
	
	$.showCover = function(){
		if($(".sharebg").length>0){
			$(".sharebg").addClass("sharebg-active");
		}else{
			$("body").append('<div class="sharebg"></div>');
			$(".sharebg").addClass("sharebg-active");
		}
	}
	$.removeCover = function(){
		$(".sharebg").remove();	
	}
	
	$.carTip = function () {
		if ($body == null) {
			$body = $("body");
		}
		var tipId = "carTip" + carTipNumber;
		carTipNumber ++;
		var carTipHtml = '<div id="' + tipId + '" style="display: none; position: fixed;"><div class="touchweb_com-indexPop pop_add-cart"><div class="inner" style="border:1px solid #ff465a;text-align:center;"><div class="content_name"><p>添加成功！<br>商品已成功加入购物车</p></div><div id="mcart_confirm_popup_btns" class="btn_box"><a href="javascript: void(0);" class="btn btn_cancel">再逛逛</a><a href="'+shopxx.base +'/front/shopping!list.action" class="btn btn_confirm">去购物车</a></div></div></div></div>';
		$body.append(carTipHtml);
		var $carTip = $("#" + tipId);
		$carTip.css({
            //设置弹出层距离左边的位置
        	left: ($(window).width() - $carTip.width()) / 2 + "px",
            //设置弹出层距离上面的位置
        	top: ($(window).height() - $carTip.height()) / 2 + "px",
        	"z-index": "9999"
        }).show();
        $.showCover();
		return tipId;
	}
});