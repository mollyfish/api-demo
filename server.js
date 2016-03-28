var mongoose = require('mongoose');
var express = require('express'); 
var bodyParser = require('body-parser');
var app = express();

function handleError(err, res) { 
  console.log(err); 
  res.status(500).json({msg: 'server error'}); 
}; 

// DATABASE MODELS

var studentSchema = new mongoose.Schema({
	name: String,
	attended: [{type: mongoose.Schema.ObjectId, 'ref' : lectureSchema}]
});
var lectureSchema = new mongoose.Schema({
	title: String,
	subject: String,
	attendedBy: [{type: mongoose.Schema.ObjectId, 'ref' : studentSchema}] 
});
var Student = mongoose.model('Student', studentSchema);
var Lecture = mongoose.model('Lecture', lectureSchema);

// ROUTE
var classroomRouter = express.Router();

// LECTURE ROUTES
classroomRouter.get('/lectures', function(req, res) {
  Lecture.find({}, function(err, data) {
    if (err) {
      return handleError(err, res);
    } else {
      res.send(JSON.stringify(data));
      // res.json(data);  
    }
  });
});

classroomRouter.get('/lectures/:id/subject', function(req, res) {
  var pretty = "";
  Lecture.findOne({'_id': req.params.id}, function(err, data) {
    if (err) {
      return handleError(err, res);
    } else {
      pretty = "title: " + data.title + ", subject: " + data.subject;
      res.json(pretty);  
    }
  });
});

classroomRouter.get('/lectures/:id/attendance', function(req, res) {
  var pretty = "";
  Lecture.findOne({'_id': req.params.id}, function(err, data) {
    if (err) {
      return handleError(err, res);
    } else {
      res.json(data.attendedBy);
      // res.json(pretty);  
    }
  });
});

// superagent localhost:8080/lectures post '{"title":"Chemical bonds", "subject":"ionic vs covalent bonding", "attendance":"8"}'

classroomRouter.post('/lectures', bodyParser.json(), function(req, res) {
  var newLecture = new Lecture(req.body);
  newLecture.save(function(err, data) {
    if (err) {
    	return handleError(err, res);
    } else {
    	res.json(data);
  	}
  });
});

classroomRouter.put('/lectures/:id', bodyParser.json(), function(req, res) {
  var lectureData = req.body;
  delete lectureData._id;
  Lecture.update({_id: req.params.id}, lectureData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

classroomRouter.delete('/lectures/:id', function(req, res) {
  Lecture.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

// STUDENT ROUTES
classroomRouter.get('/students', function(req, res) {
  Student.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

classroomRouter.get('/students/:id/name', function(req, res) {
  var pretty = "";
  Student.findOne({'_id': req.params.id}, function(err, data) {
    if (err) {
      return handleError(err, res);
    } else {
      pretty = "name: " + data.name;
      res.json(pretty);  
    }
  });
});

classroomRouter.get('/students/:id/attendance', function(req, res) {
  var pretty = "";
  Student.findOne({'_id': req.params.id}, function(err, data) {
    if (err) {
      return handleError(err, res);
    } else {
      pretty = "lectures attended: " + data.attended;
      res.json(pretty);  
    }
  });
})

classroomRouter.post('/students', bodyParser.json(), function(req, res) {
  var newStudent = new Student(req.body);
  newStudent.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

classroomRouter.put('/students/:id', bodyParser.json(), function(req, res) {
  var studentData = req.body;
  delete studentData._id;
  Student.update({_id: req.params.id}, studentData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

classroomRouter.delete('/students/:id', function(req, res) {
  Student.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

var port = 8080 || process.env.PORT; 

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/lectures_dev');

app.use(express.static(__dirname + '/public'));

app.use('/api', classroomRouter);

app.listen(port, function() { 
  console.log('server up on port ' + port); 
}); 