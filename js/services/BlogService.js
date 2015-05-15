app.service('BlogService', function ($http) {

    this.getPosts = function () {
        return $http({
            url: 'http://localhost:3003/api/posts?begin=0&length=10',
            method: 'GET'
        });
    };
    this.getPostDetails = function (id) {
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
            data: '{"text":"' + post.text + '","title":"' + post.title + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.addComment = function (postId, comment) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments',
            method: 'POST',
            data: '{"text":"' + comment.text + '","summary":"' + comment.summary + '"}',
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
            data: '{"text":"' + post.text + '","title":"' + post.title + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.updateComment = function (postId, commentId, comment) {
        return $http({
            url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
            method: 'PUT',
            data: '{"text":"' + comment.text + '","summary":"' + comment.summary + '"}',
            headers: {'Content-Type': 'application/json'}
        });
    };
});