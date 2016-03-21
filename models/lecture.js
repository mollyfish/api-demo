var mongoose = require('mongoose');

var lectureSchema = new mongoose.Schema({
	title: String,
	subject: String,
	attendance: Number
});

module.exports = mongoose.model('Lecture', lectureSchema);