"use strict";



var page = require('webpage').create(),
    Resources = require('./Resources'),
    resources = new Resources(page),
    system = require('system'),
    ATF = require('./ATF.js'),
    _atf = new ATF(page),
    fs =  require("fs"),
    performance,
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

page.onInitialized = function() {
    console.log('injectJs'+page.injectJs('../JS/get_data.js'));
    console.log('injectJs'+page.injectJs('../JS/atf.js'));
};

page.onAlert = function() {
    console.log(arguments);
    //printArgs.apply(this, arguments);
};
console.log(page.renderBuffer);

page.onLoadStarted = function() {
    console.log('body height: '+ page.evaluate(function(){
        //document.body.style.cssText = 'height: 100px; overflow:hidden';
        return document.body.style.cssText;
    }));
     
    console.log("page.onLoadStarted");
    //printArgs.apply(this, arguments);
};

if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit(1);
} else {

    page.evaluate(function(){
        
        return  window.performance;
    })
    t = Date.now();
    address = system.args[1];
    _atf.get_interval_capture();
    page.viewportSize = { width: 100, height: 100 }
    page.open(address, function (status) {
        
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            t = Date.now() - t;
            console.log('Loading time ' + t + ' msec');
            k_report =  page.evaluate(function(){
                return  window.k_report;
            });
            performance =  page.evaluate(function(){
                return  window.performance;
            })
            //console.log('printAboveTheFoldCss'+page.evaluate(function(){
            //    var a
            //    return printAboveTheFoldCss();
            //}))
            //console.log(JSON.stringify(performance, null, 4))
            result.navigationStart = performance.timing.navigationStart;
            result.dom_complete = k_report.dom_complete;
            result.window_onload = k_report.window_onload;
            result.total_resources_num = resources.total_resources_num;
            result.total_resources_size = resources.total_resources_size;
            console.log(JSON.stringify(result, null, 4));
            //console.log('resources: '+JSON.stringify(result, null, 4))
            
            
            _atf.page_finish = true;
            console.log('_atf.capture_array.length'+_atf.capture_array.length)
            
            for (var i = 0; i < _atf.capture_array.length; i++) {
                console.log(i)
                //console.log( _atf.capture_array[i])
                try{
                    console.log(new Buffer(_atf.capture_array[i],'base64'))
                }catch(e){console.log(e)}
                
                console.log( _atf.capture_array[i].length)
                fs.writeFile(new Date().getTime() + '.png', new Buffer(_atf.capture_array[i],'base64'), function(){
                    if (err) throw err;
                }) 
            }
            
            phantom.exit();

        }
        //setTimeout(function(){
        //phantom.exit();
        //},10000)
        
    });
}



