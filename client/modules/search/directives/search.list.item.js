nerdtalk.directive('ntSearchListItem', ['$log', function($log) {

    return {
        scope: {
            slug: '=ntSlug',
            onSelected: "&ntOnSelected"
        },
        link: function(scope, el) {

            // Initialization Methods

            var init = function() {

                addBackgroundColor();
                addEventListeners();
            };


            var addBackgroundColor = function() {

                var index = Math.floor((Math.random() * 5) + 1);

                el.addClass('item-bgcolor-' + index);
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