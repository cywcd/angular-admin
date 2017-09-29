/**
 * 入库页面 controller
 * @name expressGetIn
 * */
angular.module('app')
    .controller('expressGetIn', ['$scope','$models','$location','$sessionStorage',
        function($scope,$models,$location,$sessionStorage) {

            $scope.db = {};
            $scope.db.items = [
                {
                    "id": 0,
                    "name": {
                        "description": "选择快递公司",
                        "options": [
                            {
                                "description": "顺丰"
                            },
                            {
                                "description": "全峰"
                            }
                        ]
                    },
                    "address": "北京市朝阳区百子湾金泰大厦",
                    "phone" : "13831663329",
                    "room" : "B座8001",
                    "whyFailed" : "未能收件"
                }
                //more items go here
            ];

            $scope.afterChange = function(){
                console.log($scope.bindedInstance);
            }
        }]);