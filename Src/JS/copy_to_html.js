window.copy_to_html = function(_atf){
    alert('_atf'+ ( _atf.capture_array.length));
    document.body.innerHTML = '';
    document.body.style.cssText = 'background: aliceblue'
    var index = 0;
            
    

    for (var i = 0; i < _atf.capture_array.length; i++) {


        var image = new Image();
            
                   
        image.onload = function(image) {
            var canvas = document.createElement('canvas');
                canvas.style.width = '300px';
                canvas.style.height = '300px';
                document.body.appendChild(canvas);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image,0, 0);
            alert('image onload');
            //alert(image.src);
        
        }.bind(null,image)

        image.src = "data:image/png;base64,"+ _atf.capture_array[i]; 
    }
    alert(document.body.innerHTML);

    
    //alert(_atf.capture_array[10]);
    
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