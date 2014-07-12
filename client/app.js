// Setup App Module

var nerdtalk = angular.module('nerdtalk', [

        'ngRoute',
        'ngSanitize',
        'ngAnimate',
//        'ngMockE2E'
    ])
    .config(['$routeProvider', '$locationProvider', '$interpolateProvider',
        function ($routeProvider, $locationProvider, $interpolateProvider) {

            // Route Configurations

            $routeProvider
                .when('/', {

                    templateUrl: '/modules/post/views/post.list.view.html',
                    controller: 'PostListViewController'
                })
                .when('/search', {
                    templateUrl: '/modules/search/views/search.view.html',
                    controller: 'SearchViewController'
                })
                .when('/posts/:slug', {

                    templateUrl: '/modules/post/views/post.view.html',
                    controller: 'PostViewController'
                });


            // Interpolation Configurations

            $interpolateProvider.startSymbol('{[{').endSymbol('}]}')

            // Location Configurations

            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(true);

        }])
//    .run(['$httpBackend', 'mockPosts', function ($httpBackend, mockPosts) {
//
//        $httpBackend.whenGET(/\.html$/).passThrough();
//
//        $httpBackend.whenGET('/ghost/api/v0.1/posts').respond(mockPosts);
//
//    }]);

