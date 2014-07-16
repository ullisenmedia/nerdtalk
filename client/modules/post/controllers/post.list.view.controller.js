// Post List Controller

nerdtalk.controller('PostListViewController',
    ['$scope', '$routeParams', '$location', '$log', 'App', 'AppInfo', 'ScrollState', 'Post',
    function ($scope, $routeParams, $location, $log, App, AppInfo, ScrollState, Post) {

        var init = function () {

            App.setAppTitle(AppInfo.NAME);
            App.setAppScrollState(ScrollState.HORIZONTAL);

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