$(function() {
    erweimaInitImg();
    
    $("#print").click(function() {
        //$(".c_zk").printFinal({preview: false,impcss: true});
        $(".c_zk").jqprint();
    });
});

erweimaInitImg=function(){
	$("#erweima").empty().qrcode({
        render: "canvas",
        width: 100, //宽度 
        height: 100, //高度 
        text: "20170605258574" //任意内容 
    });
    $("#yiweima").empty().barcode("20170605258574", "code128", {
        barWidth: 2,
        barHeight: 30,
        showHRI: true
    });
    setTimeout(function(){
    	document.getElementById("erweima_img").src = document.getElementsByTagName("canvas")[0].toDataURL();
    },350);
}