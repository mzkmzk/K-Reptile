var EVENT_NAME  = [
        'Initialized',//on_initialized_promise
        'LoadStarted',//on_loadstarted_promise
        'LoadFinished',//on_loadfinished_promise
        'UrlChanged',//on_urlchanged_promise
        'NavigationRequested',//on_navigationrequested_promise
        'RepaintRequested',//on_repaintrequested_promise
        'ResourceRequested',//on_resourcerequested_promise
        'ResourceReceived', //on_resourcereceived_promise
    ],
    Promise = require('es6-promise').Promise

var promise_page_event = function(page) {
     
    EVENT_NAME.forEach(function(element){
        var event_name_promise = 'on_' + element.toLowerCase() + '_promise';

        page[ event_name_promise ] = [];

        page[ 'on' + element ] = function(){
            var self_arguments = arguments;
            page[ event_name_promise ].reduce(function(promise, callback){
                return promise.then(function(){
                    if (typeof callback === 'function'){
                        return callback.apply(page, self_arguments)
                    }
                    return;
                    //return callback && callback();
                })
            },Promise.resolve())
            
        };
    })

    return page;
}

module.exports =  promise_page_event; 