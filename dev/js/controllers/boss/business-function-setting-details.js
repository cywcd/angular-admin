/**
 * boss后台 业务功能内页设置 controller
 * @name businessFunctionSettingDetailsCtrl
 * @intro 分页不支持多个页面要写多个controller
 * */
app
//页面的首页，不含分页
.controller('businessFunctionSettingDetailsCtrl', ['$scope','$models','passParametersService', function($scope,$models,passParametersService) {

    //获取传递来的数据
    var baseData = $.extend(true, {}, passParametersService.get());
    //当前操作数据的ID
    var ID = baseData.providerId;
    $scope.ID = ID;
    //当前操作网点
    $scope.currentSite = baseData.name;

    var token = '8f34136cc0e140c8bd66b55da43829ca';
    $scope.token = token;

    var businessType = ['EXPRESS','WATER'];

    //存放数据
    $scope.data = {};
    angular.forEach(businessType,function(value,key){
        $scope.data[value] = new Object();
        $scope.data[value].switch = 'YES';
        $scope.data[value].isRoomRequired = 'SELF';
    });

    $scope.status = [
        {name: '强制自提'},
        {name: '预约配送'},
    ];

    //获取配置信息
    $scope.getConfig = function(type){
        var param = {
            relatedId : ID,
            businessType : type,
            login : token,
        }
        $models.api('lynQuerySiteConfigInfo',param, function(res){
            if(res && !res.code){
                angular.forEach(res.data,function(value,key){

                    switch (value.businessKey){
                        case 'STATUS' ://开关
                            $scope.data[type].switch = value.businessValue;
                            $scope.data[type].STATUS = value;
                            break;
                        case 'ROOM_TYPE' ://房间号是否必填
                            $scope.data[type].isRoomRequired = value.businessValue;
                            $scope.data[type].ROOM_TYPE = value;
                            break;
                        case 'DELIVER_TYPE' ://发件方式
                            $scope.status = value.list;
                            $scope.data[type].DELIVER_TYPE = value;
                            angular.forEach(value.list,function(val,k){
                                if(val.name == value.businessValue) {
                                    $scope.status.selected = value.list[k];
                                }
                            })
                    }
                })
            }
        },function(){});
    }
    //更新配置信息
    $scope.updateConfig = function(type,businessKey,businessValue){
        var param = {
            login : token,
            configId : $scope.data[type][businessKey].configId,
            relatedId : ID,
            businessType :type,
            businessKey : businessKey,
            businessValue : businessValue,
        };
        $models.api('lynUpdateSiteConfigInfo',param,function(res){
            if(res && !res.code) layer.msg(res.message)
        },function(){
            apiError();
        });
    }

    //更新快递的通用配置
    $scope.updateConfigTrigger = function(type){
        if(type == 'EXPRESS'){
            $scope.updateConfig(type,'STATUS',$scope.data[type].switch);
            $scope.updateConfig(type,'DELIVER_TYPE',$scope.status.selected.name);
            $scope.updateConfig(type,'ROOM_TYPE',$scope.data[type].isRoomRequired);
        }
    }

    //初始化送水数据
    $scope.getConfig(businessType[0]);

    function apiError(){
        layer.msg('接口错误');
    }
}])
//送件的预约时间设置
app.controller('businessFunctionSettingDetailsTimeCtrl',['$scope','$models',function($scope,$models){

    //数据存放
    $scope.dataTime = {};

    $scope.getList = function(){
        var param = {
            login : $scope.token,
            siteId : $scope.ID
        }
        $models.api('lynQueryListAppointmentInfo',param,function(res){
            if(res && !res.code){
                $scope.dataTime = res.data;
            }
        },function(){});
    }
    $scope.getList();

}])