// Post List Controller

nerdtalk.controller('PostListViewController', ['$scope', '$routeParams', '$location', '$log', 'Post',
    function ($scope, $routeParams, $location, $log, Post) {

        var init = function () {

            listPosts();
            addEventListeners();
        };

        var listPosts = function () {

            Post.find().then(

                function onSuccess(data) {

                    $scope.posts = data.posts;
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