nerdtalk.directive('ntSearchListItem', ['$log', function($log) {

    return {
        scope: {
            slug: '=ntSlug',
            onSelected: "&ntOnSelected"
        },
        link: function(scope, el) {

            // Initialization Methods

            var init = function() {

                addEventListeners();
            };

            // Event Listeners
            var addEventListeners = function() {

                el.on('click', function() {

                    if(scope.onSelected) {

                        scope.$apply(function() {

                            scope.onSelected({selectedItem: {slug: scope.slug}});
                        });

                    }
                });

                el.on('mouseover', function(e) {

                    el.addClass('item-state-active');

                });

                el.on('mouseleave', function() {

                    el.removeClass('item-state-active');

                });
            };

            init();
        }
    }
}]);