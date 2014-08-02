var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var mongoose = require('mongoose');
var indexController = require('./controllers/index.js');
var countries = require('./models/countries.json');


var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', indexController.index);

app.get('/countries', indexController.getCountries);

app.post('/search', indexController.searchCountries);


var server = app.listen(6754, function() {
	console.log('Express server listening on port ' + server.address().port);
});
