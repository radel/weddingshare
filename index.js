var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var morgan = require('morgan');

app.use(express.static(path.join(__dirname, '/views/dist/')));
app.use(cors());
 app.use(morgan('combined'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/dist/index.html'));
});

var queue = [];
fill(queue);

function fill(collection) {
fs.readdir(path.join(__dirname, '/uploads'), (err, files) => {
  files.forEach(file => {
    collection.push(file);
  });
})
}

app.get('/slideshow', function(req,res) {
    if (queue.length == 0) {
      fill(queue);
    }
    var file = '/views/dist/public/no-file.png'; 
    if (queue) {
      file = '/uploads/'+queue.pop();
      console.log(file)
    }
    res.sendFile(path.join(__dirname, file));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    queue.push(file.name);
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
