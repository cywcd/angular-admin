app.controller('WatterCardCtrl', function($scope, $http, $timeout) {

    $scope.statu = {};
    $scope.status = [
        { name: 'aaa'},
        { name: 'bbb'}
    ];
    $scope.tableParam = {
        communityId:'communityId',
        bizId: 'bizId'
    };

    $scope.goDetail = function(){
        alert(1);
    }

});