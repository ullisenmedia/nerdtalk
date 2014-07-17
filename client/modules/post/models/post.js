nerdtalk.factory('Post', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

    var search = function(keyword) {

        var deferred = $q.defer();

        $http.get('/api/search', {params: {q: keyword}}).then(

            function onSuccess(result) {

                return deferred.resolve(result.data);
            },

            function onError(err) {

                return deferred.reject(err);
            }
        );

        return deferred.promise;
    };

    var page = function(url) {

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

    var find = function(params) {

       var deferred = $q.defer();

       $http.get('/api/posts', {params: params}).then(

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

            $http.get('/api/posts' + '/' + slug).then(

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
        search: search,
        page: page,
        find: find,
        findBySlug: findBySlug
    }
}]);