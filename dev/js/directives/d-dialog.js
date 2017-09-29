/*
* <d-dialog call-back="dialogCallBack"  dialog-width="600" dialog-id="aa" default-btn="">
*</d-dialog>
*
* 必选 dialog-id="aa" 弹层的唯一标识 用于外部控制弹层  aa.showLayer() aa.hideLayer()
* 可选 no-layer 去除遮罩
* 可选 dialog-width="" 弹层宽度
* 可选 dialog-title=" 弹层标题"
* 可选 default-btn=""      primary-btn="" 隐藏按钮
*      default-btn="取消"  primary-btn="确定" 设置按钮文字
* 可选 call-back="" 点击primary-btn时的回调
*
* */
app.directive('dDialog', ['$models',function($models) {
    return {
        restrict: 'E',
        scope:false,
        transclude: true,
        templateUrl:'tpl/modules/dialog.html',
        controller:function TableCtrl($scope, $models,$element,$attrs,$transclude,$http) {

            var later = $($element).find('.modal').eq(0),
                dialog = later.find('.modal-dialog'),
                title = $attrs['dialogTitle'],
                defaultBtn = $attrs['defaultBtn'],
                primaryBtn = $attrs['primaryBtn'],
                dialogWidth = $attrs['dialogWidth'],
                noLayer = $attrs['noLayer'],
                id = $attrs['dialogId'],
                callbackName = $attrs['callBack'];

            if(noLayer===undefined){
                later.css('backgroundColor','rgba(0,0,0,0.6)');
            }
            if(title){
                dialog.find('.modal-title').text(title);
            }

            if(defaultBtn!==undefined){
                if(defaultBtn===""){
                    dialog.find('.btn-default').hide();
                }else{
                    dialog.find('.btn-default').text(defaultBtn);
                }
            }

            if(primaryBtn!==undefined){
                if(primaryBtn===""){
                    dialog.find('.btn-primary').hide();
                }else{
                    dialog.find('.btn-primary').text(primaryBtn);
                }
            }

            if(dialogWidth){
                dialog.css('width',dialogWidth);
            }


            $scope[id] = {}
            $scope[id].showLayer = function(){
                later.show().removeClass('fade');
                dialog.css('marginTop',function() {
                    return ($(window).height() - dialog.height())*2/5;
                })
            };

            $scope[id].hideLayer = function(){
                later.addClass('fade').hide();
            };

            $scope[id].layerCallback = function(){
                if(!!callbackName){
                    if($scope[callbackName]()){
                        $scope[id].hideLayer();
                    }
                }else{
                    $scope[id].hideLayer();
                }

            }
            $scope.$apply();
        },
        compile:function compile(tElement,tAttrs,transclude){

            var elms = tElement.find('[ng-click]');
            elms.each(function(i,el){
                var el = $(el);
                el.attr('ng-click',tAttrs['dialogId']+'.'+el.attr('ng-click'));
            });

            return{
                pre:function preLink(scope,iElement,iAttrs,controller){

                },
                post:function postLink(scope,iElement,iAttrs,controller){

                }
            }
        }
    }
}]);