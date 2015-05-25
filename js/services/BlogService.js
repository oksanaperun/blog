app.service('BlogService', function ($http, $location, ErrorMessageService) {

    this.getPosts = function (startIndex, length) {
        return $http({
            url: 'http://localhost:3003/api/posts?begin=' + startIndex + '&length=' + length,
            method: 'GET'
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't get posts");
             $location.url('/error');
         });
    };
    this.getPostsAfterPostId = function (id, length) {
        return $http({
            url: 'http://localhost:3003/api/posts?after=' + id + '&length=' + length,
            method: 'GET'
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't get posts");
             $location.url('/error');
         });
    };
    this.getPostDetails = function (id) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id,
            method: 'GET'
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't get post details");
             $location.url('/error');
         });
    };
    this.getPostComments = function (id) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id + '/comments',
            method: 'GET'
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't get post comments");
             $location.url('/error');
         });
    };
    this.addPost = function (post) {
        return $http({
            url: 'http://localhost:3003/api/posts',
            method: 'POST',
            data: '{"text":"' + post.text + '","title":"' + post.title + '"}',
            headers: {'Content-Type': 'application/json'}
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't add post");
             $location.url('/error');
         });
    };
    this.addComment = function (postId, comment) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments',
            method: 'POST',
            data: '{"text":"' + comment.text + '","summary":"' + comment.summary + '"}',
            headers: {'Content-Type': 'application/json'}
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't add comment to the post");
             $location.url('/error');
         });
    };
    this.deletePost = function (id) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id,
            method: 'DELETE'
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't delete post");
             $location.url('/error');
         });
    };
    this.deleteComment = function (postId, commentId) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
            method: 'DELETE'
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't delete comment");
             $location.url('/error');
         });
    };
    this.updatePost = function (id, post) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id,
            method: 'PUT',
            data: '{"text":"' + post.text + '","title":"' + post.title + '"}',
            headers: {'Content-Type': 'application/json'}
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't update post details");
             $location.url('/error');
         });
    };
    this.updateComment = function (postId, commentId, comment) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
            method: 'PUT',
            data: '{"text":"' + comment.text + '","summary":"' + comment.summary + '"}',
            headers: {'Content-Type': 'application/json'}
        }).error(function (data) {
             ErrorMessageService.setMessageValue("we couldn't update comment details");
             $location.url('/error');
         });
    };
});