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
		
		window.met_weburl 		= met_weburl;	//��ַ
		window.lang 			= lang;	 		//����
		window.classnow		    = classnow;		//��ǰ��ĿID
		window.id 				= id;			//��ǰҳ��ID
		window.met_module 		= met_module;	//����ģ��
		window.met_skin_user 	= met_skin_user;//����ģ��
	
	/*��������*/
	var StranBody = $(".StranBody");        	
	if(StranBody.length>0){
		require.async('pub/weboverall/ch/ch');
	}
	
});