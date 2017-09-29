/**
 * boss后台 网点管理 controller
 * @name organizationNetworkCtrl
 * */
app.controller('organizationNetworkCtrl', ['$scope', function($scope) {

    $scope.networktype = [
        {name: '旗舰店'},
        {name: '普通店'},
        {name: '示范店'}
    ];
    $scope.networkstatu = {};
    $scope.networkstatu = [
        {name: '筹备中'},
        {name: '已运营'}
    ];
    $scope.queryStr = '';

    //所有数据
    $scope.data = {
        dscd           : '',//这个是省市区级联给回的值
        networktype : '',//网点类型
        networkstatu : '',//网点状态
        queryStr     : '',//查询条件
        login          : 'dade4fd2057d49e39144df3e3eb68c87'//登录信息
    };

    //获取dscd
    $scope.cascadingLocation = function(callback){
        $scope.data.dscd = callback();
    }

    //请求查询数据
    $scope.getData = function(){
        $scope.data.networktype = $scope.networktype.selected ? $scope.networktype.selected.name : '';
        $scope.data.networkstatu = $scope.networkstatu.selected ? $scope.networkstatu.selected.name : '';
        $scope.search($scope.data);
    }

}]);