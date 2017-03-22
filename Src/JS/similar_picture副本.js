window.judge_picture = function(){
    alert(1)
    alert(typeof $.getJSON);
    try {
        $.post('http://127.0.0.1:10220',{},function(response){
             alert(2)
            var response = JSON.parse(response);
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = '300px';
            canvas.height = '300px';
            var ctx = canvas.getContext("2d");
            
            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 0, 0);

            };
            image.src = "data:image/png;base64,"+ _atf.capture_array[8];
        },function(){alert('error')})
    }catch(e){
        alert(e)
    }
    
    
}

window.judge_picture_evaluate = function(_atf){
    alert('_atf'+ ( _atf.capture_array.length));
    //document.body.innerHTML = '';
    document.body.style.cssText = 'background: aliceblue'
     var canvas = document.createElement('canvas');
            canvas.style.width = '300px';
            canvas.style.height = '300px';
            document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
            
            var image = new Image();
            
                   
    image.onload = function() {
                ctx.drawImage(image,0, 0);
                alert('image onload');
            }
    alert(_atf.capture_array[6]);
    image.src = "data:image/png;base64,"+ _atf.capture_array[10];
    /*$.each(_atf.capture_array,function(element, index){
        image.onload = function() {
                ctx.drawImage(image, element * 300, 0);
                alert(element);
            alert(index);
            };

            image.src = "data:image/png;base64,"+ index;
    })*/
    try{
             alert(3)
            //var response = JSON.parse(response);
           
            
            
            //alert(image.src)
    }catch(e){
        alert('evalutate_picture'+error)
    }
    
}