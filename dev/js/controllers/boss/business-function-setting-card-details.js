/**
 * boss后台 业务功能内页设置 controller
 * @name businessFunctionSettingCardDetailsCtrl
 * */
app.controller('businessFunctionSettingCardDetailsCtrl', ['$scope','$models', function($scope,$models) {
    //所有数据
    $scope.data = {};

    //开关：确定之后的数据是否可以填写
    $scope.data.switch = 0;
    //运营方式：1为自提，2为上门预约
    $scope.data.operationMethod = 1;
    //房间号是否必填：0为不必，1为必填
    $scope.data.isRoomRequired = 0;
    //保存提交
    $scope.submitSwitch = function(){
        var param = {

        }
        var url = '';
        $models.api(url,param,function(){},function(){});
    }

    $scope.data
}]);