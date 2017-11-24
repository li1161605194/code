
$("#J-passIntro").on("shown",function(e){
    $("a[data-target=#J-passIntro]").addClass("intro-up").removeClass("intro-down");
});
$("#J-passIntro").on("hidden",function(e){
    $("a[data-target=#J-passIntro]").addClass("intro-down").removeClass("intro-up");
    window.localStorage["showIntro"] = false;
});
//200毫秒后展示列表，这样动画效果会更顺畅
setTimeout(function(){
	//fixedAlipassType();
},200);
//筛选
$("#J-siftPass li a").bind("click",function(e){
    var states = $(this).hasClass("active");
    //更替选中状态
    if(states){
        $(this).removeClass("active");
    }else{
        $(this).addClass("active");
    }
    //筛选
    var alipassType = getAlipassType();
    siftAlipass(alipassType);
    fixedAlipassType();
});
//根据数组筛选
function siftAlipass(typeArr){
    $("#J-pass-template>div.pass-template-item").each(function(i,n){
        var type = $(n).attr("data-type");
        if($.inArray(type,typeArr) > -1){
            $(n).show();
        }else{
            $(n).hide();
        }
    });
}
//获取模板
function getAlipassType(){
    var alipassType = [];
    $("#J-siftPass li a.active").each(function(i,n){
        alipassType.push($(n).attr("data-type"));
    });
    return alipassType;
}
//定位
function fixedAlipassType(){
    var box = {
        w:240,
        h:335
    };
    $("#J-pass-template").css("position","relative");
    $("#J-pass-template>div.pass-template-item").css("position","absolute");
    $("#J-pass-template>div.pass-template-item:visible").each(function(i,n){
        $(n).css({left:(i%4*box.w)+"px",top:Math.floor(i/4)*box.h+"px"});
    });
    var vlen = $("#J-pass-template>div.pass-template-item:visible").length;
    $("#J-pass-template").css({"height":Math.ceil(vlen/4)*box.h});
}
//弹窗
//确定那个卡券被点击
$("[data-toggle=modal]").on("click",function(e){
    $("[data-modal-state=show]").attr("data-modal-state","hide");
    $(this).attr("data-modal-state","show");
});
$("#J-dialog").on("show",function(e){
    var pass = $("[data-modal-state=show]");
    var passEditUrl = pass.attr("data-editUrl"),
        passDownloadUrl = pass.attr("data-downloadUrl"),
        passImgUrl = pass.find("img").attr("src"),
        passName = pass.attr("data-name");
    $("#J-dialog").find(".modal-body").empty().append('<div style="text-align: center;"><img src="'+passImgUrl+'" width="400px" alt="" /></div>');
    $("#J-dialog").find(".modal-footer .btn[data-role=download]").attr("href",passDownloadUrl);
    $("#J-dialog").find(".modal-footer .btn[data-role=edit]").attr("href",passEditUrl);
    $("#J-dialog").find(".modal-header h3").text(passName);
});
