/**
 * boss后台 组织机构 controller
 * @name organizationInstitutionAreaAdd
 * */
app.controller('organizationInstitutionAreaAdd', ['$scope','$models','passParametersService', function($scope,$models) {

    //登录信息
    var token = '4a06b73e48d04610bf8e645b753946ed';

    //获取dscd
    var dscd = null;
    $scope.selectArea = function(callback){
        dscd = callback();
    };

    //查询参数
    $scope.tabdata = {
        queryStr :'',//查询条件
        login    : token
    };

    //请求查询数据
    $scope.getData = function(){
        $scope.search($scope.tabdata);
    };

    //获取负责人信息
    $scope.addperson = function(dscd){
        $models.api('getManagerList',{ login:token, dscd:dscd||'' },function(res){
            //log(res);
        },function(){});
    };

    // checkbox选择的数据
    $scope.checkboxModel = {
        value1 : false,
    };
    $scope.$watch('checkboxModel.value1',function(){
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
    //表格中选中网点id
    $scope.returnaddAreaData = [];
    $scope.addAreadata = function(){
        var str ='';
        for(var i=0;i<$scope.areaData.length;i++){
            if($scope.areaData[i].isChecked == true){
                str += $scope.areaData[i].providerId + ',';
            }
        }
        $scope.returnaddAreaData = str;
        return $scope.returnaddAreaData;
    };


    //添加表格中数据显示
    $scope.returnaddAreacon = [];
    $scope.addAreacon = function(){
        var arr = [];
        for(var i=0;i<$scope.areaData.length;i++){
            var obj = {};
            if($scope.areaData[i].isChecked == true){
                obj.name = $scope.areaData[i].providerName;
                arr.push(obj);
            }
        }
        $scope.returnaddAreacon = arr;
    };

    //删除选择的当前网点
    $scope.delAreacon = function(idx){
        $scope.returnaddAreacon.splice(idx,1);
    };

    //删除选择的全部网点
    $scope.delAreaconall = function(row){
        $scope.returnaddAreacon.splice(0,row.length);
    };

    //初始化辖区负责人信息
    $scope.addperson();

    //督导负责人 确定回调
    $scope.infoCallBack = function(){
        $(".modal").hide();
    };

    $scope.formResult = {
        areaPopedomName : '',
    };
    $scope.queryStatus = function() {
        //表单数据
        var formData = {
            login: token,
            dscd: dscd,
            areaPopedomName: $scope.formResult.areaPopedomName,
            operationBackgroundId: 'c3a6d6fcda00452cb7509c981a03d7f0',
            providerIdStr: $scope.addAreadata(),
        };
        return formData;
    };
    //提交数据
    $scope.sumitData = function () {
        if($scope.formResult.areaPopedomName==""){
            layer.msg('督导辖区名称不能为空');
            return false;
        }
        $models.api('addOrUpdateAreaPopedom', $scope.queryStatus(), function (res) {
            layer.msg('保存成功');
            $scope.returnaddAreacon = [];
            $('.form-horizontal')[0].reset();
        }, function () {
        });
    }

}]);