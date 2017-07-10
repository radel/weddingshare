var express = require('express');
var compression = require('compression')
var app = express();
var cors = require('cors')
var path = require('path');
var formidable = require('formidable');
var Jimp = require("jimp");
var fs = require('fs');
var morgan = require('morgan');
var port = process.env.PORT || 3000

app.use(compression({ filter: shouldCompress }))
app.use(express.static(path.join(__dirname, '/views/dist/')));
app.use(cors());
app.use(morgan('combined'));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
app.get('/', function(req, res) {
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
app.get('/slideshow', function(req, res) {
  if (queue.length == 0) {
    fill(queue);
    var nofile = '/views/dist/static/img/no-file.png';
    res.sendFile(path.join(__dirname, nofile))
  } else {
    file = '/thumbs/' + queue.pop();
    res.sendFile(path.join(__dirname, file));
  }
});

app.get('/photos', function(req, res) {
  fs.readdir(path.join(__dirname, '/thumbs'), (err, files) => {
    res.send(files);
  })
});

app.get('/photos/:name', function(req, res) {
  res.sendFile(path.join(__dirname, 'thumbs/' + req.params.name));
});

app.delete('/photos/:name', function(req, res) {
  fs.unlink(path.join(__dirname, 'thumbs/' + req.params.name), function(err) {
    if (err) res.send(err);
    else {
      res.send(true);
    }
  });
});


app.post('/upload', function(req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    let name = new Date().toISOString('F').slice(0, 10) + '_' + file.name
    fs.rename(file.path, path.join(form.uploadDir, name));
    Jimp.read(path.join(form.uploadDir, name), function(err, image) {
      if (err) throw err;
      image.resize(1920, Jimp.AUTO) // resize
        .write(path.join(__dirname, 'thumbs/' + name)); // save
    });
    queue.push(name);
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

var server = app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});