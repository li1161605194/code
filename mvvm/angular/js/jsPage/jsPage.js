initPage = function() {
    app.controller("cjsPage", function($scope, $sce) {
        $scope.zhtml = $sce.trustAsHtml('<span class="modelTitle_c animated bounceInDown">JS加载生成Page1</span>' +
            '<p>shoye</p><div ng-click="jsPageLoad()">页面二</div><p>在输入框中尝试输入：</p>' +
            '<p>姓名：<input type="text" ng-model="firstName"></p><p>你输入的为： {{ firstName }}</p>');
        $scope.jsPageLoad = function() {
            C.cacheSet("jp", "jsPage1");
            window.location.href = window.location.href;
        }
    });
}
initPage();