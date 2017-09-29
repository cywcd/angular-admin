module.exports = function(grunt) {
    "use strict";



    var oPath="dev/";
    var tPath="build/";

	//require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),

        copy: {
            all:{
                files:[{
                    expand: true,
                    cwd:oPath,
                    src:['**/*'],
                    dest:tPath
                }]
            }
        },

        uglify: {
            my_target_js: {
                options: {
                    mangle: false, //不混淆变量名
                    //preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    preserveComments:false,
                    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: [{
                    expand: true,
                    cwd:tPath+'js',
                    src:'**/*.js',
                    dest:tPath+'js'
                }]
            }
        },

        //压缩css
        cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd:tPath,
                        src:'**/*.css',
                        dest:tPath
                    }
                ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            main:{
                src:[
                    tPath+"js/app.js",
                    tPath+"js/services/ui-load.js",
                    tPath+"js/directives/ui-jq.js",
                    tPath+"js/directives/ui-validate.js",
                    tPath+"js/directives/d-nav.js",
                    tPath+"js/directives/d-table.js",
                    tPath+"js/directives/d-dialog.js",
                    tPath+"js/directives/delivery.js",
                    tPath+"js/directives/organization.js",
                    tPath+"js/directives/angucomplete.js",
                    tPath+"js/services/models.js"
                ],
                dest:tPath+'js/mini_main.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default',['copy','uglify','cssmin','concat']);

};
