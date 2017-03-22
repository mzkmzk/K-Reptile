
 window.judge_picture_evaluate = function(_atf){
    alert(' go judge_picture_evaluate');
    alert('_atf.capture_array.length222222'+_atf.capture_array.length)    
    for (var i = 0; i < _atf.capture_array.length; i++) {
        var image = new Image();
        image.src = "data:image/png;base64,"+ _atf.capture_array[i];
        _atf.capture_array_image[i] = image;
    }

    setTimeout(function(){
        for (var i = 0; i < _atf.capture_array.length ; i++) {
            //alert('iamge 1 ' + _atf.capture_array[i]);
           // alert('iamge 2 ' + _atf.capture_array[i + 1 ]);
            try {
                
                var result = isSimilar( _atf.capture_array_image[i], _atf.capture_array_image[ _atf.capture_array_image.length - 1 ] )
                alert('index: '+i  +'汉明距离:' +result )
            }catch(e){
                alert(e)
            }
            
            
        }
    },2000)
    
}   

    function resize2Canvas(img, width, height) {
        if (!img || !width) {
            return img;
        }
        height = height || width;
        // 按原图缩放
        var detImg = img.width / img.height;
        if (width / height > detImg) {
            height = width / detImg;
        } else {
            width = height * detImg;
        }
        // 画到 canvas 中
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        return canvas;
    }

    /**
     * 将canvas处理成灰度图
     */
    function grayscaleCanvas(canvas) {
        var canvasContext = canvas.getContext('2d');
        var cWidth = canvas.width;
        var cHeight = canvas.height;
        var canvasData = canvasContext.getImageData(0, 0, cWidth, cHeight);
        var canvasDataWidth = canvasData.width;

        for (var x = 0; x < cWidth; x++) {
            for (var y = 0; y < cHeight; y++) {

                // Index of the pixel in the array
                var idx = (x + y * canvasDataWidth) * 4;
                var r = canvasData.data[idx + 0];
                var g = canvasData.data[idx + 1];
                var b = canvasData.data[idx + 2];

                // calculate gray scale value
                var gray = Math.ceil((0.299 * r + 0.587 * g + 0.114 * b) / 4);


                // assign gray scale value
                canvasData.data[idx + 0] = gray; // Red channel
                canvasData.data[idx + 1] = gray; // Green channel
                canvasData.data[idx + 2] = gray; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
        canvasContext.putImageData(canvasData, 0, 0);
        return canvasData;
    }

    /**
     * 将16进制的图片hash转化为二进制
     */
    function hashToBinaryArray(h) {
        return parseInt(h, 16).toString(2);
    }

    /**
     * 计算图片的hash值
     */
    function hash(img) {
        var size = 8;
        var resizedCanvas = resize2Canvas(img, size, size, false);
        var canvasData = grayscaleCanvas(resizedCanvas);
        var cW = canvasData.width,
            cH = canvasData.height;
        var totalGray = 0,
            x, y, idx, grayValue;
        for (x = 0; x < cW; x++) {
            for (y = 0; y < cH; y++) {
                // Index of the pixel in the array
                idx = (x + y * cW) * 4;
                grayValue = canvasData.data[idx];
                totalGray += grayValue;
            }
        }
        var meanGray = totalGray / (size * size);
        var val;
        var array = [];
        for (x = 0; x < cW; x++) {
            for (y = 0; y < cH; y++) {
                // Index of the pixel in the array
                idx = (x + y * cW) * 4;
                grayValue = canvasData.data[idx];
                if (grayValue >= meanGray) {
                    val = 1;
                } else {
                    val = 0;
                }
                array.push(val);
            }
        }
        return parseInt(array.join(''), 2).toString(16);
    }

    function hamming(h1, h2) {
        var h1a = hashToBinaryArray(h1);
        var h2a = hashToBinaryArray(h2);
        var diff = 0;
        for (var i = 0; i < h1a.length; i++) {
            diff += h1a[i] ^ h2a[i];
        }
        return diff;
    }

    function isSimilar(img1, img2) {
        //alert('go isSimilar');
        var h1 = hash(img1);
        var h2 = hash(img2);
        alert( h1 +" : " +h2 )
        var threshHold = 10;
        var hammingDiff = hamming(h1, h2);
        //alert('汉明距离:' +hammingDiff );
        //alert(h1);
        return hammingDiff ;
    }



    