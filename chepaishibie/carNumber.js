var carImage;
var minX, maxX, minY, maxY;
$(function() {
    $("#discriminate0").click(function() {
        diyibu();
    });
    $("#discriminate1").click(function() {
        dierbu();
    });
    $("#discriminate2").click(function() {
        disanbu();
    });
    $("#discriminate3").click(function() {
        disibu();
    });
    $("#discriminate4").click(function() {
        diwubu();
    });
})


diyibu = function() {
    var canvas = document.getElementById("carCanvas0");
    carImage = document.getElementById("carImg");
    // 将图片的高宽赋值给画布
    canvas.width = carImage.width;
    canvas.height = carImage.height;
    // 获得二维渲染上下文
    if (canvas.getContext) { //为了安全起见，先判断浏览器是否支持canvas
        var context = canvas.getContext("2d");
        context.drawImage(carImage, 0, 0); //将得到的image图像绘制在canvas对象中
        var canvasData = context.getImageData(0, 0, canvas.width, canvas.height); //返回ImageData对象
        console.info(canvasData);
        console.info(canvasData.width.toString());
        console.info(canvasData.height.toString());
        // 填充灰色【读取像素值和实现灰度计算】
        for (var x = 0; x < canvasData.width; x++) {
            for (var y = 0; y < canvasData.height; y++) {
                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var r = canvasData.data[idx + 0];
                var g = canvasData.data[idx + 1];
                var b = canvasData.data[idx + 2];
                // 灰度的计算
                var gray = .299 * r + .587 * g + .114 * b;
                // assign gray scale value
                canvasData.data[idx + 0] = gray; // Red channel
                canvasData.data[idx + 1] = gray; // Green channel
                canvasData.data[idx + 2] = gray; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
                // 新增黑色边框
                /*if (x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {
                    canvasData.data[idx + 0] = 0;
                    canvasData.data[idx + 1] = 0;
                    canvasData.data[idx + 2] = 0;
                }*/
            }
        }
        context.putImageData(canvasData, 0, 0); // 处理完成的数据重新载入到canvas二维对象中
    } else {
        alert("your browser does not support canvas!");
    }
}

dierbu = function() {
    var c = document.getElementById("carCanvas0");
    var ctx = c.getContext("2d");
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    imgData = Gaussian_blur(imgData, c.width, c.height, 3, 1);
    console.info(imgData);
    var imgDataleg = imgData.data.length;
    var initmin = 185,
        initmax = 255;
    for (var i = 0; i < imgDataleg; i = i + 4) {
        var r = imgData.data[i];
        var g = imgData.data[i + 1];
        var b = imgData.data[i + 2];
        var a = imgData.data[i + 3];
        if (r == g && g == b && initmin < r && r < initmax) {
            imgData.data[i] = 255;
            imgData.data[i + 1] = 255;
            imgData.data[i + 2] = 255;
            imgData.data[i + 3] = 255;
        } else {
            imgData.data[i] = 0;
            imgData.data[i + 1] = 0;
            imgData.data[i + 2] = 0;
            imgData.data[i + 3] = 255;
        }
    }
    var c1 = document.getElementById("carCanvas1");
    c1.width = carImage.width;
    c1.height = carImage.height;
    var ctx1 = c1.getContext("2d");
    ctx1.putImageData(imgData, 0, 0);
}

disanbu = function() {
    var canvas = document.getElementById("carCanvas2");
    carImage = document.getElementById("carImg");
    // 将图片的高宽赋值给画布
    canvas.width = carImage.width;
    canvas.height = carImage.height;
    // 获得二维渲染上下文
    if (canvas.getContext) { //为了安全起见，先判断浏览器是否支持canvas
        var context = canvas.getContext("2d");
        context.drawImage(carImage, 0, 0); //将得到的image图像绘制在canvas对象中
        var canvasData = context.getImageData(0, 0, canvas.width, canvas.height); //返回ImageData对象
        // 填充灰色【读取像素值和实现灰度计算】
        for (var x = 0; x < canvasData.width; x++) {
            for (var y = 0; y < canvasData.height; y++) {
                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var r = canvasData.data[idx + 0];
                var g = canvasData.data[idx + 1];
                var b = canvasData.data[idx + 2];
                var xiuzheng_wucha = 5;
                if (0 < r && r < 30 + xiuzheng_wucha && 55 - xiuzheng_wucha < g && g < 125 + xiuzheng_wucha && 170 - xiuzheng_wucha < b && b < 225 + xiuzheng_wucha) {
                    canvasData.data[idx + 0] = 255; // Red channel
                    canvasData.data[idx + 1] = 0; // Green channel
                    canvasData.data[idx + 2] = 0; // Blue channel
                    canvasData.data[idx + 3] = 255; // Alpha channel
                }
                if (25 - xiuzheng_wucha < r && r < 60 + xiuzheng_wucha && 75 - xiuzheng_wucha < g && g < 120 + xiuzheng_wucha && 175 - xiuzheng_wucha < b && b < 230 + xiuzheng_wucha) {
                    canvasData.data[idx + 0] = 255; // Red channel
                    canvasData.data[idx + 1] = 0; // Green channel
                    canvasData.data[idx + 2] = 0; // Blue channel
                    canvasData.data[idx + 3] = 255; // Alpha channel
                }
                if (30 - xiuzheng_wucha < r && r < 60 + xiuzheng_wucha && 55 - xiuzheng_wucha < g && g < 90 + xiuzheng_wucha && 105 - xiuzheng_wucha < b && b < 140 + xiuzheng_wucha) {
                    canvasData.data[idx + 0] = 255; // Red channel
                    canvasData.data[idx + 1] = 0; // Green channel
                    canvasData.data[idx + 2] = 0; // Blue channel
                    canvasData.data[idx + 3] = 255; // Alpha channel
                }
                if (35 - xiuzheng_wucha < r && r < 70 + xiuzheng_wucha && 95 - xiuzheng_wucha < g && g < 140 + xiuzheng_wucha && 205 - xiuzheng_wucha < b && b < 255) {
                    canvasData.data[idx + 0] = 255; // Red channel
                    canvasData.data[idx + 1] = 0; // Green channel
                    canvasData.data[idx + 2] = 0; // Blue channel
                    canvasData.data[idx + 3] = 255; // Alpha channel
                }
                if (85 - xiuzheng_wucha < r && r < 120 + xiuzheng_wucha && 130 - xiuzheng_wucha < g && g < 155 + xiuzheng_wucha && 195 - xiuzheng_wucha < b && b < 235 + xiuzheng_wucha) {
                    canvasData.data[idx + 0] = 255; // Red channel
                    canvasData.data[idx + 1] = 0; // Green channel
                    canvasData.data[idx + 2] = 0; // Blue channel
                    canvasData.data[idx + 3] = 255; // Alpha channel
                }
            }
        }
        context.putImageData(canvasData, 0, 0); // 处理完成的数据重新载入到canvas二维对象中
    } else {
        alert("your browser does not support canvas!");
    }
}

