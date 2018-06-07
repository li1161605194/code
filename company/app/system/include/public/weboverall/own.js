define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	
	var metcst=document.querySelector('meta[name="generator"]').getAttribute('data-variable'),
		DataStr=metcst.split("|"),
		met_weburl=DataStr[0],
		lang=DataStr[1],
		classnow=parseInt(DataStr[2]),
		id=parseInt(DataStr[3]),
		met_module=parseInt(DataStr[4]),
		met_skin_user=DataStr[5];
		
		window.met_weburl 		= met_weburl;	//网址
		window.lang 			= lang;	 		//语言
		window.classnow		    = classnow;		//当前栏目ID
		window.id 				= id;			//当前页面ID
		window.met_module 		= met_module;	//所属模块
		window.met_skin_user 	= met_skin_user;//所用模板
	
	/*繁体中文*/
	var StranBody = $(".StranBody");        	
	if(StranBody.length>0){
		require.async('pub/weboverall/ch/ch');
	}
	
});