app.service('ErrorMessageService', function () {
	var message;
	
	return {
       	getMessageValue: function () {
       		return message;
            },
        setMessageValue: function(value) {
        	message = value;
            }
        };
});