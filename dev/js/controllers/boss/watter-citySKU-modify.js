/**
 * boss后台 城市SKU修改 controller
 * @name watterCitySKUModifyCtrl
 * */
app.controller('watterCitySKUModifyCtrl', ['$scope', function($scope) {

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