disibu = function() {
    var canvas = document.getElementById("carCanvas2");
    // 获得二维渲染上下文
    if (canvas.getContext) { //为了安全起见，先判断浏览器是否支持canvas
        var context = canvas.getContext("2d");
        var canvasData = context.getImageData(0, 0, canvas.width, canvas.height); //返回ImageData对象
        var arrx = [],
            arry = [];
        for (var x = 0; x < canvasData.width; x++) {
            for (var y = 0; y < canvasData.height; y++) {
                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var r = canvasData.data[idx + 0];
                var g = canvasData.data[idx + 1];
                var b = canvasData.data[idx + 2];

                if (r == 255 && g === 0 && b === 0) {
                    arrx.push(x);
                    arry.push(y);
                }

            }
        }
        arrx = arrx.sort(sortNumber);
        arry = arry.sort(sortNumber);
        minX = arrx[0];
        maxX = arrx[arrx.length - 1];
        minY = arry[0];
        maxY = arry[arry.length - 1];

        var c = document.getElementById("carCanvas3");
        c.width = carImage.width;
        c.height = carImage.height;
        var ctx = c.getContext("2d");
        ctx.putImageData(canvasData, 0, 0); // 处理完成的数据重新载入到canvas二维对象中

        ctx.strokeStyle = "#6595ed";
        ctx.rect(minX, minY, maxX - minX, maxY - minY);
        ctx.stroke();
        ctx.clip();
    } else {
        alert("your browser does not support canvas!");
    }
}

diwubu = function() {
    var c = document.getElementById("carCanvas4");
    c.width = carImage.width;
    c.height = carImage.height;
    var ctx = c.getContext("2d");
    ctx.drawImage(carImage, 0, 0);
    ctx.strokeStyle = "#6595ed";
    ctx.rect(minX, minY, maxX - minX, maxY - minY);
    ctx.stroke();
    var canvasData = ctx.getImageData(minX, minY, maxX - minX, maxY - minY);
    c.width = maxX - minX;
    c.height = maxY - minY;
    ctx.putImageData(canvasData, 0, 0);
    var string = GOCR(c);
    console.info(string);
}


function sortNumber(a, b) {
    return a - b
}

function Gaussian_blur(data, width, height, radius, sigma) {
    var gaussMatrix = [],
        gaussSum = 0,
        x, y,
        r, g, b, a,
        i, j, k, len;
    radius = Math.floor(radius) || 3;
    sigma = sigma || radius / 3;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);
    //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
        g = a * Math.exp(b * x * x);
        gaussMatrix[i] = g;
        gaussSum += g;

    }
    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum;
    }
    //x方向
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = x + j;
                a = j + y;
                if (k >= 0 && k < width) { //确保 k 没超出 x 的范围

                    i = (y * width + k) * 4;
                    r += data[i] * gaussMatrix[j + radius];
                    g += data[i + 1] * gaussMatrix[j + radius];
                    b += data[i + 2] * gaussMatrix[j + radius];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;

            data[i] = r / gaussSum;
            data[i + 1] = g / gaussSum;
            data[i + 2] = b / gaussSum;
        }
    }
    //y方向
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = y + j;
                if (k >= 0 && k < height) { //确保 k 没超出 y 的范围
                    i = (k * width + x) * 4;
                    r += data[i] * gaussMatrix[j + radius];
                    g += data[i + 1] * gaussMatrix[j + radius];
                    b += data[i + 2] * gaussMatrix[j + radius];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            data[i] = r / gaussSum;
            data[i + 1] = g / gaussSum;
            data[i + 2] = b / gaussSum;

        }
    }
    return data;
}