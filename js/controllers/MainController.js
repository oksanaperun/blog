app.controller('MainController', function ($scope, BlogService) {
    BlogService.getPosts().then(function (payload) {
        $scope.posts = payload.data;
    });

    $scope.addPost = function () {
        var post = {
            "title": $scope.post.title,
            "text": $scope.post.text
        };
        
        $scope.clearPostForm();
        BlogService.addPost(post).then(function () {
            $scope.posts.push(post);

            BlogService.getPosts().then(function (payload) {
                $scope.posts = payload.data;
            });
        });
    };

    $scope.deletePost = function () {
        BlogService.getPosts().then(function (payload) {
            $scope.posts = payload.data;

            var postId = $scope.posts[$scope.postIndexToDelete].id;

            BlogService.deletePost(postId).then(function () {
                $scope.posts.splice($scope.postIndexToDelete, 1);
            });
        });
    };

    $scope.setPostIndexToDelete = function (index) {
        $scope.postIndexToDelete = $scope.posts.length - 1 - index;
    };

    $scope.updatePost = function () {
        var post = {
            "title": $scope.post.title,
            "text": $scope.post.text
        },
        postId = $scope.posts[$scope.postIndexToUpdate].id;

		$scope.clearPostForm();
        BlogService.updatePost(postId, post).then(function () {
                $scope.posts[$scope.postIndexToUpdate] = post;
            });
    };

    $scope.showPostFormWithPostData = function (index) {
        $scope.displayAddPostButton = false;
        $scope.displayPostEditForm = true;
        BlogService.getPosts().then(function (payload) {
            $scope.posts = payload.data;
			$scope.postIndexToUpdate = $scope.posts.length - 1 - index;

            var filledInForm = {
                "title": $scope.posts[$scope.postIndexToUpdate].title,
                "text": $scope.posts[$scope.postIndexToUpdate].text
            };

            $scope.post = filledInForm;
        });
    };

    $scope.clearPostForm = function () {
        var defaultForm = {
            "title": "",
            "text": ""
        };

        $scope.postForm.$setPristine();
        $scope.post = defaultForm;
    };
});