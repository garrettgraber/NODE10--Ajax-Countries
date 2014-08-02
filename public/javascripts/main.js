$(function() {


console.log('TEST');

	$('#countryLoad').on('click', function(e) {

		e.preventDefault();
		$('#countryList').empty();

		$.get('/countries', function(data) {
			console.log('Get successful');
			console.log(data.length);
			console.log(typeof(data));

			for(var i=0; i < data.length; i++) {
				var tempObject = data[i];
				$('#countryList').append($('<li>').text(tempObject.name));

			}
		});

	});

	$('#searchSubmit').on('click', function(e) {
		e.preventDefault();

		$('#countryList').empty();
		console.log('Click detected');
		var searchValue = $('#searchInpt').val();
		var searchData = {
			search: searchValue
		}

		$.post('/search', searchData, function(data) {


			console.log('Post successful');

			console.log('Data from server: ', data);
			console.log('Data keys: ', Object.keys(data) );
			console.log('Data name: ', data.name);
			console.log('Data frenchName: ' + data.frenchName);
			console.log('Data localName: ' + data.localName);
			console.log('Data region: ' + data.region);

			$('#countryList').append($('<li>').text('name: ' + data.name) );
			$('#countryList').append( $('<li>').text('frenchName: ' + data.frenchName) );
			$('#countryList').append( $('<li>').text('localName: ' + data.localName) );
			$('#countryList').append( $('<li>').text('region: ' + data.region) );

		});

	});



})