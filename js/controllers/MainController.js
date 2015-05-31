app.controller('MainController', function ($scope, BlogService) {
	var postsPerPage = 5,
		startIndexOnPage = 0;

	$scope.pageNumber = 0; 

    BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
        $scope.posts = payload.data;
        $scope.checkNextPostsExist();
    });

    $scope.addPost = function () {
        $scope.validatePostForm();

        if ($scope.isPostFormValid) {
        var date = new Date(),
            post = {
            "title": $scope.post.title,
            "text": ($scope.post.text == undefined ? "" : $scope.post.text),
            "author": "user",
            "timestamp": date.getTime()
        };

        BlogService.addPost(post).then(function () {
            $scope.clearPostForm();
            $scope.displayAddPostButton = true; 
            $scope.displayPostEditForm = false;
            $scope.checkNextPostsExist();

            BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
                // added post should be diplayed (how to get it's id?)
                $scope.posts = payload.data;
            });
        });
    }
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
        $scope.validatePostForm();

        if ($scope.isPostFormValid) {
        var updatedPost = {
            "title": $scope.post.title,
            "text": $scope.post.text
        };
		
		var postId = $scope.posts[$scope.postIndexToUpdate].id;

        BlogService.updatePost(postId, updatedPost).then(function () {
            $scope.clearPostForm();
            $scope.displayAddPostButton = true; 
            $scope.displayPostEditForm = false;

        	BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
                $scope.posts = payload.data;
            	$scope.checkNextPostsExist();
            });
        });
    }
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
        $scope.requiredTitleErrorStyle = {};
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

    $scope.validatePostForm = function () {
        if ($scope.post == undefined || !$scope.post.title) {
            $scope.isPostFormValid = false;
            $scope.requiredTitleErrorStyle = {'border-color':'red'};
        }
        else { 
            $scope.isPostFormValid = true;
            $scope.requiredTitleErrorStyle = {};
        }
    };

    $scope.cancelPostChanges = function () {
        $scope.clearPostForm(); 
        $scope.displayAddPostButton = true; 
        $scope.displayPostEditForm = false
        $scope.isPostFormValid = true;
        $scope.requiredTitleErrorStyle = {};
    };    
});