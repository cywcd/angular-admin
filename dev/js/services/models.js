angular.module('models', [])
    .service('$models', ['$document','$q','$timeout','$http',function ($document, $q, $timeout,$http) {
        var testMode = true;// 是否用假数据

        var apis = {
            login:{
                url:'/Api/boss/login',
                testRes:{aaa:1}
            },
            //获取角色菜单列表
            roleMenus: {
                url: '/Api/role/roleMenus',
                method: 'get'
            },
           // 获取权限级别列表
            roleType: {
                url: '/Api/role/roleType',
                method: 'get'
            },
            //创建角色
            createSysRole: {
                url: '/Api/role/createSysRole',
                method: 'get'
            },
            //角色详情
            roleSingeMenus: {
                url: '/Api/role/roleSingeMenus',
                method: 'get'
            },
            //修改角色保存操作
            updateSysRole: {
                url: '/Api/role/updateSysRole',
                method: 'get'
            },
            //获取角色列表 删除角色
            getSysRoles: {
                url: '/Api/role/getSysRoles',
                method: 'get'
            },
            //创建员工（以前叫创建帐号）页面中获取
            roleNames: {
                url: '/Api/role/roleNames',
                method: 'get'
            },

            //送水服务 网点水卡管理
            listCardByPage: {
                url: '/Api/buyCard/listCardByPage',
                method: 'get'
            },
            //送水服务 网点水卡管理
            buyCardCreateOrder: {
                url: '/Api/buyCard/createOrder',
                method: 'get'
            },
            createSkuOrderByCard:{
                url: '/Api/skuByCard/createSkuOrderByCard',
                method: 'get'
            },
            //获取员工状态
            statusList: {
                url: '/Api/operation/statusList',
                method: 'get'
            },
            //创建员工
            operationAdd: {
                url: '/Api/operation/add',
                method: 'get'
            },
            //查询员工列表
            pageList: {
                url: '/Api/operation/pageList',
                method: 'get'
            },
            //删除员工
            deleteOperation: {
                url: '/Api/operation/deleteOperation',
                method: 'get'
            },

            WatterBuyList:{
                url:'/Api/boss/listCommunityByPage',
                method:'get',
                testMode:true,
                testRes:{
                    "beginPageIndex":0,
                    "countResultMap":null,
                    "currentPage":1,
                    "endPageIndex":0,
                    "numPerPage":10,
                    "pageCount":0,
                    "totalCount":100,
                    "recordList":[
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"},
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"},
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"},
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"},
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"},
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"},
                        {0: "2001", 1: "13800138000", 2: "白云国际", 3: "3-603", 4: "大白", 5: "00000277", 6: "农夫山泉促销", 7: "100.00", 8: "1", 9: "2016-06-07 10:35:05", 10: "待支付", 11: "2016-06-07 13:35:05"}
                    ]
                }
            },
            personnelManageList:{
                url:'/Api/boss/listCommunityByPage',
                method:'get',
                testMode:true,
                testRes:{
                    "beginPageIndex":0,
                    "countResultMap":null,
                    "currentPage":1,
                    "endPageIndex":0,
                    "numPerPage":10,
                    "pageCount":0,
                    "totalCount":100,
                    "recordList":[
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"],
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"],
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"],
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"],
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"],
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"],
                        ["01000001", "张三", "13301317085", "城市经理", "北京", "BJ00001", "乐成国际", "试用期员工", "北京市上海市"]
                    ]
                }
            },

            //省市区级联：省
            getCascadingLoactionProvince : {
                url: '/Api/region/listRegion',
                method: 'post',
                testMode:false
            },
            //省市区级联：市
            getCascadingLoactionCity : {
                url: '/Api/customerController/getCityByPdscd',
                method: 'post',
                testMode:false
            },
            //省市区级联：区
            getCascadingLoactionDistrict : {
                url: '/Api/customerController/getDownTownByPdscd',
                method: 'post',
                testMode:false
            },
            //SKU
            //业务类别
            lynBizTypeList: {
                url: '/Api/bizType/listByPage',
                method: 'get',
                testMode:false
            },
            //业务功能设置
            //网点所有功能的查询
            lynListSite: {
                url: '/Api/provider/listSiteByPage',
                method: 'get',
                testMode:false
            },

            //--网点管理--
            //查询网点
            getProviderList: {
                url: '/Api/right/getProviderList',
                method: 'get',
                testMode:false
            },

            //=====业务管理接口开始=====//

            //获取对应网点ID的配置信息
            lynQuerySiteConfigInfo:{url: '/Api/business/config/list', testMode:false},


            //业务功能设置业务
            //网点业务设置的查询
            lynQueryListSite: {url: '/Api/site/listSitesByPage',method: 'get',testMode:false},
            //获取网点各种业务开启状态
            lynQuerySiteFunctionStatus:{url: '/Api/business/config/communitys/status', testMode:false},
            //更新配置信息
            lynUpdateSiteConfigInfo : {url:'/Api/business/config/update',testMode:false},
            //获取预约时间列表
            lynQueryListAppointmentInfo : {url:'/Api/site/system/deliveryTimeSet/list',testMode:false},

            //=====业务管理接口结束=====//
            //=====快递接口开始=====//

            //待处理订单条数
            lynExpressQueryListToBeDoneCount : {url : '/Api/queryExpress/undoListCount',testMode:false},

            //查询本网点待处理订单列表-代办处理
            lynExpressQueryListToBeDone : {url : '/Api/queryExpress/undoList',testMode:false},
            //获取与本网点有关系的快递公司列表
            lynExpressQueryListRelatedCompanies : {url : '/Api/expressBusinessController/findAllExpress',testMode : false},
            //获取与本网点有结算关系的快递公司列表
            lynExpressQueryListMoneyCompanies : {url : '/Api/express/settlement/by/site', testMode:false},
            //获取本网点设置的分区
            lynExpressQueryListPartitions : {url : '/Api/expressBusinessPcController/getListSitePartition', restMode : false},
            //获取本网点所有的worker
            lynExpressQueryListWorkers : {url : '/Api/queryExpress/listAllWorkers', testMode : false},
            //获取当前网点可预约时间段
            lynExpressQueryListBookTime : {url : '/Api/express/sendOrder/getBookTime', testMode : false},

            //标记自提签收
            lynExpressMarkSelfSign : {url : '/Api/express/sign/signPkgReceive', testMode : false},
            //标记为寄存操作
            lynExpressMarkDeposit : {url : '/Api/express/sign/depositPkg', testMode : false},
            //设定预约时间
            lynExpressSetBookTime : {url : '/Api/express/sendOrder/setDeliveryBookTime', testMode : false},
            //发送短信
            lynExpressSendMsg : {url : '/Api/express/sendOrder/sendSms', testMode : false},
            //派单
            lynExpressIssueOrder : {url : '/Api/express/sendOrder/dispatch', testMode : false},
            //退回快递
            lynExpressQuitExpress : {url : '/Api/express/untread/back', testMode : false},
            //确认丢件
            lynExpressConfirmLoss : {url : '/Api/express/sign/lostShippment', testMode : false},
            //=====快递接口结束=====//



            //=====组织机构接口开始=====//
            //查询片区的详细信息
            getAreaDistrictInfo: {
                url: '/Api/right/getAreaDistrictInfo',
                method: 'get',
                testMode:false
            },
            //获取负责人列表
            getManagerList: {
                url: '/Api/right/getManagerList',
                method: 'get',
                testMode:false
            },
            //获取片区列表
            getAreaDistrictList: {
                url: '/Api/right/getAreaDistrictList',
                method: 'get',
                testMode:false
            },
            //新增片区
            addOrUpdateAreaDistrict: {
                url: '/Api/right/addOrUpdateAreaDistrict',
                method: 'get',
                testMode:false
            },
            //删除片区
            deleteAreaDistrict: {
                url: '/Api/right/deleteAreaDistrict',
                method: 'get',
                testMode:false
            },

            //查询辖区详细信息
            getAreaPopedomInfo: {
                url: '/Api/right/getAreaPopedomInfo',
                method: 'get',
                testMode:false
            },
            //获取辖区列表
            getAreaPopedomList: {
                url: '/Api/right/getAreaPopedomList',
                method: 'get',
                testMode:false
            },
            //新增辖区和更新辖区
            addOrUpdateAreaPopedom: {
                url: '/Api/right/addOrUpdateAreaPopedom',
                method: 'get',
                testMode:false
            },
            //删除辖区
            deleteAreaPopedom: {
                url: '/Api/right/deleteAreaPopedom',
                method: 'get',
                testMode:false
            }
        };
        //=====组织机构接口结束=====//

        this.request = function(option){
            var arg = {
                method:option.method || 'post',
                url: option.url || '',
                data: option.data||{}
                //,
                //headers: { 'Content-Type': option.ContentType||'application/x-www-form-urlencoded; charset=UTF-8'},
                //transformRequest: function(data) {
                //    return $.param(data);
                //}
            };

            if(testMode && option.testMode){
               var res = option.testRes;

                option.success.call(this,res);
            }else{
                $.ajax(arg)
                    .then(function(res){
                        option.success.call(this,res);
                    },function(res){

                        option.error.call(this,res);
                    });
            }

        };

        this.api = function(apiName,data,callback1,callback2){
            var success,error;
            if(angular.isFunction(data)){
                success = data;
                error = callback1;
            }else{
                success = callback1;
                error = callback2;
            }
            this.request($.extend(true,{},apis[apiName],{data:data,success:success,error:error}));
        }
    }])

    /**
     * 页面之间的传参
     * */
    .factory('passParametersService', function() {
        var savedData = {};

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    })

