var assert = require('chai').assert;

describe('Blog', function () {
    beforeEach(function () {
        browser.get('http://' + browser.params.server + ':' + browser.params.port);
    });

    it('should have posts by default', function () {
        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, 2, 'Check count of posts by default');
        });
    });

    it('first post in the list should have correct title', function () {
        element.all(by.css('.blog-post-title')).get(0).getText(function (title) {
            assert.equal(title, 'This is a title 2', 'Check title of first post in the list');
        });
    });

    it('post should be added', function () {
        var countOfPostsBeforeAdding = 0;

        element.all(by.repeater('post in posts')).then(function (posts) {
            countOfPostsBeforeAdding = posts.length;
        });

        openFormToAddPost();

        var title = element(by.model('post.title')),
            text = element(by.model('post.text')),
            addButton = element(by.buttonText('Add'));

        title.clear().sendKeys('This is a title of new post');
        text.clear().sendKeys('This is a text of my new post');
        addButton.click();

        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, countOfPostsBeforeAdding + 1, 'Check count of posts after adding new one');
        });
    });

    it('post should not be added without title', function () {
        openFormToAddPost();

        var text = element(by.model('post.text')),
            addButton = element(by.buttonText('Add'));

        text.clear().sendKeys('This is test text');
        addButton.click();

        var errorMessage = element(by.css('.required-message'));

        assert.ok(errorMessage.isDisplayed(), 'Check error message is displayed');
        assert.ok(text.isDisplayed(), 'Check post form is not hidden');
    });

    it('post details should be pre-populated when updating', function () {
        var editFirstPostButton = element.all(by.css('[title="To edit post"]')).get(0);

        editFirstPostButton.click();

        var postForm = element(by.css('.form-horizontal'));

        postForm.isDisplayed();

        element(by.model('post.title')).getAttribute('value').then(function (title) {
            assert.equal(title, 'This is a title 2', 'Check post title is pre-populated when updating')
        });

        element(by.model('post.text')).getAttribute('value').then(function (text) {
            assert.equal(text, 'This is my second blog post', 'Check post text is pre-populated')
        });
    });

    it('post should be updated', function () {
        var editSecondPostButton = element.all(by.css('[title="To edit post"]')).get(1);

        editSecondPostButton.click();

        var postForm = element(by.css('.form-horizontal'));

        postForm.isDisplayed();

        var title = element(by.model('post.title')),
            text = element(by.model('post.text')),
            updateButton = element(by.buttonText('Update'));

        title.clear().sendKeys('This is a title updated');
        text.clear().sendKeys('This is my first blog post updated');
        updateButton.click();

        element.all(by.css('.blog-post-title')).get(1).getText(function (title) {
            assert.equal(title, 'This is a title updated', 'Check title of the post after updating');
        });
    });

    it('post should not be deleted', function () {
        var countOfPosts = 0;

        element.all(by.repeater('post in posts')).then(function (posts) {
            countOfPosts = posts.length;
        });

        openConfirmationDeletingDialog(1);

        var rejectDeletingButton = element(by.buttonText('No'));

	rejectDeletingButton.isDisplayed();
        rejectDeletingButton.click();

        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, countOfPosts, 'Check count of posts after rejecting of deleting');
        });
    });

    it('post should be deleted', function () {
        var countOfPostsBeforeDeleting = 0;

        element.all(by.repeater('post in posts')).then(function (posts) {
            countOfPostsBeforeDeleting = posts.length;
        });

        openConfirmationDeletingDialog(1);

        var confirmDeletingButton = element(by.buttonText('Yes'));

	confirmDeletingButton.isDisplayed();
        confirmDeletingButton.click();

        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, countOfPostsBeforeDeleting - 1, 'Check count of posts after confirmation of deleting');
        });
    });
});

function openFormToAddPost() {
    var addPostButton = element(by.id('addPostBtn'));

    addPostButton.click();

    var postForm = element(by.css('.form-horizontal'));

    postForm.isDisplayed();
};

function openConfirmationDeletingDialog(postPosition) {
    var deletePostButton = element.all(by.css('[title="To delete post"]')).get(postPosition);

    deletePostButton.click();

    var modalWindow = element(by.css('.modal-dialog'));

    modalWindow.isDisplayed();
};
