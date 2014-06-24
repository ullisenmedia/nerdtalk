nerdtalk.directive('ntShare', [function() {

    return {

        scope: {url: "@ntShare"},
        link: function(scope, el, attr) {

            var init = function() {

                addEventListener();
            };

            var addEventListener = function() {

                el.on('mousedown', function(e) {

                    e.stopPropagation();

                    window.open(scope.url, '', 'width=550,height=266');

                });
            };

            init();
        }
    }
}])