/**
 * boss后台 城市SKU添加 controller
 * @name watterCitySKUAddCtrl
 * */
app.controller('watterCitySKUAddCtrl', ['$scope', function($scope) {

    $scope.statu = {};
    $scope.status = [
        {name: 'aaa'},
        {name: 'bbb'},
        {name: 'bbb'},
        {name: 'bbb'},
        {name: 'bbb'},
        {name: 'bbb'},
        {name: 'bbb'},
        {name: 'bbb'}
    ];
    $scope.multipleArea = {};

    $scope.multipleArea.selectedArea = [];

    $scope.submit = function(){
        log($scope.multipleArea);
    }

}]);