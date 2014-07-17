nerdtalk.directive('ntPostListView', ['$log', 'App', 'AppInfo', 'ScrollState', function($log, App, AppInfo, ScrollState) {

    return {

        scope: {
//            isLoading: '=ntIsLoading',
            onNextPage: '&ntOnNextPage'
        },
        link: function(scope, el) {

            var rawEl;
            var hamster;

            var init = function() {

                rawEl = el[0];
                hamster = Hamster(rawEl);

                addEventListeners();
            };

            var addEventListeners = function() {

                el.on('scroll', function onScroll() {

                    if(!scope.$parent.isLoading) {

                        var scrollWidth = rawEl.scrollWidth;
                        var scrollLeft = rawEl.scrollLeft;

                        var halfPoint = scrollWidth/2;

                        if(scrollLeft >= halfPoint) {

                            scope.$apply(function() {

                                scope.$parent.isLoading = true;
                                scope.onNextPage();
                            });
                        }
                    };

                });

                hamster.wheel(function onWheelChange(e, delta, deltaX, deltaY) {

                    if(deltaY < 0 || deltaY > 0) {

                        rawEl.scrollLeft = rawEl.scrollLeft - deltaY;

                    }

                });
            };

            init();
        }
    }
}]);