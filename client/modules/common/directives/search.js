nerdtalk.directive('ntSearch', ['$log', function($log) {

    return {
        restrict: 'A',
        scope: {},

        link: function(scope, el) {

            var searchInput = el.children('[skin-part="searchInput"]');

            searchInput.on('focus', function() {

                $log.debug('clicked');
                el.addClass('search-state-active')

            });

            searchInput.on('blur', function() {

                el.removeClass('search-state-active');

            });

        }
    }
}]);