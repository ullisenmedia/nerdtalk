nerdtalk.controller('AppController', ['$scope', '$log', '$document', 'App', 'Views', 'History',
    function ($scope, $log, $document, App, Views, History) {

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