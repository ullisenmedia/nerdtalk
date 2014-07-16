nerdtalk.factory('App', ['$rootScope', '$document', function($rootScope, $document) {

    var setAppTitle = function(title) {

        $rootScope.appTitle = title;
    };

    var getAppTitle = function() {

        return $rootScope.appTitle;
    };

    var setAppDescription = function(desc) {

        $rootScope.appDescription = desc;
    };

    var getAppDescription = function() {

        return $rootScope.appDescription;
    };

    var setAppScrollState = function(state) {

        $rootScope.appScrollState = state;
    };

    var getAppScrollState = function() {

        return $rootScope.appScrollState;
    };

    var appBackgroundVisible = function(visible) {

        $rootScope.appBackgroundVisible = visible;
    };

    var isAppBackgroundVisible = function() {

        return $rootScope.appBackgroundVisible;
    };

    return {
        setAppTitle: setAppTitle,
        getAppTitle: getAppTitle,
        setAppDescription: setAppDescription,
        getAppDescription: getAppDescription,
        setAppScrollState: setAppScrollState,
        getAppScrollState: getAppScrollState,
        appBackgroundVisible: appBackgroundVisible,
        isAppBackgroundVisible: isAppBackgroundVisible
    }

}]);