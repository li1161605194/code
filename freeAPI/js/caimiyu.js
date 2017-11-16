$(function(){
	init_caimiyu();
	$("a.alink_njzs").click(function(event) {
		$("a.alink_njzs").removeClass('xuanz');
		$(this).addClass('xuanz');
		init_caimiyu();
	});
})
function init_caimiyu(params){
	var data={keyword:"",page:1,showapi_appid:ApiBase.appid,typeId:typeId[parseInt($("a.alink_njzs.xuanz").attr("typeId"))]};
	if(params) {
		$.each(params, function(i) {
			data[i] = params[i];
		});
	} else {}
	getAjaxData(ApiBase.apiUrl.CAIMIYU,data,function(res){
		miyu.miyu_data_list(res);
	},function(xhr,res){
		actionNotice({"msg":xhr});
	});
}
var miyu={
	miyu_data_list:function(data){
		var a=data.showapi_res_body.pagebean.contentlist;
		var html='';
		for(i=0;i<a.length;i++){
			html+='<div class="my_list_common">'+
					'<p class="my_mimian">'+a[i].title+'</p>'+
					'<p class="my_daan">'+a[i].answer+'</p>'+
				'</div>';
		}
		$("#my_listk").html(html);

		var totalPage = Math.ceil(parseInt(data.showapi_res_body.pagebean.allNum)/20);
		var totalRecords = parseInt(data.showapi_res_body.pagebean.allNum);
		var pageNo = getQueryString("mypage");
		if(!pageNo||isNaN(pageNo)){
			pageNo = 1;
		}
		var temp;
		temp=kkpager.generPageHtml({
			pno : pageNo,
			//总页码
			total : totalPage,
			//总数据条数
			totalRecords : totalRecords,
			isShowTotalPage :false,
			isShowTotalRecords :false,
			isShowFirstPageBtn :false,
			isShowLastPageBtn :false,
			isShowPrePageBtn :false,
			isShowNextPageBtn:false,
			mode:'click', 
			click:function(n){  
                init_caimiyu({page:n}); 
            	this.selectPage(n); //手动条用selectPage进行页码选中切换  
            }, 
			getLink : function(n){
				//return "caimiyu.html?mypage="+n;
				return "javascript:void(0)";
			}
		});
	}
}