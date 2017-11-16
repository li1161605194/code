$(function() {
    $("#run").click(function() {
        var js_text = $("#js_text").val();
        var css_text = $("#css_text").val();
        var html_text = $("#html_text").val();
        var showIframe = $(window.frames["codeExperimentalStation"].document); //.find("#ces").html();
        codeExperimentalStationInit(js_text, css_text, html_text, showIframe);
    });
});

codeExperimentalStationInit = function(js_text, css_text, html_text, showIframe) {
    showIframe.find("body").html('');
    showIframe.find("body").append(html_text);
    showIframe.find("head").find('style').remove();
    showIframe.find("head").append('<style type="text/css">' + css_text + '</style>');
    setTimeout(function() {
        showIframe.find("body").append('<script type="text/javascript"> ' + js_text + ' </script>');
    }, 5000);
}