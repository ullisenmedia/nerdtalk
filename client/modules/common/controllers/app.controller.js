nerdtalk.controller('AppController', ['$scope', function ($scope) {

    var init = function () {

        $scope.sideMenuView = {template: {url: 'modules/common/views/partials/side.menu.html'}};
        $scope.postView = {template: {url: 'modules/post/views/post.view.html', show: false}}

    };

    init();

}]);