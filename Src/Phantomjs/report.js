"use strict";


var page = require('webpage').create(),
    promise_page_event = require('./promise_page_event.js');

promise_page_event( page );
//page.page_on_initialized = [];
//page.page_on_load_started = [];
//page.page_on_load_finished = [];

var Resources = require('./Resources'),
    self = this,
    Promise = require('es6-promise').Promise,
    server = require('webserver').create(),
    port = 10220,
    resources = new Resources(page),
    system = require('system'),
    Screenshot = require('./Screenshot.js'),
    screenshot = new Screenshot(page),
    fs =  require("fs"),
    Listener_Page = require('./Listener_Page.js'), 
    performance, k_report, similar_picture,
    result = {
        navigationStart: -1,
        dom_complete: -1,
        white_screen: -1,
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

page.on_loadfinished_promise.push(function(){
    console.log('on_loadfinished_promise')
    return  new Promise(function(resolve){
                    var window_onload = self.page.evaluate(function(){
                        return window.k_report.window_onload

                    })
                    if ( window_onload ) {
                        resolve();
                    }else {
                        self.page.on_alert_promise.push(function(result){
                            result = JSON.parse(result);
                            //console.log(  'self.page.on_aler_promise' +JSON.stringify(result));
                            if (result && result.command === 'window_onload_exit') {
                                resolve();
                            }
                        }) 
                        //console.log('self.page.on_callback_promise'+self.page.on_callback_promise)
                    }
                    //resolve();
                    //resolve();
            })
})

page.on_loadfinished_promise.push(function(){
    
    performance =  page.evaluate(function(){
        return  window.performance;
    })

    k_report = page.evaluate(function(){
        return window.k_report;
    })

    similar_picture = page.evaluate(function(){
        return window.similar_picture || {}
    })


    
   
    result.navigationStart = performance.timing.navigationStart;

    result.dom_complete = k_report.dom_complete;
    result.window_onload = k_report.window_onload;

    result.white_screen = similar_picture.white_screen;
    result.atf = similar_picture.atf;

    result.total_resources_num = resources.total_resources_num;
    result.total_resources_size = resources.total_resources_size;

    console.log('open callback'+JSON.stringify(result, null, 4));
})

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



