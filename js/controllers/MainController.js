app.controller('MainController', function($scope, BlogService) {
	BlogService.getPosts().then(function(payload) {
		$scope.posts = payload.data;
	});

	$scope.addPost = function() {
	var params = {
		"title": $scope.post.title,
		"text": $scope.post.text
	};
	
	BlogService.addPost(params).then(function(){
		var post = {
			"title": params.title,
		    "text": params.text	
		};

        $scope.posts.push(post);
        $scope.clearPostForm();

        BlogService.getPosts().then(function(payload) {
		$scope.posts = payload.data;
	});
	});
	};

	$scope.deletePost = function() {
		BlogService.getPosts().then(function(payload) {
			$scope.posts = payload.data;

			var postId = $scope.posts[$scope.postIndexToDelete].id;

			BlogService.deletePost(postId).then(function(){
        	$scope.posts.splice($scope.postIndexToDelete, 1);
	});
		});
	};

	$scope.setPostIndexToDelete = function(index) {
		$scope.postIndexToDelete = index;
	};

	$scope.updatePost = function() {
		var post = {
		"title": $scope.post.title,
		"text": $scope.post.text
	};

	BlogService.getPosts().then(function(payload) {
			$scope.posts = payload.data;

			var postId = $scope.posts[$scope.postIndexToUpdate].id;

			BlogService.updatePost(postId, post).then(function() {
        	$scope.posts[$scope.postIndexToUpdate] = post;
	});
		});
	};

	$scope.showPostFormWithPostData = function(index) {
	$scope.displayAddPostButton = false;
	$scope.displayPostEditForm = true;
	$scope.postIndexToUpdate = index;
	BlogService.getPosts().then(function(payload) {
	$scope.posts = payload.data;
	var filledInForm = {
			"title": $scope.posts[index].title,
			"text": $scope.posts[index].text
		};

	$scope.post = filledInForm;
	});
	};

	$scope.clearPostForm = function() {
	var defaultForm = {
			"title": "",
			"text": ""
		};

 	$scope.postForm.$setPristine();
    $scope.post = defaultForm;
	};
});