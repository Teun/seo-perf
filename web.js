var express = require("express");
var hbs = require("hbs");
var app = express();
app.use(express.logger());

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  var hostKey = getHostKey(request);
  var settings = getSettingsForKey(hostKey);

  response.locals = 
    {
      title: rot('Ourtitle ', 5) + settings.titleWord,
      bodyText1: rot('The world is a sphere. Not quite, actually, but for the purpose of this story, we can do as if it\'s a perfect sphere. We all live on the surface of this sphere and to find our way on it, we use many technologies. One of them is the map. It is a drawing on flat surface that looks a lot like the real world, but way smaller. But size is not the only aspect in which maps are not like the real world. On a road map, we show the roads extra wide compared to other features. Also, the colors of features on a map are often completely different than the real world things they represent. In what way they are different is determined by the goal of the map in case. One of the things on a map that are always different form reality is actually the shape of everything on it. ', settings.rot),
      bodyText2: rot('This is caused by the fact that we cannot draw something spherical on flat paper or screen without distorting the shape in one way or another. The several different ways of distorting the shapes of reality to make them flat are called map projections. Some are more popular than others, but all projections have their flaws. If you want to understand (world) maps, you really should understand a little bit about projections and how they distort out view of the world.', settings.rot),
      imgWidth: settings.imgWidth,
      host: hostKey
    }
  setTimeout(function(){response.render('index')}, settings.waitMain);
	});
app.get('/script', function(request, response) {
  var hostKey = getHostKey(request);
  var settings = getSettingsForKey(hostKey);
  setTimeout(function(){response.writeHead(200, {'Content-Type': 'application/javascript'});response.end();}, settings.waitResource);
  });
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function getHostKey(request){
  
  var key = request.query.key;
  key = key || {'qazaghlara.duynstee.com': '1', 'gtuijlae.duynstee.com': '2', 'ijlaegtu.duynstee.com': '3', 'dwocdkumng.duynstee.com': '4', 'mammoliont.duynstee.com': '5', 'basiulopoq.duynstee.com': '6'}[request.headers.host];
  return key;
}
function getSettingsForKey(hostKey){
  return {
    '1': {rot:7, waitMain:0, waitResource:0, titleWord: 'qazaghlara', imgWidth:230},
    '2': {rot:5, waitMain:500, waitResource:0, titleWord: 'gtuijlae', imgWidth:210},
    '3': {rot:5, waitMain:4000, waitResource:0, titleWord: 'ijlaegtu', imgWidth:220},
    '4': {rot:5, waitMain:2000, waitResource:2000, titleWord: 'dwocdkumng', imgWidth:300},
    '5': {rot:5, waitMain:0, waitResource:500, titleWord: 'mammoliont', imgWidth:310},
    '6': {rot:1, waitMain:0, waitResource:0, titleWord: 'xxxxx', imgWidth:350},
  }[hostKey] || {rot:1, waitMain:0, waitResource:0, titleWord: 'localhost', imgWidth:201};
}
function rot(input, rotx){
  var output = "";
  var rotChar = function(charCode){
    if(charCode < 65 || charCode > 122)return charCode;
    charCode += rotx;
    if(charCode > 122 || (97 > charCode && charCode > 90)) charCode -= 26;
    return charCode;
  }
  for(var i = 0; i<input.length; i++)
  {
    output += String.fromCharCode(rotChar(input.charCodeAt(i)));
  }
  return output;
}