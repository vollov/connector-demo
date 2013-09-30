var express = require('express')
	, path = require('path');

var app = express();

app.configure(function(){
  
  app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/client'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//require('./routes/index')(app);

app.get('*', function(req,res){
  res.sendfile('index.html', { root: path.resolve(__dirname + '/client') });
});

app.listen(5000, '0.0.0.0');
console.log("Express server listening...");
