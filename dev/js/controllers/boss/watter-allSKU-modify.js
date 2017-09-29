/**
 * boss后台 全国SKU修改 controller
 * @name watterAllSKUModifyCtrl
 * */
app.controller('watterAllSKUModifyCtrl', ['$scope', function($scope) {

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