initPage = function() {
    app.controller("cjsPage", function($scope, $sce) {
        $scope.zhtml = $sce.trustAsHtml('<span class="modelTitle_c animated bounceInDown">JS加载生成Page2</span><p>{{jspage1}}</p><div ng-click="jsPageLoad()">页面一</div>');
        $scope.jspage1 = '测试jspage001';
        $scope.jsPageLoad = function() {
            C.cacheSet("jp", "jsPage");
            window.location.href = window.location.href;
        }
    });
}
initPage();