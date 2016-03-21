var mongoose = require('mongoose');
var express = require('express'); 
var app = express();
var lecturesRouter = require(__dirname + '/routes/router');
// var fs = require('fs');
// var path = require('path');
// var bodyParser = require('body-parser');
// var exec = require('child_process').exec; 
var port = 8080 || process.env.PORT; 

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/lectures_dev');

app.use(express.static(__dirname + '/public'));
// app.use(bodyParser());

app.use('/api', lecturesRouter);
// app.get('/cpuinfo', function(req, res) {
// 	console.log('i hear you');
// 	exec(path.join(__dirname + '/get-cpu'));
// 	exec(path.join(__dirname + '/send-json'));
//   fs.readFile(path.join(__dirname + '/public/data.json'), function(err, data){
//   	console.log("packet");
//   	res.send(data);
//   });
// });

app.listen(port, function() { 
  console.log('server up on port ' + port); 
}); 