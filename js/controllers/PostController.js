app.controller('PostController', function($routeParams, $scope, BlogService) {
	BlogService.getPostDetails($routeParams.id).then(function(payload) {
		$scope.post = payload.data;
		BlogService.getPostComments($routeParams.id).then(function(payload) {
			$scope.comments = payload.data;
		});
	});
});