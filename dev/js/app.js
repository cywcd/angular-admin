'use strict';
var app = angular.module('app',[
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'delivery',
    'organization',
    'ngHandsontable',
    'oc.lazyLoad',
    'models',
    'datePicker'
])
    //基本设置
    .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        }
    ]).run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    //模块加载设置
        .constant('JQ_CONFIG', {
            easyPieChart:   ['js/libs/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
            sparkline:      ['js/libs/jquery/charts/sparkline/jquery.sparkline.min.js'],
            plot:           ['js/libs/jquery/charts/flot/jquery.flot.min.js',
                'js/libs/jquery/charts/flot/jquery.flot.resize.js',
                'js/libs/jquery/charts/flot/jquery.flot.tooltip.min.js',
                'js/libs/jquery/charts/flot/jquery.flot.spline.js',
                'js/libs/jquery/charts/flot/jquery.flot.orderBars.js',
                'js/libs/jquery/charts/flot/jquery.flot.pie.min.js'],
            slimScroll:     ['js/libs/jquery/slimscroll/jquery.slimscroll.min.js'],
            sortable:       ['js/libs/jquery/sortable/jquery.sortable.js'],
            nestable:       ['js/libs/jquery/nestable/jquery.nestable.js',
                'js/libs/jquery/nestable/nestable.css'],
            filestyle:      ['js/libs/jquery/file/bootstrap-filestyle.min.js'],
            slider:         ['js/libs/jquery/slider/bootstrap-slider.js',
                'js/libs/jquery/slider/slider.css'],
            chosen:         ['js/libs/jquery/chosen/chosen.jquery.min.js',
                'js/libs/jquery/chosen/chosen.css'],
            TouchSpin:      ['js/libs/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                'js/libs/jquery/spinner/jquery.bootstrap-touchspin.css'],
            wysiwyg:        ['js/libs/jquery/wysiwyg/bootstrap-wysiwyg.js',
                'js/libs/jquery/wysiwyg/jquery.hotkeys.js'],
            dataTable:      ['js/libs/jquery/datatables/jquery.dataTables.min.js',
                'js/libs/jquery/datatables/dataTables.bootstrap.js',
                'js/libs/jquery/datatables/dataTables.bootstrap.css'],
            vectorMap:      ['js/libs/jquery/jvectormap/jquery-jvectormap.min.js',
                'js/libs/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                'js/libs/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                'js/libs/jquery/jvectormap/jquery-jvectormap.css'],
            footable:       ['js/libs/jquery/footable/footable.all.min.js',
                'js/libs/jquery/footable/footable.core.css']
        }
    )
        // oclazyload config
        .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
            // We configure ocLazyLoad to use the lib script.js as the async loader
            $ocLazyLoadProvider.config({
                debug:  false,
                events: true,
                modules: [
                    {
                        name: 'angularBootstrapNavTree',
                        files: [
                            'js/libs/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                            'js/libs/modules/angular-bootstrap-nav-tree/abn_tree.css'
                        ]
                    },
                    {
                        name: 'ui.select',
                        files: [
                            'js/libs/modules/angular-ui-select/select.min.js',
                            'js/libs/modules/angular-ui-select/select.min.css'
                        ]
                    }

                ]
            });
        }])

    //路由设置
    .config(
    [          '$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

            /*
              deps 为true时加载同名controller
              为字符串或数组时为要加载 组件名称
            */
            function addRouter(type,pageName,deps){
                var option = {
                    url: '/'+pageName,
                    templateUrl: 'tpl/'+type+'/'+pageName+'.html'
                }
                if(!!deps){
                    option.resolve = {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                if(typeof deps == 'string'){
                                     $ocLazyLoad.load(deps);
                                }
                                if(angular.isArray(deps)){
                                    angular.forEach(deps,function(d){
                                        $ocLazyLoad.load(d);
                                    })
                                }
                                return $ocLazyLoad.load('js/controllers/'+type+'/'+pageName+'.js');
                            }]
                    }
                }
                $stateProvider.state(type+'.'+pageName,option);
            }

            function addBusinessRouter(pageName,deps){
                addRouter('business',pageName,deps)
            }


            function addBossRouter(pageName,deps){
                addRouter('boss',pageName,deps)
            }

            $urlRouterProvider
                .otherwise('/index');
            $stateProvider
                .state('boss', {
                    url: '/boss',
                    templateUrl: 'tpl/boss/index.html'

                })
                .state('business', {
                    url: '/business',
                    templateUrl: 'tpl/business/index.html'

                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'tpl/login.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load(['js/controllers/login.js']);
                            }]
                    }
                })
                .state('index',{
                    url: '/index',
                    templateUrl: 'tpl/index.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load(['js/controllers/index.js']);
                            }]
                    }
                })
                .state('city-choose',{
                    url: '/city-choose',
                    templateUrl: 'tpl/city-choose.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad){
                                return $ocLazyLoad.load(['js/controllers/city-choose.js']);
                            }]
                    }
                });

            //boss后台  机构管理-小区管理
            addBossRouter('organization-network','ui.select');
            addBossRouter('organization-network-detail',0);
            addBossRouter('organization-network-introduce-setting',0);
            addBossRouter('organization-network-configure-setting',0);
            addBossRouter('organization-network-attribute-setting',0);
            addBossRouter('organization-network-deployed',0);

            //boss后台  机构管理-小区管理
            addBossRouter('organization-village',0);
            addBossRouter('organization-village-add',0);
            addBossRouter('organization-village-detail',0);
            addBossRouter('organization-village-setting',0);
            addBossRouter('organization-village-room-number-manage',0);

            //boss后台  机构管理-组织机构
            addBossRouter('organization-institution',0);
            addBossRouter('organization-institution-district-list',1);
            addBossRouter('organization-institution-district-add',1);
            addBossRouter('organization-institution-district-setting',1);
            addBossRouter('organization-institution-supervisory-area-list',1);
            addBossRouter('organization-institution-supervisory-area-add',1);
            addBossRouter('organization-institution-supervisory-area-setting',1);

            //boss后台  会员管理
            addBossRouter('member-management',0);
            addBossRouter('member-management-datafill',1);
            addBossRouter('member-management-member-check',0);
            addBossRouter('member-management-member-add',0);
            addBossRouter('member-management-member-modify',0);


            //boss后台  数据统计
            addBossRouter('data-statistics-extent',0);
            addBossRouter('data-statistics-install',0);
            addBossRouter('data-statistics-install-shop',0);


            //业务后台  维保-订单管理
            addBusinessRouter('maintenance-order-list',0);
            addBusinessRouter('maintenance-order-send',0);
            addBusinessRouter('maintenance-order-send-complete',0);
            addBusinessRouter('maintenance-order-add',0);
            addBusinessRouter('maintenance-order-detail',0);

            //业务后台  维保-商品管理
            addBusinessRouter('maintenance-goods-category-list',0);
            addBusinessRouter('maintenance-goods-category-add',0);
            addBusinessRouter('maintenance-goods-repair-price-list',0);
            addBusinessRouter('maintenance-goods-repair-price-add',0);
            addBusinessRouter('maintenance-goods-maintain-price-list',0);
            addBusinessRouter('maintenance-goods-maintain-price-add',0);

            //业务后台  跑腿
            addBusinessRouter('run-service',0);

            //业务后台  网点
            addBusinessRouter('site-service',0);

            //业务后台  送水业务
            addBusinessRouter('water-buy-list',1);
            addBusinessRouter('water-buy-detail',0);
            addBusinessRouter('water-appointment-list','ui.select');
            addBusinessRouter('water-appointment-add',['ui.select']);
            addBusinessRouter('water-appointment-detail',0);
            addBusinessRouter('water-deposit-back','ui.select');
            addBusinessRouter('water-deposit-back-add',0);
            addBusinessRouter('water-stock-manage','ui.select');
            addBusinessRouter('water-send-history',1);
            addBusinessRouter('water-buy-history',1);
            addBusinessRouter('water-card','ui.select');
            addBusinessRouter('water-card-add',1);

            //boss后台 业务管理
            addBossRouter('business-commission-express',1);
            addBossRouter('business-commission-legwork',1);
            addBossRouter('business-commission-site',1);
            addBossRouter('business-function-setting',1);
            addBossRouter('business-function-setting-details','ui.select');
            addBossRouter('business-function-setting-new-card',1);
            addBossRouter('business-function-setting-card-details',1);
            addBossRouter('business-income',1);
            addBossRouter('business-personnel-commission',1);
            addBossRouter('business-personnel-commission-details',1);
            addBossRouter('watter-allSKU-manage','ui.select');
            addBossRouter('watter-allSKU-add','ui.select');
            addBossRouter('watter-allSKU-modify','ui.select');
            addBossRouter('watter-brand-manage',1);
            addBossRouter('watter-brand-add',1);
            addBossRouter('watter-business-type','ui.select');
            addBossRouter('watter-business-type-add','ui.select');
            addBossRouter('watter-citySKU-manage','ui.select');
            addBossRouter('watter-citySKU-add','ui.select');
            addBossRouter('watter-citySKU-modify','ui.select');
            addBossRouter('watter-timeout','ui.select');
            addBossRouter('watter-timeout-details',1);

            //业务后台 快递
            addBusinessRouter('express-check','ui.select');
            addBusinessRouter('express-dealt','ui.select');
            addBusinessRouter('express-getin','ui.select');
            addBusinessRouter('express-partition-setting','ui.select');
            addBusinessRouter('express-settlement','ui.select');
            addBusinessRouter('express-send','ui.select');

            //boss 人员管理
            addBossRouter('personnel-manage','ui.select');
            addBossRouter('personnel-create','ui.select');
            addBossRouter('personnel-assign',1);

            //boss 权限管理
            addBossRouter('role-manage',1);
            addBossRouter('role-create','angularBootstrapNavTree');

            addBossRouter('app-community-manage',1);


        }
    ]
)
    .controller('AppCtrl', ['$scope','$state', '$location','$sessionStorage', '$window',
        function( $scope,$state, $location, $sessionStorage,   $window ) {
            // config
            $scope.app = {
                name: 'boss-web',
                version: '1.0'
            };

            if(islogin()){
                var path = $location.path();
                if(path == '/login'){
                    $location.path('/index');
                }
                //$scope.navData = $sessionStorage.bossUser.permissionMenus;
                $scope.bossNavData = bossNavData;
                $scope.businessNavData = businessNavData;
            }else{
                $location.path('/login');
            }
            function islogin(){
                //return  $sessionStorage.bossUser!= undefined;
                return true;
            }
        }])

    //设置左侧导航
    .controller('NavCtrl', ['$scope','$state',
        function($scope,$state) {

            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                setNav($state);
            });
        }])
    .run(['$rootScope','$location','$state',function($rootScope,$location,$state){
        $rootScope.$on('$stateChangeSuccess',function(){
            setNav($state);
        })

    }]);

function setNav($state){
    var currentUrl = $state.current.name;
    var navUl = $('#nav-ul');
    navUl.find('a').each(function(i,a){
        var a = $(a);
        var thisLi = a.closest('li');
        var parentUl = a.closest('ul');

        if(a.attr('ui-sref')==currentUrl) {
            if (parentUl.is('.lev_2')) {
                parentUl.siblings('a').find('i').addClass('lev_down');
                navUl.find('.lev_2').not(parentUl).slideUp();
                var l1 = parentUl.closest('.lev_1').slideDown();
                navUl.find('.lev_1').not(l1).slideUp();
            }
            if (parentUl.is('.lev_1')) {
                navUl.find('.lev_1').not(parentUl).slideUp();
            }
            navUl.find('li').not('thisLi').removeClass('cur');
            thisLi.addClass('cur');
            parentUl.slideDown();
        }
    });
}


function log(arg){
    console.log(arg);
}
