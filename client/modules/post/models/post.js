nerdtalk.factory('Post', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

    var url = '/ghost/api/v0.1/posts';

    var list = function() {

       var deferred = $q.defer();

       $http.get(url).then(

           function onSucces(data) {

               $rootScope.posts = data.data.posts;

               return deferred.resolve(data.data);
           },

           function onError(err) {

               return deferred.reject(err);
           }
       );

        return deferred.promise;
    };

    var get = function(id) {

        var post;
        var deferred = $q.defer();

        if($rootScope.posts) {

            var post = _.findWhere($rootScope.posts, {slug: id});

            if(post) {

                deferred.resolve(post);

            }

        }

        if(!post) {
            // TODO Get data from server
        }

        return deferred.promise;
    };

    return {
        list: list,
        get: get
    }
}]);