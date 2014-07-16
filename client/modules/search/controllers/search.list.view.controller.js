nerdtalk.controller('SearchListViewController',
    ['$scope', '$location', '$route', '$routeParams', '$log', 'App', 'AppInfo', 'ScrollState', 'Post',
        function ($scope, $location, $route, $routeParams, $log, App, AppInfo, ScrollState, Post) {

            var keyword = $routeParams.q;

            var init = function () {

                App.setAppTitle('Search Results:' + keyword);
                App.setAppScrollState(ScrollState.VERTICAL);

                search();
                addEventListeners();
            };

            var search = function () {

                Post.search(keyword).then(

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

                $scope.onNextPage = function () {

                };

                $scope.onItemSelected = function (selectedItem) {

                    $location.url('posts/' + selectedItem.slug);

                };
            };

            init();
        }]);