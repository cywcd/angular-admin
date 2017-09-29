/***
 * boss后台 运营后台指令
 * @author : liuyanan
 *
 */
angular.module('delivery', [])
    /**
     * 未处理订单
     * @name unfinishedOrder
     * */
    .directive('unfinishedOrder', ['$models',function($models){
        return {
            restrict: 'EA', replace: true, transclude: true,
            scope: { unfinishedAmount:'@' },
            template: '<div class="unfinished-order disinbl well-sm well">您有<span class="fwb">{{unfinishedAmount}}</span>条待处理的订单</div>',
            controller : function($scope){
                var param = {
                    token : '5d35156677fb452cbfa695b40ab4d1bf',
                    providerId : '8273ad857dfc490fa9c6e7cdc0b9300e'
                }

                $models.api('lynExpressQueryListToBeDoneCount',param,function(res){
                    $scope.unfinishedAmount = res.cnt;
                },function(){
                })
            }
        }
    }])
    /**
     * 省市区级联
     * @name locationCascading
     * */
    .directive('locationCascading',['$models',function($models){
        return {
            restrict: 'EA', replace: false, transclude: true,
            scope: {
                cascadingLocation : '&'
            },
            template: '<div class="col-sm-4"><select ng-model = "selectedLoaction.province" ng-options="m.dsnm for m in location.province" class="form-control"><option value="">全国</option></select></div>' +
                      '<div ng-if="isShowCascadingCity" class="col-sm-4"><select ng-model = "selectedLoaction.city" ng-options="m.dsnm for m in location.city" class="form-control"><option value="">全部</option></select></div>' +
                      '<div ng-if="isShowCascadingDistrict" class="col-sm-4"><select ng-model = "selectedLoaction.district" ng-options="m.dsnm for m in location.district" class="form-control"><option value="">全部</option></select></div>',
            link: function (scope, element, attrs, controller) {
                //是否显示城市和区域
                scope.isShowCascadingCity = false;
                scope.isShowCascadingDistrict = false;
                //最终选择的地方
                scope.selectedLoaction = {
                    province : null,
                    city :　null,
                    district : null
                };
                //后台请求来的所有位置
                scope.location = {};
                //选择后返回选择的区域的回调
                var cascadingLocationCallBack = function(){
                    var tempNum = '';
                    if(!scope.selectedLoaction.province){
                        tempNum = '';
                    }else if(!scope.selectedLoaction.city && scope.selectedLoaction.province){
                        tempNum = scope.selectedLoaction.province.dscd;
                    }else if(!scope.selectedLoaction.district && scope.selectedLoaction.city){
                        tempNum = scope.selectedLoaction.city.dscd;
                    }else if(scope.selectedLoaction.district){
                        tempNum = scope.selectedLoaction.district.dscd;
                    }
                    return tempNum;
                }
                //初始化区域的分类
                scope.location.province = [];
                scope.location.city = [];
                scope.location.district = [];

                //加载全国信息
                $models.api('getCascadingLoactionProvince',{'dslev':1},function(res){
                    scope.location.province = res;
                },function(){
                    //error;
                });
                //监听省份
                scope.$watch('selectedLoaction.province',function(){
                    if(!scope.selectedLoaction.province || scope.selectedLoaction.province.dscd == '全国') {
                        scope.isShowCascadingCity = false;
                        scope.isShowCascadingDistrict = false;
                        scope.selectedLoaction = {
                            province : null,
                            city :　null,
                            district : null
                        };
                    }else{
                        scope.isShowCascadingCity = true;
                        var param = {pdscd:scope.selectedLoaction.province.dscd};
                        $models.api('getCascadingLoactionCity',param,function(res){
                            scope.location.city = res;
                            scope.selectedLoaction.city = null;
                            scope.selectedLoaction.district = null;
                            scope.$apply();
                        },function(){
                            //error;
                        })
                    }

                    scope.cascadingLocation({args:cascadingLocationCallBack});
                });
                //监听城市
                scope.$watch('selectedLoaction.city',function(){
                    if(!scope.selectedLoaction.city || scope.selectedLoaction.city.dscd == '全部') {
                        scope.isShowCascadingDistrict = false;
                        scope.selectedLoaction.city = null;
                        scope.selectedLoaction.district = null;
                    }else{
                        scope.isShowCascadingDistrict = true;
                        var param = {pdscd:scope.selectedLoaction.city.dscd};
                        $models.api('getCascadingLoactionDistrict',param,function(res){
                            scope.location.district = res;
                            scope.selectedLoaction.district = null;
                            scope.$apply();
                        },function(){
                            //error;
                        })
                    }
                    scope.cascadingLocation({args:cascadingLocationCallBack});
                });
                //监听区域
                scope.$watch('selectedLoaction.district',function(){
                    scope.cascadingLocation({args:cascadingLocationCallBack});
                    if(!scope.selectedLoaction.province || scope.selectedLoaction.province.dscd == '全部') {
                        scope.selectedLoaction = {
                            district : null
                        };
                    }
                });

            }
        }
    }])
    /**
     * tabs
     * @class-name : bootrap 类名
     * */
    .directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                className : '@'
            },
            controller: [ "$scope", function($scope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                }
                console.log($scope)
                this.addPane = function(pane) {
                    if (panes.length == 0) $scope.select(pane);
                    panes.push(pane);
                }
            }],
            template:
            '<div class="tabbable">' +
            '<ul class="{{className}}">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
        };
    })
    .directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: '@' },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
        };
    })

    /**
     * 返回键
     * @name back-button
     * */
    .directive('backButton', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', goBack);

                function goBack() {
                    history.back();
                    scope.$apply();
                }
            }
        }
    })
