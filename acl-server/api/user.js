var db = require('../lib/db.js');
var mongojs = require('mongojs');

module.exports = function(app) {
	app.get('/api/user', function(req, res) {

		if (req.session.isValid) {
			console.log("There is an existing session.");
		} else {
			req.session.isValid = true;
			console.log("New session.");
			console.log('Old session ID: ' + req.header('Cookie'));
			console.log('New session ID: ' + req.session.id);
		}
		
		if(req.session.email) {
			console.log('Last user looked up was: %j ',req.session.email);
		};
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
				console.log('look up user.email = %j',user.email);
				req.session.email = user.email;
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
	
	app.post('/api/login', function(req, res){
		console.log('getting credential from login = %j', req.body)
		var email = req.body.email;
		var password = req.body.password;
		db.findOne('user', {'email': email}, {'passsword' : 1}, function(err, user){
			if(!err) {
				
			} else {
				return 
			}
		});
		
		res.send(req.body);
	});
	
};