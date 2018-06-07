layui.config({
    base: window.location.origin + '/admin/js/'
}).extend({
    configBase: 'configBase',
    lang: 'lang',
    tab: 'self/tab',
    main: 'self/main',
    common: 'self/common'
});
if (typeof(avalon) != "undefined") {
    avalon.config({
        debug: true
    });
    var vm = '';
}