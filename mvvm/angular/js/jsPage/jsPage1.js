initPage = function() {
    LSTJSPAGE.innerHTML = '<span class="modelTitle_c animated bounceInDown">JS加载生成Page1</span>' +
        '<p>{{content}}</p>';
    app = angular.module("ajsPage", []);
    app.controller("cjsPage", function($scope) {
        $scope.content = "jspage1";
    });
}
initPage();