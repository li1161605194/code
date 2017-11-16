Page({
  data: {
    szjConfig: {}
  },
  onLoad: function () {
    var that = this;
    var szj = require('../../data/font/sanzijing.js');
            
    var szjdata = szj.getContent("sanZiJing").toString().split("，");
    var szjleg = szjdata.length;
    var szjTempArray = [];
    var szjTempJson = {};
    var a = "";
    for (var i = 0; i < szjleg; i++) {
      if (i + 1 > 3 && ((i + 1) / 4).toString().indexOf(".") == -1) {
        szjTempJson.content = a + szjdata[i] + "。";
        szjTempArray.push(szjTempJson);
        szjTempJson = {};
        a = "";
      } else {
        a += szjdata[i] + "，";
        szjTempJson.content = a;
      }
    }
    that.setData({
      szjConfig: szjTempArray
    })
  }
})
