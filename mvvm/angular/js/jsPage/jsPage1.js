initPage = function() {
    LSTJSPAGE.innerHTML = '<span class="modelTitle_c animated bounceInDown">JS加载生成Page1</span>' +
        '<p>jspage1</p>';
    app.controller("cjsPage", function($scope) {

    });
}
initPage();