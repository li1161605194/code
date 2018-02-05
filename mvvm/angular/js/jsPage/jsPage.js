initPage = function() {
    LSTJSPAGE = document.getElementById("LSTJSPAGE");
    LSTJSPAGE.innerHTML = '<div ng-app="ajsPage" ng-controller="cjsPage">' +
        '<span class="modelTitle_c animated bounceInDown">JS加载生成Page</span>' +
        '<p>{{content}}</p>' +
        ' <div ng-click="jsPageLoad()">页面一</div>' +
        '</div>';
    app = angular.module("ajsPage", []);
    app.controller("cjsPage", function($scope) {
        $scope.content = "shoye";
        $scope.jsPageLoad = function() {
            window.location.href = window.location.href + "?jp=jsPage1";
        }
    });
}
initPage();