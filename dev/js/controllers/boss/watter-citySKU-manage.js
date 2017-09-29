/**
 * boss后台 城市SKU管理 controller
 * @name watterCitySKUManageCtrl
 * */
app.controller('watterCitySKUManageCtrl', ['$scope', function($scope) {

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