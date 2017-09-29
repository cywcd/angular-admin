/**
 * boss后台 组织机构 controller
 * @name organizationInstitutionAreaSetting
 * */
app.controller('organizationInstitutionAreaSetting', ['$scope','$models','passParametersService', function($scope,$models,passParametersService) {

    //登录信息
    var token = '4a06b73e48d04610bf8e645b753946ed';

    //获取页面传递参数
    var parmedata = $.extend(true, {}, passParametersService.get());
    //当前操作数据信息
   console.log(parmedata);
    var pagefdsnm = parmedata.fdsnm;

    $scope.pagedata ={
        login: token,
        dscd : parmedata.dscd,
        fdsnm : parmedata.fdsnm,
        operatorName : parmedata.operatorName,
        areaPopedomName : parmedata.areaPopedomName,
        providerNameStr : parmedata.providerNameStr,
    };

    var  pageproviderNameStr = parmedata.providerNameStr;
    var arrproviderName = pageproviderNameStr.split(',');
    var arrproviderName2 = [];
    for(var i=0; i < arrproviderName.length; i++){
        arrproviderName2.push({'name':arrproviderName[i]})
    }

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
            log(res);
        },function(res){
            log(res);
        });
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
    //添加表格中数据
    $scope.returnaddAreacon = arrproviderName2;
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


    //提交数据
    $scope.sumitData = function (formData) {
        if($scope.pagedata.areaPopedomName==""){
            layer.msg('督导辖区名称不能为空');
            return false;
        }
        $models.api('addOrUpdateAreaPopedom', $scope.pagedata, function (res) {
            layer.msg('保存成功');
            $scope.returnaddAreacon = [];
            $('.form-horizontal')[0].reset();
        }, function () {
        });
    }

}]);