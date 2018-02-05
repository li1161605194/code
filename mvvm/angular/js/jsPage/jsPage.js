initPage = function() {
    LSTJSPAGE.innerHTML = '<span class="modelTitle_c animated bounceInDown">JS加载生成Page</span>' +
        '<p>shoye</p><div ng-click="jsPageLoad()">页面一</div>';
    app.controller("cjsPage", function($scope) {
        $scope.jsPageLoad = function() {
            window.location.href = window.location.href + "?jp=jsPage1";
        }
    });
}
initPage();