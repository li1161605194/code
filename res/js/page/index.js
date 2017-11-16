require.config({
　　　paths: {
		"main":"../common/main"　　　　
	}　　
});
require(['main'], function (m){
	$("#getMaxWidth").click(function(){
		alert(m.getMaxWidth($(".eg-p-width")));
	});
	$("#getMaxHeight").click(function(){
		alert(m.getMaxHeight($(".eg-p-height")));
	});
	$("#highlight").click(function(){
		$("p#highlight-p").html(m.highlight(document.getElementById("highlight-p"),'text'));
	});
	$("#unhighlight").click(function(){
		$("p#highlight-p").html(m.unhighlight(document.getElementById("highlight-p")));
	});
	$("#actionNotice1").click(function(){
		m.actionNotice();
	});
	$("#actionNotice2").click(function(){
		m.actionNotice({msg:"只传一个msg"});
	});
	$("#actionNotice3").click(function(){
		m.actionNotice({
			msg:"所有参数自定义",
			time:4000,
			bgcolor:"#000",
			fontcolor:"#fff"
		});
	});
	$("#transferNumChinese").click(function(){
		var yuannum=$("#yuannum").val();
		m.transferNumChinese(yuannum,$("#chinesenum"));
	});
	
	$("#postbd").submit();
	try{
		var postDataHtml=$('#postTemp').contents().find('body');
		var data=document.getElementById("postTemp").contentWindow.name;
		console.info(data);
	}catch(e){
		console.info(e);
	}
	
	
});