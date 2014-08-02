
var countries = require('../models/countries.json');
var _ = require('underscore');



var indexController = {
	index: function(req, res) {
		res.render('index');

		
	},

	getCountries: function(req, res) {

		console.log('get route part is working');
		console.log('Countries: ');
		console.log(countries.length);

		res.status(200).send(countries);

	},

	searchCountries: function(req, res) {

		var search = req.body.search;
		var foundCountry = _.findWhere(countries, {"name": search});

		console.log('post route part is working');
		console.log('search term: ', search);
		console.log('foundCountry: ', foundCountry);

		res.status(200).send(foundCountry);
	}



};

module.exports = indexController;