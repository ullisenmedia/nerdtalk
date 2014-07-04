nerdtalk.factory('Post', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

    var url = '/api/posts';

    var find = function() {

       var deferred = $q.defer();

       $http.get(url).then(

           function onSucces(result) {

               $rootScope.posts = result.data;

               return deferred.resolve(result.data);
           },

           function onError(err) {

               return deferred.reject(err);
           }
       );

        return deferred.promise;
    };

    var findBySlug = function(slug) {

        var post;
        var deferred = $q.defer();

        if($rootScope.posts) {

            var post = _.findWhere($rootScope.posts, {slug: slug});

            if(post) {

                deferred.resolve({post: post});

            }
        }

        if(!post) {

            $http.get(url + '/' + slug).then(

                function onSuccess(result) {

                    deferred.resolve(result.data);
                },

                function onError(err) {

                    deferred.reject(err);
                }
            )
        }

        return deferred.promise;
    };

    return {
        find: find,
        findBySlug: findBySlug
    }
}]);