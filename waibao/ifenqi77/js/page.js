$(function() {
    try {
        $("#header.hangdiv_common.bd-w100.header").html(headerhtml);
        $("#footer.hangdiv_common.bd-w100.footer").html(footerhtml);
        $(document).on('click', '.loginan', function() {
            window.location.href = "login.html";
        });
        $(".lunimg").click(function() {
            window.location.href = "shopdetail.html?GoodsId=2";
        });
        var nowUrl = window.location.href;
        if (nowUrl.indexOf("index.html") != -1 || nowUrl == "http://www.fengfei77.com/") {
            ajaxShopList();
        } else if (nowUrl.indexOf("shopdetail.html") != -1) {
            ajaxShopDetailList(nowUrl);
        } else if (nowUrl.indexOf("login.html") != -1) {
            $(".login-common").focus(function() {
                $(this).addClass('hong');
                var a = $(this).parent().find('img');;
                a.attr('src', a.attr("limg"));
            });
            $(".login-common").blur(function() {
                $(this).removeClass('hong');
                var a = $(this).parent().find('img');;
                a.attr('src', a.attr("himg"));
            });
        }
    } catch (e) {
        actionNotice({
            msg: "请刷新页面![" + e.message + "]"
        });
    }
})
ajaxShopList = function() {
    $.getJSON("../../data/json/indexjson.json", function(response) {
        try {
            var html = '';
            for (i = 0; i < 9; i++) {
                var atemp = new Array();
                atemp = response;
                var temp = atemp[i];
                html += '<div class="shopzk fll">' +
                    '<div class="shopdwk bd-w100">' +
                    '<ul class="shopul bd-w100">' +
                    '<li class="shopli bd-w100">' +
                    '<img class="shopimg" src="' + temp.GoodsIcon + '">' +
                    '</li>' +
                    '<li class="shopli bd-w100 mtb6">' +
                    '<p class="shopsm">' + temp.GoodsName + '</p>' +
                    '</li>' +
                    '<li class="shopli bd-w100 mtb6">' +
                    '<p class="shopjg">¥' + temp.GoodsPrice + '</p>' +
                    '</li>' +
                    '<li class="shopli bd-w100 mtb6">' +
                    '<a class="shopdetailalinkindex" href="shopdetail.html?GoodsId=' + temp.GoodsId + '">立即购买</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';
            }
            $("#goodslist").html(html);
            $("p.shopsm").css('height', getMaxHeight($("p.shopsm")) + "px");
            $("p.shopjg").css('height', getMaxHeight($("p.shopjg")) + "px");
        } catch (e) {
            actionNotice({
                msg: "请刷新页面!"
            });
        }
    });

    /*AjaxRequestWithGet("http://www.fengfei77.com/WebMainServlet", "", function(rep){
		console.info(rep);
		if(rep!=""||rep!=null||rep!=undefined||rep!=-1){
			var html='';
			for(i=0;i<9;i++){
				var temp=strToJson(rep)[i];
				html+='<div class="shopzk fll">'+
					'<div class="shopdwk bd-w100">'+
						'<ul class="shopul bd-w100">'+
							'<li class="shopli bd-w100">'+
								'<img class="shopimg" src="'+temp.GoodsIcon+'">'+
							'</li>'+
							'<li class="shopli bd-w100 mtb6">'+
								'<p class="shopsm">'+temp.GoodsName+'</p>'+
							'</li>'+
							'<li class="shopli bd-w100 mtb6">'+
								'<p class="shopjg">¥'+temp.GoodsPrice+'</p>'+
							'</li>'+
							'<li class="shopli bd-w100 mtb6">'+
								'<a class="shopdetailalink" href="shopdetail.html?GoodsId='+temp.GoodsId+'">立即购买</a>'+
							'</li>'+
						'</ul>'+
					'</div>'+
				'</div>';
			}
			$("#goodslist").html(html);
			$("p.shopsm").css('height',getMaxHeight($("p.shopsm"))+"px");
		}else{
			actionNotice({msg:"请刷新页面!!!"+rep});
		}
	}, function(){
		actionNotice({msg:"请刷新页面!!!"});
	});*/
}
ajaxShopDetailList = function(nowUrl) {
    $.getJSON("../../data/json/shopdetail.json", function(response) {
        try {
            var rep = response[getParams(nowUrl).GoodsId];
            $("#GoodsName").html(rep.GoodsName);
            $("#GoodsPrice").html(rep.GoodsPrice);
            $("#GoodsIcon").attr("src", rep.GoodsIcon);
            $("#GoodsSurplus").html(rep.GoodsSurplus);
            $("#GoodsMoreIcons").attr("src", rep.GoodsMoreIcons);
        } catch (e) {
            actionNotice({
                msg: "请刷新页面!"
            });
        }
    });

    /*AjaxRequest("http://www.fengfei77.com/WebGoodsMoreServlet",'{"GoodsId":"'+getParams(nowUrl).GoodsId+'"}' , function(rep){
		//console.info(rep);
		if(rep!=""||rep!=null||rep!=undefined||rep!=-1||rep!=-2){
			$("#GoodsName").html(rep.GoodsName);
			$("#GoodsPrice").html(rep.GoodsPrice);
			$("#GoodsIcon").attr("src",rep.GoodsIcon);
			$("#GoodsSurplus").html(rep.GoodsSurplus);
			$("#GoodsMoreIcons").attr("src",rep.GoodsMoreIcons);
		}else{
			actionNotice({msg:"请刷新页面!!!"+rep});
		}
	}, function(){
		actionNotice({msg:"请刷新页面!!!"});
	});*/
}