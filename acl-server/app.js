var express = require('express');
var RedisStore = require('connect-redis')(express);
//var MemStore = express.session.MemoryStore;

var app = express();

app.configure(function(){
  
  app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(express.cookieParser('my apssword string'));
  
  app.use(express.session({
	secret: 'my secret string',
	store: new RedisStore({ host: 'localhost', port: '6379', ttl: 3600})
//	store: MemStore({
//		reapInterval: 60000 * 10
//	}),
//	maxAge: 3600000
  }));
  
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

//API
require('./api/user')(app);

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");
