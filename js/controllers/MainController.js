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
	});
	};
});