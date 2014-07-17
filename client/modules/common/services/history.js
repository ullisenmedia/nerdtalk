nerdtalk.factory('History', ['$rootScope', '$location', '$log', function ($rootScope, $location, $log) {

    var currentLocation;
    var previousLocation;

    var init = function() {

        addEventListener();

    };

    var getCurrentLocation = function() {

        return currentLocation;
    };

    var getPreviousLocation = function() {

        return previousLocation;
    };

    var addEventListener = function() {

        $rootScope.$on('$routeChangeSuccess', function onRouteChangeSuccess(e, current) {

            previousLocation = currentLocation;
            currentLocation = $location.url();

        });
    };

    init();

    return {
        getCurrentLocation: getCurrentLocation,
        getPreviousLocation: getPreviousLocation
    }

}]);