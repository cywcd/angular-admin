/**
 * boss后台 业务功能设置 controller
 * @name businessFunctionSettingNewCardCtrl
 * */
app.controller('businessFunctionSettingNewCardCtrl', ['$scope', function($scope) {

    console.log('this is businessFunctionSettingNewWaterCtrl');
    //所有数据
    $scope.data = {
        providerName : '',//查询的网点名称
    };

    $scope.cascadingLocation = function(callback){
        console.log(callback());
    }





}]);