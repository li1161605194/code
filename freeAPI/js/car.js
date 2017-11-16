$(function(){
	init_jiazhaotiku();
})
function init_jiazhaotiku(params){
	loadProductBusiness(ApiBase.json_url.C11,"",function(data){
		jiazhaoshiti(data);
	});
}
function suijishu(maxnum){
	var count = maxnum;
	var originalArray = new Array; //原数组 
	//给原数组originalArray赋值 
	for (var i = 0; i < count; i++) {
	    originalArray[i] = i + 1;
	}
	originalArray.sort(function() {
	    return 0.5 - Math.random(); 
	});
	return originalArray;
}


jiazhaoshiti=function(data){
	var d=data.result;
	var n=d.length;
	var html='';
	var temparray=suijishu(1229);
	var aaa=1;
	for(i=0;i<100;i++){
		var t=d[temparray[i]];
		var id=t.id;
		var question=t.question;
		var url=t.url;
		var item1=t.item1;
		var item2=t.item2;
		var item3=t.item3;
		var item4=t.item4;
		var answer=t.answer;
		var explains=t.explains;
		var zhidetxt="display:none;";
		var hidetxt="display:none;";
		var hidetxt1="display:none;";
		var hidetxt2="display:none;";
		var type="xuanze";
		if(item1=="正确"||item1==""||item1==undefined||item1==null){
			hidetxt="";
			type="duicuo";
		}else{
			type="xuanze";
			hidetxt1="";
		}
		if (url==""||url==null||url==undefined) {

		}else{
			hidetxt2="";
		}
		if(i==0){
			zhidetxt="";
		}else{
			zhidetxt="display:none;";
		}
		html+='<div style="'+zhidetxt+'" class="jztk_kt_common" dc="" dt_type="wei" st_type="'+type+'" initnum="'+i+'" id="shiti'+i+'">'+
				'	<input class="wentidaan" style="display:none;" type="text" id="answer'+i+'" value="'+answer_switch(answer)+'" >'+
				'	<h2 class="h2">第'+aaa+'题：</h2>'+
				'	<p class="jztk_timu"><span class="da">问题：</span>'+question+'</p>'+
				'	<p style="background-image: url('+url+');'+hidetxt2+'" class="jztk_img"></p>'+
				'	<p style="'+hidetxt1+'" class="jztk_xuanx">'+
				'		<span class="xuanxk"><span answer="" class="jztk_xzbox fa fa-square-o" data-jg="A"></span><span class="jztk_xuanxwz">A:'+item1+'</span></span>'+
				'		<span class="xuanxk"><span answer="" class="jztk_xzbox fa fa-square-o" data-jg="B"></span><span class="jztk_xuanxwz">B:'+item2+'</span></span>'+
				'		<span class="xuanxk"><span answer="" class="jztk_xzbox fa fa-square-o" data-jg="C"></span><span class="jztk_xuanxwz">C:'+item3+'</span></span>'+
				'		<span class="xuanxk"><span answer="" class="jztk_xzbox fa fa-square-o" data-jg="D"></span><span class="jztk_xuanxwz">D:'+item4+'</span></span>'+
				'	</p>'+
				'	<p style="'+hidetxt+'" class="jztk_duicuo">'+
				'		<span class="duicuok"><span answer="" class="jztk_pdbox fa fa-circle-o" data-jg="A"></span><span class="jztk_pdwz">√对</span></span>'+
				'		<span class="duicuok"><span answer="" class="jztk_pdbox fa fa-circle-o" data-jg="B"></span><span class="jztk_pdwz">×错</span></span>'+
				'	</p>'+
				'	<p style="display:none;" class="jztk_jieguo"><span class="da">正确答案：</span>'+answer_switch(answer)+'</p>'+
				'	<p style="display:none;" class="jztk_jieshi"><span class="da">问题解析：</span>'+explains+'</p>'+
				'	<a class="submitanswer" href="javascript:void(0)" idnum="'+i+'">确定</a>'+
				'</div>';
		aaa=aaa+1;
	}
	$(".jztk_ktbjk").html(html);
	$.car_questions_init("",0,1);
}

function answer_switch(daan){
	var a="";
	switch (daan) {
		case "1":
			a="A";
			break;
		case "2":
			a="B";
			break;
		case "3":
			a="C";
			break;
		case "4":
			a="D";
			break;
		case "7":
			a="AB";
			break;
		case "8":
			a="AC";
			break;
		case "9":
			a="AD";
			break;
		case "10":
			a="BC";
			break;
		case "11":
			a="BD";
			break;
		case "12":
			a="CD";
			break;
		case "13":
			a="ABC";
			break;
		case "14":
			a="ABD";
			break;
		case "15":
			a="ACD";
			break;
		case "16":
			a="BCD";
			break;
		case "17":
			a="ABCD";
			break;
		default:
			a="A";
			break;
	}
	return a;
}