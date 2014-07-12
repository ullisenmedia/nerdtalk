nerdtalk.controller('SearchViewController', ['$scope', '$location', '$route', '$routeParams', '$log', 'Post',
    function ($scope, $location, $route, $routeParams, $log, Post) {

        var init = function() {

            search();
        };

        var search = function() {

            Post.search($routeParams.q).then(

                function onSuccess(data) {

                    $scope.results = data.posts;
                    $scope.paging = data.paging;
                },

                function onError(err) {

                    $log.error(err);
                }
            );
        };

        init();
    }]);