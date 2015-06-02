app.controller('MainController', function ($scope, $document, BlogService) {
    var postsPerPage = 5, // counts of posts for paging
        startIndexOnPage = 0; // index of first post which should be shown on the page

    $scope.pageNumber = 0; // default page number for paging

    BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
        $scope.posts = payload.data;
        $scope.checkNextPostsExist();
    });

    $scope.getPosts = function () {
        BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
            $scope.posts = payload.data;
            $scope.checkNextPostsExist();
        });
    };

    $scope.addPost = function () {
        $scope.validatePostForm();

        if ($scope.isPostFormValid) {
            var date = new Date(),
                post = {
                    "title": $scope.post.title,
                    "text": ($scope.post.text == undefined ? "" : $scope.post.text.replace(/\r?\n/g, '<br />')),
                    "author": "user",
                    "timestamp": date.getTime()
                };

            BlogService.addPost(post).then(function () {
                $scope.clearPostForm();
                $scope.displayAddPostButton = true;
                $scope.displayPostEditForm = false;
                $scope.checkNextPostsExist();

                // added post should be displayed (how to get it's id?)

                $scope.getPosts();
            }, function () {
                $scope.isWarning = true;
                $scope.warningMessage = "Sorry, we couldn't add your post.";
                $scope.scrollToTop();
            });
        }
    };

    $scope.deletePost = function () {
        var postId = $scope.posts[$scope.postIndexToDelete].id;

        BlogService.getPost(postId).then(function () {
            BlogService.deletePost(postId).then(function () {
                BlogService.getPosts(startIndexOnPage, postsPerPage).then(function (payload) {
                    $scope.posts = payload.data;
                    $scope.checkNextPostsExist();
                    // should be loop for check nearest existing posts on page
                    if ($scope.posts.length == 0) {
                        $scope.pageNumber -= 1;
                        startIndexOnPage = postsPerPage * $scope.pageNumber;
                        $scope.getPosts();
                    }
                });
            }, function () {
                $scope.isWarning = true;
                $scope.warningMessage = "Sorry, we couldn't delete this post.";
                $scope.scrollToTop();
            });
        }, function () {
            $scope.isWarning = true;
            $scope.warningMessage = "Seems, this post is already deleted. Please, refresh the page.";
            $scope.scrollToTop();
        });
    };

    $scope.setPostIndexToDelete = function (index) {
        $scope.postIndexToDelete = index;
    };

    $scope.updatePost = function () {
        $scope.validatePostForm();

        if ($scope.isPostFormValid) {
            BlogService.getPost($scope.postIdToUpdate).then(function (payload) {
                $scope.loadedPost = payload.data;

                var post = {
                    "title": $scope.post.title,
                    "text": ($scope.post.text == undefined ? "" : $scope.post.text.replace(/\r?\n/g, '<br />')),
                    "author": $scope.loadedPost.author,
                    "timestamp": $scope.loadedPost.timestamp
                };

                BlogService.updatePost($scope.postIdToUpdate, post).then(function () {
                    $scope.clearPostForm();
                    $scope.displayAddPostButton = true;
                    $scope.displayPostEditForm = false;
                    $scope.getPosts();
                }, function () {
                    $scope.isWarning = true;
                    $scope.warningMessage = "Sorry, we couldn't update this post.";
                    $scope.scrollToTop();
                });
            }, function () {
                $scope.isWarning = true;
                $scope.warningMessage = "Seems, this post doesn't exist any more. Please, refresh the page.";
                $scope.scrollToTop();
            });
        }
    };

    $scope.showPostFormWithPostData = function (index) {
        BlogService.getPost($scope.posts[index].id).then(function () {
            $scope.displayAddPostButton = false;
            $scope.displayPostEditForm = true;
            $scope.postIdToUpdate = $scope.posts[index].id;

            $scope.post = {
                "title": $scope.posts[index].title,
                "text": $scope.posts[index].text
            }
        }, function () {
            $scope.isWarning = true;
            $scope.warningMessage = "Seems, this post doesn't exist any more. Please, refresh the page.";
            $scope.scrollToTop();
        });
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

        $scope.getPosts();
    };

    $scope.checkNextPostsExist = function () {
        BlogService.getPosts(postsPerPage * ($scope.pageNumber + 1), postsPerPage).then(function (payload) {
            $scope.isNextPostsExist = (payload.data.length > 0);
        });
    };

    $scope.validatePostForm = function () {
        if ($scope.post == undefined || !$scope.post.title) {
            $scope.isPostFormValid = false;
            $scope.requiredTitleErrorStyle = {'border-color': 'red'};
        }
        else {
            $scope.isPostFormValid = true;
            $scope.requiredTitleErrorStyle = {};
        }
    };

    $scope.cancelPostChanges = function () {
        $scope.clearPostForm();
        $scope.displayAddPostButton = true;
        $scope.displayPostEditForm = false;
        $scope.isPostFormValid = true;
        $scope.requiredTitleErrorStyle = {};
    };

    $scope.getReductionText = function (text, requiredLength) {
        if (text.length <= requiredLength)
            return text;

        var firstSentence = text.split(' ')[0];

        if (firstSentence.length > requiredLength)
            return '';

        text = text.substr(0, requiredLength + 1);

        for (var j = text.length; j > 0; j--)
            if (text.substr(j, 1) == ' ')
                return text.substr(0, j) + '...';
    };

    $scope.scrollToTop = function () {
        var top = 0,
            duration = 1000;

        $document.scrollTop(top, duration);
    };
});