app.controller('PostController', function($routeParams, $scope, BlogService) {
	BlogService.getPostDetails($routeParams.id).then(function(payload) {
		$scope.post = payload.data;
		BlogService.getPostComments($routeParams.id).then(function(payload) {
			$scope.comments = payload.data;
		});
	});

	$scope.deleteComment = function(index) {
		BlogService.getPostComments($routeParams.id).then(function(payload) {
			$scope.comments = payload.data;

			var commentId = $scope.comments[index].id;

			BlogService.deleteComment($routeParams.id, commentId).then(function(){
        	$scope.comments.splice(index, 1);
	});
		});
	};
});