/**
 * Created by JetBrains PhpStorm.
 * User: wb-lijc
 * Date: 13-8-14
 */
var passEditCfg = {
	passTemplate:"passTemplate",//localStorage保存业务模板的命名空间
	passBusiness:"passBusiness",//localStorage保存商户编辑的业务数据的命名空间
	//loadUrl:"/builder/builderJsonIndex.json",
	loadUrl:"json/builderJsonIndex.json",
	//loadUrl:"data.js",
	saveUrl:"/builder/builderJsonSave.json"
}
//请求业务数据
//afterFn 会传入请求的完整响应
function loadProductBusiness(param,afterFn) {
	if (!param || !param.tempId) return;
	var tempId = param.tempId,
		productType = param.productType || "free";
	var url = passEditCfg.loadUrl + "?tempId=" + tempId +"&productType="+productType+"&copyFrom="+param.copyFrom+"&func="+param.func;
	var storageUri = passEditCfg.passBusiness + "_" + tempId;
	$.getJSON(url, function (response) {
		if (!response.success){
            if(response.resultCode&& response.resultCode== 1019){
              window.location.href="/error.htm";
            }
            return;
        }
		afterFn && afterFn(response);
	});
}
//保存业务数据到本地
function saveProductToLocal(tempId, data) {
	if (!tempId || !data) return;
	var storageUri = passEditCfg.passBusiness + "_" + tempId;
	var oldData = window.localStorage[storageUri];
	if (typeof data != "string") {
		data = JSON.stringify(data);
	}
	if (data !== oldData) {
		window.localStorage[storageUri] = data;
	}
}
//检查必填项 fieldList {string} 需要检查的uri
function checkRequired (fieldList){
	if(model && fieldList.length > 0){
		var data = model.export();
		var uriArr = fieldList.split("."),val = data;
		uriArr.forEach(function(uri,i,uriArr){
			val = val[uri];
		});
	}
}
//替换模板
function parseTpl(html,data){
	if (typeof data === 'string') {
		html = html.replace(new RegExp('\\{\_string\_\}', 'gm'), data);
	} else {
		for (var attr in data) {
			html = html.replace(new RegExp('\\{' + attr + '\}', 'gm'), data[attr]);
		}
	}
	html = html.replace(new RegExp('\\{[A-Za-z0-9]*}', 'gm'), '');
	return html;
}
