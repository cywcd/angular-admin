app.directive('dNav', ['$timeout','$state',function($timeout,$state) {
        return {
            restrict: 'EA',
            link: function(scope, el, attr) {

                el.on('click', 'h2', function(e) {
                    var _this = $(this);
                    var thislist = _this.siblings(".lev_1").eq(0);
                    var rootUl = _this.closest('ul');
                    rootUl.find('ul').not(thislist).slideUp();
                    rootUl.find('i').removeClass('lev_down');
                    thislist.slideDown();
                });

                el.on('click', '.j_hasSub', function(e) {
                    var _this = $(this);
                    var thislist = _this.siblings(".lev_2").eq(0);
                    var thisjt = _this.find('i').eq(0);
                    _this.closest('ul').find('ul').not(thislist).slideUp('fast',function(){
                        _this.closest('ul').find('i').not(thisjt).removeClass('lev_down');
                    });
                    thislist.slideToggle('fast',function(){
                        thisjt.toggleClass('lev_down');
                    });
                });

            }

        }

    }])
    .directive('finishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});