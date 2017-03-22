var Promise = require('es6-promise').Promise;

var ATF =  function( page ){

    this.page = page;
    this.capture_array = [];
    this.capture_array_image = [];
    this.page_finish = false;
}

ATF.prototype.get_interval_capture = function( ){
    var self = this;

    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve) {
                setTimeout(function(){
                    resolve()
                },10)
            })
        })
        .then(function(){
            var index = 0 ;
            //self.page.render( new Date().getTime() + '.png')
            var interval = setInterval(function(){
                if (self.page_finish) {
                    clearInterval(interval)
                } 
                //console.log(self.page.renderBase64 + 'self page')
                //console.log(self.page.renderBase64('PNG'))
                self.capture_array.push( self.page.renderBase64('PNG') )
                console.log('self.capture_array.length'+self.capture_array.length);
                self.page.render('./__temp_atf_picture/'+ new Date().getTime()+'hehe.png',{format: 'png', quality: 100}) 
                 console.log(index);
                console.log(new Date().getTime())
                index++;
                //this.capture_array.push( page.renderBase64('PNG') )
            },0)
        })
}

module.exports = ATF