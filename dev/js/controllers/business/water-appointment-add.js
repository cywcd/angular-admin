app.controller('WatterAppointmentAddCtrl', ['$scope', '$timeout','$models',function($scope,$timeout,$models) {

    $scope.community = {};
    $scope.product = {};
    $scope.guanjia = {};

    //$models.api();
    $scope.communityList = [
        { name: '华坊易城',communityId:'0287de1bfbd14f4d8fed2d980a6aee46'}
    ];

    //$models.api();
    $scope.productList = [
        { name: '产品名称1'}
    ];

    //$models.api();
    $scope.guanjiaList = [
        { name: '管家1'},
        { name: '管家2'}
    ];

    $scope.dates = {
        start: '',
        end:''
    };

    $scope.submitParam = {
        //login:'05c342dc99df426aacb0aaac66e208ad', //登录凭证
        //bookDat : bookDat  必传    //预约日期2016-01-11
        //bookTime : bookTime   必传    //预约时间段09:00~10:00
        //userCardIds : userCardIds  必传    //卡券ID    例如:卡券ID_数量
        //communityId : communityId   必传    //小区ID
        //userPhone : userPhone  必传    //手机号
        //address : address  必传    //地址
        //remark : remark      //备注
    };
    $scope.views = ['year', 'month', 'date', 'hours', 'minutes'];
    $scope.changeDate = function (modelName, newDate) {
        var startTime = '',
            endTime = '';
        if($scope.dates.start.format){
            var startDataStr = $scope.dates.start.format();
            $scope.submitParam.bookDat = startDataStr.split('T')[0];
            var timeArr1 = startDataStr.split('T')[1].split(':');
            startTime = timeArr1[0]+':'+timeArr1[1];
        }
        if($scope.dates.end.format){
            var timeArr2 = $scope.dates.end.format().split('T')[1].split(':');
            endTime = timeArr2[0]+':'+timeArr2[1];
        }

        $scope.submitParam.bookTime = startTime+'-'+endTime;
        console.log($scope.submitParam.bookDat);
        console.log($scope.submitParam.bookTime);
    };

    $scope.submit = function(){
        $models.api('createSkuOrderByCard',$scope.submitParam,function(){

        });
    }

}]);

