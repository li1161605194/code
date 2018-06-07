var carBrandList = {
    upDownChange: function(_t, type) {
        var data = _t.parent().data("param");
        data = main.strToJson(data);
        var _down = "",
            updown_wz = "";
        if (type == 1) {
            updown_wz = "下调";
            _down = _t.parent().parent().next().find('div.dd-handle').eq(0);
        } else if (type == 2) {
            updown_wz = "上调";
            _down = _t.parent().parent().prev().find('div.dd-handle').eq(0);
        }
        var data_down = _down.data("param");
        data_down = main.strToJson(data_down);
        layer.confirm('确认' + updown_wz + data.name + '吗?', {
            title: "是否" + updown_wz
        }, function(index) {
            var old = {
                    id: data.id,
                    listorder: data_down.listorder
                },
                news = {
                    id: data_down.id,
                    listorder: data.listorder
                };
            common.post_shtml_json("ser/brand/addOrUpBrand", old, function(res) {
                if (res && res.resultCode == 200) {
                    common.post_shtml_json("ser/brand/addOrUpBrand", news, function(res) {
                        if (res && res.resultCode == 200) {
                            layer.close(index);
                            layer.msg(updown_wz + "成功!");
                            main.reloadNowPageInit();
                        }
                    });
                }
            });
        });
    },
    listTreeInit: function() {
        $('#nestable').nestable({
            group: 0
        });
        $('#nestable').nestable('collapseAll');
        $('#nestable').find('div.dd-handle').on('mouseover', function(event) {
            var _t = $(this);
            _t.find('i.list_tree_img_c').show();
            _t.find('i.up').hide();
            _t.find('i.down').hide();
            if (_t.parent().prev().hasClass('dd-item')) {
                _t.find('i.up').show();
            }
            if (_t.parent().next().hasClass('dd-item')) {
                _t.find('i.down').show();
            }
        }).on('mouseleave', function(event) {
            $(this).find('i.list_tree_img_c').hide();
        });
        $('#nestable').find('div.dd-handle i.down').on('click', function(event) {
            carBrandList.upDownChange($(this), 1);
        });
        $('#nestable').find('div.dd-handle i.up').on('click', function(event) {
            carBrandList.upDownChange($(this), 2);
        });
        $('#nestable').find('div.dd-handle i.add').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            carBrandList.showAddEditType(2, data);
        });
        $('#nestable').find('div.dd-handle i.edit').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            carBrandList.showAddEditType(3, data);
        });
        $('#nestable').find('div.dd-handle i.lock').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            var _enabled = data.enabled;
            var tips_wz = _enabled == 1 ? "禁用" : "启用";
            layer.confirm('确认' + tips_wz + '-' + data.name + '吗?', {
                title: "是否" + tips_wz
            }, function(index) {
                common.post_shtml_json("ser/brand/upBrandEnabled", {
                    id: data.id,
                    enabled: _enabled == 1 ? 0 : 1
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.close(index);
                        layer.msg(tips_wz + '成功');
                        main.reloadNowPageInit();
                    }
                });
            });
        });
        $('#nestable').find('div.dd-handle i.del').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            var _enabled = data.enabled;
            layer.confirm('确认删除-' + data.name + '吗?', {
                title: "是否删除"
            }, function(index) {
                common.post_shtml_json("ser/brand/delBrand", {
                    id: data.id
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.close(index);
                        layer.msg("删除成功!");
                        main.reloadNowPageInit();
                    }
                });
            });
        });
    },
    nodesListFor: function(data) {
        var data_no_nodes = JSON.stringify(data);
        data_no_nodes = JSON.parse(data_no_nodes);
        delete data_no_nodes.nodes;
        var html = '';
        var now_nodes = data.nodes;
        var cz_img = '' +
            '<i class="down fa list_tree_img_c fa-arrow-circle-down"></i>' +
            '<i class="up fa list_tree_img_c fa-arrow-circle-up"></i>' +
            '<i class="add fa list_tree_img_c fa-plus-square"></i>' +
            '<i class="edit fa list_tree_img_c fa-edit"></i>';
        if (data.enabled == 1) {
            cz_img += '<i class="lock fa list_tree_img_c fa-unlock-alt"></i>';
        } else {
            cz_img += '<i class="lock fa list_tree_img_c fa-lock"></i>';
        }
        if (now_nodes.length > 0) {

        } else {
            cz_img += '<i class="del fa list_tree_img_c fa-window-close"></i>';
        }
        html += '<li class="dd-item" data-id="' + data.id + '">';
        if (now_nodes.length > 0) {
            html += '<div data-param="' + main.jsonToStr(data_no_nodes) + '" class="dd-handle">' + data.name + cz_img + '</div><ol class="dd-list">';
            for (var b = 0; b < now_nodes.length; b++) {
                html += carBrandList.nodesListFor(now_nodes[b]);
            }
            html += '</ol>';
        } else {
            html += '<div data-param="' + main.jsonToStr(data_no_nodes) + '" class="dd-handle">' + data.name + cz_img + '</div>';
        }
        html += '</li>';
        return html;
    },
    menuParentInit: function() {
        common.post_shtml_json("oauth/brand/findBrandNodes", {}, function(res) {
            if (res && res.rows.length > 0) {
                var html = '';
                for (var a = 0; a < res.rows.length; a++) {
                    html += carBrandList.nodesListFor(res.rows[a]);
                }
                $("#nestable").html('<ol class="dd-list">' + html + '</ol>');
                main.initHtmlLayui();
                carBrandList.listTreeInit();
            } else {

            }
        });
    },
    vmInit: function() {
        vm = avalon.define({
            $id: configBase.vm,
            add_edit_wz: "确认添加",
            showhide_yi: true,
            showhide_er: false,
            parent_sh: false,
            parentIdname: "",
            parentId: "",
            id_sh: false,
            id: "",
            name: "",
            image: "",
            listorder: "1",
            enabled: ""
        });
    },
    uploadImage: function() {
        var uploadInst = upload.render({
            elem: '#test1',
            url: '/file/upload/addPhoto.shtml',
            before: function(obj) {
                obj.preview(function(index, file, result) {
                    $('#demo1').attr('src', result);
                });
            },
            done: function(res) {
                if (res && res.path && res.resultCode == 200 && res.resultFlag == "Y") {
                    $("#ctm_img").val(res.path);
                } else {
                    return layer.msg('上传失败,请重新上传');
                }
            },
            error: function() {
                return layer.msg('上传失败');
            }
        });
    },
    addEditCarBrandType: function() {
        form.on('submit(ctm-add)', function(data) {
            common.post_shtml_json("ser/brand/addOrUpBrand", data.field, function(res) {
                if (res && res.resultCode == 200) {
                    layer.msg("操作成功!");
                    main.reloadNowPageInit();
                }
            });
            return false;
        });
    },
    showAddEditType: function(type, data) {
        if (type == undefined || type == null) {
            return false;
        }
        vm.parent_sh = false;
        vm.parentIdname = "";
        vm.parentId = "";
        vm.id_sh = false;
        vm.id = "";
        vm.name = "";
        vm.image = "";
        vm.listorder = "1";
        vm.enabled = "";
        if (type == 1) {
            vm.parent_sh = true;
            vm.parentIdname = "根级目录";
            vm.parentId = 0;
        } else if (type == 2) {
            vm.parent_sh = true;
            vm.parentIdname = data.name;
            vm.parentId = data.id;
        } else if (type == 3) {
            vm.add_edit_wz = "确认修改";
            vm.id_sh = true;
            vm.name = data.name;
            vm.id = data.id;
            vm.listorder = data.listorder;
            vm.image = data.image;
            $("#demo1").attr("src", configBase.posturl + data.image);
            main.checkRadio("enabled", data.enabled);
        } else {}
        vm.showhide_yi = false;
        vm.showhide_er = true;
        carBrandList.addEditCarBrandType();
    },
    init: function() {
        layui.use('upload', function() {
            upload = layui.upload;
            carBrandList.uploadImage();
        });
        carBrandList.vmInit();
        $("#add_yiji").click(function() {
            carBrandList.showAddEditType(1);
        });
        $("#ctm_back").click(function() {
            vm.showhide_yi = true;
            vm.showhide_er = false;
        });
        carBrandList.menuParentInit();
    }
};
$(function() {
    carBrandList.init();
});