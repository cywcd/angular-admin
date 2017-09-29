app.controller('PersonnelManageCtrl', ['$scope','$element','$models','$location', function ($scope,$element,$models,$location) {

    var urldata = $location.search();

    $scope.status = {};

    $models.api('statusList',function(res){
        $scope.statusList = res;
    },function(){
        log('获取statusList失败')
    });

    $scope.aa = {
        name: $scope.sitename
    };
    $scope.modify = function(id){
        $location.url('boss/personnel-create?id='+id);
    };

    $scope.del = function(id){
        $models.api('deleteOperation',{operationBackgroundId:id},function(res){
            $scope.refreshData()
        });
    };

    $scope.goSearch = function(){
        $scope.search({
            operatorName:$scope.operatorName,
            operatorCode:$scope.operatorCode,
            operationNo:$scope.operationNo,
            mobile:$scope.mobile,
            status:$scope.status,
            providerName:$scope.providerName
        })
    };

    $scope.dialogCallBack = function(){
        alert(2);
    }

}]);