app.controller('RoleCreateCtrl', ['$scope','$element','$modules',function($scope,$element,$modules) {
    var apple_selected,treedata_avm;
    $scope.my_tree_handler = function(branch) {
        log(branch);
        checkTree(branch);
    };

    function checkTree(branch){
        branch.checked = !branch.checked;
        checkAllSub(branch,branch)
    }

    function checkAllSub(sub,branch){
        sub.checked = branch.checked;
        var children = sub.children;
        for(var i = children.length;i--;){
            checkAllSub(children[i],branch);
        }

    }

    $modules.api('roleMenus',function(res){
        if(res){
           function formatRes(o){
               if(Object.prototype.toString.call(o) == '[object Array]'){
                   var data = [];
                   for(var i= 0,l= o.length;i<l;i++){
                       var item = o[i];
                       data[i] = {};
                       data[i].label = item.sourceName;
                       data[i].id = item.mid;
                       if(item.leafList.length){
                           data[i].children = formatRes(item.leafList)
                       }else{
                           data[i].children = [];
                       }
                   }
                   return data;
               }

           }
        }


    });
    treedata_avm = [
        {
            label: '网点管理',
            id:'site-config',
            checked:false,
            children: [
                {
                    label: '网点设置',
                    id:'site-config',
                    checked:false,
                    children: [
                        {
                            label: '选择网点',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '基础信息',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '网点介绍',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '网点配置',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '网点属性',
                            id:'site-config',
                            checked:false
                        }
                    ]
                }, {
                    label: '小区管理',
                    id:'site-config',
                    checked:false,
                    children: [
                        {
                            label: '选择小区',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '查看',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '设置',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '新增',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '删除',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '房间号管理',
                            id:'site-config',
                            checked:false
                        }

                    ]
                }, {
                    label: '组织结构管理',
                    id:'site-config',
                    checked:false,
                    children: [
                        {
                            label: '选择机构',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '片区管理',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '新增片区',
                                    id:'site-config',
                                    checked:false
                                }, {
                                    label: '设置片区',
                                    id:'site-config',
                                    checked:false
                                }, {
                                    label: '删除片区',
                                    id:'site-config',
                                    checked:false
                                }
                            ]
                        }, {
                            label: '督导辖区管理',
                            id:'site-config',
                            checked:false
                        }
                    ]
                }
            ]
        },
        {
            label: '快递业务',
            id:'site-config',
            checked:false,
            children: [
                {
                    label: '业务功能设置',
                    id:'site-config',
                    checked:false,
                    children: [
                        {
                            label: '业务启动开关',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '预约配送开关',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '设置预约时间',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '短信模板编辑',
                            id:'site-config',
                            checked:false
                        }, {
                            label: '编辑快递公司',
                            id:'site-config',
                            checked:false
                        }
                    ]
                }, {
                    label: '业务提成及全国设置',
                    id:'site-config',
                    checked:false,
                    children: [
                        {
                            label: '快递服务设置',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '管家提成',
                                    id:'site-config',
                                    checked:false
                                }, {
                                    label: '站长提成',
                                    id:'site-config',
                                    checked:false
                                }, {
                                    label: '送件提成',
                                    id:'site-config',
                                    checked:false
                                }, {
                                    label: '自提提成',
                                    id:'site-config',
                                    checked:false
                                }, {
                                    label: '全国快递公司管理',
                                    id:'site-config',
                                    checked:false
                                }
                            ]
                        }, {
                            label: '跑腿服务设置',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '管家提成设置',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '站长提成设置',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '跑腿服务费维护',
                                    id:'site-config',
                                    checked:false
                                }
                            ]
                        }, {
                            label: '网点服务设置',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '管家提成设置',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '站长提成设置',
                                    id:'site-config',
                                    checked:false
                                }
                            ]

                        }, {
                            label: '业务收入',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '查询',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '导出',
                                    id:'site-config',
                                    checked:false
                                }
                            ]

                        }, {
                            label: '收入明细',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '查询',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '导出',
                                    id:'site-config',
                                    checked:false
                                }
                            ]

                        }, {
                            label: '员工提成',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '查询',
                                    id:'site-config',
                                    checked:false
                                }
                            ]

                        }, {
                            label: '跑腿网点服务',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '新建订单',
                                    id:'site-config',
                                    checked:false
                                }
                            ]

                        }, {
                            label: '送件',
                            id:'site-config',
                            checked:false,
                            children: [
                                {
                                    label: '入库',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '代办处理',
                                    id:'site-config',
                                    checked:false,
                                    children: [
                                        {
                                            label: '自提签收',
                                            id:'site-config',
                                            checked:false
                                        },
                                        {
                                            label: '寄存标记',
                                            id:'site-config',
                                            checked:false
                                        }
                                        ]
                                },{
                                    label: '查看全部快件',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '快递公司结算',
                                    id:'site-config',
                                    checked:false
                                },{
                                    label: '寄件',
                                    id:'site-config',
                                    checked:false
                                }
                            ]

                        }
                    ]
                }
            ]
        },
        {
            label: '员工&权限管理',
            id:'site-config',
            checked:false,
            children:[
                {
                    label: '员工管理',
                    id:'site-config',
                    checked:false
                },
                {
                    label: '权限管理',
                    id:'site-config',
                    checked:false
                }

            ]
        }

    ];

    $scope.my_data = treedata_avm;

}]);