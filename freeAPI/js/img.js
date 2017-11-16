var imgpage=1;
$(function(){
	init_imgall();
	$("a.imgalink_common.prev").click(function(event) {
		imgpage--;
		init_imgall();
	});
	$("a.imgalink_common.down").click(function(event) {
		imgpage++;
		init_imgall();
	});
	$(document).on("click",".imgall_common",function(){
	//$(".imgall_common").off().on('click', function(event) {
		$(".masks").show();
		$(".showdatu").css("display","table");
		$(".showdatu").find("img").attr("src",$(this).attr("src"));
	});
	$(".showdatu").click(function(event) {
		$(".masks").hide();
		$(".showdatu").css("display","none");
	});
})
//imgpage=124 max num=50;
function init_imgall(params){
	var data={page:imgpage,num:50,showapi_appid:ApiBase.appid};
	if(params) {
		$.each(params, function(i) {
			data[i] = params[i];
		});
	} else {}
	getAjaxData(ApiBase.apiUrl.TUPIANIMGALL,data,function(res){
		img_data_list(res);
	},function(xhr,res){
		actionNotice({"msg":xhr});
	});
}
function img_data_list(data){
	var a=data.showapi_res_body.newslist;
	var html1='';
	var html2='';
	var html3='';
	for(i=0;i<a.length-3;){
		html1+='<img class="imgall_common" src="'+a[i].picUrl+'" />'
		html2+='<img class="imgall_common" src="'+a[i+1].picUrl+'" />'
		html3+='<img class="imgall_common" src="'+a[i+2].picUrl+'" />'
		i=i+3;
	}
	$("#imgzk .yi").html(html1);
	$("#imgzk .er").html(html2);
	$("#imgzk .san").html(html3);
}






































