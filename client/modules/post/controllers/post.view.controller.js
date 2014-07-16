nerdtalk.controller('PostViewController',
    ['$scope', '$location', '$route', '$routeParams', '$log', 'Post', 'App', 'ScrollState',
        function ($scope, $location, $route, $routeParams, $log, Post, App, ScrollState) {

            var init = function () {

                App.appBackgroundVisible(true);
                App.setAppScrollState(ScrollState.VERTICAL);

                getPost();
                addEventListener();
            };

            var getPost = function () {

                Post.findBySlug($routeParams.slug).then(

                    function onSuccess(data) {

                        $scope.post = data.post;
                        $scope.paging = data.paging;

                        App.setAppTitle(data.post.title);
                    },

                    function onError(err) {

                        $log.error(err);
                    }
                );
            };

            var addEventListener = function() {

                $scope.$on("$destroy",function() {

                    App.appBackgroundVisible(false);
                });

            };

            $scope.closePost = function () {

                $location.url('/');
            };

            $scope.showComments = function () {

            };

            init();

        }]);