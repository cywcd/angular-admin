var myApp = angular.module( "myApp", [ "isteven-multi-select" ]);
myApp.controller( 'selectMinimum' , [ '$scope' , function ($scope) {

    $scope.modernProvince = [
        {
            name: '出库数据',
            ticked: false
        },
        {
            name: '统计数据',
            ticked: false
        },
        {
            name: '分类数据',
            ticked: false
        },
        {
            name: '回收数据',
            ticked: false
        },
        {
            name: '拆分数据',
            ticked: false
        }
    ];
    $scope.modernCity = [
        {
            name: '出库数据2',
            ticked: false
        },
        {
            name: '统计数据2',
            ticked: false
        },
        {
            name: '分类数据2',
            ticked: false
        },
        {
            name: '回收数据2',
            ticked: false
        },
        {
            name: '拆分数据2',
            ticked: false
        }
    ];
    $scope.modernCounty = [
        {
            name: '出库数据3',
            ticked: false
        },
        {
            name: '统计数据3',
            ticked: false
        },
        {
            name: '分类数据3',
            ticked: false
        },
        {
            name: '回收数据3',
            ticked: false
        },
        {
            name: '拆分数据3',
            ticked: false
        }
    ];
}]);
