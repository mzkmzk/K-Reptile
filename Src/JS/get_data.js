window.k_report = {
    dom_complete: null,
    window_onload: null
}
//window.document.body.style.cssText = 'height: 100px; overflow:hidden';
document.addEventListener( 'DOMContentLoaded', function(){
    //document.body.style.cssText = 'height: 100px; overflow:hidden';
    window.k_report.dom_complete = new Date().getTime();
})

window.onload = function(){
    window.k_report.window_onload = new Date().getTime();
}
