$(function(){
	pageInit();
	if(window.location.href.indexOf("yangge")!=-1){
		document.ontouchstart = null;document.ontuchmove = null;document.ontouchend = null;
	}
})
function pageInit(){
	$(".dkdg_js_bd").height($(".dkdg_js_bd").width());
	window.onresize=function(){
        $(".dkdg_js_bd").height($(".dkdg_js_bd").width());
    }
}

function loadProductBusiness(url,param,afterFn) {
	$.getJSON(url, function (response) {
		if (!response.success){
            if(response.resultCode&& response.resultCode== 1019){
              window.location.href="/404.html";
            }
            return;
        }
		afterFn && afterFn(response);
	});
}
/*function weblanpost(){
	var data={"params":[["key",ApiBase.juheapikey_jztk],["subject","4"],["model","c1"],["testType","order"]],"params_url":ApiBase.apiUrl.JIAZHAOTIKU}
	if(params) {
		$.each(params, function(i) {
			data[i] = params[i];
		});
	} else {}
	postAjaxData("http://lstcode.applinzi.com/freeAPI/get.php",data,function(res){
		jiazhaoshiti(res);
	},function(xhr,res){
		actionNotice({"msg":xhr});
	});
}*/

var ApiBase={
	appid:"14048",
	secret:"2659e60a20734bc6b063204e5d9c4097",
	juheapikey_jztk:"aa768f759c5906bad121c4678ce79402",
	apiUrl:{
		CAIMIYU:"https://route.showapi.com/151-4",
		JIAZHAOTIKU:"http://api2.juheapi.com/jztk/query",
		TUPIANIMGALL:"http://route.showapi.com/197-1",
		XIAOHUADAQUAN:"http://route.showapi.com/341-3",
		XIAOHUADAQUAN1:"http://route.showapi.com/341-1",
		XIAOHUADAQUAN2:"http://route.showapi.com/341-2"	
	},
	json_url:{
		C11:"http://lstcode.applinzi.com/data/json/car_1_c1.json",
		C14:"http://lstcode.applinzi.com/data/json/car_4_c1.json"
	}
}

//keyword  搜索关键字
	//typeId  谜语类别
	//showapi_appid  应用的appid
var typeId=new Array("gxmy","zmmy","cymy","dwmy","aqmy","dmmy","rmmy","dimmy","cy","dgmy","ry","etmy",
"wpmy","zwmy","jmmy","sbmy","symy","ypmy","yymy","ysmy","cwmy","qtmy","miyujingxuan","mygs","njmy","zlmy")
// 搞笑0=gxmy,字谜1=zmmy,成语2=cymy,动物3=dwmy,爱情4=aqmy,灯谜5dmmy,人名6=rmmy,地名7=dimmy,词语8=cy,带格9=dgmy,用语10=ry,
// 儿童11=etmy,物品12=wpmy,植物13=zwmy,名谜14=jmmy,书报15=sbmy,俗语16=symy,药品17=ypmy,音乐18=yymy,影视19=ysmy,称谓20=cwmy,趣味21=qtmy,
// 精选22=miyujingxuan,故事23=mygs,脑筋急转弯24=njmy,智力问答25=zlmy

// key   您申请的appKey
	// subject  int   选择考试科目类型，1：科目1；4：科目4
	// model   驾照类型，可选择参数为：c1,c2,a1,a2,b1,b2；当subject=4时可省略
	// testType  测试类型，rand：随机测试（随机100个题目），order：顺序测试（所选科目全部题目）
/*驾照answer
"1": "A或者正确",
"2": "B或者错误",
"3": "C",
"4": "D",
"7": "AB",
"8": "AC",
"9": "AD",
"10": "BC",
"11": "BD",
"12": "CD",
"13": "ABC",
"14": "ABD",
"15": "ACD",
"16": "BCD",
"17": "ABCD"*/


keyZiDianPaiXu=function(data){
	var dic=data;
    var sdic=Object.keys(dic).sort(); 
    var temp="";
    for(ki in sdic){
    	if(dic[sdic[ki]]==""||dic[sdic[ki]]==null||dic[sdic[ki]]==undefined){

    	}else{
	        temp+=sdic[ki]+dic[sdic[ki]];
	    }
    }
    return temp;
}
getAjaxData=function(url,data,sucfun,errfun){
	data.showapi_sign=$.md5(keyZiDianPaiXu(data)+ApiBase.secret);
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		data: data,
		success:sucfun,
		error:errfun
	});
	
}
postAjaxData=function(url,data,sucfun,errfun){
	//data.showapi_sign=$.md5(keyZiDianPaiXu(data)+ApiBase.secret);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: data,
		success:sucfun,
		error:errfun
	});
	
}

actionNotice=function(data) {
	var params = {};
	params.msg = "操作执行";
	params.time = 1000;
	params.fontcolor = "#3A87ADe";
	params.bgcolor = "#D9EDF7";
	if(data) {
		$.each(data, function(i) {
			params[i] = data[i];
		});
	} else {

	}
	$('#succ_msg').clearQueue().remove();
	var screen_width = $(window).width() / 2 - 300 / 2;
	var screen_height = $(window).height() / 2 - 40 / 2;
	var html = '<div id="succ_msg" style="_position:absolute;display:none;padding: 15px 0;'+
	'position:fixed;top:' + screen_height + 'px;z-index:9999999999;width:90%;margin:0 auto;left:5%;'+
	'border-radius: 4px;background-color: ' + params.bgcolor + ';border-color: #BCE8F1;color:' + params.fontcolor + ' ;'+
	'font-size:14px;line-height:26px;text-align:center;font-weight:bold;">' + params.msg + '</div>';
	$('body').append(html);
	$("#succ_msg").fadeIn(500);
	setTimeout(function() {
		$("#succ_msg").fadeOut(500);
	}, params.time);
}

function getParameter(name) { 
  var r = window.location.href;
  r=r.substr(r.length-1,r.length); 
  if (r!=null) return r; return 1;
}
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return 1; 
} 