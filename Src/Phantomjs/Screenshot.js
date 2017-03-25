var Promise = require('es6-promise').Promise;

var Screenshot =  function( page ){

    this.page = page;
    this.capture_array = [];
    this.capture_array_image = [];
    this.page_finish = false;
    this.intervalId = null;
    this.set_listener();

    page.viewportSize = { width: 1400, height: 700 }
    page.clipRect = {
        top: 400,
        left: 200,
        width: 600,
        height: 300
    };

    page.on_initialized_promise.push(function(){
        console.log('injectJs copy_to_html'+page.injectJs('../JS/copy_to_html.js'));       
        console.log('injectJs similar_picture'+page.injectJs('../JS/similar_picture.js'));
    })

}

Screenshot.prototype.get_interval_capture = function(){
    var self = this;
    
    var index = 0 ;
    //self.page.render( new Date().getTime() + '.png')
    self.intervalId = setInterval(function(){
        
        self.capture_array.push( self.page.renderBase64('PNG') )
        console.log('self.capture_array.length'+self.capture_array.length);
        self.page.render('./__temp_atf_picture/'+ new Date().getTime()+'hehe.png',{format: 'png', quality: 100}) 
         console.log(index);
        console.log(new Date().getTime())
        index++;
        //this.capture_array.push( page.renderBase64('PNG') )
    },0)
    console.log('get self.interval'+self.intervalId)
        
}

Screenshot.prototype.set_listener = function(){
    var self = this;
    this.page.on_loadstarted_promise.push(function(){
        self.get_interval_capture();
    })

    this.page.on_loadfinished_promise.push(function(){

        return  new Promise(function(resolve){
            clearInterval( self.intervalId );
            setTimeout(function(){
                page.evaluate(function(screenshot){
                
                    window.copy_to_html(screenshot);
                    window.judge_picture_evaluate(screenshot);
                
                },screenshot);
                resolve()
            },2000)
            
            
        })
       
    })
}

module.exports = Screenshot;