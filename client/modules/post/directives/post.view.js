nerdtalk.directive('ntPostView', ['$rootScope', '$animate', '$log', 'App', 'ScrollState',
    function($rootScope, $animate, $log, App, ScrollState) {

    return {

        link: function(scope, el) {

            var closeButton = el.children("[skin-part='closeButton']");
//            var nextButton = el.children("[skin-part='nextButton']");
//            var prevButton = el.children("[skin-part='prevButton']");
            var commentsButton = el.children("[skin-part='commentButton']");

            var init = function() {

//                $animate.addClass(el, 'animated slideInLeft post-animate-in');

                addEventListeners();
            };

            var addEventListeners = function() {

                closeButton.on('click', function(e) {

                    e.preventDefault();

                    scope.$apply(function() {

                        scope.closePost();
                    });

//                    $animate.removeClass(el, 'animated slideInLeft post-animate-in');
//
//                    $animate.addClass(el, 'animated slideOutLeft post-animate-in', function() {
//
//                        scope.$apply(function() {
//
//                            scope.closePost();
//                        });
//
//                    });
                });

                commentsButton.on('click', function(e) {

                    e.preventDefault();

                    scope.$apply(function() {

                        scope.showComments();
                    });

                });
            };

            init();
        }
    }
}]);