var db = require('../lib/db.js');
var mongojs = require('mongojs');

module.exports = function(app) {
	app.get('/api/user', function(req, res) {
		
		db.find('user',{},{},10, function(err, users) {
			if (!err) {
				return res.send(users);
			} else {
				return console.log(err);
			}
		});
	});

	app.get('/api/user/:id', function(req, res){
		var id = req.params.id;
		db.findOne('user', {'_id': mongojs.ObjectId(id)}, {}, function(err, user){
			if (!err) {
				return res.send(user);
			} else {
				return console.log(err);
			}
		});
	});
	
	app.post('/api/user', function(req, res){
		db.save('user', req.body)
		res.send(req.body);
	});
	
	app.put('/api/user', function(req, res){
		var id = req.body._id;
		console.log('editing user id =' + id);
		delete req.body['_id']
		db.update('user',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
			function(){
				res.send(req.body);
		});
	});
	
	app.delete('/api/user/:id', function(req, res){
		var id = req.params.id;
		
		db.remove('user', {'_id': mongojs.ObjectId(id)}, function(err, user){
			if (!err) {
				res.json(true);
			} else {
				console.log(err);
				res.json(false);
			}
		});
	});
};