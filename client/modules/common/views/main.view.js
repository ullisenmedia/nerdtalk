nerdtalk.directive('ntMainView', ['App', 'ScrollState', function (App, ScrollState) {

    return {

        link: function (scope, el) {

            var init = function () {

                setBackgroundVisibility();
                setViewScrollState();
            };

            var setBackgroundVisibility = function() {

                var visible = App.isAppBackgroundVisible();

                el.removeClass('app-background');

                if(visible) {

                    el.addClass('app-background');
                }
            };

            var setViewScrollState = function() {

                var state = App.getAppScrollState();

                if(state) {

                    el.removeClass('app-scroll-state-none app-scroll-state-both app-scroll-state-horiz app-scroll-state-vert');

                    switch (state) {

                        case ScrollState.HORIZONTAL:
                            el.addClass('app-scroll-state-horiz');
                            break;

                        case ScrollState.VERTICAL:
                            el.addClass('app-scroll-state-vert');
                            break;

                        case ScrollState.BOTH:
                            el.addClass('app-scroll-state-both');
                            break;

                        case ScrollState.NONE:
                            el.addClass('app-scroll-state-none');
                            break;
                    }

                }

            };

            init();
        }
    }
}]);