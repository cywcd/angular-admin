/**
 * Created by Lee on 2016/6/17.
 */
app.controller('cityChoose',['$scope','$element',function($scope,$element){
    console.log(2);
    $scope.dataList=[];
    $scope.index=0;
    $scope.data=[
        {title:"北京",
            list:[
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"}
            ]
        },
        {title:"上海",
            list:[
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"},
                {title:"花房已成2",href:"business.express-getin"}
            ]
        },
        {title:"深圳",
            list:[
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"},
                {title:"花房已成3",href:"business.express-getin"}
            ]
        },
        {title:"广州",
            list:[
                {title:"花房已成4",href:"business.express-getin"},
                {title:"花房已成4",href:"business.express-getin"},
                {title:"花房已成5",href:"business.express-getin"},
                {title:"花房已成4",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"}
            ]
        },
        {title:"天津",
            list:[
                {title:"花房已成5",href:"business.express-getin"},
                {title:"花房已成5",href:"business.express-getin"},
                {title:"花房已成5",href:"business.express-getin"},
                {title:"花房已成5",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"}
            ]
        },
        {title:"重庆",
            list:[
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"}
            ]
        },
        {title:"成都",
            list:[
                {title:"花房已成7",href:"business.express-getin"},
                {title:"花房已成7",href:"business.express-getin"},
                {title:"花房已成7",href:"business.express-getin"},
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成6",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"},
                {title:"花房已成",href:"business.express-getin"}
            ]
        }
    ];
    $scope.addList = function(index)
    {
        $scope.dataList=$scope.data[index].list;
        $scope.curName=$scope.data[index].title;
        $scope.index=index;
    };
    $scope.hide = function()
    {
        $scope.key='';
    };
}]);
