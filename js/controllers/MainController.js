app.controller('MainController', function($scope, BlogService) {
	BlogService.getPosts().then(function(payload) {
		$scope.posts = payload.data;
	});
});