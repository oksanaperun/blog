var assert = require('chai').assert;

describe('Blog', function() {
	before(function () {
		browser.get('http://' + browser.params.server + ':' + browser.params.port);
	});

  	it('should have posts by default', function() {
  		element.all(by.repeater('post in posts')).then(function (posts) {
			assert.equal(posts.length, 2, 'Check count of posts by default');
  		});
  	});

  	it('first post in the list should have correct title', function() {
  		element.all(by.css('.blog-post-title a')).get(0).getText(function (title) {
  			assert.equal(title, 'This is a title 2', 'Check title of first post in the list');
  		});		
  	});
});