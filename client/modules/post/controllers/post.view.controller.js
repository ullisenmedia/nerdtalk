nerdtalk.controller('PostViewController', ['$scope', '$location', '$route', '$routeParams', '$log', 'Post',
    function ($scope, $location, $route, $routeParams, $log, Post) {

        var init = function () {

            getPost();
        };

        var getPost = function () {

            Post.findBySlug($routeParams.slug).then(

                function onSuccess(data) {

                    $scope.post = data.post;
                    $scope.paging = data.paging;
                },

                function onError(err) {

                    $log.error(err);
                }
            );
        };

        $scope.closePost = function() {

            $location.url('/');
        };

        $scope.showComments = function()  {

        };

        init();

    }]);