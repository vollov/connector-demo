var db = require('../lib/db.js')
	, mongojs = require('mongojs')
	, security = require('../lib/security')
	, redisService = require('../lib/redis');

module.exports = function(app) {
	app.get('/api/message', function(req, res) {
		db.find('message',{},{},10, function(err, messages) {
			if (!err) {
				return res.send(messages);
			} else {
				return console.log(err);
			}
		});
	});

	app.get('/api/message/:id', function(req, res){
		var id = req.params.id;
		db.findOne('message', {'_id': mongojs.ObjectId(id)}, {}, function(err, message){
			if (!err) {
				//console.log('look up message.email = %j',message.email);
				return res.send(message);
			} else {
				return console.log(err);
			}
		});
	});
	
	app.post('/public/message', function(req, res){
		db.save('message', req.body)
		res.send(req.body);
	});
	
	app.put('/api/message', function(req, res){
		var id = req.body._id;
		console.log('editing message id =' + id);
		delete req.body['_id']
		db.update('message',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
			function(){
				res.send(req.body);
		});
	});
	
	app.delete('/api/message/:id', function(req, res){
		var id = req.params.id;
		
		db.remove('message', {'_id': mongojs.ObjectId(id)}, function(err, message){
			if (!err) {
				res.json(true);
			} else {
				console.log(err);
				res.json(false);
			}
		});
	});
};
