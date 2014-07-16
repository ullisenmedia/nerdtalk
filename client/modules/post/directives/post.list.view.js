nerdtalk.directive('ntPostListView', ['$log', 'App', 'AppInfo', 'ScrollState', function($log, App, AppInfo, ScrollState) {

    return {

        scope: {},
        link: function(scope, el) {

            var rawEl;
            var hamster;

            var init = function() {

                rawEl = el[0];
                hamster = Hamster(rawEl);

                addEventListeners();
            };

            var addEventListeners = function() {

                hamster.wheel(function(event, delta, deltaX, deltaY) {

                    if(deltaY < 0 || deltaY > 0) {

                        rawEl.scrollLeft = rawEl.scrollLeft - deltaY;

                    }

                });
            };

            init();
        }
    }
}]);