// var express = require('express');
// var bodyParser = require('body-parser');
// var Student = require(__dirname + '/../models/student');
// var Lecture = require(__dirname + '/../models/lecture');
// var handleError = require(__dirname + '/../handleServerError');

// var router = module.exports = exports = express.Router();

// router.get('/lectures', function(req, res) {
//   Lecture.find({}, function(err, data) {
//     if (err) return handleError(err, res);

//     res.json(data);
//   });
// });

// router.post('/lectures', bodyParser.json(), function(req, res) {
//   var newLecture = new Lecture(req.body);
//   newLecture.save(function(err, data) {
//     if (err) return handleError(err, res);

//     res.json(data);
//   });
// });

// router.put('/lectures/:id', bodyParser.json(), function(req, res) {
//   var lectureData = req.body;
//   delete lectureData._id;
//   Lecture.update({_id: req.params.id}, lectureData, function(err) {
//     if (err) return handleError(err, res);

//     res.json({msg: 'success!'});
//   });
// });

// router.delete('/lectures/:id', function(req, res) {
//   Lecture.remove({_id: req.params.id}, function(err) {
//     if (err) return handleError(err, res);

//     res.json({msg: 'success!'});
//   });
// });