nerdtalk.directive('ntShare', ['$window', function($window) {

    return {

        scope: {url: "@ntShare"},
        link: function(scope, el) {

            var init = function() {

                addEventListener();
            };

            var addEventListener = function() {

                el.on('click', function(e) {

                    e.stopPropagation();
                    e.preventDefault();

                    $window.open(scope.url, '', 'width=550,height=266');

                    return false;
                });
            };

            init();
        }
    }
}])