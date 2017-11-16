$(function() {
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('mapzk', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 30000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(1, 1), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
    });
    map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
    });
    if (location.href.indexOf('&guide=1') !== -1) {
        map.setStatus({
            scrollWheel: false
        })
    }

    getPosition(function(lng, lat) {
        console.info(lng + "------" + lat);
        var out = document.getElementById('out');
        out.innerHTML = '当前经度:' + lng + '<br/>当前纬度' + lat;
    });
})

function onComplete(data) {
    ajaxDiZhiInfo(data.position.getLng(), data.position.getLat());
    var str = ['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    str.push('精度：' + data.accuracy + ' 米');
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    document.getElementById('tip').innerHTML = str.join('<br>');
    $("#longitude").val(data.position.getLng());
    $("#latitude").val(data.position.getLat());
    $("#loc_time").val(Math.round(new Date().getTime() / 1000));
}

function onError(data) {
    document.getElementById('tip').innerHTML = '定位失败';
}

function getPosition(callback) {
    if ("geolocation" in navigator) {
        var geo_options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 6000
        };
        try {
            navigator.geolocation.getCurrentPosition(function(pos) {
                // 获取到当前位置经纬度
                var lng = pos.coords.longitude;
                var lat = pos.coords.latitude;
                callback(lng, lat);
            }, function(err) {
                actionNotice({
                    'msg': err.message
                });
            }, geo_options);
        } catch (e) {
            actionNotice({
                'msg': "Browser didnt support geolocation"
            });
        }
    } else {
        actionNotice({
            'msg': "Browser didnt support geolocation"
        });
    }
}

function dingweisan() {
    $.ajax({
        type: "get",
        url: "http://restapi.amap.com/v3/ip?output=json&key=bf120d0cf0d36b17ed7645ae12d629ed",
        dataType: "json",
        success: function(res) {
            console.info(res);
            var a = res.rectangle.split(";");
            var b = a[0].split(",");
            var c = a[1].split(",");
            var jd = (parseFloat(b[0]) + parseFloat(c[0])) / 2;
            var wd = (parseFloat(b[1]) + parseFloat(c[1])) / 2;
            console.info(jd, wd);
        }
    })
}








function ajaxDiZhiInfo(lng, lat) {
    $.ajax({
        type: "GET",
        url: "http://restapi.amap.com/v3/geocode/regeo?output=json&location=" + lng + "," + lat + "&key=bf120d0cf0d36b17ed7645ae12d629ed",
        success: function(res) {
            if (res.status == "1") {
                $('#dizhiinfo').html(res.regeocode.formatted_address + "(" + res.regeocode.addressComponent.streetNumber.street + ")");
                ajaxTianQiInfo(res.regeocode.addressComponent.adcode);
            } else {
                actionNotice({
                    'msg': res.info
                });
            }
        }
    })
}

function ajaxTianQiInfo(adcode) {
    $.ajax({
        type: "GET",
        url: "http://restapi.amap.com/v3/weather/weatherInfo?city=" + adcode + "&key=bf120d0cf0d36b17ed7645ae12d629ed&output=json&extensions",
        success: function(res) {
            if (res.status == "1") {
                var html = '天气:' + res.lives[0].weather + '<br>' +
                    '温度:' + res.lives[0].temperature + '℃<br>' +
                    '发布时间:' + res.lives[0].reporttime + '<br>';
                $('#tianqiinfo').html(html);
            } else {
                actionNotice({
                    'msg': res.info
                });
            }
        }
    })
}

actionNotice = function(data) {
    var params = {};
    params.msg = "操作执行";
    params.time = 3000;
    params.fontcolor = "#3A87ADe";
    params.bgcolor = "#D9EDF7";
    if (data) {
        $.each(data, function(i) {
            params[i] = data[i];
        });
    } else {

    }
    $('#succ_msg').clearQueue().remove();
    var screen_width = $(window).width() / 2 - 300 / 2;
    var screen_height = $(window).height() / 2 - 40 / 2;
    var html = '<div id="succ_msg" style="_position:absolute;display:none;padding: 15px;position:fixed;top:' + screen_height + 'px;z-index:9999999999;width:300px;left:' + screen_width + 'px;border-radius: 4px;background-color: ' + params.bgcolor + ';border-color: #BCE8F1;color:' + params.fontcolor + ' ;font-size:14px;line-height:26px;text-align:center;font-weight:bold;">' + params.msg + '</div>';
    $('body').append(html);
    $("#succ_msg").fadeIn(500);
    setTimeout(function() {
        $("#succ_msg").fadeOut(500);
    }, params.time);
}