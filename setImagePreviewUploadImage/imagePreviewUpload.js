(function() {
    var $, _this, _ImagePreviewUploadCompress, _options, _commonProcessingMethod,
        dwkId, imgId, inputId, alinkId, formId, inputNamePathId, showalinkId,
        inputName, _thisInputImgSrc,
        imgWH = 1,
        parentWone = 1,
        idNum = 1;
    $ = jQuery;
    $.fn.extend({
        imgPreview: function(options) {
            _this = $(this);
            return new ImagePreviewUploadCompress(_this, options, 1).imgPreview(options)
        },
        imgPreviewUpload: function(options) {
            _this = $(this);
            return new ImagePreviewUploadCompress(_this, options, 2).imgPreviewUpload(options)
        }
    });
    ImagePreviewUploadCompress = (function(_this, options, type) {
        _ImagePreviewUploadCompress = this;
        _commonProcessingMethod = commonProcessingMethod;
        _options = {};
        if (typeof(options) == "object" && options && options != null && options != undefined) {
            _options.url = options.url || null;
            _options.nameKey = options.nameKey || "file";
            _options.addEditType = options.addEditType || "add";
            _options.imgPreviewed = options.imgPreviewed || _commonProcessingMethod.imgPreviewed;
            _options.uploadFileed = options.uploadFileed || _commonProcessingMethod.uploadFileed;
        }
        ImagePreviewUploadCompress.prototype.init = function(options) {
            $("head").append('<style type="text/css">' +
                'a.imgchange{clean:both;float: right;cursor: pointer;}' +
                'div.imgshowk{ clean:both;float: left;}' +
                'img.imgshowk{ clean:both;}' +
                '</style>');
            $.each(_this, function(index, _thisInput) {
                _commonProcessingMethod.restructureInputDOM(_thisInput);
            });
        };
        ImagePreviewUploadCompress.prototype.imgPreview = function(options) {
            $.each(_this, function(index, _thisInput) {
                $(_thisInput).off().change(function(e) {
                    e = e || window.event;
                    _commonProcessingMethod.setImagePreview(e.target, _options.imgPreviewed);
                })
            })
        };
        ImagePreviewUploadCompress.prototype.imgPreviewUpload = function(options) {
            $.each(_this, function(index, _thisInput) {
                $(_thisInput).off("change").change(function(e) {
                    e = e || window.event;
                    var file;
                    file = $(e.target).val() || '';
                    if (!file) {
                        //return;
                    }
                    $("#" + $(e.target).attr("alinkId")).text('正在上传...');
                    return _commonProcessingMethod.setImagePreview(e.target, function(_thisInput, _options) {
                        _commonProcessingMethod.uploadFile(e.target, _options.uploadFileed);
                    });
                });
                $(_thisInput).off("mousedown").mousedown(function(e) {
                    e = e || window.event;
                    $(e.target).attr("type", "file").click();
                });
                $(_thisInput).off("mouseleave").mouseleave(function(e) {
                    e = e || window.event;
                    //$(e.target).attr("type", "text");
                });
            });
        };
        _ImagePreviewUploadCompress.init(options);
    });
    var commonProcessingMethod = {
        restructureInputDOM: function(_thisInput) {
            _thisInput = $(_thisInput);
            if (_thisInput.attr("initStatus") == undefined || _thisInput.attr("initStatus") != "end") {
                _thisInput.attr("initStatus", "end");
                inputName = _thisInput.attr("name");
                _thisInput.attr("name", _options.nameKey);
                var parentInput = _thisInput.parent();
                var parentH = parentInput.height();
                var parentW = parentInput.width();
                parentWone = parentWone == 1 ? parentW : parentWone;
                imgWH = imgWH == 1 ? parentH : imgWH;
                dwkId = "dwk" + idNum;
                imgId = "img" + idNum;
                inputId = "inputimg" + idNum;
                inputNamePathId = inputName + idNum;
                alinkId = "alink" + idNum;
                formId = "formtemp" + idNum;
                showalinkId = "showalink" + idNum;
                parentInput.append('<div style="position:relative;width:' + imgWH + 'px;height:' + imgWH + 'px;" id="' + dwkId + '" class="imgshowk">' +
                    '<img style="width:' + imgWH + 'px;height:' + imgWH + 'px;" id="' + imgId + '" class="imgshowk" />' +
                    '<a id="' + showalinkId + '" href="javascript:void(0)" onclick="hsFunctionInit(this)" style="opacity:0;position:absolute;top:0;left:0;width:' + imgWH + 'px;height:' + imgWH + 'px;"></a>' +
                    '</div>' +
                    '<input style="display:none;" type="text" name="' + inputName + '" id="' + inputNamePathId + '" />');
                parentInput.css({
                    "position": "relative",
                    "overflow": "hidden",
                    "clean": "both"
                });
                _thisInput.css({
                    "position": "absolute",
                    "right": "0",
                    "z-index": "8888",
                    "width": (parentWone - imgWH - 10) + "px",
                    "opacity": "0"
                }).attr({
                    "id": inputId,
                    "dwkId": dwkId,
                    "imgId": imgId,
                    "inputNamePathId": inputNamePathId,
                    "formId": formId,
                    "alinkId": alinkId,
                    "showalinkId": showalinkId
                });
                parentInput.append('<a id="' + alinkId + '" style="width:' + (parentWone - imgWH - 10) + 'px;height:' + imgWH + 'px;" class="btn btn-defaul btn-success imgchange" href="javascript:void(0)">选择图片</a>');
                _thisInput.wrap('<form id="' + formId + '"></form>');
            } else {
                //_thisInputUp.attr("type", "text");
            }
            if (_thisInput.attr("type") == "text") {
                _thisInputImgSrc = _thisInput.val();
                if (_thisInputImgSrc == "") {} else {
                    //_thisInputImgSrc = _thisInputImgSrc.split("auto-hzqc")[1] == undefined ? _thisInputImgSrc : _thisInputImgSrc.split("auto-hzqc")[1];
                    $("#" + _thisInput.attr("imgId")).attr("src", baseUrl + "/" + _thisInputImgSrc);
                    $("#" + _thisInput.attr("showalinkId")).attr("imgUrl", _thisInputImgSrc);
                }
                //_thisInput.attr("type", "file");
            }
            idNum = idNum + 1;
        },
        setImagePreview: function(_thisInput, callback) {
            var divs = document.getElementById($(_thisInput).attr("dwkId"));
            var imgObjPreview = document.getElementById($(_thisInput).attr("imgId"));
            if (_thisInput.files) {
                imgObjPreview.src = window.URL.createObjectURL(_thisInput.files[0]);
            } else {
                divs.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                divs.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = _thisInput.value;
                imgObjPreview.style.display = 'none';
                document.selection.empty();
            }
            return callback ? callback(_thisInput, _options) : '';
        },
        uploadFile: function(_thisInputUp, callback) {
            _thisInputUp = $(_thisInputUp);
            var fn, form, iframe, name;
            if (!(_options.url != null)) {
                fn = function() {
                    return callback('');
                };
                setTimeout(fn, 500);
                return;
            }
            name = "pickFile_" + (idNum++);
            iframe = $('<iframe name="' + name + '" id="postiframe" style="display: none" />');
            $('body').append(iframe);
            form = $("#" + _thisInputUp.attr("formId"));
            form.attr('action', baseUrl + _options.url);
            form.attr('method', 'post');
            form.attr('enctype', 'multipart/form-data');
            form.attr('encoding', 'multipart/form-data');
            form.attr('target', name);
            form.submit();
            return iframe.load(function() {
                var elem, ret, text;
                elem = iframe[0].contentWindow.document.body.childNodes[0];
                text = elem.nodeType === 1 ? elem.childNodes[0] : elem;
                if (text.nodeValue) {
                    var res = eval('(' + text.nodeValue + ')');
                    iframe.remove();
                    if (_options.addEditType && _options.addEditType == "edit") {}
                    _thisInputUp.attr("type", "text");
                    $("#" + _thisInputUp.attr("alinkId")).text('选择图片');
                    $("#" + _thisInputUp.attr("inputNamePathId")).val(res.path ? res.path : res);
                    $("#" + _thisInputUp.attr("showalinkId")).attr("imgUrl", res.path ? res.path : res);
                    return callback(res, _thisInputUp);
                } else {
                    return typeof console !== "undefined" && console !== null ? console.error('upload failed') : void 0;
                }
            });
        },
        imgPreviewed: function(_thisInput, _options) {

        },
        uploadFileed: function(res, _thisInput) {

        }
    }
}).call(this)

