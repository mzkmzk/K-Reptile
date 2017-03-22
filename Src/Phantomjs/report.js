"use strict";


var page = require('webpage').create(),
    Resources = require('./Resources'),
    server = require('webserver').create(),
    port = 10220,
    resources = new Resources(page),
    system = require('system'),
    ATF = require('./ATF.js'),
    _atf = new ATF(page),
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

page.onInitialized = function() {
    console.log('injectJs get_data'+page.injectJs('../JS/get_data.js'));
    console.log('injectJs copy_to_html'+page.injectJs('../JS/copy_to_html.js'));

};

server.listen(port, function(req, res){
    try{
        console.log('server ' + JSON.stringify(req, null, 2));
        res.statusCode = 200;
       res.headers = {
        'Access-Control-Allow-Origin': '*'
        };
        res.write(JSON.stringify(req, null, 4));
        res.close();
    }catch(e){
        console.log('server error '+e);
    }
  // coding...
})


page.zoomFactor = 0.01;

page.clipRect = {
  width: 1400,
  height: 900
};


if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit(1);
} else {

    t = Date.now();
    address = system.args[1];
    _atf.get_interval_capture();
    page.viewportSize = { width: 1400, height: 900 }
    page.open(address, function (status) {
        console.log('injectJs jqueru'+page.injectJs('../JS/jquery-1.11.3.min.js'));
    console.log('injectJs similar_picture'+page.injectJs('../JS/similar_picture.js'));
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            _atf.page_finish = true;
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
            console.log(JSON.stringify(result, null, 4));
            //console.log('resources: '+JSON.stringify(result, null, 4))
            
            
            
            //console.log('_atf.capture_array.length'+_atf.capture_array.length)
           
           
            page.evaluate(function(atf){
                setTimeout(function(){
                    window.judge_picture_evaluate(atf);
                    window.copy_to_html(atf);
                },2000)
                
            },_atf);
            setTimeout(function(){
                console.log('window_error'+JSON.stringify(page.evaluate(function(){
                    return window.error_message;
                })), null, 4)
            },3000)
             //}catch(e){console.log(e)};

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



