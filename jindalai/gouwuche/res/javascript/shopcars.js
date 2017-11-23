$(function() {
    window.onresize=function(){
        jsonMenuyiBase();
        myScroll1 = new IScroll('#wrapper1', {click:true, probeType:false, preventDefault:false, scrollX: true, scrollY: false, mouseWheel: true});
    }
    window.onunload=function(){
        setCookie("shoppingTotalPrice",0);
    }
    $(document).on("click", ".plus", function(event) {
        if (!enableKey) {
            return false;
        }
        enableKey = false;
        $this = $(this);
        var selectedProductId = $this.attr("pid");
        if ($.trim(selectedProductId) == "") {
            alert("请选择购买商品!");
            return false;
        }
        var store = $this.attr("store");
        store = parseInt(store);
        var price=$this.attr('price');
        price=parseInt(price);
        if (getCookie("shoppingTotalPrice")) {
            setCookie("shoppingTotalPrice",parseFloat(getCookie("shoppingTotalPrice")) + price);
        }else{
            setCookie("shoppingTotalPrice",price);
        }
        
        var num = $this.prev().text();
        num = parseInt(num);
        var key = false;
        var thisGoodsType = 0;
        if (num < store) {
            num = num + 1;
            key = true;
            if (num == 1) {
                thisGoodsType = 1;
            }
        }
        if (key) {
            /*$.ajax({
                url: "http://www.ecaibei.com/front/shopping!ajaxUpdate.action",
                data: { "id": selectedProductId, "quantity": num },
                type: "GET",
                dataType: "json",
                cache: false,
                success: function(data) {*/
            enableKey = true;
            //if (data.status == "success") {
            var beginLeft = $('#' + selectedProductId).offset().left;
            var beginTop = $('#' + selectedProductId).offset().top;
            var endLeft = $('#allPrice').offset().left;
            var endTop = $('#allPrice').offset().top;
            $.cartFly(beginLeft, beginTop, endLeft, endTop, selectedProductId);
            var shoppingTotalQuantity = getCookie("shoppingTotalQuantity");
            $("#totalProductQuantity").text(shoppingTotalQuantity);
            $this.prev().text(num);

            $totalP = $("#str" + selectedProductId);
            var tot = ""; //总数显示
            if (num != 0) {
                var packName = $totalP.attr("packName");
                //var packNum = $totalP.attr("packNum");
                //var unitName = $totalP.attr("unitName");
                tot = "已选" + num + packName;
                //if (unitName != null && unitName != "null" && unitName != "" && packNum != null && packNum != "null" && packNum != "") {
                    //tot = tot + "(共" + (parseInt(packNum) * num) + unitName + ")";
                //}
            }
            $totalP.html(tot);

            $totalJ = $("#jin" + selectedProductId);
            var totJ = ""; //总数显示
            if(num!=0){
                var packNumJ = $totalJ.attr("weight");
                totJ = '共<i>'+ (num * packNumJ)+'</i>斤';
            }
            $totalJ.html(totJ);

            showSumPrice();
            sumByGoodsType = sumByGoodsType + thisGoodsType;
            $("#allGoosType i").html(sumByGoodsType);
            /*} else {
                        alert(data.message);
                    }
                }
            });*/
        } else {
            enableKey = true;
        }
    });
    $(document).on("click", ".minus", function(event) {
        if (!enableKey) {
            return false;
        }
        enableKey = false;
        $this = $(this);
        var selectedProductId = $this.attr("pid");
        if ($.trim(selectedProductId) == "") {
            alert("请选择购买商品!");
            return false;
        }
        var store = $this.attr("store");
        store = parseInt(store);
        var price=$this.attr('price');
        price=parseInt(price);
        if (getCookie("shoppingTotalPrice")) {
            setCookie("shoppingTotalPrice",parseFloat(getCookie("shoppingTotalPrice")) - price);
        }
        var num = $this.next().text();
        num = parseInt(num);
        var key = false;
        var thisGoodsType = 0;
        if (num > 0) {
            num -= 1;
            key = true;
            if (num == 0) {
                thisGoodsType = 1;
            }
        }
        if (key) {
            /*$.ajax({
                url: "/front/shopping!ajaxUpdate.action",
                data: { "id": selectedProductId, "quantity": num },
                type: "POST",
                dataType: "json",
                cache: false,
                success: function(data) {*/
            enableKey = true;
            //if (data.status == "success") {
            var beginLeft = $('#allPrice').offset().left;
            var beginTop = $('#allPrice').offset().top;
            var endLeft = $('#' + selectedProductId).offset().left + $('#' + selectedProductId).width() / 2;
            var endTop = $('#' + selectedProductId).offset().top + $('#' + selectedProductId).height();
            $.cartFly(beginLeft, beginTop, endLeft, endTop, selectedProductId);
            var shoppingTotalQuantity = getCookie("shoppingTotalQuantity");
            $("#totalProductQuantity").text(shoppingTotalQuantity);
            $this.next().text(num);

            $totalP = $("#str" + selectedProductId);
            var tot = ""; //总数显示
            if (num != 0) {
                var packName = $totalP.attr("packName");
                //var packNum = $totalP.attr("packNum");
                //var unitName = $totalP.attr("unitName");
                tot = "已选" + num + packName;
                //if (unitName != null && unitName != "null" && unitName != "" && packNum != null && packNum != "null" && packNum != "") {
                    //tot = tot + "(共" + (parseInt(packNum) * num) + unitName + ")";
                //}
            }
            $totalP.text(tot);

            $totalJ = $("#jin" + selectedProductId);
            var totJ = ""; //总数显示
            if(num!=0){
                var packNumJ = $totalJ.attr("weight");
                totJ = '共<i>'+ (num * packNumJ)+'</i>斤';
            }
            $totalJ.html(totJ);

            showSumPrice();
            sumByGoodsType = sumByGoodsType - thisGoodsType;
            $("#allGoosType i").html(sumByGoodsType);
            /*} else {
                        alert(data.message);
                    }
                }
            });*/
        } else {
            enableKey = true;
        }
    });
    $(document).on('click', '.menuul li', function() {
        var a = $(this);
        a.parent().find(".xuanz").removeClass('xuanz');
        a.addClass('xuanz');
    });
    $(document).on('click', '#thelist1 li', function() {
        var a = $(this);
        jsonMenuerBase(a.attr('menuyiid'));
        myScroll2 = new IScroll('#wrapper2', {click:true, probeType:false, preventDefault:false, scrollX: false, scrollY: true, mouseWheel: true});
    });
    $(document).on('click', '#thelist2 li', function() {
        var a = $(this);
    });
    $(document).on('click',".leftimg",function(){
        var w=$("#wrapper1 li").width();
        myScroll1.scrollBy(-110, 0,500);

    });
    $(document).on('click',".rightimg",function(){
        var w=$("#wrapper1 li").width();
        myScroll1.scrollBy(110, 0,500);

    });
});


