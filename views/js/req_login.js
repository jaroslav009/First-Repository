$(document).ready(function() {
	var data = {};
	$('#button-click').click(function() {
		var password = $('#password').val();
		var username = $('#username').val();
		
		data.username = username;
		data.password = password;
		console.log('username: ' + data.username);
		$.ajax({
			url: '/login',
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: function(data) {
				console.log('success');
                console.log(data);
			},
			error: function(err) {
				console.log('err ' + JSON.stringify(err));
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
});