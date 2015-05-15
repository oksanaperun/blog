app.service('BlogService', function($http) {

	this.getPosts = function() {
		return $http({
			url: 'http://localhost:3003/api/posts?begin=0&length=10',
			method: 'GET'
		});
	};
	this.getPostDetails = function(id) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + id,
			method: 'GET'
		});
	};
	this.getPostComments = function(id) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + id + '/comments',
			method: 'GET'
		});
	};
	this.addPost = function(params) {
		return $http({
			url: 'http://localhost:3003/api/posts',
			method: 'POST',
			data: '{"text":"'+ params.text +'","title":"'+ params.title +'"}',
    		headers: {'Content-Type': 'application/json'}
		});		
	};
	this.addComment = function(params) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + params.id + '/comments',
			method: 'POST',
			data: '{"text":"'+ params.text +'","summary":"'+ params.summary +'"}',
    		headers: {'Content-Type': 'application/json'}
		});		
	};
	this.deletePost = function(id) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + id,
			method: 'DELETE'
		});		
	};
	this.deleteComment = function(postId, commentId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
			method: 'DELETE'
		});		
	};
	this.updatePost = function(id, params) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + id,
			method: 'PUT',
			data: '{"text":"'+ params.text +'","title":"'+ params.title +'"}',
    		headers: {'Content-Type': 'application/json'}
		});		
	};
	this.updateComment = function(postId, commentId, params) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId + '/comments/' + commentId,
			method: 'PUT',
			data: '{"text":"'+ params.text +'","summary":"'+ params.summary +'"}',
    		headers: {'Content-Type': 'application/json'}
		});		
	};
});