function menuyiji() {
    myScroll1 = new IScroll('#wrapper1', { click: true, useTransform: true, useTransition: true,  scrollX: true, scrollY: false, mouseWheel: true });
}

function menuerji() {
    myScroll2 = new IScroll('#wrapper2', { click: true, useTransform: true, useTransition: true,  scrollX: false, scrollY: true, mouseWheel: true });
}

function detaillistsan() {
    xmsCore.xmsFrameInit();
    scrollFrime = xmsCore.XMSScrollFrame("#wrapper3", {
        click: true,
        mouseWheel: true,
        useTransform: true, 
        useTransition: true, 
        downFn: _downFn,
        upFn: _upFn
    });
}

sumByGoodsType = 0;
page = 1;
rows = 8;
flag = true;
enableKey = true;
/****

$("#thelist3").append($("#thelist3").html()); var aaa=$("#scroller3").attr("style"); myScroll3 = new iScroll('wrapper3'); $("#scroller3").attr("style",aaa);

*****/
function _downFn() {
    //console.log("_downFn");
    $("#ulk").html('<li>' + $("#ulk li").eq(0).html() + '</li>' + $("#ulk").html());
    setTimeout(function() {
        scrollFrime.downSucc();
    }, 10);
}

function _upFn() {
    //console.log("_upFn");
    $("#ulk").html($("#ulk").html() + '<li>' + $("#ulk li").eq(0).html() + '</li>');
    setTimeout(function() {
        scrollFrime.upSucc();
    }, 10);
}

//显示购买的数目
function showSumGoodsType() {
    $("#allGoosType i").html("");
    $("#allGoosType i").html(sumByGoodsType);
}
//显示购买总的金钱
function showSumPrice() {
    var sumprice = 0.0;
    if (getCookie("shoppingTotalPrice") != null) {
        sumprice = getCookie("shoppingTotalPrice");
    }
    $("#allPrice i").html("");
    $("#allPrice i").html("¥" + parseFloat(sumprice).toFixed(2));
}



function jsonMenuyiBase(){
    var a=menuFirst;
    
    var html = '<li><span class="menuyispan uall">经常购买</span></li>';
    for (var i in a) {
        var b="menuyilicommon";
        if(i==0){
            b="xuanz";
        }
        html += '<li class="'+b+'" menuyiid="'+a[i].id+'"><span class="menuyispan">'+a[i].chineseName+'</span></li>';
    }
    $("#thelist1").html(html);
    if($(".navbar-fixed-top").width()>=a[0].widthNum){
        var s=parseFloat($("html").width())//+(40*(parseInt(i)+2));
        var t=s/(parseInt(i)+4);
        $("#scroller1").css('width',s+"px");
        $("#scroller1 li").width(t);
    }else{
        $("#scroller1").css('width',a[0].widthNum+"px");
    }   
}
function jsonMenuerBase(menuyiid){
    var a=menuSenced[menuyiid];
    
    var html = '';
    for (var i in a) {
        var b="menuyilicommon";
        if(i==0){
            b="xuanz";
        }
        html += '<li class="'+b+'" menuerid="'+a[i].id+'"><span class="menuerspan">'+a[i].chineseName+'</span></li>';
    }
    $("#thelist2").html(html);
}