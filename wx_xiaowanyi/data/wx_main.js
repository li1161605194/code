var content = {
	"swiperimg":
	[
		"https://lstcode.applinzi.com/freeAPI/img/banner/1001.jpg",
		"https://lstcode.applinzi.com/freeAPI/img/banner/1002.jpg",
		"https://lstcode.applinzi.com/freeAPI/img/banner/1003.jpg"
	]
}

module.exports = {
	getContent(wx_use) {
		return content[wx_use];
	}
}