hsFunctionInit = function(_thislink) {
    var imgUrl = $(_thislink).attr("imgUrl");
    //imgUrl = imgUrl.split("auto-hzqc")[1] == undefined ? imgUrl : imgUrl.split("auto-hzqc")[1];
    var imgshowDiv = $('<img style="position:absolute;z-index:99999" class="showimglink" src="' + baseUrl + "/" + imgUrl + '" />');
    $("body").append(imgshowDiv);
    var w = $("body").width();
    var h = $("body").height();
    $("body").css("overflow", "hidden");
    var zzDiv = $('<div class="showimglink" style="position:fixed;top:0;left:0;z-index:999999999999999999999;width:' + w + 'px;height:' + h + 'px;' +
        'background-color: rgba(0,0,0,.5);"></div>');
    $("body").append(zzDiv);
    zzDiv.append(imgshowDiv);
    var imgw = imgshowDiv.width() == "0" ? h / 2 : imgshowDiv.width();
    var imgh = imgshowDiv.height() == "0" ? h / 2 : imgshowDiv.height();
    var newimgh = imgh,
        newimgw = imgw;
    if (imgw > w) {
        newimgw = w - 20;
        newimgh = imgh / imgw * newimgw;
    }
    if (imgh > h) {
        newimgh = h - 20;
        newimgw = imgw / imgh * newimgh;
    }
    imgshowDiv.css({
        "width": newimgw + "px",
        "height": newimgh + "px",
        "top": (h - newimgh) / 2 + "px",
        "left": (w - newimgw) / 2 + "px"
    })
    $(".showimglink").click(function(e) {
        $("body").css("overflow", "");
        $(".showimglink").remove();
    })
}