define(function(require, exports, module) {
	var common = require('common');   		//公用类
	
	/*设为首页*/
	var SetHome = $(".SetHome");        		
	if(SetHome.length>0){
		SetHome.click( function () {
			var obj=this,vrl=window.location,info="浏览器不支持此功能，请手动设置！";
			if(!document.all){
				alert(info);
				return false;
			}
			try{
				obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
			}catch(e){
				if(window.netscape){
					try{
						netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					}catch(e){
						alert("Your Browser does not support");
					}
					var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
						prefs.setCharPref('browser.startup.homepage',vrl);
				}
			}
		})
	}
	
	/*收藏本站*/
	var addFavorite = $(".addFavorite");        
	if(addFavorite.length>0){
		addFavorite.click( function () {
			var info = "浏览器不支持此功能，请手动设置！";
			if(!document.all){
				alert(info);
				return false;
			}
			var vDomainName=window.location.href;
			var description=document.title;
			try{
				window.external.AddFavorite(vDomainName,description);
			}catch(e){
				window.sidebar.addPanel(description,vDomainName,"");
			}
		})
	}
	
	/*繁体中文*/
	var StranBody = $(".StranBody");        	
	if(StranBody.length>0){
		require.async('effects/ch/ch');
	}
	
	//语言包下拉，参数为3/4时
	var metLang=$("#metinfo_language");					
	if(metLang.length>0){
		metLang.hover(function(){
			$(this).find("p").show();
		},function(){
			$(this).find("p").hide();
		});
	}

	

	
	
});
