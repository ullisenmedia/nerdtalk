nerdtalk.directive('ntPostListItem', ['$log', function($log) {

    return {

        scope: {
            slug: '=ntSlug',
            onSelected: "&ntOnSelected"
        },
        link: function(scope, el) {

            // Variables

            var shareMenu = el.children("[skin-part='shareMenu']");

            var faceBookButton = shareMenu.find('a').eq(0);
            var twitterButton = shareMenu.find('a').eq(1);
            var gplusButton = shareMenu.find('a').eq(2);

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

                    el.addClass('post-state-active');

                    faceBookButton.addClass('icon-facebook-blk');
                    twitterButton.addClass('icon-twitter-blk');
                    gplusButton.addClass('icon-gplus-blk');

                });

                el.on('mouseleave', function() {

                    el.removeClass('post-state-active');

                    faceBookButton.removeClass('icon-facebook-blk');
                    twitterButton.removeClass('icon-twitter-blk');
                    gplusButton.removeClass('icon-gplus-blk');

                });
            };

            init();
        }
    }
}])