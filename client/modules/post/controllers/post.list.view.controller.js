// Post List Controller

nerdtalk.controller('PostListViewController',
    ['$scope', '$routeParams', '$location', '$log', 'App', 'AppInfo', 'ScrollState', 'Post',
    function ($scope, $routeParams, $location, $log, App, AppInfo, ScrollState, Post) {

        var currentPage;

        var init = function () {

            App.setAppTitle(AppInfo.NAME);
            App.setAppScrollState(ScrollState.HORIZONTAL);

            $scope.isLoading = false;

            listPosts();
            addEventListeners();
        };

        var listPosts = function (params) {

            $scope.isLoading = true;

            Post.find(params).then(

                function onSuccess(data) {

                    $scope.posts = data.posts;
                    $scope.paging = data.paging;

                    $scope.isLoading = false;
                },

                function onError(err) {

                    $log.error(err);

                    $scope.isLoading = false;
                }
            );
        };

        var addEventListeners = function () {

            $scope.onNextPage = function() {

                var paging = $scope.paging;

                if(paging && paging.next && paging.next != currentPage) {

                    currentPage = paging.next;
                    listPosts($scope.paging.next);
                }
            };

            $scope.onItemSelected = function (selectedItem) {

                $location.url('posts/' + selectedItem.slug);

            };
        };


        init();

    }]);