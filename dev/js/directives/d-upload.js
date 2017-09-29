app.directive('dUpload',['$models',function($models) {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl:'tpl/modules/upload.html',
        compile:function compile(tElement,tAttrs,transclude){
            return{
                pre:function preLink(scope,iElement,iAttrs,controller){

                },
                post:function postLink(scope,iElement,iAttrs,controller){

                }
            }
        }
        //replace:true
    }
}])
