
var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({

	name: String,
	frenchName: String,
	localName: String,
	region: String

});

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;