//导航
var bossNavData = [
    {
        "name": "机构管理",
        "list":[
            {
                "name":"网点管理",
                "url":'boss.organization-network'
            },
            {
                "name":"小区管理",
                "url":'boss.organization-village'
            },
            {
                "name":"组织机构",
                "url":'boss.organization-institution'
            }
        ]
    },
    {
        "name": "业务管理",
        "list":[
            {
                "name":"业务功能设置",
                "url":'boss.business-function-setting'
            },
            {
                "name":"全国提成设置",
                "list":[

                    {
                        "name":"快递业务提成",
                        "url":'boss.business-commission-express'
                    }
                ]
            },
            {
                "name":"业务收入",
                "url":'boss.business-income'
            },
            {
                "name":"员工提成",
                "url":'boss.business-personnel-commission'
            },
            {

                "name":"SKU管理",
                "list":[

                    {
                        "name":"业务类别",
                        "url":'boss.watter-business-type'
                    },
                    {
                        "name":"品牌管理",
                        "url":'boss.watter-brand-manage'
                    },
                    {
                        "name":"全国SKU管理",
                        "url":'boss.watter-allSKU-manage'
                    },
                    {
                        "name":"城市SKU管理",
                        "url":'boss.watter-citySKU-manage'
                    }
                ]
            },
            {
                "name":"超时订单记录",
                "url":'boss.watter-timeout'
            }

        ]
    },
    {
        "name": "员工管理",
        list:[
            {
                name:"员工管理",
                url:"boss.personnel-manage"
            }
        ]
    },
    {
        "name": "权限管理",
        list:[
            {
                name:"角色管理",
                url:"boss.role-manage"

            }
        ]
    }
];

//导航
var businessNavData = [
    {
        "name": "送件服务",
        "list":[
            {
                "name":"入库",
                "url":'business.express-getin'
            },
            {
                "name":"代办处理",
                "url":'business.express-dealt'
            },
            {
                "name":"查看全部快件",
                "url":'business.express-check'
            },
            {
                "name":"快递公司结算",
                "url":'business.express-settlement'
            },
            {
                "name":"分区设置",
                "url":'business.express-partition-setting'
            }
        ]
    },
    {
        "name": "寄件服务",
        list:[
            {
                name:"寄件",
                url:"business.express-send"
            }
        ]
    },
    {
        "name": "送水服务",
        list:[
            {
                "name":"订单管理",
                list:[
                    {
                        "name":"购买订单",
                        url:"business.water-buy-list"
                    },
                    {
                        "name":"预约订单",
                        url:"business.water-appointment-list"
                    }
                ]
            },
            {
                "name":"退押金申请",
                url:"business.water-deposit-back"
            },
            {
                "name":"客户库存管理",
                url:"business.water-stock-manage"

            },
            {
                "name":"网点水卡管理",
                url:"business.water-card"
            }
        ]
    }

];
