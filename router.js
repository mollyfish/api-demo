var express = require('express');
var bodyParser = require('body-parser');
// var Student = require(__dirname + '/../models/workout');
// var handleError = require(__dirname + '/../lib/handleServerError');

var router = module.exports = exports = express.Router();

router.get('/lectures', function(req, res) {
  Workout.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

router.post('/lectures', bodyParser.json(), function(req, res) {
  var newWorkout = new Workout(req.body);
  newWorkout.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

router.put('/lectures/:id', bodyParser.json(), function(req, res) {
  var workoutData = req.body;
  delete workoutData._id;
  Workout.update({_id: req.params.id}, workoutData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

router.delete('/lectures/:id', function(req, res) {
  Workout.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});