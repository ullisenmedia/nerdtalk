// Post List Controller

nerdtalk.controller('PostListViewController', ['$scope', '$routeParams', '$log', 'Post', function($scope, $routeParams, $log, Post) {

    var init = function() {

        listPosts();
    };

    var listPosts = function() {

        Post.list()
            .success(function(data) {

                $scope.posts = data.posts;
            })
            .error(function(err) {

                $log.info(err);
            })
    };

    init();

}]);