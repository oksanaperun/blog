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
			"summary": params.summary,
		    "text": params.text	
		};

        $scope.comments.push(comment);
        $scope.clearCommentForm();
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

	$scope.updateComment = function() {
		var comment = {
		"summary": $scope.comment.summary,
		"text": $scope.comment.text
	};

		BlogService.getPostComments($routeParams.id).then(function(payload) {
			$scope.comments = payload.data;

			var commentId = $scope.comments[$scope.commentIndexToUpdate].id;

			BlogService.updateComment($routeParams.id, commentId, comment).then(function(){
        	$scope.comments[$scope.commentIndexToUpdate] = comment;
	});
		});
	};

	$scope.showCommentFormWithCommentData = function(index) {
	$scope.displayAddCommentButton = false;
	$scope.displayCommentEditForm = true;
	$scope.commentIndexToUpdate = index;
	BlogService.getPostComments($routeParams.id).then(function(payload) {
	$scope.comments = payload.data;
	var filledInForm = {
			"summary": $scope.comments[index].summary,
			"text": $scope.comments[index].text
		};

	$scope.comment = filledInForm;
	});
	};

	$scope.clearCommentForm = function() {
	var defaultForm = {
			"summary": "",
			"text": ""
		};

 	$scope.commentForm.$setPristine();
    $scope.comment = defaultForm;
	};
});