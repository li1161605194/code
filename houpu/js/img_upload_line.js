$(function(){

})

var upfile={
	init: function (element, valueAccessor) {
            var button, buttonText, del, display, el, input, parent, uploadFile, value, tool,role,edit;
            el = $(element);
            value = valueAccessor();
            parent = el.closest('.input-append');
			role = parent.attr("data-role");
            display = parent.find('input:text');//显示框 文件名或者是图片地址
            input = parent.find('input:file');
            button = parent.find('button');
            del = parent.find('a.btn-link[data-role=del]');
            edit = parent.find('a.btn-link[data-role=edit]');
            tool = parent.next('p.help-block');
            buttonText = button.text();

            //上传文件
            uploadFile = function (file, callback) {
                var fn, form, iframe, name;
                if (!(uploadingUrl != null)) {
                    fn = function () {
                        return callback('');
                    };
                    setTimeout(fn, 500);
                    return;
                }
                name = "pickFile_" + (++pickFileCounter);
                iframe = $('<iframe name="' + name + '" id="postiframe" style="display: none" />');
                $('body').append(iframe);
                form = el.closest('form');
                form.attr('action', uploadingUrl + "?imgId="+role);
                form.attr('method', 'post');
                form.attr('enctype', 'multipart/form-data');
                form.attr('encoding', 'multipart/form-data');
                form.attr('target', name);
                form.submit();
                return iframe.load(function () {
                    var elem, ret, text;
                    elem = iframe[0].contentWindow.document.body.childNodes[0];
                    text = elem.nodeType === 1 ? elem.childNodes[0] : elem;
                    if (ret = ko.utils.parseJson(text.nodeValue)) {
                        iframe.remove();
                        return callback(ret);
                    } else {
                        return typeof console !== "undefined" && console !== null ? console.error('upload failed') : void 0;
                    }
                });
            };
            setImagePreview =function(feils, setimgid, callback) {
                 //input
                 //var docObj = document.getElementById("transfer_img");
                 //img
                 var imgObjPreview = document.getElementById("preview"+setimgid);
                 //div
                 var divs = document.getElementById("localImag"+setimgid);
                 if (feils) {
                     //火狐下，直接设img属性
                     //imgObjPreview.src = docObj.files[0].getAsDataURL();
                     //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                     imgObjPreview.src = window.URL.createObjectURL(feils);
                 } else {
                     //IE下，使用滤镜
                     docObj.select();
                     var imgSrc = document.selection.createRange().text;
                     var localImagId = document.getElementById("localImag"+setimgid);
                     //必须设置初始大小
                     //图片异常的捕捉，防止用户修改后缀来伪造图片
                     try {
                         localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                         localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                     } catch (e) {
                         alert("您上传的图片格式不正确，请重新选择!");
                         return false;
                     }
                     imgObjPreview.style.display = 'none';
                     document.selection.empty();
                 }
                return callback();
             },
            //确认选择的文件框
            input.change(function () {
                var file;
                file = input.val() || '';
                if (!file) {
                    return;
                }
                display.val(file);
                button.prop('disabled', true);
                button.text('正在上传');
                return setImagePreview(input[0].files[0],button.attr("setimgid"),function(){
                    button.prop('disabled', false);
                    return button.text(buttonText);
                });
            });
            //点击选择文件
            button.add(display).click(function () {
                return input[0].click();
            });
            //删除事件
            del.click(function () {
				input.val("");
				display.val("");
                tool.text("");
                return value('');
            });
            //绑定输入框点击选择文件事件
            var displayClickEvent = function(isChooseFile){
                if(isChooseFile){
                    display.on("click",function(e){
                        return input[0].click();
                    });
                }else{
                    display.off("click");
                }

            };
}