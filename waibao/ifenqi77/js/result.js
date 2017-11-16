$(function() {
    try {
        var nowUrl = window.location.href;
        if (nowUrl.indexOf("result_recharge.html") != -1) {

        } else if (nowUrl.indexOf("result.html") != -1) {
            markResultShow(getParams(nowUrl));
        }
    } catch (e) {
        actionNotice({ msg: "请刷新页面!!![错误提示:参数不匹配]" });
    }
})

markResultShow=function(dataJson){
	if(dataJson==undefined||dataJson==""||dataJson==null)return false;
	var jg=dataJson.mark;
	//$("#did").html(dataJson.Zhi_Trade_No);
	if(dataJson.type=="1"){
		$("#pay-type").html('余额支付');
		switch(jg) {
			case "200":
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('余额不足[错误码:200]');
				break;
			case "-10":
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('请重新支付[错误码:-10]');
				break;
			case "-1":
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('支付失败[错误码:-1]');
				break;
			case "0":
				$("#result-img").attr('src','img/cg.png');
				$("#pay-result").html('支付成功');
				break;
			default:
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('请重新支付.');
				break;
		}
	}else if(dataJson.type=="2"){
		$("#pay-type").html('支付宝支付');
		switch(jg) {
			case "200":
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('余额不足[错误码:200]');
				break;
			case "-10":
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('请重新支付[错误码:-10]');
				break;
			case "-1":
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('支付失败[错误码:-1]');
				break;
			case "0":
				$("#result-img").attr('src','img/cg.png');
				$("#pay-result").html('支付成功');
				break;
			default:
				$("#result-img").attr('src','img/sb.png');
				$("#pay-result").html('请重新支付.');
				break;
		}
	}
}