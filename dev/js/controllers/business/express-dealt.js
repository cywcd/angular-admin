/**
 * 代办处理 controller
 * @name expressDealtCtrl
 * */
app.controller('expressDealtCtrl', ['$scope','$models',function($scope,$models) {

    $scope.data = {};

    $scope.token = '5d35156677fb452cbfa695b40ab4d1bf';

    $scope.providerId = '8273ad857dfc490fa9c6e7cdc0b9300e';
    $scope.params = {
        login : $scope.token,
        providerId : $scope.providerId
    }

    //初始化分页参数
    $scope.tablePageConfig = {
        orderType:'asc',
        numPerPage:5,
        pageNum:1,
        login : $scope.token,
        providerId : $scope.providerId,
    };
    //初始化查询的参数
    //快递公司列表
    $scope.expressCompanies = [
        {expressId:'',expressName : '全峰'},
    ];
    //短信发送状态
    $scope.isSmsNotice = [
        {code : 1, name : '已发送'},
        {code : 0, name :'未发送'}
    ]
    //分区
    $scope.expressPartition = [
        {partitionId : 1, areaName : '请选择'}
    ]
    //领单人respName
    $scope.expressWorkers = [
        {deliverResponserId : 1, respName : '请选择'},
    ]
    //包裹状态expressStatus
    $scope.expressStatus = [
        {status : 'STORAGE', name : '在库'},
        {status : 'DEPOSIT', name : '寄存'},
        {status : 'TAKEN', name : '已领单'},
    ]
    //搜索内容
    $scope.searchContent = {
        keyword : null
    }
    //全选列表
    $scope.isAllChecked = {
        status : false
    };

    //获取与本网点有关系的快递公司列表
    $scope.getExpressCompanies = function(login,siteId){
        var param = {siteId : siteId, login:login}
        $models.api('lynExpressQueryListRelatedCompanies', param, function(res){
            if(res){
                $scope.expressCompanies = res;
            }
        },function(){})
    }
    //获取本网点有关的分区
    $scope.getExpressPartitions = function(login,siteId){
        var param = {siteId : siteId, login:login,storeType : 'SELF_PUCKUP_STORAGE'};
        $models.api('lynExpressQueryListPartitions', param, function(res){
            if(res){
                $scope.expressPartition  = res;
            }
        },function(){})
    }
    //获取本网点有的领单人
    $scope.getExpressWorkers = function(login,siteId){
        var param = {siteId : siteId, login:login}
        $models.api('lynExpressQueryListWorkers', param, function(res){
            if(res){
                $scope.expressWorkers = res;
            }
        },function(){})
    }
    //初始化下拉框的数据
    $scope.getExpressCompanies($scope.token,$scope.providerId);
    $scope.getExpressPartitions($scope.token,$scope.providerId);
    $scope.getExpressWorkers($scope.token,$scope.providerId);

    //获取成功回调函数
    $scope.tableGetDataSuccess = function(){
        //obj是引用
        angular.forEach($scope.tableData,function(value,key){
            value.isChecked = false;
        })
    }
    //获取选择的快递单号
    $scope.getSelectedExpess = function(){
        var arr = [];
        if($scope.isAllChecked.status){//全选
            angular.forEach($scope.tableData,function(value,key){
                arr.push(value.orderId);
            });
        }else{//单着选
            angular.forEach($scope.tableData,function(value,key){
                if(value.isChecked){
                    arr.push(value.orderId);
                }
            });
        }
        return arr.join(',');
    }
    //监听全选
    $scope.$watch('isAllChecked.status',function(){
        if($scope.isAllChecked.status){
            angular.forEach($scope.tableData,function(value,key){
                value.isChecked = true;
            });
        }else{
            angular.forEach($scope.tableData,function(value,key){
                value.isChecked = false;
            });
        }
    })

    //==========按钮组的操作============//
    //自提签收
    $scope.expressOperationSelfSign = function(){

        layer.confirm('您确定签收此批包裹?', function(index){

            $scope.param = $scope.params;
            $scope.param.pkgReceiveIds = $scope.getSelectedExpess();
            $scope.param.signType

            $models.api('lynExpressMarkSelfSign',$scope.param,function(res){

            },function(){})

            layer.close(index);
        });


    }
    //寄存标记
    $scope.expressMarkDeposit = function(){
        $scope.params.pkgReceiveIds = $scope.getSelectedExpess()
        $models.api('lynExpressMarkDeposit',$scope.params,function(res){

        },function(){})
    }
    //设定预约时间
    $scope.expressSetBookTime = function(){
        $scope.params.pkgReceiveIds = $scope.getSelectedExpess()
        $models.api('lynExpressSetBookTime',$scope.params,function(res){

        },function(){})
    }
    //发送短信
    $scope.expressSendMsg = function(){
        $scope.params.pkgReceiveIds = $scope.getSelectedExpess()
        $models.api('lynExpressSendMsg',$scope.params,function(res){

        },function(){})
    }
    //派单
    $scope.expressIssueOrder = function(){
        $scope.params.pkgReceiveIds = $scope.getSelectedExpess()
        $models.api('lynExpressIssueOrder',$scope.params,function(res){

        },function(){})
    }
    //退回快递
    $scope.expressQuitExpress = function(){
        $scope.params.pkgReceiveIds = $scope.getSelectedExpess()
        $models.api('lynExpressQuitExpress',$scope.params,function(res){

        },function(){})
    }
    //确认丢件
    $scope.expressConfirmLoss = function(){
        $scope.params.pkgReceiveIds = $scope.getSelectedExpess()
        $models.api('lynExpressConfirmLoss',$scope.params,function(res){

        },function(){})
    }

    //==========按钮组的操作============//


    //查询
    $scope.queryData = function(){
        var param = {
            login	            : $scope.token,//			TOKEN
            providerId          : $scope.providerId,//				网点ID
            keyword		        : $scope.searchContent.keyword,//		搜索关键字
            deliverResponserId  : $scope.expressWorkers.selected && $scope.expressWorkers.selected.deliverResponserId,//	领单人ID
            expressId		    : $scope.expressCompanies.selected && $scope.expressCompanies.selected.expressId,//	快递公司ID
            status			    : $scope.expressStatus.selected && $scope.expressStatus.selected.status,//	包裹状态
            partitionId		    : $scope.expressPartition.selected && $scope.expressPartition.selected.partitionId,//	分区ID
            isHasSms		    : $scope.isSmsNotice.selected && $scope.isSmsNotice.selected.code,//	短信发送状态(0:未发送；1：已发送)
            startStoreTime	    : '',//入库时间-开始
            endStoreTime	    : ''//	入库时间-结束
        }
        $scope.search(param);
    }


}]);