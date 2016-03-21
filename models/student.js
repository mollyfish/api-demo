var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
	name: String,
	attendance: Number
});

module.exports = mongoose.model('Student', studentSchema);