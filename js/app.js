var app = angular.module('blog', ['ngRoute', 'duScroll']);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'views/list.html'
        })
        .when('/posts/:id', {
            controller: 'PostController',
            templateUrl: 'views/post.html'
        })
        .when('/error', {
            controller: 'ErrorPageController',
            templateUrl: 'views/error.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});