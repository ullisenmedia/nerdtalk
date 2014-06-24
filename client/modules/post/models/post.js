nerdtalk.factory('Post', ['$http', function($http) {

    var url = '/ghost/api/v0.1/posts';

    var list = function() {

       return $http.get(url);
    };

    return {
        list: list
    }
}]);