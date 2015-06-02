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
    this.getPost = function (id) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id,
            method: 'GET'
        });
    };
    this.getPostComments = function (id) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id + '/comments',
            method: 'GET'
        });
    };
    this.addPost = function (post) {
        return $http({
            url: 'http://localhost:3003/api/posts',
            method: 'POST',
            data: '{"text":"' + post.text + '","title":"' + post.title +
            '","author":"' + post.author + '","timestamp":"' + post.timestamp + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.addComment = function (postId, comment) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments',
            method: 'POST',
            data: '{"text":"' + comment.text + '","summary":"' + comment.summary +
            '","author":"' + comment.author + '","timestamp":"' + comment.timestamp + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.deletePost = function (id) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id,
            method: 'DELETE'
        });
    };
    this.deleteComment = function (postId, commentId) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
            method: 'DELETE'
        });
    };
    this.updatePost = function (id, post) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + id,
            method: 'PUT',
            data: '{"text":"' + post.text + '","title":"' + post.title +
            '","author":"' + post.author + '","timestamp":"' + post.timestamp + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.updateComment = function (postId, commentId, comment) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
            method: 'PUT',
            data: '{"text":"' + comment.text + '","summary":"' + comment.summary +
            '","author":"' + comment.author + '","timestamp":"' + comment.timestamp + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.getComment = function (postId, commentId) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
            method: 'GET'
        });
    };
});