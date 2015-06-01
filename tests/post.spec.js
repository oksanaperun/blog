var assert = require('chai').assert;

var addCommentButton = element(by.buttonText('Add comment')),
    firstPostTitle = element.all(by.css('.blog-post-title')).get(0);

describe('Blog post page', function() {

	before(function () {
		browser.get('http://' + browser.params.server + ':' + browser.params.port);
	});

    it('should be opened', function () {
      firstPostTitle.click();

      element.all(by.xpath('//h2[contains(text(), "Comments")]')).then(function (header) {
        assert.ok((header.length > 0), 'Comments header should be displayed on post page');
      });

      describe('Blog post', function () {
        beforeEach(function () {
          browser.get('http://' + browser.params.server + ':' + browser.params.port);
          firstPostTitle.click();
        });

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

        it('comment should be added', function () {
          var countOfCommentsBeforeAdding = 0;

          element.all(by.repeater('comment in comments')).then(function (comments) {
            countOfCommentsBeforeAdding = comments.length;
          });

          addCommentButton.click();

          var commentForm = element(by.css('.form-horizontal'));

          commentForm.isDisplayed();

          var summary = element(by.model('comment.summary')),
              text = element(by.model('comment.text')),
              postButton = element(by.buttonText('Post'));

          summary.clear().sendKeys('This is a summary of my new comment');
          text.clear().sendKeys('This is a text of my new comment');
          postButton.click();

          element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, countOfCommentsBeforeAdding + 1, 'Check count of comments after adding new one');
          });

          element(by.css('.comment-badge')).getText().then(function (commentsCount) {
            assert.equal(commentsCount, countOfCommentsBeforeAdding + 1, 'Check comments count badge is increased');
          });
        });

        it('comment should not be added without summary', function() {
          addCommentButton.click();

          var commentForm = element(by.css('.form-horizontal'));

          commentForm.isDisplayed();

          var text = element(by.model('comment.text')),
              postButton = element(by.buttonText('Post'));

          text.clear().sendKeys('This is test text');
          postButton.click();

          var errorMessage = element(by.css('.required-message'));

          assert.ok(errorMessage.isDisplayed(), 'Check error message is displayed');
          assert.ok(commentForm.isDisplayed(), 'Check comment form is not hidden');
        });

        it('comment details should be pre-populated when updating', function() {
          var editFirstCommentButton = element.all(by.css('[title="To edit comment"]')).get(0);

          editFirstCommentButton.click();

          var commentForm = element(by.css('.form-horizontal'));

          commentForm.isDisplayed();

          element(by.model('comment.summary')).getAttribute('value').then(function (summary) {
            assert.equal(summary, 'Looks good', 'Check comment summary is pre-populated when updating')
          });

          element(by.model('comment.text')).getAttribute('value').then(function (text) {
            assert.equal(text, 'This is a comment', 'Check comment text is pre-populated')
          });
        });

        it('comment should be updated', function() {
          var editFirstCommentButton = element.all(by.css('[title="To edit comment"]')).get(0);

          editFirstCommentButton.click();

          var commentForm = element(by.css('.form-horizontal'));

          commentForm.isDisplayed();

          var summary = element(by.model('comment.summary')),
              text = element(by.model('comment.text')),
              updateButton = element(by.buttonText('Update'));

          summary.clear().sendKeys('This is a summary updated');
          text.clear().sendKeys('This is my first blog post comment updated');
          updateButton.click();

          element.all(by.css('.comment-summary')).get(0).getText(function (summary) {
            assert.equal(summary, 'This is a summary updated', 'Check summary of the comment after updating');
          });
        });

        it('comment should be deleted', function() {
          var countOfCommentsBeforeDeleting = 0;

          element.all(by.repeater('comment in comments')).then(function (comments) {
            countOfCommentsBeforeDeleting = comments.length;
          });  

          var deleteFirstCommentButton = element.all(by.css('[title="To delete comment"]')).get(0);

          deleteFirstCommentButton.click();

          element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, countOfCommentsBeforeDeleting - 1, 'Check count of comments after deleting');
         });
      });
     });
  });
});