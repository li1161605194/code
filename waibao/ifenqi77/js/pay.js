$(function(){
	try{
		$("div.pay-type-rediok").unbind('click').click(function(){
			var _this=$(this);
			$("div.pay-type-rediok").removeClass('shi');
			_this.addClass('shi');
		});
		var nowUrl=window.location.href;
		if(nowUrl.indexOf("recharge.html")!=-1){
			$("#amount").html(getParams(window.location.href).GoodsBuyTimes==undefined?"":getParams(window.location.href).GoodsBuyTimes);
		}else if(nowUrl.indexOf("pay.html")!=-1){
			//$("#did").html(getParams(window.location.href).Zhi_Trade_No==undefined?"":getParams(window.location.href).Zhi_Trade_No);
			$("#amount").html(getParams(window.location.href).GoodsBuyTimes==undefined?"":getParams(window.location.href).GoodsBuyTimes);
		}
	}catch(e){
		actionNotice({msg:"请刷新页面!!![错误提示:参数不匹配]"});
	}
})

function payType(){
	var type=$("div.shi").attr('type');
	if(window.location.href.indexOf("pay.html")!=-1){
		var data=window.location.search+"&Tag=1";
		if(type=="1"){
			data=data+"&Mark=0";
			AjaxRequest("http://www.fengfei77.com/WebServletPay", getParams(data), function(rep){
				//console.info(rep);
				window.location.href="http://www.fengfei77.com/webpay/result.html?type=1&mark="+rep.mark+"&did="+getParams(data).Zhi_Trade_No;
			}, function(){
				actionNotice({msg:"请刷新页面!!!"});
			});
		}else if(type=="2"){
			data=data+"&Mark=1";
			AjaxRequest("http://www.fengfei77.com/WebServletPay", getParams(data), function(rep){
				console.info(rep);
				if(rep.mark=="0"){
					var alipayData='{"out_trade_no":"'+getParams('?'+rep.payInfo.replace(/\"/g, "")).out_trade_no+'","subject":"'+getParams(window.location.href).GoodsBody+'","total_amount":'+parseInt(getParams(window.location.href).GoodsBuyTimes)+'}';
					AjaxRequest("http://www.fengfei77.com/WebZhiFuBaoPay", alipayData, function(rep){
						console.info(rep);
						$(document.body).html(rep);
						//document.write(rep);
					}, function(){
						actionNotice({msg:"请刷新页面!!!"});
					});
				}else{
					actionNotice({msg:"请刷新页面!!!"});
				}
			}, function(){
				actionNotice({msg:"请刷新页面!!!"});
			});
		}
	}else if(window.location.href.indexOf("recharge.html")!=-1){
		var data=window.location.search+"&Tag=0";
		if(type=="2"){
			data=data+"&Mark=1";
			AjaxRequest("http://www.fengfei77.com/WebServletPay", getParams(data), function(rep){
				console.info(rep);
				if(rep.mark=="0"){
					var alipayData='{"out_trade_no":"'+getParams('?'+rep.payInfo.replace(/\"/g, "")).out_trade_no+'","subject":"'+getParams(window.location.href).GoodsBody+'","total_amount":'+parseInt(getParams(window.location.href).GoodsBuyTimes)+'}';
					AjaxRequest("http://www.fengfei77.com/WebZhiFuBaoPay", alipayData, function(rep){
						console.info(rep);
						$(document.body).html(rep);
						//document.write(rep);
					}, function(){
						actionNotice({msg:"请刷新页面!!!"});
					});
				}else{
					actionNotice({msg:"请刷新页面!!!"});
				}
			}, function(){
				actionNotice({msg:"请刷新页面!!!"});
			});
		}
	}
}

