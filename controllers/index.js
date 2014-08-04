
var _ = require('underscore');
var mongoose = require('mongoose');

var countries = require('../models/countries.json');
var Country = require('../models/model.js');

var indexController = {


	serverStart: function() {

		Country.find({}).exec(function(error, result) {

			if(error) {

				console.log('Find error');
			}
			else {

				console.log('Dbase found');
				var countriesCurrentlyInDB = result;

				if(Object.keys(result).length === 0) {

					var errorCount = 0;
					var saveCount = 0;

					for(var i=0; i < countries.length; i++) {

						var tempCountry = new Country( countries[ i ] );

						tempCountry.save(function(error){

							if(error) {
								console.log('Error writting to the database');
								errorCount++;
							}
							else {
								saveCount++;
							}

						});

					}

					console.log('Database save errors: ', errorCount);
					console.log('Database save total: ', saveCount);

				}

				console.log('Dbase length: ', Object.keys(result).length);
				console.log('Number of countries: ', countries.length);
			}

		});

	},

	index: function(req, res) {

		var ip = getIp(req);
		console.log('Client ip: ', ip);
		res.render('index');

	},

	getCountries: function(req, res) {

		console.log('get route part is working');
		console.log('Countries: ');
		console.log(countries.length);

		var ip = getIp(req);
		console.log('Client ip: ', ip);


		Country.find({}).exec(function(error, result) {

			if(error) {

				console.log('Find error');
			}
			else {

				console.log('Result length: ', Object.keys(result).length);
				res.status(200).send(result);
			}
		});

		// res.status(200).send(countries);

	},

	searchCountries: function(req, res) {

		var ip = getIp(req);
		console.log('Client ip: ', ip);

		var search = req.body.search;
		var foundCountry = _.findWhere(countries, {"name": search});

		Country.find({"name": search}).exec(function(error, result) {
			if(error) {
				console.log('Error finding');
				var foundCountryDBase = null;
			}
			else {
				var foundCountryDBase = result[0];

				// console.log('found Country database: ', foundCountryDBase);
				// console.log('found Country database type: ', typeof(foundCountryDBase));
				// console.log('found Country database keys: ', Object.keys(foundCountryDBase));


				// console.log('found Country database: ', foundCountryDBase[0]);
				// console.log('found Country database: ', typeof(foundCountryDBase[0]));
				// console.log('found Country database keys: ', Object.keys(foundCountryDBase[0]));


				res.status(200).send(foundCountryDBase);

				console.log('found Country: ', foundCountryDBase);

				// res.status(200).send(foundCountry);


			}
		});

		console.log('post route part is working');
		console.log('search term: ', search);

		// res.status(200).send(foundCountry);
	}



};

var getIp = function(req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

module.exports = indexController;