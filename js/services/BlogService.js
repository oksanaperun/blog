app.service('BlogService', function($http) {

	this.getPosts = function() {
		return $http({
			url: 'http://localhost:3003/api/posts?begin=0&length=10',
			method: 'GET'
		});
	}
	this.getPostDetails = function(id) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + id,
			method: 'GET'
		});
	}
	this.getPostComments = function(id) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + id + '/comments',
			method: 'GET'
		});
	}
});