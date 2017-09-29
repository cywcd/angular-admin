/**
 * boss后台 网点管理 controller
 * @name organizationInstitutionDistrictAdd
 * */
app.controller('organizationInstitutionDistrictAdd', ['$scope', function($scope) {

    //所有数据
    $scope.data = {
        dscd           : '',//这个是省市区级联给回的值
        operationBackgrou : '',//片区负责人
        areaDistrictName :'',//片区名称
        queryStr :'',//查询条件
        login          : 'dade4fd2057d49e39144df3e3eb68c87'//登录信息
    };

    //获取dscd
    $scope.cascadingLocation = function(callback){
        $scope.data.dscd = callback();
    }

    //请求查询数据
    $scope.getData = function(){
        $scope.search($scope.data);
    }

}]);