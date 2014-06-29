nerdtalk.factory('Post', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

    var url = '/api/posts';

    var list = function() {

       var deferred = $q.defer();

       $http.get(url).then(

           function onSucces(result) {

               $rootScope.posts = result.data.posts;

               return deferred.resolve(result.data.posts);
           },

           function onError(err) {

               return deferred.reject(err);
           }
       );

        return deferred.promise;
    };

    var get = function(slug) {

        var post;
        var deferred = $q.defer();

        if($rootScope.posts) {

            var post = _.findWhere($rootScope.posts, {slug: slug});

            if(post) {

                deferred.resolve(post);

            }

        }

        if(!post) {

            $http.get(url + '/' + slug).then(

                function onSuccess(result) {

                    deferred.resolve(result.data.post);
                },

                function onError(err) {

                    deferred.reject(err);
                }
            )
        }

        return deferred.promise;
    };

    return {
        list: list,
        get: get
    }
}]);