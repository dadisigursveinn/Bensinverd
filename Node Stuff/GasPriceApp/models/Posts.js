var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	station: String,
	liters: Number,
	date: String//Possibly fynna betra
});

mongoose.model('Post', PostSchema);