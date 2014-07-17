nerdtalk.factory('Util', [function() {

    var URL = document.createElement('a');

    var parseURL = function(url) {

        URL.href = url;

        return URL;
    };

    return {
        parseURL: parseURL
    }
}]);