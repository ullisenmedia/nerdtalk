// Post List Controller

nerdtalk.controller('PostListViewController', ['$scope', '$routeParams', '$location', '$log', 'Post',
    function ($scope, $routeParams, $location, $log, Post) {

        var init = function () {

            listPosts();
            addEventListeners();
        };

        var listPosts = function () {

            Post.list().then(

                function onSuccess(data) {

                    $scope.posts = data.posts;
                },

                function onError(err) {

                    $log.error(err);
                }
            );
        };

        var addEventListeners = function () {

            $scope.onItemSelected = function (selectedItem) {

                $location.url('post/' + selectedItem.slug);

            };
        };


        init();

    }]);