
app.controller('PersonnelCreateCtrl', ['$scope','$location','$models','$element','$timeout',function($scope,$location,$models,$element,$timeout) {

    $scope.urldata = $location.search();

    $scope.status = {};
    $scope.role = {};
    $scope.area = [];
    $scope.provider = {};

    $models.api('statusList',function(res){
        $scope.statusList = res;
    },function(){
        log('获取statusList失败')
    });

    $models.api('getSysRoles',function(res){
        $scope.roleList = res.recordList;
        log($scope.roleList);
    },function(){
        log('获取roleList失败')
    });

    $scope.cascadingLocation = function(callback){
        alert(1);
    };

    $models.api('getProviderList',{login:''},function(res){
        $scope.providerList = res.recordList;
    },function(){
        log('获取providerList失败')
    });

    $models.api('getCascadingLoactionProvince',{'dslev':1},function(res){
        $scope.provinceList = res;
        $scope.$apply();
    },function(){
        //error;
    });

    $scope.dialogCallBack = function(){
        $scope.area = [];
        var textarea = $('#data-textarea');
        textarea.val('');
        $('d-dialog').find('[name="sheng"]').each(function(i,v){
            textarea.val($.trim(textarea.val())+','+$.trim($(v).parent().text()));
            $scope.area.push(v.value);
        });
        return true;
    };

    $scope.submit = function(){
        $models.api('operationAdd',{
            status:status.selected,
            dscd:'',
            providerId:$scope.provider
        },function(res){
            $timeout(function(){
                $location.url('/boss/personnel-manage');
            })
        },function(res){
            $location.url('/boss/personnel-manage');
        });
    }

}]);