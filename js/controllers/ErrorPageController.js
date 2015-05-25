app.controller('ErrorPageController', function ($scope, ErrorMessageService) {
	$scope.errorMessage = ErrorMessageService.getMessageValue();
});