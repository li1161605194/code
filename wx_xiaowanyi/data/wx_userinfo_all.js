var content = {
	"Li-shitao": {
		"name": "lishitao",
		"fullname": "李石涛",
		"sex": "m",
		"date": "1992-02-18",
		"tel": 13525856987,
		"qq": 465789654,
		"wx": "asdasd",
		"dizhi": "中国河南郑州",
		"user_icon": "https://lstcode.applinzi.com/freeAPI/img/tx/28.jpg",
		"lv": "9",
		"lianxi": "0",
		"shuxing": "admin",
		"miaoshu": "管理员,最高权限",
		"beizhu": ""
	},
	"yjrxfyy": {
		"name": "lishitao",
		"fullname": "杨歌",
		"sex": "n",
		"date": "1991-12-14",
		"tel": 13525856987,
		"qq": 465789654,
		"wx": "asdasd",
		"dizhi": "中国河南郑州",
		"user_icon": "https://lstcode.applinzi.com/freeAPI/img/tx/31.jpg",
		"lv": "9",
		"lianxi": "0",
		"shuxing": "admin",
		"miaoshu": "管理员,最高权限",
		"beizhu": ""
	}
}

module.exports = {
	getContent(wx_name) {
		return content[wx_name];
	}
}