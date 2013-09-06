var express = require("express");
var hbs = require("hbs");
var app = express();
app.use(express.logger());

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {

  response.locals = 
    {
      bodyText: 'This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. This is the text. ',
      host: getHostName(request)
    }
  response.render('index');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function getHostName(request){
  return request.headers['HTTP_HOST'];
}