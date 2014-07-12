nerdtalk.directive('ntSearch', ['$log', function($log) {

    return {
        restrict: 'A',
        scope: {
            onSearch: "&ntOnSearch"
        },

        link: function(scope, el) {

            var searchInput = el.children('[skin-part="searchInput"]');

            var init = function() {

                addEventListeners();
            };

            var addEventListeners = function() {

                searchInput.on('focus', function() {

                    $log.debug('clicked');
                    el.addClass('search-state-active')

                });

                searchInput.on('blur', function() {

                    el.removeClass('search-state-active');

                });

                searchInput.on('keypress', function(e) {

                    var code = e.keyCode || e.which;

                    if(code === 13) {

                        if(scope.onSearch) {

                            scope.$apply(function() {

                                scope.onSearch({keyword: searchInput.val()});
                            });

                        }

                        $log.debug('search: ' + searchInput.val());
                    }

                });

            };

             init();

        }
    }
}]);