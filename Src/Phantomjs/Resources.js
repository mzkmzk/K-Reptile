//var colors = require('colors')
var Resources = function(page){
    

    this.page = page;
    this.start = null;
    this.resources = [];
    this.total_resources_num = 0;
    this.total_resources_size =  0;
    
    page.onLoadStarted = this.onLoadStarted.bind(this);
    page.onResourceRequested = this.onResourceRequested.bind(this);
    page.onResourceReceived = this.onResourceReceived.bind(this);
    page.onLoadFinished = this.onLoadFinished.bind(this);
}

Resources.prototype.onLoadStarted = function(){
    this.start = new Date().getTime();
}

//貌似没接受MP4资源
Resources.prototype.onResourceRequested = function(request){
    var now = new Date().getTime();
    //console.log(request.url);
    this.resources[request.id] = {
        id: request.id,
        url: request.url,
        request: request,
        responses: {},
        duration: '-',
        times: {
            request: now
        }
    };
    // if (request.url.indexOf('qqq.css') !== -1 || request.url.indexOf('lib.js') !== -1 ){
        //console.log( JSON.stringify(request,null,4))
    //}
    //if (request.url.indexOf('201702151504372411')!==-1) {
        //console.log(JSON.stringify(request, null,4));
        //console.log(resource.size);
    //}
   
}

Resources.prototype.onResourceReceived = function(response){
    var now = new Date().getTime(),
        resource = this.resources[response.id];
    
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


    //if (resource.url.indexOf('qq.css') !== -1 || resource.url.indexOf('lib.js') !== -1 ){
        //console.log( JSON.stringify(response,null,4))
    //}
    /*if (response.bodySize) {
        resource.size = response.bodySize;
    } else if (!resource.size) {
        response.headers.forEach(function (header) {
            if (header.name.toLowerCase()=='content-length') {
                resource.size = parseInt(header.value);
            }
        });
    }*/
    //if (response.url.indexOf('201702151504372411')!==-1) {
       // console.log(JSON.stringify(response, null,4));
        //console.log(resource.size);
    //}
    
}

Resources.prototype.onLoadFinished = function(status){
    this.total_resources_num = this.resources.length;
    this.total_resources_size = this.resources.reduce(function(acc, value){
        if (value.url.indexOf('.css') !== -1 || value.url.indexOf('.js') !== -1 ){
        //    console.log(value.size);
        //console.log(value.url);
        }
        if ( !isNaN(value.size) ) {
            return acc + value.size;
        }else {
            //console.log('resourec size is NaN'.red);
            //console.log(JSON.stringify(value, null, 4))
            return acc
        }
        
    },0);
}

module.exports = Resources;