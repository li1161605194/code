$(function(){
	init_xiaohuadaquangif();
	//init_xiaohuadaquanword();
	$("a.alink_xiaohua").click(function(event) {
		$("a.alink_xiaohua").removeClass('xuanz');
		$(this).addClass('xuanz');
		if($(this).index()==0){
			init_xiaohuadaquangif();
		}else if($(this).index()==1){
			init_xiaohuadaquanjpg();
		}else if($(this).index()==2){
			init_xiaohuadaquanword();
		}
	});
	//init_xiaohuadaquanjpg();
})
function init_xiaohuadaquangif(params){
	var data={page:1,maxResult:5,showapi_appid:ApiBase.appid};
	if(params) {
		$.each(params, function(i) {
			data[i] = params[i];
		});
	} else {}
	getAjaxData(ApiBase.apiUrl.XIAOHUADAQUAN,data,function(res){
		xiaohua.xiaohua_data_list(res);
	},function(xhr,res){
		actionNotice({"msg":xhr});
	});
}
function init_xiaohuadaquanword(params){
	var data={page:1,maxResult:50,showapi_appid:ApiBase.appid};
	if(params) {
		$.each(params, function(i) {
			data[i] = params[i];
		});
	} else {}
	getAjaxData(ApiBase.apiUrl.XIAOHUADAQUAN1,data,function(res){
		xiaohua.xiaohua_data_list_word(res);
	},function(xhr,res){
		actionNotice({"msg":xhr});
	});
}
function init_xiaohuadaquanjpg(params){
	var data={page:1,maxResult:20,showapi_appid:ApiBase.appid};
	if(params) {
		$.each(params, function(i) {
			data[i] = params[i];
		});
	} else {}
	getAjaxData(ApiBase.apiUrl.XIAOHUADAQUAN2,data,function(res){
		xiaohua.xiaohua_data_list_jpg(res);
	},function(xhr,res){
		actionNotice({"msg":xhr});
	});
}
var xiaohua={
	xiaohua_data_list:function(data){
		var a=data.showapi_res_body.contentlist;
		var html='';
		for(i=0;i<a.length;i++){
			html+='<div class="my_list_common">'+
					'<p class="my_mimian">'+a[i].title+'</p>'+
					'<img src="'+a[i].img+'" />'+
				'</div>';
		}
		$("#my_listk").html(html);

		var totalPage = Math.ceil(parseInt(data.showapi_res_body.allNum)/10);
		var totalRecords = parseInt(data.showapi_res_body.allNum);
		var pageNo = getQueryString("mypage");
		if(!pageNo||isNaN(pageNo)){
			pageNo = 1;
		}
		var temp=kkpager.generPageHtml({
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
                init_xiaohuadaquangif({page:n}); 
            	this.selectPage(n); //手动条用selectPage进行页码选中切换  
            }, 
			getLink : function(n){
				//return "caimiyu.html?mypage="+n;
				return "javascript:void(0)";
			}
		});
	},
	xiaohua_data_list_word:function(data){
		var a=data.showapi_res_body.contentlist;
		var html='';
		for(i=0;i<a.length;i++){
			html+='<div class="my_list_common">'+
					'<p class="my_mimian">'+a[i].text+'</p>'+
				'</div>';
		}
		$("#my_listk").html(html);

		var totalPage = Math.ceil(parseInt(data.showapi_res_body.allNum)/50);
		var totalRecords = parseInt(data.showapi_res_body.allNum);
		var pageNo = getQueryString("mypage");
		if(!pageNo||isNaN(pageNo)){
			pageNo = 1;
		}
		var temp=kkpager.generPageHtml({
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
                init_xiaohuadaquanword({page:n}); 
            	this.selectPage(n); //手动条用selectPage进行页码选中切换  
            }, 
			getLink : function(n){
				//return "caimiyu.html?mypage="+n;
				return "javascript:void(0)";
			}
		});
	},
	xiaohua_data_list_jpg:function(data){
		var a=data.showapi_res_body.contentlist;
		var html='';
		for(i=0;i<a.length;i++){
			html+='<div class="my_list_common">'+
					'<p class="my_mimian">'+a[i].title+'</p>'+
					'<img src="'+a[i].img+'" />'+
				'</div>';
		}
		$("#my_listk").html(html);

		var totalPage = Math.ceil(parseInt(data.showapi_res_body.allNum)/10);
		var totalRecords = parseInt(data.showapi_res_body.allNum);
		var pageNo = getQueryString("mypage");
		if(!pageNo||isNaN(pageNo)){
			pageNo = 1;
		}
		var temp=kkpager.generPageHtml({
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
                init_xiaohuadaquanjpg({page:n}); 
            	this.selectPage(n); //手动条用selectPage进行页码选中切换  
            }, 
			getLink : function(n){
				//return "caimiyu.html?mypage="+n;
				return "javascript:void(0)";
			}
		});
	}
}