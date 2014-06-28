// Setup App Module

var nerdtalk = angular.module('nerdtalk', [

        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'ngMockE2E'
    ])
    .config(['$routeProvider', '$locationProvider', '$interpolateProvider',
        function ($routeProvider, $locationProvider, $interpolateProvider) {

            // Route Configurations

            $routeProvider
                .when('/', {

                    templateUrl: 'modules/post/views/post.list.view.html',
                    controller: 'PostListViewController'
                })
                .when('/post/:slug', {

                    templateUrl: 'modules/post/views/post.view.html',
                    controller: 'PostViewController'
                });

//        $locationProvider.html5Mode(true);


            // Interpolation Configurations

            $interpolateProvider.startSymbol('{[{').endSymbol('}]}')

            // Location Configurations

            $locationProvider.hashPrefix('!');

        }])
    .run(['$httpBackend', 'mockPosts', function ($httpBackend, mockPosts) {

        $httpBackend.whenGET(/\.html$/).passThrough();

        $httpBackend.whenGET('/ghost/api/v0.1/posts').respond(mockPosts);

    }]);

