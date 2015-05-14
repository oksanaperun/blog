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
		},
		defaultForm = {
			"title": "",
			"text": ""
		};

        $scope.posts.push(post);
        $scope.addPostForm.$setPristine();
        $scope.post = defaultForm;

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
});