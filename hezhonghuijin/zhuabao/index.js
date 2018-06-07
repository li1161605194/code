var d = {
    zb_url: $("#zb_url"),
    zb_yes: $("#zb_yes"),
    zb_type: $("#zb_type"),
    res1: $("#res1"),
    res: $("#res")
}

var indexJs = {
    cleanHtmlHead: function(res) {
        var res = res.responseText.toString();
        res = Trim(res.toString());
        res = ClearBr(res);
        res = res.replace(/<!doctype html>/g, "");
        res = res.replace(/<html>/g, "");
        res = res.replace(/<\/html>/g, "");
        res = res.replace(/<head>/g, "");
        res = res.replace(/<\/head>/g, "");
        res = res.replace(/<link/g, "");
        res = res.replace(/<script/g, "");
        res = res.replace(/<\/script>/g, "");
        res = res.replace(/<meta/g, "");
        res = res.replace(/<body/g, "");
        res = res.replace(/<\/body>/g, "");
        return res;
    },
    car_yi_pinpai: function(res) {
        d.res1.html(res);
        d.res1.find("div.nr_box div.nr").eq(0).remove();
        d.res1.html(d.res1.find("div.nr_box").html());
        d.res.val(d.res1.html());
        pinpai_arr(d.res1);
    },
    car_er_chexi: function(res) {
        d.res1.html(res);
        d.res1.html(d.res1.find('ul.bear_con').html());
        d.res.val(d.res1.html());
        chexi_arr(d.res1);
    },
    car_san_chexing: function(res) {
        d.res1.html(res);

    },
    car_si_siji: function(res) {
        d.res1.html(res);

    },
    qczj_car_yi_pinpai: function(res) {
        d.res1.html(res);
        d.res1.html(d.res1.find("div#tab2-1 dl.search-dl").eq(3).find('dd').html());
        d.res.val(d.res1.html());
        qczj_pinpai_arr(d.res1);
    },
    qczj_car_er_chexi: function(res) {
        d.res1.html(res);
        d.res1.html(d.res1.find('ul.bear_con').html());
        d.res.val(d.res1.html());
        qczj_chexi_arr(d.res1);
    },
    qczj_car_san_chexing: function(res) {
        d.res1.html(res);

    },
    qczj_car_si_siji: function(res) {
        d.res1.html(res);

    },
    postUrlHtml: function() {
        jspost('POST', 'http://www.lst1.cn/php/WebCrawler/crawler.php', 'url=' + d.zb_url.val(), function(res) {
            if (res.readyState && res.readyState == 4 && res.status && res.status == 200) {
                //var temp=res.responseText.toString().replace(/<[^>]+>/g,"");
                var zb_type = d.zb_type.val();
                res = indexJs.cleanHtmlHead(res);
                if (zb_type == 1) {
                    //indexJs.car_yi_pinpai(res);
                    indexJs.qczj_car_yi_pinpai(res);
                } else if (zb_type == 2) {
                    //indexJs.car_er_chexi(res);
                    indexJs.qczj_car_er_chexi(res);
                } else if (zb_type == 3) {
                    //indexJs.car_san_chexing(res);
                    indexJs.qczj_car_san_chexing(res);
                } else if (zb_type == 4) {
                    //indexJs.car_si_siji(res);
                    indexJs.qczj_car_si_siji(res);
                } else if (zb_type == 5) {
                    indexJs.qczj_car_yi_pinpai(res);
                }
            } else {
                console.log("---");
            }
        });
    },
    init: function() {
        d.zb_yes.click(function(event) {
            indexJs.postUrlHtml();
        });
        $("#zb_json").click(function() {
            $.ajax({
                url: 'http://www.lst1.cn/php/WebCrawler/mysql_caryi.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    type: 6,
                    data: {
                        a: 1
                    }
                },
                success: function(res) {
                    console.log(res);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        });
    }
}

$(function() {
    layui.use(['form'], function() {
        var form = layui.form,
            layer = layui.layer;
        //监听指定开关
        form.on('switch(switchTest)', function(data) {
            
        });

        //监听提交
        form.on('submit(demo)', function(data) {
            layer.alert(JSON.stringify(data.field), {
                title: '最终的提交信息'
            })
            return false;
        });
        indexJs.init();
    });
});