Page({
  data: {
    qzwConfig: {}
  },
  onLoad: function () {
    var that = this;
    var qzw = require('../../data/font/qianziwen.js');
    
    var qzwdata = qzw.getContent("qianZiWen").toString();
    var qzwleg = qzwdata.length;
    var qzwTempArray = [];
    var qzwTempJson = {};
    var a = "";
    for (var i = 0; i < qzwleg; i++) {
      if (i + 1 > 7 && ((i + 1) / 8).toString().indexOf(".") == -1) {
        qzwTempJson.content = a + qzwdata[i];
        qzwTempArray.push(qzwTempJson);
        qzwTempJson = {};
        a = "";
      } else {
        a += qzwdata[i] + "-";
        qzwTempJson.content = a;
      }
    }
    that.setData({
      qzwConfig: qzwTempArray
    })
  }
})
