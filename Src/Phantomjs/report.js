"use strict";


var page = require('webpage').create(),
    promise_page_event = require('./promise_page_event.js');

promise_page_event( page );
//page.page_on_initialized = [];
//page.page_on_load_started = [];
//page.page_on_load_finished = [];

var Resources = require('./Resources'),
    Promise = require('es6-promise').Promise,
    server = require('webserver').create(),
    port = 10220,
    resources = new Resources(page),
    system = require('system'),
    Screenshot = require('./Screenshot.js'),
    screenshot = new Screenshot(page),
    fs =  require("fs"),
    performance,
    Listener_Page = require('./Listener_Page.js'), 
    k_report,
    result = {
        navigationStart: -1,
        dom_complete: -1,
        atf: -1,
        window_onload: -1,
        total_resources_num: -1,
        total_resources_size: -1
    },
    t, address;


new Listener_Page(phantom, page);



page.on_initialized_promise.push(function(){
    console.log('injectJs get_data'+page.injectJs('../JS/get_data.js'));
})
/*page.onInitialized = function(){
    console.log('injectJs get_data'+page.injectJs('../JS/get_data.js'));
    var self_argument = arguments;

    page.page_on_initialized.forEach(function(element){
    if ( typeof element !== 'function') return;
        console.log('element'+arguments);
        element.apply(page, self_argument);
    })
    

}


page.onLoadFinished = function(){
    page.on_load_finished_promise.reduce(function(promise, callback){
        return promise.then(function(){
            return callback();
        })
    },Promise.resolve())
}*/


if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit(1);
} else {

    t = Date.now();
    address = system.args[1];
    
    page.open(address, function (status) {
        
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            //try{
            t = Date.now() - t;
            console.log('Loading time ' + t + ' msec');
            
            k_report = page.evaluate(function(){
                return window.k_report;
            })
            performance =  page.evaluate(function(){
                return  window.performance;
            })
           
            result.navigationStart = performance.timing.navigationStart;
            result.dom_complete = k_report.dom_complete;
            result.window_onload = k_report.window_onload;
            result.total_resources_num = resources.total_resources_num;
            result.total_resources_size = resources.total_resources_size;
            console.log('open callback'+JSON.stringify(result, null, 4));

           
           

            setTimeout(function(){
                page.clipRect = {
                  
                };
                page.render('xunlei.png');
                 phantom.exit();
            },8000)
           

        }
        //setTimeout(function(){
        //phantom.exit();
        //},10000)
        
    });
}



