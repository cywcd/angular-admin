angular.module('app')
    .controller('LoginCtrl', ['$scope','$models','$location','$sessionStorage',
        function($scope,$models,$location,$sessionStorage) {

            $scope.login = function (){
                $sessionStorage.$reset();
                var passWord = $scope.passWord,
                    operatorCode = $scope.userName;

                var url = '/imapi/boss/login',
                    data = {operatorCode:operatorCode,passWord:passWord},
                    transFn = function(data) {
                        return $.param(data);
                    },
                    postCfg = {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transFn
                    };

                $models.api('login',{operatorCode:operatorCode,passWord:passWord},function(res){
                    var data = res.data;
                    if(data.code||data.code == 0){
                        //location.href="error.html";
                        alert('帐号或密码不正确！');
                        return;
                    }
                    if(data.userId){
                        data.login = res.headers('login');
                        var storageName = "bossUser"; // localSTorage
                        $sessionStorage.bossUser = data;
                        $location.path('/app');

                    };
                })

            }
        }]);