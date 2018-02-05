initPage = function() {
    LSTJSPAGE.innerHTML = '<div ng-app="ajsPage" ng-controller="cjsPage">' +
        '<span class="modelTitle_c animated bounceInDown">JS加载生成Page1</span>' +
        '<p>{{content}}</p>' +
        '</div>';
    app = angular.module("ajsPage", []);
    app.controller("cjsPage", function($scope) {
        $scope.content = "jspage1";
    });
}
initPage();