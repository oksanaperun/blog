app.controller('PostController', function ($routeParams, $scope, $document, BlogService) {
    BlogService.getPostDetails($routeParams.id).then(function (payload) {
        $scope.post = payload.data;
        BlogService.getPostComments($routeParams.id).then(function (payload) {
            $scope.comments = payload.data;
        });
    });

    $scope.addComment = function () {
        var date = new Date(),
            comment = {
            "summary": $scope.comment.summary,
            "text": $scope.comment.text,
            "author": "user",
            "timestamp": date.getTime()
        };

        BlogService.addComment($routeParams.id, comment).then(function () {
            $scope.comments.push(comment);
            $scope.clearCommentForm();
        });
    };

    $scope.deleteComment = function (index) {
        BlogService.getPostComments($routeParams.id).then(function (payload) {
            $scope.comments = payload.data;

            var commentId = ($scope.comments[index] ? $scope.comments[index].id : '');

            if (!commentId) {
                $scope.isWarning = true;
                // add autoscroll to warning
                $scope.warningMessage = 'Seems, your comment is already deleted.';
            } else BlogService.deleteComment($routeParams.id, commentId).then(function () {
                $scope.comments.splice(index, 1);
            });
        });
    };

    $scope.updateComment = function () {
        var comment = {
            "summary": $scope.comment.summary,
            "text": $scope.comment.text
        };

        BlogService.getPostComments($routeParams.id).then(function (payload) {
            $scope.comments = payload.data;

            var commentId =($scope.comments[$scope.commentIndexToUpdate] ? $scope.comments[$scope.commentIndexToUpdate].id : '');

            if (!commentId) {
                $scope.isWarning = true;
                $scope.warningMessage = "Seems, your comment doesn't exist any more.";
            } else BlogService.updateComment($routeParams.id, commentId, comment).then(function () {
                $scope.comments[$scope.commentIndexToUpdate] = comment;
            });
        });
    };

    $scope.showCommentFormWithCommentData = function (index) {
        $scope.displayAddCommentButton = false;
        $scope.displayCommentEditForm = true;
        $scope.commentIndexToUpdate = index;

        BlogService.getPostComments($routeParams.id).then(function (payload) {
            $scope.comments = payload.data;

            var filledInForm = {
                "summary": $scope.comments[index].summary,
                "text": $scope.comments[index].text
            };

            $scope.comment = filledInForm;
        });
    };

    $scope.clearCommentForm = function () {
        var defaultForm = {
            "summary": "",
            "text": ""
        };

        $scope.commentForm.$setPristine();
        $scope.comment = defaultForm;
    };

    $scope.scrollToEditedComment = function () {
        var duration = 1000,
            offset = 10,
            editedComment = angular.element(document.querySelectorAll('[ng-repeat="comment in comments"]')[$scope.commentIndexToUpdate]);

        $document.scrollToElement(editedComment, offset, duration);
    };
});