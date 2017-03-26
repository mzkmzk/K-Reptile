var Listener_Page = function(phantom, page){
  phantom.onError = function(msg, trace) {
    var msgStack = ['Listener_Page PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
      msgStack.push('TRACE:');
      trace.forEach(function(t) {
        msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
      });
    }
    console.log(msgStack.join('\n'));
    phantom.exit(1);
  };


  page.onError = function(msg, trace) {

    var msgStack = ['Listener_Page PAGE ERROR: ' + msg];

    if (trace && trace.length) {
      msgStack.push('TRACE:');
      trace.forEach(function(t) {
        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
      });
    }

    console.log(msgStack.join('\n'));

  };

  page.on_alert_promise.push(function(){
    console.log('Listener_Page onAlert'+JSON.stringify(arguments));
    return;
  })
 

  page.onResourceError = function(){
    console.log('Listener_Page page.onResourceError'+ JSON.stringify(arguments));
  }
}

module.exports = Listener_Page;
