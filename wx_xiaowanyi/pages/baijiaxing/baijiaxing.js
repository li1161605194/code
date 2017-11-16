Page({
  data: {
    bjxConfig: {}
  },
  onLoad: function () {
    var that = this;
    var bjx = require('../../data/font/baijiaxing.js');
    
    var bjxdata = bjx.getContent("baiJiaXing").toString().split("|");
    var bjxleg = bjxdata.length;
    var bjxTempArray = [];
    var bjxTempJson = {};
    var a = "";
    for (var i = 0; i < bjxleg; i++) {
      if (i + 1 > 3 && ((i + 1) / 4).toString().indexOf(".") == -1) {
        bjxTempJson.content = a + bjxdata[i];
        bjxTempArray.push(bjxTempJson);
        bjxTempJson = {};
        a = "";
      } else {
        a += bjxdata[i] + "--";
        bjxTempJson.content = a;
      }
    }
    that.setData({
      bjxConfig: bjxTempArray
    })
    
  }
})
