window.onload = function() {
	var _WDF = new WDF({
		hb: "wdf_hb",
		hs: 4,
		ss: 4
	});
	_WDF.init();
}

var WDF = function(options) {
	var ctx, wdf_hb = document.getElementById(options.hb);
	WDF.prototype.init = function() {
		elementDOMCentent();
		ctx = wdf_hb.getContext("2d");
		onePixelLineTo();
		ctx.save();

		clickTabCanvas();

		/*ctx.fillStyle = "#FF0000";
		ctx.beginPath();
		ctx.arc(80, 80, 20, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.arc(160, 160, 20, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();*/

	};
	clickTabCanvas = function() {
		wdf_hb.addEventListener("click", function(e) {
			var _e = e || window.event;
			x = parseFloat(_e.clientX);
			y = parseFloat(_e.clientY) - parseFloat(options.marTop);
			var _x = x / parseFloat(options.cell_width);
			if(_x.toString().indexOf(".") != -1) {
				var temp = parseInt(_x.toString().split(".")[1]);
				if(temp < 5) {
					_x = parseInt(_x.toString().split(".")[0]);
				} else if(temp > 5) {
					_x = parseInt(_x.toString().split(".")[0]);
				} else {
					return false;
				}
			}
			var _y = y / parseFloat(options.cell_height);
			if(_y.toString().indexOf(".") != -1) {
				var temp = parseInt(_y.toString().split(".")[1]);
				if(temp < 5) {
					_y = parseInt(_y.toString().split(".")[0]);
				} else if(temp > 5) {
					_y = parseInt(_y.toString().split(".")[0]);
				} else {
					return false;
				}
			}
			console.info(x + "," + y);
			console.info(options.cell_width + "," + options.cell_height);
			console.info(_x + "," + _y);

			ctx.fillStyle = "#000000";
			ctx.beginPath();
			ctx.arc(options.cell_width * _x, options.cell_height * _y, 20, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}, false);
	};
	elementDOMCentent = function() {
		var _zw = document.documentElement.clientWidth || document.body.clientWidth;
		var _zh = document.documentElement.clientHeight || document.body.clientHeight;
		wdf_hb.width = _zw - 20;
		wdf_hb.height = _zw - 20;
		wdf_hb.style.width = _zw - 20 + "px";
		wdf_hb.style.height = _zw - 20 + "px";
		options.marTop = (_zh - _zw - 20) / 2;
		wdf_hb.style.marginTop = options.marTop + "px";
	};
	onePixelLineTo = function() {
		var cell_height = wdf_hb.height / options.hs;
		var cell_width = wdf_hb.width / options.ss;
		options.cell_height = cell_height;
		options.cell_width = cell_width;
		ctx.strokeStyle = "#000";
		for(var col = 0; col <= options.ss; col++) {
			var x = col * cell_width;
			if(x.toString().indexOf(".") != -1) {
				x = parseInt(x.toString().split(".")[0]);
			}
			var py_xz = col == options.ss ? 0 : 0.5;
			ctx.moveTo(x + py_xz, 0);
			ctx.lineTo(x + py_xz, wdf_hb.height);
			ctx.stroke();
		}
		for(var row = 0; row <= options.hs; row++) {
			var y = row * cell_height;
			if(y.toString().indexOf(".") != -1) {
				y = parseInt(y.toString().split(".")[0]);
			}
			var py_xz = row == options.hs ? 0 : 0.5;
			ctx.moveTo(0, y + py_xz);
			ctx.lineTo(wdf_hb.width, y + py_xz);
			ctx.stroke();
		}
	};
}