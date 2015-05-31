var assert = require('chai').assert;

describe('Blog post page', function() {

	before(function () {
		browser.get('http://' + browser.params.server + ':' + browser.params.port);
	});

    it('should be opened', function () {
      var firstPostTitle = element.all(by.css('.blog-post-title a')).get(0);

      firstPostTitle.click();

      element.all(by.xpath('//h2[contains(text(), "Comments")]')).then(function (header) {
        assert.ok((header.length > 0), 'Comments header should be displayed on post page');
      });

      describe('Blog post', function () {
        it('should have details', function() {
          element(by.css('.post-title')).getText().then(function (title) {
            assert.equal(title, 'This is a title 2', 'Check title of the post');
          });

          element(by.css('.post-text')).getText().then(function (text) {
            assert.equal(text, 'This is my second blog post', 'Check text of the post');
          });
        });

        it('should have a comment by default', function() {
          element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, 1, 'Check count of comments by default');
          });   
        });
      });
    });
});