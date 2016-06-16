var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cards/:image/:text', function(request, response) {
  var image = request.params.image;
  var text = request.params.text;
  //Security
  var brand = 'Referendum.wtf'
  var textFixed = text.replace(/[^\x00-\x7F]/g, "").trim().replace(/\s/g, '+');
  var textURL = 'https://assets.imgix.net/~text?w=500&txtclr=fff&txt=' + encodeURIComponent(textFixed) + '&txtsize=24&txtlead=0&txtpad=15&bg=80002228&txtfont=Avenir-Heavy';
  var imageUrl = 'https://referendum-wtf.imgix.net/' + encodeURIComponent(image) + '?txtsize=14&txtclr=ff0&txtalign=center%2Cbottom&txt64=' + encodeURIComponent(new Buffer(brand).toString('base64')) + '&txtfont64=SGVsdmV0aWNhTmV1ZS1NZWRpdW0&markalign=center%2Cmiddle&mark64=' + encodeURIComponent(new Buffer(textURL).toString('base64')) + '&fit=crop&exp=-3&w=600';
  response.render('pages/card', { imageUrl: imageUrl, text: text });
});

app.get('/issues', function(request, response) {
  response.render('pages/issues1');
});

app.get('/quiz', function(request, response) {
  response.render('pages/quiz');
});

app.get('/issues_old', function(request, response) {
  response.render('pages/issues');
});

// app.get('/issues3', function(request, response) {
//   response.render('pages/issues3');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
