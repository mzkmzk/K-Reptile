var Promise = require('es6-promise').Promise;

var ATF =  function( page ){
    page.evaluate(function(){
        document.body.style.cssText = 'height: 100px; overflow:hidden'
        return  window.performance;
    })
    this.page = page;
    this.capture_array = [];
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
            //self.page.render( new Date().getTime() + '.png')
            var interval = setInterval(function(){
                if (self.page_finish) clearInterval(interval)
                //console.log(self.page.renderBase64 + 'self page')
                //console.log(self.page.renderBase64('PNG'))
                self.capture_array.push( self.page.render(new Date().getTime()+'.png',{format: 'png', quality: '1'}) )
                //this.capture_array.push( page.renderBase64('PNG') )
            },0)
        })
}

module.exports = ATF