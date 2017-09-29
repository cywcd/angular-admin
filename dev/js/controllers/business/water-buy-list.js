app.controller('WatterBuyListCtrl', ['$scope', '$models',function($scope, $models) {


    $scope.baseParam = {communityId:'0287de1bfbd14f4d8fed2d980a6aee46'};

    $scope.addList = function(){
        $models.api('buyCardCreateOrder',
            {
                login:'05c342dc99df426aacb0aaac66e208ad',
                siteCardIds:'06990afac24f42fe80f7a600f1430fbf_1',
                communityId:'0287de1bfbd14f4d8fed2d980a6aee46',
                mobile:13800138000
            },
            function(res){
                log(res);
            }
        )

    }




}]);