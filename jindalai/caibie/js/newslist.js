$(function(){
	loadProductNewsList("../data/newslist.json",function(data){
		useDataFubction(data);
	});
	$("a[menu='mtbd']", parent.document).click(function(){
		loadProductNewsList("../data/newslist.json",function(data){
			useDataFubction(data);
		});
	});
	/*$(document).on('click','.checkHrefIframe',function(){
		$("#menuFrame", parent.document).css('display','block');
		$("#mtbdlistk", parent.document).hide();
		$("html, body").animate({
            scrollTop: 0
        }, 500);
	});*/
})
function useDataFubction(data){
	$("html, body").animate({
        scrollTop: 0
    }, 500);
	var totalPage = Math.ceil(parseInt(data.newslist.length)/10);
	var totalRecords = parseInt(data.newslist.length);
	var pageNo = getParameter();
	if(!pageNo||isNaN(pageNo)){
		pageNo = 1;
	}
	kkpager.generPageHtml({
		pno : pageNo,
		//总页码
		total : totalPage,
		//总数据条数
		totalRecords : totalRecords,
		//链接前部
		hrefFormer : 'news',
		//链接尾部
		hrefLatter : '.html',
		getLink : function(n){
			return "newsList.html?"+n;
		}
	});

	var newslist=data.newslist;
	var _newshtml='';
	var pagenumqi=(parseInt(pageNo)-1)*10;
	var tempendnum=pagenumqi+10;
	if(tempendnum>newslist.length){
		tempendnum=newslist.length;
	}
	for(i=pagenumqi;i<tempendnum;i++){
		var _temp=newslist[i];
		_newshtml+='<div class="newspop">'+
			'<a class="checkHrefIframe" target="_blank" href="'+_temp.href+'">'+
			'<div class="newsimgk"><img class="parimg" src="'+_temp.imgurl+'">'+
			'</div><div name="newspk" class="newspk">'+
			'<p class="newsbt">'+_temp.title+'<span class="newstime">'+_temp.datetime+'</span></p>'+
			'<p class="newsp">'+_temp.des+'</p></div></a></div>';
	}
	$("#dwzk").html(_newshtml);
	margincenter2();
	$("#mtbdlistk", parent.document).height($("#dwzk").height()+150);
	$("html, body", parent.document).animate({
        scrollTop: 0
    }, 500);
}

function loadProductNewsList(url,afterFn) {
	$.getJSON(url, function (response) {
		afterFn && afterFn(response);
	});
}

function getParameter(name) { 
  var r = window.location.href;
  r=r.substr(r.length-1,r.length); 
  if (r!=null) return r; return null;
}

function margincenter2(){
    var a=document.getElementsByName("newspk");
    for(i=0;i<a.length;i++){
    	var _height=a[i].offsetHeight;
    	if(_height==0||_height=="0"){
    		_height=160;
    	}
        $(".newspk").eq(i).css("margin-top",(170- _height)/2+"px");
    }
}