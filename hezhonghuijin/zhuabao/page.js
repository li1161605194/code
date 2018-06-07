pinpai_arr = function(_t) {
    var _a = _t.find('a');
    var caryi_arr = [];
    var caryi_url_arr = [];
    var data = [];
    for (var a = 0; a < _a.length; a++) {
        caryi_arr.push(_a.eq(a).text());
        caryi_url_arr.push(_a.eq(a).attr("href"));
        data.push({
            name: _a.eq(a).text(),
            href: _a.eq(a).attr("href")
        });
    }
    $.ajax({
        url: 'http://www.lst1.cn/php/WebCrawler/mysql_caryi.php',
        type: 'POST',
        dataType: 'json',
        data: {
            type: 1,
            data: data
        },
        success: function(res) {
            console.log(res);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}
chexi_arr = function(_t) {
    var _li = _t.find('li');
    var data = [];
    for (var a = 0; a < _li.length; a++) {
        var name = _li.eq(a).find('a h2').text();
        var price = _li.eq(a).find('a p').text();
        var img = _li.eq(a).find('a img').attr("src");
        data.push({
            fjid: 34,
            name: name,
            price: price,
            img: img
        });
    }
    $.ajax({
        url: 'http://www.lst1.cn/php/WebCrawler/mysql_caryi.php',
        type: 'POST',
        dataType: 'json',
        data: {
            type: 2,
            data: data
        },
        success: function(res) {
            console.log(res);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}
qczj_pinpai_arr = function(_t) {
    var _a = _t.find('span.open-name a');
    var data = [];
    for (var a = 0; a < _a.length; a++) {
        data.push({
            name: _a.eq(a).text(),
            href: "https://car.autohome.com.cn" + _a.eq(a).attr("href")
        });
    }
    $.ajax({
        url: 'http://www.lst1.cn/php/WebCrawler/mysql_caryi.php',
        type: 'POST',
        dataType: 'json',
        data: {
            type: 5,
            data: data
        },
        success: function(res) {
            console.log(res);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}