var Promise = require('es6-promise').Promise,
    system = require('system'),
    debug = system.args.indexOf('--debug=true') !== -1;

var Screenshot =  function( page ){

    this.page = page;
    this.capture_array = [];
    //this.capture_array_image = [];
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
        var copy_to_html_rsult = page.injectJs('../JS/copy_to_html.js');
         var similar_picture_rsult = page.injectJs('../JS/similar_picture.js');
        
        if (debug) {
            console.log('injectJs copy_to_html'+copy_to_html_rsult);       
            console.log('injectJs similar_picture'+similar_picture_rsult);
        }
        
    })

}

Screenshot.prototype.get_interval_capture = function(){
    var self = this;
    
   
    self.intervalId = setInterval(function(){
        var time = new Date().getTime();
        self.capture_array.push( {
            time: time,
            image_base64: self.page.renderBase64('PNG'),
            image: null
        } )
        
        self.page.render('./__temp_atf_picture/'+ new Date().getTime()+'hehe.png',{format: 'png', quality: 100}) 

        //console.log(time)

    },0)
    
        
}

Screenshot.prototype.set_listener = function(){
    var self = this;
    this.page.on_loadstarted_promise.push(function(){
        self.get_interval_capture();
    })

    this.page.on_loadfinished_promise.push(function(){
        //console.log('open callback'+JSON.stringify(result, null, 4));
        return  new Promise(function(resolve){
            clearInterval( self.intervalId );
            
            //setTimeout(function(){
                
                self.page.on_alert_promise.push(function(result){
                   
                    result = JSON.parse(result);
                    
                    if (result && result.command === 'computer_similar_exit') {
                        //window.screen_shot.white_screen = result.data.white_screen
                        //window.screen_shot.atf = result.data.atf_time
                        resolve();
                    }
                    return;
                });
                //console.log(self.page.on_alert_promise)

                page.evaluate(function(screenshot){
                
                    window.copy_to_html(screenshot);
                    window.judge_picture_evaluate(screenshot);

                },self);
                
                

                //resolve();
                
            //},0)
            
            
        })
       
    })
}

module.exports = Screenshot;