//var colors = require('colors')
var Promise = require('es6-promise').Promise;
var Resources = function(page){
    
    var self = this
    this.page = page;
    this.start = null;
    this.resources = [];
    this.total_resources_num = 0;
    this.total_resources_size =  0;
    this.set_listener();
    
    
}

Resources.prototype.set_listener = function(){
    var self = this;
    this.page.on_resourcerequested_promise.push(function(request){
        var now = new Date().getTime();
        self.resources[request.id] = {
            id: request.id,
            url: request.url,
            request: request,
            responses: {},
            duration: '-',
            times: {
                request: now
            }
        };
    })

    this.page.on_resourcereceived_promise.push(function(response){
        var now = new Date().getTime(),
            resource = self.resources[response.id];
        
        resource.responses[response.stage] = response;
        if (!resource.times[response.stage]) {
            resource.times[response.stage] = now;
            resource.duration = now - resource.times.request;
        }

        //先查看content-length是否存在
        response.headers.forEach(function (header) {
            if (header.name.toLowerCase()=='content-length') {
                resource.size = parseInt(header.value);
            }
        });

        //不存在则去访问bodysize
        if ( !resource.size && response.bodySize) {
            resource.size = response.bodySize;
        } 
    })

    page.on_loadfinished_promise.push(function(){
        
        self.total_resources_num = self.resources.length;
        self.total_resources_size = self.resources.reduce(function(acc, value){
            //if (value.url.indexOf('.css') !== -1 || value.url.indexOf('.js') !== -1 ){
            //    console.log(value.size);
            //console.log(value.url);
            //}
            if ( !isNaN(value.size) ) {
                return acc + value.size;
            }else {
                //console.log('resourec size is NaN'.red);
                //console.log(JSON.stringify(value, null, 4))
                return acc
            }
            
        },0);
        return ;
            
    })
}

module.exports = Resources;