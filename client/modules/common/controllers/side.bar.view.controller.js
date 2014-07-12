nerdtalk.controller('SideBarViewController', ['$scope', '$location', function($scope, $location) {

//    $scope.sideMenuView = {template: {url: 'modules/common/views/partials/side.menu.html'}};

    var init = function() {

        addEventListener();
    };

    var addEventListener = function() {

        $scope.onSearch = function(keyword) {

            $location.url('/search/?q='+keyword);
//            $location.url('/search');
        };
    };

    init();


}]);