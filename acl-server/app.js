var express = require('express')
	, midware = require('./lib/midware')


var app = exports.app = express();

app.configure(function(){
  
  app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.all('*', midware.header);
app.all('/api/*', midware.authentication);

//API
require('./api/user')(app);
require('./api/auth')(app);
require('./api/message')(app);
require('./api/postcode')(app);

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");
