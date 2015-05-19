app.controller('MainController', function ($scope, BlogService) {
	var postsPerPage = 5,
		startIndexOnPage = 0;

	$scope.pageNumber = 0; 

    BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
        $scope.posts = payload.data;
        $scope.checkNextPostsExist();
    });

    $scope.addPost = function () {
        var post = {
            "title": $scope.post.title,
            "text": $scope.post.text
        };

        BlogService.addPost(post).then(function () {
            $scope.clearPostForm();
            $scope.checkNextPostsExist();

            BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
                // added post should be diplayed (how to get it's id?)
                $scope.posts = payload.data;
            });
        });
    };

    $scope.deletePost = function () {
        var postId = $scope.posts[$scope.postIndexToDelete].id;

        BlogService.deletePost(postId).then(function () {
            BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
          	$scope.posts = payload.data;
          	$scope.checkNextPostsExist();
          	// should be loop for check nearest existing posts on page
          	if ($scope.posts.length == 0) {
          		$scope.pageNumber -= 1;
          		startIndexOnPage = postsPerPage * $scope.pageNumber;

          	    BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
                $scope.posts = payload.data;
                $scope.checkNextPostsExist();
            	});	
          	}
			});
        });
    };

    $scope.setPostIndexToDelete = function (index) {
        $scope.postIndexToDelete = index;
    };

    $scope.updatePost = function () {
        var updatedPost = {
            "title": $scope.post.title,
            "text": $scope.post.text
        };
		
		var postId = $scope.posts[$scope.postIndexToUpdate].id;

        BlogService.updatePost(postId, updatedPost).then(function () {
        	BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
                $scope.posts = payload.data;
            	$scope.checkNextPostsExist();
            });
        });
    };

    $scope.showPostFormWithPostData = function (index) {
        $scope.displayAddPostButton = false;
        $scope.displayPostEditForm = true;
        $scope.postIndexToUpdate = index;

        var filledInForm = {
                "title": $scope.posts[index].title,
                "text": $scope.posts[index].text
            };

        $scope.post = filledInForm;
    };

    $scope.clearPostForm = function () {
        var defaultForm = {
            "title": "",
            "text": ""
        };

        $scope.postForm.$setPristine();
        $scope.post = defaultForm;
    };

    $scope.getNextOrPrevPosts = function (option) {
    	if (option == "next") $scope.pageNumber += 1;
    	else $scope.pageNumber -= 1;

    	startIndexOnPage = postsPerPage * $scope.pageNumber;

    	BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
    		$scope.posts = payload.data; 
    		$scope.checkNextPostsExist(); 		
    	});
    };

    $scope.checkNextPostsExist = function () {
    	BlogService.getPosts(postsPerPage * ($scope.pageNumber + 1), postsPerPage).then(function (payload) {
    		$scope.isNextPostsExist = (payload.data.length > 0 ? true: false);
    	});
    };
});