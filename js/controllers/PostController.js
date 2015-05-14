app.controller('PostController', function($routeParams, $scope, BlogService) {
	BlogService.getPostDetails($routeParams.id).then(function(payload) {
		$scope.post = payload.data;
		BlogService.getPostComments($routeParams.id).then(function(payload) {
			$scope.comments = payload.data;
		});
	});

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
        $scope.commentForm.$setPristine();
        $scope.comment = defaultForm;
	});
	};

	$scope.deleteComment = function(index) {
		BlogService.getPostComments($routeParams.id).then(function(payload) {
			$scope.comments = payload.data;

			var commentId = $scope.comments[index].id;

			BlogService.deleteComment($routeParams.id, commentId).then(function(){
        	$scope.comments.splice(index, 1);
	});
		});
	};

	$scope.showFilledInCommentForm = function(index) {
	$scope.displayAddCommentButton = false;
	BlogService.getPostComments($routeParams.id).then(function(payload) {
	$scope.comments = payload.data;
	var filledInForm = {
			"summary": $scope.comments[index].title,
			"text": $scope.comments[index].text
		};

	$scope.editComment = filledInForm;
	});
	};
});