app.controller('CommentController', function($routeParams, $scope, BlogService) {
	$scope.addComment = function() {
	var params = {
		"id": $routeParams.id,
		"summary": $scope.comment.summary,
		"text": $scope.comment.text
	};

	BlogService.addComment(params).then(function(){
		var comment = {
			"title": params.summary,
		    "text": params.text	
		},
		defaultForm = {
			"summary": "",
			"text": ""
		};
        $scope.comments.push(comment);
        $scope.addCommentForm.$setPristine();
        $scope.comment = defaultForm;
	});
	};
});