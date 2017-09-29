/**
 * boss后台 组织机构 controller
 * @name organizationInstitutionAreaList
 * */
app.controller('organizationInstitutionAreaList', ['$scope','$models','$state','passParametersService', function($scope,$models,$state,passParametersService) {

    //登录信息
    var token = '4a06b73e48d04610bf8e645b753946ed';

    //获取dscd
    $scope.selectArea = function(callback){
        $scope.tabdata.dscd = callback();
    };

    //所有数据
    $scope.tabdata = {
        dscd           : '',//这个是省市级联给回的值
        queryStr     : '',//查询条件
        login          : token
    };

    //请求查询数据
    $scope.getData = function(){
        $scope.search($scope.tabdata);
    };

    // checkbox选择的数据
    $scope.checkboxModel = {
        value1 : false,
    };
    $scope.$watch('checkboxModel.value1',function(){
        console.log($scope.checkboxModel.value1);
    });
    $scope.areaData = [];
    $scope.tableGetDataSuccess = function(res){
        //console.log(res);
        $scope.areaData = res.recordList;
        if($scope.areaData){
            for(var i=0;i<$scope.areaData.length;i++){
                $scope.areaData[i].isChecked = false;
            }
        }
    };

    //删除表格中数据
    $scope.returnaddAreacon = [];
    $scope.delAreaId = function(){
        var arr = [];
        for(var i=0;i<$scope.areaData.length;i++){
            if($scope.areaData[i].isChecked == true){
                arr.push($scope.areaData[i].areaPopedomId);
            }
        }
        return arr.join(',');
    };

    //表单数据
    $scope.queryStatus = function() {
        var formData = {
            login: token,
            areaPopedomIdStr: $scope.delAreaId(),
        };
        return formData;
    };

    //删除督导辖区
    $scope.delArea = function(){
        var param = $scope.queryStatus();
        if(param.areaPopedomIdStr==""){
            layer.msg('请选择要删除辖区');
            return false;
        };
        $models.api('deleteAreaPopedom', $scope.queryStatus(), function (res) {
            layer.msg('督导辖区删除成功');
            $scope.getData();
        }, function () {
        });
    };

    $scope.parmedata = {
        dscd: $scope.tabdata.dscd,
        operationBackgroundId : '',//负责人id
        areaPopedomId : '', //辖区id
        areaPopedomName : '',
        providerIdStr : '',
    };
    //设置页面传递参数
    $scope.modify = function(parmedata){
        passParametersService.set(parmedata);
        $state.go('boss.organization-institution-supervisory-area-setting',parmedata.dscd);
    };

}]);