var app = angular.module('blog', ['ngRoute']);

app.config(function($routeProvider) {

	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/list.html'
	})
	.when('/posts/:id', {
		controller: 'PostController',
		templateUrl: 'views/post.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});