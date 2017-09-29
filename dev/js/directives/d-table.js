
app.directive('dTable', ['$models',function($models) {
    return {
        restrict: 'E',
        //scope:false,
        transclude: true,
        templateUrl:'tpl/modules/table.html',
        controller:function TableCtrl($scope, $models,$element,$attrs,$transclude,$http) {
            if(!$scope.tablePageConfig){
                $scope.tablePageConfig = {
                    orderType:'asc',
                    numPerPage:5,
                    pageNum:1
                };
            }

            var paramName = $attrs['paramName'];
            var paramAttr = paramName?$scope[paramName]:{};

            function go(n,param){
                if(!param){
                    param = {}
                }
                $models.api($attrs['modelApi'],
                    $.extend(true,{},$scope.tablePageConfig,param,paramAttr,{pageNum:n})
                    ,function(res){
                        $scope.pageRes = res;
                        $scope.tableData = res.recordList;
                        $scope.tablePageConfig.pageNum = res.currentPage;
                        $scope.totalPagesByCal = Math.ceil(res.totalCount / $scope.tablePageConfig.numPerPage);
                        $scope.tableGetDataSuccess && $scope.tableGetDataSuccess(res);
                        $scope.$apply();
                    },function(res){
                        $scope.tableGetDataError && $scope.tableGetDataError(res);
                    })
            }
            $scope.pageGo = function(){
                var num = parseInt($scope.goPage);
                if(num>0 && m <= $scope.totalPagesByCal){
                    go(num);
                }else{
                   log('超出页码范围');
                }

            };
            $scope.pageNext = function(){
                var num = $scope.tablePageConfig.pageNum*1;
                    go(num+1);
            };
            $scope.pagePrev = function(){
                var num = $scope.tablePageConfig.pageNum*1;
                num>1 && go(num-1);
            };
            $scope.pageFirst = function(){
                 go(1);
            };
            $scope.pageLast = function(){
                go($scope.totalPagesByCal);
            };
            $scope.refreshData = function(jsonData){
                go($scope.tablePageConfig.pageNum,jsonData);
            };
            $scope.search = function(jsonData){
                go(1,jsonData)
            }
            go(1);
        },
        compile:function compile(tElement,tAttrs,transclude){
            return{
                pre:function preLink(scope,iElement,iAttrs,controller){

                },
                post:function postLink(scope,iElement,iAttrs,controller){

                }
            }
        }
    }
}]);