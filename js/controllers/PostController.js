app.controller('PostController', function ($routeParams, $scope, $document, BlogService) {
    BlogService.getPostDetails($routeParams.id).then(function (payload) {
        $scope.post = payload.data;
        $scope.getPostComments();
    });

    $scope.getPostComments = function() {
        BlogService.getPostComments($routeParams.id).then(function (payload) {
            $scope.comments = payload.data;
        }, function () {
            $scope.isWarning = true;
            $scope.warningMessage = "Sorry, we couldn't get comments.";
            $scope.scrollToWarning();
        });
    };

    $scope.addComment = function () {
        $scope.validateCommentForm();

        if ($scope.isCommentFormValid) {
            var date = new Date(),
                comment = {
                    "summary": $scope.comment.summary,
                    "text": ($scope.comment.text == undefined ? "" : $scope.comment.text),
                    "author": "user",
                    "timestamp": date.getTime()
                };

            BlogService.addComment($routeParams.id, comment).then(function () {
                $scope.clearCommentForm();
                $scope.displayAddCommentButton = true;
                $scope.getPostComments();
            }, function () {
                $scope.isWarning = true;
                $scope.warningMessage = "Sorry, we couldn't add your comment.";
                $scope.scrollToWarning();
            });
        }
    };

    $scope.deleteComment = function (index) {
        BlogService.getComment($routeParams.id, $scope.comments[index].id).then(function () {
            BlogService.deleteComment($routeParams.id, $scope.comments[index].id).then(function () {
                $scope.getPostComments();
            });
        }, function () {
            $scope.isWarning = true;
            $scope.warningMessage = "Seems, your comment is already deleted.";
            $scope.scrollToWarning();
        });
    };

    $scope.updateComment = function () {
        $scope.validateCommentForm();

        if ($scope.isCommentFormValid) {
            BlogService.getComment($routeParams.id, $scope.commentIdToUpdate).then(function (payload) {
                $scope.loadedComment = payload.data;

                var comment = {
                    "summary": $scope.comment.summary,
                    "text": $scope.comment.text,
                    "author": $scope.loadedComment.author,
                    "timestamp": $scope.loadedComment.timestamp
                };

                BlogService.updateComment($routeParams.id, $scope.commentIdToUpdate, comment).then(function () {
                    $scope.displayAddCommentButton = true;
                    $scope.displayCommentEditForm = false;
                    $scope.clearCommentForm();

                    BlogService.getPostComments($routeParams.id).then(function (payload) {
                        $scope.comments = payload.data;

                        for (var i = 0; i < $scope.comments.length; i++)
                            if ($scope.comments[i].id == $scope.commentIdToUpdate)
                                $scope.commentIndexUpdated = i;

                        $scope.scrollToEditedComment();
                    });
                });
            }, function () {
                $scope.isWarning = true;
                $scope.warningMessage = "Seems, your comment or post doesn't exist any more. Please, refresh page.";
                $scope.scrollToWarning();
            });
        }
    };

    $scope.showCommentFormWithCommentData = function (index) {
        BlogService.getComment($routeParams.id, $scope.comments[index].id).then(function (payload) {
            $scope.loadedComment = payload.data;

            $scope.displayAddCommentButton = false;
            $scope.displayCommentEditForm = true;
            $scope.commentIdToUpdate = $scope.loadedComment.id;

            $scope.comment = {
                "summary": $scope.loadedComment.summary,
                "text": $scope.loadedComment.text
            };
        }, function () {
            $scope.isWarning = true;
            $scope.warningMessage = "Seems, your comment or post doesn't exist any more.Please, refresh page.";
            $scope.scrollToWarning();
        });
    };

    $scope.clearCommentForm = function () {
        var defaultForm = {
            "summary": "",
            "text": ""
        };

        $scope.commentForm.$setPristine();
        $scope.comment = defaultForm;
        $scope.requiredSummaryErrorStyle = {};
    };

    $scope.scrollToWarning = function () {
        var duration = 500,
            offset = 50,
            warning = angular.element(document.getElementsByClassName('alert-warning'));

        $document.scrollToElement(warning, offset, duration);
    };

    $scope.scrollToEditedComment = function () {
        var duration = 500,
            offset = 50,
            editedComment = angular.element(document.querySelectorAll('[ng-repeat="comment in comments"]')[$scope.commentIndexUpdated]);

        $document.scrollToElement(editedComment, offset, duration);
    };

    $scope.validateCommentForm = function () {
        if ($scope.comment == undefined || !$scope.comment.summary) {
            $scope.isCommentFormValid = false;
            $scope.requiredSummaryErrorStyle = {'border-color': 'red'};
        }
        else {
            $scope.isCommentFormValid = true;
            $scope.requiredSummaryErrorStyle = {};
        }
    };

    $scope.cancelPostComment = function () {
        $scope.clearCommentForm();
        $scope.displayAddCommentButton = true;
        $scope.displayCommentEditForm = false;
        $scope.isCommentFormValid = true;
        $scope.requiredSummaryErrorStyle = {};
    };
});