nerdtalk.controller('SearchListViewController', ['$scope', '$location', '$route', '$routeParams', '$log', 'Post',
    function ($scope, $location, $route, $routeParams, $log, Post) {

        var init = function() {

            search();
            addEventListeners();
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

        var addEventListeners = function () {

            $scope.onNextPage = function() {

            };

            $scope.onItemSelected = function (selectedItem) {

                $location.url('posts/' + selectedItem.slug);

            };
        };

        init();
    }]);