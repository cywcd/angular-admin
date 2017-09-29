/**
 * boss后台 业务功能设置 controller
 * @name businessFunctionSettingCtrl
 * */
app.controller('businessFunctionSettingCtrl', ['$scope','$models','$state','passParametersService', function($scope,$models,$state,passParametersService) {

    //配置含有的业务类型，只是配置数据，不对html配置了
    var businessTypes = ['EXPRESS','WATER'];

    var token = '8f34136cc0e140c8bd66b55da43829ca';
    //所有数据
    $scope.data = {
        providerName   : '',//查询的网点名称
        provideCode    : '',//编码
        contractPhone  : '',//手机号码
        dscd           : '',//这个是省市区级联给回的值
        login          : token//登录信息
    };

    //获取dscd
    $scope.cascadingLocation = function(callback){
        $scope.data.dscd = callback();
    }

    //请求查询数据
    $scope.getData = function(){
        $scope.search($scope.data);
    }
    //获取数据成功后的回调数据
    $scope.tableGetDataSuccess = function(res){
        $scope.siteIDs = [];
        var len = 0;
        var str = '';
        len = res.recordList && res.recordList.length;
        for(var i=0; i<len; i++){
            $scope.siteIDs.push(res.recordList[i].providerId);
        }
        str = $scope.siteIDs.join(',');
        for(var i=0;i<businessTypes.length;i++){
            $scope.queryStatus(str,businessTypes[i]);
        }
    }

    //获取请求到的网点列表的各种业务是否开启
    $scope.queryStatus = function(str,type){
        var param = {
            businessType : type,
            login : token,
            relatedIds : str
        }
        //各种业务
        $models.api('lynQuerySiteFunctionStatus',param,function(res){
            matchStatus(res,'is' + type.toHump() + 'On');
        },function(){});

        //匹配ID一致放入数据
        function matchStatus(res,type){
            if(!res.code){
                var len = res.data.length;
                for(var i=0; i<len; i++){
                    angular.forEach($scope.tableData,function(value,key){
                        if(res.data[i].relatedId == value.providerId){
                            value[type] = res.data[i].businessValueTxt;
                        }
                    })
                }
                $scope.$apply();
            }else{
                layer.msg(res.message);
            }
        }
    }
    //页面跳转，传递ID一遍获取对应的数据
    $scope.modify = function(data){
        passParametersService.set(data);
        $state.go('boss.business-function-setting-details');
    }

    //大小写转驼峰
    String.prototype.toHump = function(){
        var tail = this.toLowerCase().substring(1);
        var head = this.charAt(0).toUpperCase();
        return head + tail;
    }

}]);