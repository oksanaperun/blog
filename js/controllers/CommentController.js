app.controller('CommentController', function($routeParams, $scope, BlogService) {
	$scope.addComment = function() {
	var params = {
		"id": $routeParams.id,
		"summary": $scope.summary,
		"text": $scope.text
	};

	BlogService.postComment(params).then(function(){

	});
	};
});