var indexVue = {
	init: function() {
		var app = new Vue({
			el: '#indexVue',
			data: {
				message: 'Hello Vue!'
			}
		});
	},
	xhrGetFile: function() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				myObj = JSON.parse(this.responseText);
				console.log(myObj);
			}
		};
		xmlhttp.open("GET", "/1/mvvm/ajax/json_vue_index.txt", true);
		xmlhttp.send();
	}
}
window.onload = function() {
	indexVue.init();
	//indexVue.xhrGetFile();
}