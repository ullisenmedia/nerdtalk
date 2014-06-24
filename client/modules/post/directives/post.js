nerdtalk.directive('ntPost', ['$log', function($log) {

    return {

        scope: {},
        link: function(scope, el) {

            var shareMenu = el.children("[skin-part='shareMenu']");

            var faceBookButton = shareMenu.find('a').eq(0);
            var twitterButton = shareMenu.find('a').eq(1);
            var gplusButton = shareMenu.find('a').eq(2);

            var init = function() {

                addEventListeners();
            };

            var addEventListeners = function() {

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