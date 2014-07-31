$(function() {


console.log('TEST');

	$('#countryLoad').on('click', function(e) {

		e.preventDefault();

		$.get('/countries', function(data) {
			console.log('Post successful');
			console.log(data.length);
			console.log(typeof(data));

			for(var i=0; i < data.length; i++) {
				var tempObject = data[i];
				$('#countryList').append($('<li>').text(tempObject.name));

			}
		});

	});



})