(function($) {
    $.extend($.fn, {
        addIMG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyREU4ODBCRjUxMTAxMUU0QkM1M0Y0ODMwMjJDRTRDRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyREU4ODBDMDUxMTAxMUU0QkM1M0Y0ODMwMjJDRTRDRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJERTg4MEJENTExMDExRTRCQzUzRjQ4MzAyMkNFNENEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJERTg4MEJFNTExMDExRTRCQzUzRjQ4MzAyMkNFNENEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5NovCgAAAGlJREFUeNrs2LENgCAQBVBgGwsb95+BxsIpLGisdQETctUZ388N8PIDJEc9x1XypZWUwcLCwsLCwsLC+gjr2Psz2sLCCqXG9sT5S7es2+/beusv1o0jj+Xd8r+FhYWFhYWFhYWVJrcAAwAm3xahXNlvxgAAAABJRU5ErkJggg==',
        addIMGHTML: '<div class="inputFilebjk_c">' +
            '<input type="file" name="fileToUpload" class="fileToUpload" multiple="multiple" accept="image/*" capture="camera" />' +
            '<div class="filename_c"></div><div class="thumb"></div></div>',
        fileUpload: function(opts) {
            this.each(function() {
                var $self = $(this);
                var doms = {
                    "fileToUpload": $self.find(".fileToUpload"),
                    "thumb": $self.find(".thumb"),
                    "filename_c": $self.find(".filename_c") //"progress": $self.find(".upload-progress")
                };
                var funs = {
                    //选择文件，获取文件大小，也可以在这里获取文件格式，限制用户上传非要求格式的文件
                    "fileSelected": function() {
                        for (var i = 0; i < doms.fileToUpload.size(); i++) {
                            var _thisInputFile = doms.fileToUpload.eq(i);
                            var _tIF_size = _thisInputFile.data("size");
                            var files = _thisInputFile[0].files;
                            var count = files.length;
                            for (var index = 0; index < count; index++) {
                                var file = files[index];
                                var fileName = file.name;
                                var fileType = file.type;
                                var fileSize = (Math.round(file.size * 100 / 1024) / 100).toString();
                                if (fileSize > _tIF_size) {
                                    console.log('单张图片size过大');
                                } else {
                                    funs.uploadFile(file, _thisInputFile);
                                }
                            }
                        }
                    },
                    //异步上传文件
                    uploadFile: function(file, _thisInputFile) {
                        var fd = new FormData(); //创建表单数据对象
                        var _tIF_picid = _thisInputFile.data("picid");
                        var _tIF_type = _thisInputFile.data("type");
                        var _tIF_name = _thisInputFile.data("name");
                        fd.append("picId", _tIF_picid);
                        fd.append("type", _tIF_type);
                        fd.append("name", _tIF_name);
                        fd.append("file", file); //将文件添加到表单数据中
                        funs.previewImage(file); //上传前预览图片，也可以通过其他方法预览txt

                        var xhr = new XMLHttpRequest();
                        //xhr.upload.addEventListener("progress", funs.uploadProgress, false); //监听上传进度
                        xhr.addEventListener("load", funs.uploadComplete, false);
                        xhr.addEventListener("error", opts.uploadFailed, false);
                        xhr.open("POST", opts.url);
                        xhr.onreadystatechange = function() {
                            if (this.readyState == 4) {
                                console.log(this.responseText);
                            }
                        }
                        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');  
                        xhr.send(fd);
                        return false;  
                    },
                    //文件预览
                    previewImage: function(file) {
                        var gallery = doms.thumb;
                        var img = document.createElement("img");
                        img.file = file;
                        doms.thumb.html(img);
                        doms.filename_c.html(file.name);
                        // 使用FileReader方法显示图片内容
                        var reader = new FileReader();
                        reader.onload = (function(aImg) {
                            return function(e) {
                                aImg.src = e.target.result;
                            };
                        })(img);
                        reader.readAsDataURL(file);
                    },
                    /*uploadProgress: function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                            doms.progress.html(percentComplete.toString() + '%');
                        }
                    },*/
                    "uploadComplete": function(evt) {
                        alert(evt.target.responseText)
                    }
                };
                doms.fileToUpload.on("change", function() {
                    //doms.progress.find("span").width("0");
                    funs.fileSelected();
                });
            });
        }
    });
})(Zepto);