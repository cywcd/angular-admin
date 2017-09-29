/***
 * boss后台 运营后台指令
 * @author : liuyanan
 *
 */
angular.module('organization', [])
    /**
     * 区域级联
     * @name areaSelect
     * */
    .directive('areaSelect',['$models',function($models){
        return {
            restrict: 'EA', replace: false, transclude: true,
            scope: {
                selectArea : '&',
            },
            template: '<div class="disinbl mr15"><select ng-model = "selectedLoaction.province" ng-options="m.dsnm for m in location.province" class="form-control"><option value="">全国</option></select></div>' +
                      '<div ng-if="isShowCascadingCity" class="disinbl"><select ng-model = "selectedLoaction.city" ng-options="m.dsnm for m in location.city" class="form-control"><option value="">全部</option></select></div>' ,

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
                var selectAreaCallBack = function(type){
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

                    scope.selectArea({args:selectAreaCallBack});
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
                    scope.selectArea({args:selectAreaCallBack});
                });
                //监听区域
                scope.$watch('selectedLoaction.district',function(){
                    scope.selectArea({args:selectAreaCallBack});
                    if(!scope.selectedLoaction.province || scope.selectedLoaction.province.dscd == '全部') {
                        scope.selectedLoaction = {
                            district : null
                        };
                    }
                });

            },
        }
    }])
    
