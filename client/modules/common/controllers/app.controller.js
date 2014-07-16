nerdtalk.controller('AppController', ['$scope', '$log', '$document', 'App', 'Views',
    function ($scope, $log, $document, App, Views) {

        // Methods
        var init = function () {

            $scope.sideMenuView = Views.SIDE_MENU;
            $scope.postView = Views.POST;

            addEventListeners();
        };

        // Event listeners
        var addEventListeners = function () {

            $scope.$watch('appTitle', function onAppTitleChanged() {

                var title = App.getAppTitle();

                if (title) {

                    $scope.title = title;
                }

            });
        };

        init();

    }]);